import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
} from "@mui/material";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const CreateEventModal = ({ open, onClose }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");

    const handleCreateEvent = async () => {
        const eventID = uuidv4();
        try {
            await setDoc(doc(db, "Events", eventID), {
                eventID,
                title,
                date,
                location,
                budget: Number(budget),
            });
            onClose();
        } catch (error) {
            console.error("Error creating event:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Create New Event</DialogTitle>
            <DialogContent>
                <TextField
                    label="Event Title"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    label="Date"
                    type="date"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setDate(e.target.value)}
                />
                <TextField
                    label="Location"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setLocation(e.target.value)}
                />
                <TextField
                    label="Budget"
                    type="number"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setBudget(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleCreateEvent} variant="contained">
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEventModal;
