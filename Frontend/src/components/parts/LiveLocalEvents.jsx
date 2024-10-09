import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { eventss } from "../../utils/constants";
import { toast } from "react-toastify"; // Assuming you're using react-toastify for notifications

const LiveLocalEvents = () => {
    const [city, setCity] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [events, setEvents] = useState("");
    
    const token = localStorage.getItem("jwt"); // Ensure you have the token stored in local storage

    const fetchEvents = async () => {
        const eventsData = {
            destination: city,
            startDate: fromDate,
            endDate: toDate,
        };

        try {
            const response = await apiClient.post(eventss, eventsData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            console.log(response);
            if (response.status === 200) {
                setEvents(response.data); // Assuming response.data is a string
            } else {
                toast.error("Failed to fetch events! Please try again.");
            }
        } catch (error) {
            console.log("Error during fetching events:", error);
            toast.error("Event fetch failed!");
        }
    };

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
            <h2 className="text-4xl font-bold mb-6 text-center text-blue-400">Live Local Events</h2>
            <p className="text-gray-400 mb-6 text-center">Find and join events happening near you.</p>

            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl mb-4">
                <div className="mb-4">
                    <label htmlFor="city" className="block text-sm font-medium text-gray-400 mb-2">City</label>
                    <input
                        type="text"
                        id="city"
                        placeholder="Enter your city"
                        className="w-full p-3 rounded-md bg-[#2b2b2b] text-white placeholder-gray-500"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>

                {/* Date range inputs */}
                <div className="flex gap-4 mb-4">
                    <div className="w-1/2">
                        <label htmlFor="from-date" className="block text-sm font-medium text-gray-400 mb-2">From Date</label>
                        <input
                            type="date"
                            id="from-date"
                            className="w-full p-3 rounded-md bg-[#2b2b2b] text-white"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        />
                    </div>
                    <div className="w-1/2">
                        <label htmlFor="to-date" className="block text-sm font-medium text-gray-400 mb-2">To Date</label>
                        <input
                            type="date"
                            id="to-date"
                            className="w-full p-3 rounded-md bg-[#2b2b2b] text-white"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        />
                    </div>
                </div>

                {/* Fetch events button */}
                <button
                    onClick={fetchEvents}
                    className="bg-white text-black py-2 px-4 rounded-lg hover:bg-blue-600 transition mb-6"
                >
                    Get Live Events
                </button>
            </div>

            {/* Display events as a string */}
            {events && (
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                    <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                    <pre className="whitespace-pre-wrap text-gray-300 text-lg leading-relaxed">{events}</pre>
                </div>
            )}
        </div>
    );
};

export default LiveLocalEvents;
