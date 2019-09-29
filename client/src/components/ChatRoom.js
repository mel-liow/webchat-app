import React, { useCallback } from 'react';
import Users from './Users';
import ChatBox from './ChatBox';
import Button from "@material-ui/core/Button";
import './ChatRoom.css'

const ChatRoom = props => {

    const {
        users,
        user,
        deleteUser,
        setSelectedMail,
        receiver,
        userLeft,
    } = props;

    const deleteUserFunction = useCallback(() => {
        deleteUser(user.email);
    }, [deleteUser, user.email]);

    return (
        <div className="chatroom container">
            Welcome {user.name}!
            <Button
                className="leave"
                size="small"
                variant="outlined"
                onClick={deleteUserFunction}
            >
                Leave Chat?
            </Button>
            <Users
                users={users}
                setSelectedMail={setSelectedMail}
                email={user.email}
            />
            <ChatBox
                name={user.name}
                email={user.email}
                receiver={receiver}
                userLeft={userLeft}
            />
        </div>
    )
}

export default ChatRoom;