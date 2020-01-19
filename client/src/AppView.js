import React from 'react';

import Signup from './components/Signup';
import ChatRoom from './components/ChatRoom';

import './AppView.scss';

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
        showSignup,
        setShowSignup
    } = props;



    return (
        <div className='app_view'>
            {showSignup
                ? <Signup
                    users={users}
                    createUser={createUser}
                    deleteAllUsers={deleteAllUsers}
                    setShowSignup={setShowSignup}
                />
                : <ChatRoom
                    users={users}
                    user={user}
                    receiver={receiver}
                    leftUser={leftUser}
                    showSignup={showSignup}
                    setSelectedMail={setSelectedMail}
                    deleteUser={deleteUser}
                />
            }
        </div>
    );

}


export default AppView
