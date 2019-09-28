import React from 'react';

import Signup from './components/Signup';
import ChatRoom from './components/ChatRoom';

import './AppView.css';

const AppView = props => {

    const {
        users,
        user,
        createUser,
        deleteUser,
        leftUser,
        setSelectedMail,
        deleteAllUsers,
        receiver
    } = props;

    return (
        <React.Fragment>
            <Signup
                users={users}
                createUser={createUser}
                deleteAllUsers={deleteAllUsers}
            />
            <div className="chat-page">
                <ChatRoom
                    users={users}
                    user={user}
                    receiver={receiver}
                    leftUser={leftUser}
                    setSelectedMail={setSelectedMail}
                    deleteUser={deleteUser}
                />
            </div>
        </React.Fragment>
    );

}


export default AppView
