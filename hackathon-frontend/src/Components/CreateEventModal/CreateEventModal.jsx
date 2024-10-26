import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import { db } from "../../firebase/firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import DeleteIcon from "@mui/icons-material/Delete";

const CreateEventModal = ({ open, onClose, onCreateEvent }) => {
    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("");
    const [budget, setBudget] = useState("");
    const [contributionItem, setContributionItem] = useState("");
    const [contributorName, setContributorName] = useState("");
    const [contributions, setContributions] = useState([]);

    const handleAddContribution = () => {
        if (contributionItem && contributorName) {
            setContributions((prev) => [
                ...prev,
                { item: contributionItem, contributor: contributorName },
            ]);
            setContributionItem("");
            setContributorName("");
        }
    };

    const handleRemoveContribution = (index) => {
        setContributions((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCreateEvent = async () => {
        const eventID = uuidv4();
        try {
            await setDoc(doc(db, "Events", eventID), {
                eventID,
                title,
                date,
                location,
                budget: Number(budget),
                contributions,
            });
            onCreateEvent(eventID);
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

                <TextField
                    label="Contribution Item"
                    fullWidth
                    margin="normal"
                    value={contributionItem}
                    onChange={(e) => setContributionItem(e.target.value)}
                />
                <TextField
                    label="Contributor's Name"
                    fullWidth
                    margin="normal"
                    value={contributorName}
                    onChange={(e) => setContributorName(e.target.value)}
                />
                <Button onClick={handleAddContribution}>
                    Add Contribution
                </Button>

                <List>
                    {contributions.map((contribution, index) => (
                        <ListItem key={index}>
                            <ListItemText
                                primary={`${contribution.contributor}: ${contribution.item}`}
                            />
                            <IconButton
                                onClick={() => handleRemoveContribution(index)}
                            >
                                <DeleteIcon />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>
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
