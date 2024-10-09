import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const ChatRoom = () => {
  const roomIdd=localStorage.getItem('roomId')
  const [roomId, setRoomId] = useState(roomIdd);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const token = localStorage.getItem('jwt');
  const user = localStorage.getItem("username");
  const location = localStorage.getItem("homeTown");

  // Function to send a message
  const sendMessage = async () => {
    if (messageInput.trim() === '') {
      alert('Message cannot be empty!');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:8080/chat.SendMessage/${roomId}`, {
        username: user,
        msg: messageInput,
        chat_id: roomId,
        location: location
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });

      const newMessage = response.data;
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setMessageInput('');
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error sending message');
    }
  };

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/chats/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // No need for islocal variable here, we'll handle it within the render logic
      setMessages(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching messages');
    }
  };

  // Effect to poll for new messages
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 500);

    return () => clearInterval(interval);
  }, [roomId]);

  return (
    <div className="flex flex-col h-screen p-6 bg-[#151518] text-white">
      <h1 className="text-3xl font-bold mb-6">Start Chating!!</h1>

      <div className="flex-1 overflow-y-auto mb-4">
        <div id="messages" className="space-y-2">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${message.local ? 'bg-green-700' : 'bg-blue-800'} text-white`}
              >
                <strong className={message.local ? 'text-black' : 'text-gray-200'}>
                  {message.username}:
                </strong> {message.msg}
              </div>
            ))
          ) : (
            <p className="text-gray-400">No messages yet.</p>
          )}
        </div>
      </div>

      {/* <div className="mb-4">
        <label htmlFor="chatRoom" className="mr-2">Chat Room ID:</label>
        <input
          type="number"
          id="chatRoom"
          value={roomId}
          onChange={(e) => setRoomId(parseInt(e.target.value, 10))}
          className="p-2 rounded-lg bg-[#202123] text-white"
        />
        <button onClick={fetchMessages} className="ml-2 p-2 bg-blue-600 text-white rounded-lg">
          Fetch Messages
        </button>
      </div> */}

      <div className="mb-4">
        <label htmlFor="message" className="mr-2">Message:</label>
        <input
          type="text"
          id="message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="p-2 rounded-lg bg-[#202123] text-white w-[75%]"
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-600 text-white rounded-lg">
          Send Message
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
