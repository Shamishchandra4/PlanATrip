import React, { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ExploreChatRooms = () => {
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt')
  const [chatRooms, setChatRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // const fetchChatRooms = async () => {
    //   try {
    //     const response = await apiClient.get('/all-chats', {
    //       headers: {
    //         Authorization: 'Bearer ' + localStorage.getItem('jwt')
    //       }
    //     }
    //     );
    //     setChatRooms(response.data);
    //   } catch (error) {
    //     console.error('Error fetching chat rooms:', error);
    //     toast.error('Failed to load chat rooms.');
    //   }
    // };
    const fetchChatRooms = async () => {
      try {
        const token = localStorage.getItem('jwt');
        const response = await apiClient.get('/all-chats', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setChatRooms(response.data);
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        toast.error('Failed to load chat rooms.');
      }
    };
    
    fetchChatRooms();
  }, []);

  // Function to handle joining a chat room
  const handleJoinRoom = (roomId) => {
    localStorage.setItem("roomId", roomId)
    // Navigate to the dynamic chat room page with the roomId
    navigate(`/chat-room`);
  };

  const filteredChatRooms = chatRooms.filter(room =>
    room.chatroomTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 bg-[#000000] min-h-screen text-white">
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
            <div key={room.chatId} className="bg-[#626469] p-4 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">{room.chatroomTitle}</h2>
              <p className="text-gray-100 mb-4">{room.chatroomDesc}</p>
              <button
                className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-400 transition"
                onClick={() => handleJoinRoom(room.chatId)}
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
