import React, { useState } from "react";
import "./Register.css";
import { TextField, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            const user = userCredential.user;
            await setDoc(doc(db, "Users", user.uid), {
                email: user.email,
                name: name,
            });
            navigate("/home");
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error(
                "Registration failed. Please check your details and try again."
            );
        }
    };

    return (
        <div id="container-register">
            <div className="register">
                <h1>Register</h1>
                <div className="line"></div>

                <TextField
                    variant="standard"
                    onChange={(e) => setName(e.target.value)}
                    label="Enter your name"
                />

                <TextField
                    variant="standard"
                    onChange={(e) => setEmail(e.target.value)}
                    label="Enter your email"
                />

                <TextField
                    type="password"
                    variant="standard"
                    onChange={(e) => setPassword(e.target.value)}
                    label="Enter your Password"
                />

                <Button variant="contained" onClick={handleRegister}>
                    Register
                </Button>

                <p id="dont-have-acc">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </div>

            <div className="photo">
                <h1>Get Watching</h1>
                <div className="line-photo"></div>
                <h1>We've Got the Picks</h1>
            </div>

            <ToastContainer />
        </div>
    );
};

export default Register;
