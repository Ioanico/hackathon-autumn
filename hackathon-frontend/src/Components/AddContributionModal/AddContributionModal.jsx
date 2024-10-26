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

const AddContributionModal = ({ open, onClose, eventID }) => {
    const [item, setItem] = useState("");
    const [assignedTo, setAssignedTo] = useState("");

    const handleAddContribution = async () => {
        const contributionID = uuidv4();
        try {
            await setDoc(doc(db, "Contributions", contributionID), {
                contributionID,
                eventID,
                item,
                assignedTo,
                status: false,
            });
            onClose();
        } catch (error) {
            console.error("Error adding contribution:", error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Add Contribution</DialogTitle>
            <DialogContent>
                <TextField
                    label="Item"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setItem(e.target.value)}
                />
                <TextField
                    label="Assigned To (User ID or Name)"
                    fullWidth
                    margin="normal"
                    onChange={(e) => setAssignedTo(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={handleAddContribution} variant="contained">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AddContributionModal;
