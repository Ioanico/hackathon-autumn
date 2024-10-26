import React from "react";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import "./EventCard.css";

const EventCard = ({ event, handleDelete }) => {
    if (!event) {
        console.error("Event prop is undefined");
        return null;
    }

    return (
        <div id="event-card">
            <Card
                sx={{ margin: 2 }}
                container={document.getElementById("event-card")}
            >
                <CardContent>
                    <Typography variant="h5">{event.title}</Typography>
                    <Typography variant="body1">Date: {event.date}</Typography>
                    <Typography variant="body1">
                        Location: {event.location}
                    </Typography>
                    <Typography variant="body1">
                        Budget: {event.budget} Lei
                    </Typography>

                    <Typography variant="h6">Contributions</Typography>
                    <List>
                        {event.contributions.map((contribution, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={contribution.item}
                                    secondary={`Contributed by: ${contribution.contributor}`}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <IconButton
                        onClick={() => handleDelete(event.eventID)}
                        color="error"
                        aria-label="delete"
                    >
                        <DeleteIcon />
                    </IconButton>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventCard;
