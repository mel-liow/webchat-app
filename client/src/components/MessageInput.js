import React, { useState, useCallback, useRef } from "react";
import TextField from '@material-ui/core/TextField';


const MessageInput = props => {

    const [message, setMessage] = useState('');

    const { email, receiverName, receiverMail, handleChange } = props;



    const handleSubmit = async (e, message, email) => {
        setMessage('');
        e.preventDefault();
        console.log(message)
    };


    return (
        <div className="message">
            WRITE MESSAGE HERE
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