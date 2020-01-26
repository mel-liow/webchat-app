import React from 'react';

import MessageInput from './message/MessageInput';
import MessageConversation from './message/MessageConversation';
import MessageHeader from './message/MessageHeader';

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
        handleSubmitMessage
    } = props

    return (
        <div className="chatbox" >
            <MessageHeader
                receiverName={receiverName}
                userTyping={userTyping}
                receiverMail={receiverMail}
            />

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
        </div>
    );
};

export default ChatBoxView