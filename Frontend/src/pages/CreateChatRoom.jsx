import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateChatRoom = () => {
  const navigate=useNavigate()
  const [chatroomTitle, setChatroomTitle] = useState('');
  const [chatroomDesc, setChatroomDesc] = useState(''); 
  const [roomDestination, setRoomDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const username = localStorage.getItem('username');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/create-chat', { username:username, chatroomTitle:chatroomTitle, chatroomDesc:chatroomDesc, location: roomDestination }, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('jwt')
        }
      });
      setMessage(`Chat room "${chatroomTitle}" with destination "${roomDestination}" created successfully by "${username}"!`);
      navigate("/explore-chat-rooms")
    } catch (error) {
      setMessage('Error creating chat room. Please try again.');
    } finally {
      setLoading(false);
      setChatroomTitle('');
      setChatroomDesc(''); 
      setRoomDestination('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="p-8 bg-gray-800 rounded-lg shadow-lg w-80">
        <h2 className="text-3xl font-bold text-center mb-6">Create Chat Room</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="chatroomTitle" className="block text-sm font-medium">
              Chat Room Name
            </label>
            <input
              placeholder="Chat Room Name"
              type="text"
              id="chatroomTitle"
              className="w-full p-2 mt-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              value={chatroomTitle}
              onChange={(e) => setChatroomTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="chatroomDesc" className="block text-sm font-medium">
              Chat Room Description
            </label>
            <input
              placeholder="Chat Room Description"
              type="text"
              id="chatroomDesc"
              className="w-full p-2 mt-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              value={chatroomDesc}
              onChange={(e) => setChatroomDesc(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="roomDestination" className="block text-sm font-medium">
              Chat Room Destination
            </label>
            <input
              placeholder="Chat Room Destination"
              type="text"
              id="roomDestination"
              className="w-full p-2 mt-2 bg-gray-700 border border-gray-600 rounded-lg text-white"
              value={roomDestination}
              onChange={(e) => setRoomDestination(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full p-2 mt-4 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Room'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
      </div>
    </div>
  );
};

export default CreateChatRoom;
