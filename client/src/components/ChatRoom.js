import React, { useCallback } from 'react';
import Users from './Users';
import ChatBox from './ChatBox';
import Menu from "./Menu";

import './ChatRoom.scss'

const ChatRoom = props => {

    const {
        users,
        user,
        setSelectedMail,
        receiver,
        deleteUser,
        userLeft,
    } = props;

    return (
        <React.Fragment>
            <Menu
                user={user}
                deleteUser={deleteUser}
            />
            <div className="chatroom_view">
                <div className="container">
                    <Users
                        users={users}
                        setSelectedMail={setSelectedMail}
                        email={user.email}
                    />
                </div>

                <div className="container">
                    <ChatBox
                        name={user.name}
                        email={user.email}
                        receiver={receiver}
                        userLeft={userLeft}
                    />
                </div>
            </div>
        </React.Fragment>
    )
}

export default ChatRoom;