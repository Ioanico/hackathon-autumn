import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./NavBar.css";
import { Button, Icon } from "@mui/material";
import CreateEventModal from "../CreateEventModal/CreateEventModal";
import AddContributionModal from "../AddContributionModal/AddContriButionModal";

export default function NavBar() {
    const [auth, setAuth] = useState(getAuth());
    const [userDetails, setUserDetails] = useState(null);
    const [isCreateEventOpen, setCreateEventOpen] = useState(false);
    const [isAddContributionOpen, setAddContributionOpen] = useState(false);
    const [selectedEventID, setSelectedEventID] = useState(null);

    useEffect(() => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // console.log(auth);
                // console.log("User:", user);
                const docRef = doc(db, "Users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap) {
                    setUserDetails(docSnap.data());
                    console.log(docSnap.data());
                } else {
                    console.log("No such document!");
                }
            } else {
                console.log("User not logged in");
            }
        });
    }, []);

    return (
        <div className="nav-bar">
            <Box
                sx={{ flexGrow: 1 }}
                container={document.getElementById("nav-bar")}
            >
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
                            Photos
                        </Typography>

                        <Button
                            variant="contained"
                            onClick={() => setCreateEventOpen(true)}
                        >
                            Add Event
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => {
                                setAddContributionOpen(true);
                            }}
                        >
                            Add Contribution
                        </Button>
                        <AddContributionModal
                            open={isAddContributionOpen}
                            onClose={() => setAddContributionOpen(false)}
                            eventID={selectedEventID}
                        />

                        <CreateEventModal
                            open={isCreateEventOpen}
                            onClose={() => setCreateEventOpen(false)}
                        ></CreateEventModal>

                        {userDetails ? (
                            <>
                                <h1>Welcome {userDetails.name}</h1>
                                <IconButton>
                                    <AccountCircle />
                                </IconButton>
                            </>
                        ) : (
                            <></>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}
