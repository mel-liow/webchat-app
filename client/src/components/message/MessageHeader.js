import React from 'react';

import './MessageHeader.scss'

const MessageHeader = props => {

    const { receiverName, receiverMail, userTyping } = props

    return (
        <div className='message_header'>
            {userTyping && userTyping === receiverMail
                ? <p>{receiverName} is typing </p>
                : receiverName
            }
        </div>
    );
};

export default MessageHeader