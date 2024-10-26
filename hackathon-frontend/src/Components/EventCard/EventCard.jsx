import React from "react";
import {
    Card,
    CardContent,
    Typography,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import "./EventCard.css";

const EventCard = ({ event }) => {
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
                        Budget: ${event.budget}
                    </Typography>
                    <Typography variant="h6">Contributions</Typography>
                    <List>
                        {event.contributions.map((contribution, index) => (
                            <ListItem key={index}>
                                <ListItemText
                                    primary={contribution.item}
                                    secondary={`Assigned to: ${
                                        contribution.assignedTo
                                    } - ${
                                        contribution.status
                                            ? "Complete"
                                            : "Pending"
                                    }`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </CardContent>
            </Card>
        </div>
    );
};

export default EventCard;
