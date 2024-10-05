import { useState } from "react";

const LiveLocalEvents = () => {
  const [city, setCity] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [events, setEvents] = useState([]);

  const fetchEvents = () => {
    const dummyEvents = [
      {
        title: "Beach Cleanup Drive",
        description: "Join us in cleaning the beaches of Goa!",
        location: "Goa Beach",
        date: "2024-10-15",
      },
      {
        title: "Music Fest 2024",
        description: "A two-day festival with the best indie artists from across the country.",
        location: "Hyderabad Stadium",
        date: "2024-10-18",
      },
      {
        title: "Food Fiesta",
        description: "Savor local delicacies from all over Hyderabad.",
        location: "Nehru Park, Hyderabad",
        date: "2024-10-20",
      },
    ];

    // Set the fetched events (this simulates an AI assistant response)
    setEvents(dummyEvents);
  };

  return (
    <div className="bg-[#1f1f1f] p-6 rounded-lg text-white">
      <h2 className="text-xl font-semibold mb-4">Live Local Events</h2>
      <p className="text-gray-400 mb-6">Find and join events happening near you.</p>

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

      {/* Display event cards */}
      {events.length > 0 && (
        <div className="space-y-4">
          {events.map((event, index) => (
            <div key={index} className="bg-[#2b2b2b] p-4 rounded-md flex flex-col md:flex-row md:justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{event.title}</h3>
                <p className="text-gray-400 mb-2">{event.description}</p>
                <p className="text-gray-500">
                  <strong>Location: </strong>{event.location}
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <p className="text-gray-500">
                  <strong>Date: </strong>{event.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveLocalEvents;
