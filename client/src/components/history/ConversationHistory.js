import React from "react";
import Conversations from './Conversations';

import './ConversationHistory.scss';

const ConversationHistory = props => {
    const { email, users, setSelectedMail } = props;

    const availableUsers = users.filter(user => {
        return user.email !== email
    })

    return (
        <div className="conversation_history">
            <div className="header">
                Chat
            </div>

            {availableUsers.map(user => {
                return (
                    <Conversations
                        user={user}
                        setSelectedMail={setSelectedMail}
                    />
                )
            })
            }
        </div>

    );
};

export default ConversationHistory;