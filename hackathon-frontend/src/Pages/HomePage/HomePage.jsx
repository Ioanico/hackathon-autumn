import React, { useEffect, useState } from "react";
import NavBar from "../../Components/NavBar/NavBar";
import EventCard from "../../Components/EventCard/EventCard";
import CreateEventModal from "../../Components/CreateEventModal/CreateEventModal";
import { db } from "../../firebase/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import "./Homepage.css";

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isCreateEventOpen, setIsCreateEventOpen] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Events"));
                const eventsData = querySnapshot.docs.map((doc) => ({
                    eventID: doc.id,
                    ...doc.data(),
                }));

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

    const addEvent = (newEvent) => {
        setEvents((prevEvents) => [...prevEvents, newEvent]);
    };

    return (
        <div>
            <NavBar />
            <button onClick={() => setIsCreateEventOpen(true)}>
                Create Event
            </button>
            <CreateEventModal
                open={isCreateEventOpen}
                onClose={() => setIsCreateEventOpen(false)}
                addEvent={addEvent}
            />
            {loading ? (
                <p>Loading events...</p>
            ) : (
                <div className="cards-container">
                    {events.length > 0 ? (
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
            )}
        </div>
    );
};

export default HomePage;
