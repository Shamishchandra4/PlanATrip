import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client'; // Assuming the apiClient is set up to make API requests
import { toast } from 'react-toastify'; // Assuming you are using 'react-toastify' for notifications
import { useNavigate } from 'react-router-dom';

const ExploreChatRooms = () => {
  const navigate = useNavigate();
  const [chatRooms, setChatRooms] = useState([
    // Simulated data (for development purposes)
    { id: 1, name: 'Goa Travel Enthusiasts', description: 'Discuss your trips to Goa' },
    { id: 2, name: 'Kerala Beach Lovers', description: 'All about beaches and relaxing vacations' },
    { id: 3, name: 'Himachal Adventure Seekers', description: 'Connect with thrill-seekers' },
    { id: 4, name: 'Banglore City Life Explorers', description: 'Explore the best of city life' },
    { id: 5, name: 'Hyderabad Foodies Unite', description: 'Chat about the best cuisines and food places' },
  ]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await apiClient.get('/chat-rooms');
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        toast.error("Failed to load chat rooms."); // Toast notification for error
      }
    };

    fetchChatRooms();
  }, []);

  // Function to handle joining a chat room
  const handleJoinRoom = (roomId) => {
    // Navigate to the dynamic chat room page with the roomId
    navigate(`/chat-room/${roomId}`);
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#151518] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6 poppins-semibold">Explore Chat Rooms</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search for a chat room..."
          className="w-full p-3 bg-[#202123] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Chat Rooms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 poppins-semibold">
        {filteredChatRooms.length > 0 ? (
          filteredChatRooms.map(room => (
            <div key={room.id} className="bg-[#202123] p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{room.name}</h2>
              <p className="text-gray-400 mb-4">{room.description}</p>
              <button
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-400 transition"
                onClick={() => handleJoinRoom(room.id)}
              >
                Join Room
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No chat rooms found.</p>
        )}
      </div>
    </div>
  );
};

export default ExploreChatRooms;
