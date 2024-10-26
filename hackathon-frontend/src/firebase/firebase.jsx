import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDXwVTts12mgLkwHs0aYalp0yK1A3eJwjc",
    authDomain: "la-ce-ma-uit.firebaseapp.com",
    projectId: "la-ce-ma-uit",
    storageBucket: "la-ce-ma-uit.appspot.com",
    messagingSenderId: "654117465731",
    appId: "1:654117465731:web:36856b7c5dfedca2aa75b6",
    measurementId: "G-85ZKTYFGEK",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
