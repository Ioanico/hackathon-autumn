import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Button from "@mui/material/Button";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import "./NavBar.css";

export default function NavBar() {
    const [userDetails, setUserDetails] = useState(null);
    const [isCreateEventOpen, setCreateEventOpen] = useState(false);
    const [isAddContributionOpen, setAddContributionOpen] = useState(false);
    const [selectedEventID, setSelectedEventID] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserDetails(docSnap.data());
                } else {
                    console.log("No such user document!");
                }
            } else {
                setUserDetails(null);
            }
        });
        return () => unsubscribe();
    }, []);

    const handleCreateEvent = (eventID) => {
        setSelectedEventID(eventID);
        setCreateEventOpen(false);
    };

    return (
        <div className="nav-bar">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="fixed">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{ flexGrow: 1 }}
                        >
                            Event Manager
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => setCreateEventOpen(true)}
                        >
                            Add Event
                        </Button>

                        <CreateEventModal
                            open={isCreateEventOpen}
                            onClose={() => setCreateEventOpen(false)}
                            onCreateEvent={handleCreateEvent}
                        />

                        {userDetails ? (
                            <>
                                <Typography
                                    variant="body1"
                                    sx={{ marginRight: 2 }}
                                >
                                    Welcome, {userDetails.name}
                                </Typography>
                                <IconButton color="inherit">
                                    <AccountCircle />
                                </IconButton>
                            </>
                        ) : (
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                Welcome, Guest
                            </Typography>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
