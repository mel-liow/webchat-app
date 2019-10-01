import React, { useCallback } from "react";

const MessageConversation = props => {


    const { messages, receiverName, receiverMail, handleChange } = props;

    // console.log(messages)
    if (!messages) return null
    return (
        <div className="message">
            Messages:
            {/* Create Message box  */}
            {messages.map((message) => {
                return <p key={message.id}>{message.message}</p>
            })}

        </div>

    );
};

export default MessageConversation;