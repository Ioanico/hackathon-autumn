import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import EventCard from "../../Components/EventCard/EventCard";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Events"));
                const eventsData = querySnapshot.docs.map((doc) => ({
                    eventID: doc.id,
                    ...doc.data(),
                }));

                console.log("Fetched Events:", eventsData);
                setEvents(eventsData);
            } catch (error) {
                console.error("Error fetching events: ", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <NavBar />
            {events.length > 0 ? (
                events.map((event) => (
                    <EventCard key={event.eventID} event={event} />
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default HomePage;
