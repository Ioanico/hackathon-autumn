import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import EventCard from "../../Components/EventCard/EventCard";
import { db } from "../../firebase/firebase";
import { collection, onSnapshot } from "firebase/firestore";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use Firestore's onSnapshot to get real-time updates
        const unsubscribe = onSnapshot(
            collection(db, "Events"),
            (snapshot) => {
                const eventsData = snapshot.docs.map((doc) => ({
                    eventID: doc.id,
                    ...doc.data(),
                }));

                setEvents(eventsData);
                setLoading(false); // Stop loading after initial data is fetched
            },
            (error) => {
                console.error("Error fetching events: ", error);
                setLoading(false);
            }
        );

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return (
        <div>
            <NavBar />
            {loading ? (
                <p>Loading events...</p>
            ) : events.length > 0 ? (
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
