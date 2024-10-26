// backend/server.js
import express from "express";
const app = express();
const PORT = 3000; // or any port you like

// Middleware to parse JSON
app.use(express.json());

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
