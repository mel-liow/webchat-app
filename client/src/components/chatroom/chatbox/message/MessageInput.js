import React, { useState, useCallback, useRef } from "react";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import './MessageInput.scss';

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
        <div className="message_input">
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
                    size="small"
                />
            </form>
            <Button
                className="deleteChat"
                size="small"
                variant="outlined"
                onClick={handleSubmit}
            >
            </Button>
        </div>

    );
};

export default MessageInput;