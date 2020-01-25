import React, { useState, useEffect, useRef } from 'react';

import Button from "@material-ui/core/Button";
import MessageInput from '../MessageInput';
import MessageConversation from '../MessageConversation';

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

export default ChatBoxView