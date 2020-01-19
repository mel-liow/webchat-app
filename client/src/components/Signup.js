import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import validator from "validator";

import './Signup.scss'

const Signup = props => {
    const [token, setToken] = useState({ name: "", email: "" });
    const [error, setError] = useState("");

    const handleChange = e => {
        setToken({ ...token, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const { name, email } = token;

        const existingUser = props.users.some(function (user) {
            return user.email === email;
        });

        if (!name.length) {
            setError("Name is required");
        }

        if (!validator.isEmail(email)) {
            setError("Valid email is required");
        }

        if (existingUser) {
            setError("Email already in use");
        }

        if (name.length && validator.isEmail(email) && !existingUser) {
            setError("");
            props.createUser(email, name);
            props.setShowSignup(false)
            localStorage["token"] = JSON.stringify(token);
        }
    };

    const remove = () => {
        props.deleteAllUsers();
    }

    const { name, email } = token;

    return (
        <React.Fragment>
            <div className='signup container'>
                <TextField
                    required
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
                <TextField
                    required
                    type="email"
                    label="Email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
                <Button onClick={validate}>Enter Chat</Button>
                {/* <Button variant="contained" onClick={remove}>Clear users</Button> */}
            </div>
            <div>{error}</div>
        </React.Fragment>
    );
};

export default Signup;