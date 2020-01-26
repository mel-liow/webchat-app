import React, { useCallback } from "react";
import './Conversations.scss'

const Conversations = props => {
    const { user, setSelectedMail } = props;

    const selectUserFunction = useCallback((email, user) => {
        setSelectedMail(email, user);
    }, [setSelectedMail]);

    return (
        <div className="conversations"
            key={user.id}
            onClick={() => selectUserFunction(user.email, user.name)}
        >
            {user.name}
        </div>
    );
};

export default Conversations;