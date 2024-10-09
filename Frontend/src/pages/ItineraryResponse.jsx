import React from 'react';
import { useLocation } from 'react-router-dom';

const ItineraryResponse = () => {
    const location = useLocation();
    const itineraryString =localStorage.getItem("i")

    return (
        <div className="p-6 bg-gray-900 text-white min-h-screen flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">Itinerary</h1>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <pre className="whitespace-pre-wrap text-gray-300 text-lg leading-relaxed">{itineraryString}</pre>
            </div>
        </div>
    );
};

export default ItineraryResponse;
