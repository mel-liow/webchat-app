import React from 'react';
import ConversationHistory from '../history/ConversationHistory';
import ChatBoxContainer from '../chatbox/ChatBoxContainer';
import Menu from "../menu/Menu";

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
                <div className="user_container panel">
                    <ConversationHistory
                        users={users}
                        setSelectedMail={setSelectedMail}
                        email={user.email}
                    />
                </div>

                {users && users.length > 0
                    ? <div className="chat_container panel">
                        <ChatBoxContainer
                            name={user.name}
                            email={user.email}
                            receiver={receiver}
                            userLeft={userLeft}
                        />
                    </div>
                    : <div className="chat_container panel">
                        {/* plugin game to wait for someone */}
                    </div>
                }

            </div>
        </React.Fragment >
    )
}

export default ChatRoom;