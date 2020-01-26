import React from "react";

import './MessageChip.scss';

const MessageChip = props => {


    const { message, receiverMail } = props;

    if (!message) return null
    let position = (message.senderMail === receiverMail)
        ? 'left'
        : 'right'

    return (

        <div className={"message_row " + position}>
            <div className={"message_chip " + position}>
                <div className="message">

                    {message.message}

                </div>
            </div>
        </div >

    );
};

export default MessageChip;