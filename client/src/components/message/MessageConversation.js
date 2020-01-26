import React, { useCallback } from "react";
import MessageChip from "./MessageChip";

import "./MessageConversation.scss";

const MessageConversation = props => {

    const { messages, receiverMail } = props;

    if (!messages) return null
    return (
        <div className="message_conversation">
            {messages.map((message) => {
                return <MessageChip
                    key={message.id}
                    message={message}
                    receiverMail={receiverMail}
                />
            })}

        </div>

    );
};

export default MessageConversation;