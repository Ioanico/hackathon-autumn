import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogInPage from "./Pages/LogInPage/LogInPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import { Route, Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LogInPage />} />
                    <Route path="/login" element={<LogInPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/home" element={<HomePage />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
