import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const ChatRoom = () => {
  const [roomId, setRoomId] = useState('3'); // Default roomId
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const token =localStorage.getItem('jwt')
  const user=localStorage.getItem("username")
  // Function to send a message
  const sendMessage = async () => {
    if (messageInput.trim() === '') {
      alert('Message cannot be empty!');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/chat.SendMessage/${roomId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sender: user, // Hardcoded sender name for demonstration
          msg: messageInput,
          chatRoomId: roomId,
          location:localStorage.getItem("homeTown")
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setMessageInput(''); // Clear the input after sending
      toast.success('Message sent successfully!');
    } catch (error) {
      console.error(error);
      toast.error('Error sending message');
    }
  };

  // Function to fetch messages from the server
  const fetchMessages = async () => {
    try {
      const response = await fetch(`http://localhost:8080/chats/${roomId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }
      const newMessages = await response.json();
      setMessages(newMessages);
    } catch (error) {
      console.error(error);
      toast.error('Error fetching messages');
    }
  };

  // Effect to poll for new messages
  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, 5000); // Check every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [roomId]); // Dependency on roomId

  return (
    <div className="p-6 bg-[#151518] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">WebSocket Chat Test</h1>

      <div className="mb-4">
        <label htmlFor="chatRoom" className="mr-2">Chat Room ID:</label>
        <input
          type="text"
          id="chatRoom"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          className="p-2 rounded-lg bg-[#202123] text-white"
        />
        <button onClick={fetchMessages} className="ml-2 p-2 bg-blue-600 text-white rounded-lg">
          Fetch Messages
        </button>
      </div>

      <div className="mb-4">
        <label htmlFor="message" className="mr-2">Message:</label>
        <input
          type="text"
          id="message"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="p-2 rounded-lg bg-[#202123] text-white"
        />
        <button onClick={sendMessage} className="ml-2 p-2 bg-blue-600 text-white rounded-lg">
          Send Message
        </button>
      </div>

      <div id="messages" className="mt-4">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <p key={index}>{message.sender}: {message.msg}</p>
          ))
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;
