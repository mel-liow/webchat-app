import React, { useState, useEffect } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright'

import {
    MessageQuery,
    CreateMessageMutation,
    UserTypingMutation,
    MessageSubscription,
    UserTypingSubscription,
    DeleteAllMessagesMutation
} from '../../../query/MessageQuery';

import ChatBoxView from './ChatBoxView';

const ChatBoxContainer = props => {

    const [userTyping, setUser] = useState('');
    const [timer, setTimer] = useState(null);
    const [message, setMessage] = useState('')

    const fnDeleteAllMessages = async (message) => {
        message = ''
        await props.deleteAllMessages({
            variables: { message },
            update: store => {
                const data = store.readQuery({ query: MessageQuery });
                data.messages = []
                store.writeQuery({ query: MessageQuery, data });
            }
        });
    };

    useEffect(() => {
        props.message.subscribeToMore({
            document: MessageSubscription,
            variables: { receiverMail: props.email },
            updateQuery: (prev, { subscriptionData }) => {
                console.log('prev', prev)
                if (!subscriptionData.data) return prev;
                const msg = subscriptionData.data.newMessage;
                if (prev.messages.find(x => x.id === msg.id)) {
                    return prev;
                }
                return { ...prev, messages: [...prev.messages, msg] };
            }
        });
    })


    const handleTyping = async e => {
        setMessage(e.target.value)
        const { email, receiver: { receiverMail } } = props;
        await props.userTyping({
            variables: {
                email,
                receiverMail
            }
        })
        const changeMail = async () => {
            await props.userTyping({
                variables: {
                    email: 'email',
                    receiverMail
                }
            });
            clearTimeout(timer);
            setTimer(setTimeout(changeMail, 2000));
        }
    }

    const handleSubmitMessage = async (message, email) => {
        //create message
        const { receiver: { receiverMail } } = props
        await props.createMessage({
            variables: {
                message: message,
                senderMail: email,
                receiverMail, receiverMail,
                timestamp: Date.now()
            },
            // updates store 
            update: (store, { data: { createMessage } }) => {
                const data = store.readQuery({ query: MessageQuery });
                data.messages = [...data.messages, createMessage];
                store.writeQuery({ query: MessageQuery, data });
            }
        })
        //reset typing
        await props.userTyping({
            variables: {
                email: 'email',
                receiverMail
            }
        })
    }

    const {
        message: { error, loading, messages },
        email,
        receiver,
    } = props

    const convoMessages = !messages ? null : messages.filter(message => {
        return (message.senderMail === props.email &&
            message.receiverMail === props.receiver.receiverMail ||
            message.senderMail === props.receiver.receiverMail &&
            message.receiverMail === props.email
        )
    })

    if (error || loading) {
        return null
    }

    if (receiver.receiverName === "") return null

    return (

        <ChatBoxView
            handleTyping={handleTyping}
            message={message}
            messages={convoMessages}
            email={email}
            receiver={receiver}
            setMessage={setMessage}
            submitMessage={handleSubmitMessage}
            fnDeleteAllMessages={fnDeleteAllMessages}
            userTyping={userTyping}
        />
    );
};

export default compose(
    graphql(MessageQuery, { name: 'message' }),
    graphql(CreateMessageMutation, { name: 'createMessage' }),
    graphql(UserTypingMutation, { name: 'userTyping' }),
    graphql(DeleteAllMessagesMutation, { name: 'deleteAllMessages' }),
)(ChatBoxContainer)