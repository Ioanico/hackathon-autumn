import React, { useState } from "react";
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
} from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./LogIn.css";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const onPasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log("user logged in");
            navigate("/home");
        } catch (error) {
            console.log("bad info");
        }
    };

    return (
        <div id="login-container">
            <TextField
                id="standard-basic"
                value={email}
                variant="standard"
                onChange={onEmailChange}
                label="Enter your email"
            ></TextField>

            <TextField
                id="standard-basic"
                value={password}
                variant="standard"
                onChange={onPasswordChange}
                label="Enter your Password"
            ></TextField>

            <a href="" id="forgot-pass">
                Forgot password?
            </a>

            <Button variant="contained" onClick={handleSubmit}>
                Login
            </Button>

            <p id="dont-have-acc">
                Don't have an account? <a href="/register">Signup now</a>
            </p>
        </div>
    );
};

export default LogIn;
