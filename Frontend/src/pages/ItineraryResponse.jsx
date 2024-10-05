import React from 'react';
import { useLocation } from 'react-router-dom';

const ItineraryResponse = () => {
    const location = useLocation();
    const itineraryData = location.state?.itinerary || {
        title: "4-Day Goa Trip from Hyderabad",
        budget: 10000,
        days: [
            {
                title: "Arrival & Panjim Exploration",
                activities: [
                    { time: "Morning", description: "Fly from Hyderabad to Goa", cost: 2500 },
                    { time: "Afternoon", description: "Check into a budget-friendly guesthouse/hostel", cost: 500 },
                    { time: "Evening", description: "Explore Panjim", cost: null },
                    { time: "Night", description: "Dinner at a budget-friendly eatery", cost: 300 },
                ],
            },
            {
                title: "North Goa Beach Bliss",
                activities: [
                    { time: "Morning", description: "Take a local bus to Baga Beach", cost: 100 },
                    { time: "Afternoon", description: "Relax on the beach and try water sports", cost: null },
                    { time: "Evening", description: "Dinner at a beachside shack", cost: 300 },
                ],
            },
            {
                title: "South Goa Serenity",
                activities: [
                    { time: "Morning", description: "Take a bus to Palolem Beach", cost: 150 },
                    { time: "Afternoon", description: "Relax on the beach", cost: null },
                    { time: "Evening", description: "Local street food at Palolem", cost: 150 },
                ],
            },
            {
                title: "Exploring Old Goa & Departure",
                activities: [
                    { time: "Morning", description: "Visit Old Goa", cost: null },
                    { time: "Afternoon", description: "Shop for souvenirs at Mapusa Market", cost: null },
                    { time: "Evening", description: "Enjoy your last Goan meal", cost: 300 },
                ],
            },
        ],
    };

    if (!itineraryData) {
        return <div className="text-red-400 text-center">No itinerary data available.</div>;
    }

    return (
        <div className="p-6 bg-[#121212] text-white min-h-screen flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-6 text-center">{itineraryData.title}</h1>
            <h2 className="text-xl font-semibold mb-4 text-center">Budget: ₹{itineraryData.budget}</h2>

            {itineraryData.days.map((day, index) => (
                <div key={index} className="mb-8 bg-[#292929] p-4 rounded-lg shadow-lg w-full max-w-2xl">
                    <h3 className="text-2xl font-bold text-blue-300 text-center">Day {index + 1}: {day.title}</h3>
                    <ul className="list-disc pl-6 mt-2">
                        {day.activities.map((activity, actIndex) => (
                            <li key={actIndex} className="mb-2 text-gray-300">
                                <strong>{activity.time}:</strong> {activity.description} 
                                {activity.cost && <span className="text-green-300 pl-4"> - ₹{activity.cost}</span>}
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
    );
};

export default ItineraryResponse;