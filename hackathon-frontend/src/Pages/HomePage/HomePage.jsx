import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import EventCard from "../../Components/EventCard/EventCard";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

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
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleDeleteEvent = async (eventID) => {
        try {
            await deleteDoc(doc(db, "Events", eventID));
            setEvents((prevEvents) =>
                prevEvents.filter((event) => event.eventID !== eventID)
            );
        } catch (error) {
            console.error("Error deleting event:", error);
        }
    };

    return (
        <div>
            <NavBar />
            {loading ? (
                <p>Loading events...</p>
            ) : events.length > 0 ? (
                events.map((event) => (
                    <EventCard
                        key={event.eventID}
                        event={event}
                        handleDelete={handleDeleteEvent}
                    />
                ))
            ) : (
                <p>No events found.</p>
            )}
        </div>
    );
};

export default HomePage;
