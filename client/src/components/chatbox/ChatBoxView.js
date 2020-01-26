import React from 'react';

import Button from "@material-ui/core/Button";
import MessageInput from '../message/MessageInput';
import MessageConversation from '../message/MessageConversation';

import './ChatBoxView.scss'

const ChatBoxView = props => {

    const {
        message,
        messages,
        email,
        receiver: { receiverName, receiverMail },
        setMessage,
        handleTyping,
        userTyping,
        fnDeleteAllMessages,
        handleSubmitMessage
    } = props

    return (
        <div className="chatbox" >
            <div className='chat_header'>
                {userTyping && userTyping === receiverMail
                    ? <p>{receiverName} is typing </p>
                    : receiverName
                }
            </div>
            <MessageConversation
                messages={messages}
                receiverMail={receiverMail}
            />
            <MessageInput
                handleChange={handleTyping}
                message={message}
                setMessage={setMessage}
                submitMessage={handleSubmitMessage}
                email={email}
                receiverName={receiverName}
            />
            {/* <Button
                className="deleteChat"
                size="small"
                variant="outlined"
                onClick={fnDeleteAllMessages}
            >
                DELETE MESSAGES
            </Button> */}
        </div>
    );
};

export default ChatBoxView