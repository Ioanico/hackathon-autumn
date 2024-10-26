import React, { useState } from "react";
import "./Register.css";
import { TextField, Button } from "@mui/material";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onNameChange = (e) => setName(e.target.value);
    const onEmailChange = (e) => setEmail(e.target.value);
    const onPasswordChange = (e) => setPassword(e.target.value);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const user = auth.currentUser;
            if (user) {
                await setDoc(doc(db, "Users", user.uid), {
                    email: user.email,
                    name: name,
                });
            }
            console.log("user registered successfully");
            navigate("/login");
        } catch (error) {
            console.error("error during registration:", error.message);
        }
    };

    return (
        <div id="register-container">
            <TextField
                id="name-input"
                variant="standard"
                onChange={onNameChange}
                label="Enter your name"
            />
            <TextField
                id="email-input"
                variant="standard"
                onChange={onEmailChange}
                label="Enter your email"
            />
            <TextField
                id="password-input"
                variant="standard"
                type="password"
                onChange={onPasswordChange}
                label="Enter your Password"
            />
            <p id="dont-have-acc">
                Already have an account? <a href="/login">Login</a>
            </p>
            <Button variant="contained" onClick={handleRegister}>
                Register
            </Button>
        </div>
    );
};

export default Register;
