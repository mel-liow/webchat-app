import React, { useState, useEffect, useRef } from 'react';
import { graphql } from 'react-apollo';
import * as compose from 'lodash.flowright'
import moment from 'moment';

import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import MessageInput from './MessageInput';
import MessageConversation from './MessageConversation';
import {
    MessageQuery,
    CreateMessageMutation,
    UserTypingMutation,
    MessageSubscription,
    UserTypingSubscription,
    DeleteAllMessagesMutation
} from './MessageQuery';

import './ChatBox.css'

const ChatBox = props => {

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
                data.messages.push(createMessage);
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
        receiver: { receiverMail, receiverName },
    } = props

    if (error || loading) {
        return null
    }

    if (!receiverName) return null

    return (
        <div className="chatbox container" >
            <div className='chat_header'>
                {userTyping && userTyping === receiverMail
                    ? <p>{receiverName} is typing </p>
                    : receiverName
                }
            </div>
            <MessageConversation
                messages={messages}
            />
            <MessageInput
                handleChange={handleTyping}
                message={message}
                setMessage={setMessage}
                submitMessage={handleSubmitMessage}
                email={email}
                receiverName={receiverName}
            />
            <Button
                className="deleteChat"
                size="small"
                variant="outlined"
                onClick={fnDeleteAllMessages}
            >
                DELETE MESSAGES
            </Button>
        </div>
    );
};

export default compose(
    graphql(MessageQuery, { name: 'message' }),
    graphql(CreateMessageMutation, { name: 'createMessage' }),
    graphql(UserTypingMutation, { name: 'userTyping' }),
    graphql(DeleteAllMessagesMutation, { name: 'deleteAllMessages' })
)(ChatBox)