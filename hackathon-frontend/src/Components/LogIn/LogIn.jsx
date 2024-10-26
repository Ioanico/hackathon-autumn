import React, { useState } from "react";
import "./LogIn.css";
import { InputAdornment, TextField } from "@mui/material";
import { Button } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ClassNames } from "@emotion/react";
import {
    doSignInWithEmailAndPassword,
    doSignInWithGoogle,
} from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LogIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSignedin, setIsSignedIn] = useState(false);

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
            navigate("/home");
        } catch (error) {
            console.log("bad info");
            badInfoToast();
        }
    };

    return (
        <div className="container">
            <div className="login">
                <h1>Login</h1>
                <div className="line"></div>
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
            <div className="photo">
                <h1>Plan your party</h1>
                <div className="line-photo"></div>
                <h1>And party your plan</h1>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    );
};

export default LogIn;
