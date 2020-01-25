import React, { useState, useCallback, useRef } from "react";
import TextField from '@material-ui/core/TextField';


const MessageInput = props => {



    const handleSubmit = async (e, message, email) => {
        setMessage('');
        e.preventDefault();
        const { submitMessage } = props
        if (!message.length || !submitMessage) return null
        submitMessage(message, email)
    };

    const {
        email,
        message,
        setMessage,
        receiverName,
        handleChange,
        submitMessage
    } = props;


    return (
        <div className="message">
            <form
                onSubmit={e => handleSubmit(e, message, email)}
                className="chatbox"
            >
                <TextField
                    placeholder={'Say something to ' + receiverName}
                    fullWidth
                    name="message"
                    value={message}
                    onChange={handleChange}
                    margin="normal"
                    variant="outlined"
                />
            </form>
        </div>

    );
};

export default MessageInput;