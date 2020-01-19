import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import validator from "validator";

import './Signup.scss'

const Signup = props => {
    const [token, setToken] = useState({ name: "", email: "" });
    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");

    const handleChange = e => {
        setToken({ ...token, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { name, email } = token;

        const existingUser = props.users.some(function (user) {
            return user.email === email;
        });

        !name.length
            ? setErrorName("Whoops! A name is required")
            : setErrorName("")

        !validator.isEmail(email)
            ? setErrorEmail("Whoops! Please enter a valid email")
            : setErrorEmail("")

        if (existingUser) {
            setErrorEmail("Sorry, this email is already in use")
        }

        if (name.length && validator.isEmail(email) && !existingUser) {
            props.createUser(email, name);
            props.setShowSignup(false)
            localStorage["token"] = JSON.stringify(token);
        }
    };

    const { name, email } = token;

    return (
        <React.Fragment>
            <div className='signup_view'>
                <div className='container'>
                    <TextField
                        required
                        id="standard-basic"
                        label="Name"
                        name="name"
                        value={name}
                        onChange={handleChange}
                    />
                    <div className='error_message'>
                        {errorName}
                    </div>

                    <TextField
                        required
                        id="standard-basic"
                        type="email"
                        label="Email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                    />
                    <div className='error_message'>
                        {errorEmail}
                    </div>

                    <Button onClick={validate} className='chat'>
                        Chat
                </Button>
                </div>
            </div>

        </React.Fragment>
    );
};

export default Signup;