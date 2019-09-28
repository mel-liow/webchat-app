import React, { useCallback } from "react";
import './Users.css'

const Users = props => {
    const { email, users, selectedMail } = props;

    const selectUserFunction = useCallback((mail, user) => {
        selectedMail(mail, user);
    }, [selectedMail]);

    const availableUsers = users.filter(user => {
        return user.email !== email
    })

    return (
        <div className="select-user">
            {availableUsers.length > 0
                ? availableUsers.map(user => {
                    return (
                        <div
                            key={user.id}
                            className="user"
                            onClick={() => selectUserFunction(user.email, user.name)}
                        >
                            {user.name}
                        </div>
                    )
                })
                :
                ":( No one to talk to"
            }
        </div>

    );
};

export default Users;