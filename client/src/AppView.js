import React, { useState, useEffect } from 'react';

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
        receiver,
    } = props;

    const [showSignup, setShowSignup] = useState(true)

    return (
        <div className='app_view'>
            <Signup
                users={users}
                createUser={createUser}
                deleteAllUsers={deleteAllUsers}
                showSignup={showSignup}
                setShowSignup={setShowSignup}
            />
            <ChatRoom
                users={users}
                user={user}
                receiver={receiver}
                leftUser={leftUser}
                showSignup={showSignup}
                setSelectedMail={setSelectedMail}
                deleteUser={deleteUser}
            />
        </div>
    );

}


export default AppView
