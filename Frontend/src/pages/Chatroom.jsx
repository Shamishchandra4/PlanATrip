import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiClient } from '../lib/api-client';

let stompClient = null;

const ChatRoom = () => {
  const roomId = useParams().roomId; 
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');

  useEffect(() => {
    const fetchOldMessages = async () => {
      try {
        const response = await apiClient.get(`/chats/${roomId}`, {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('jwt')
          }
        });
        setMessages(response.data); 
      } catch (error) {
        console.error("Error fetching old messages:", error);
        toast.error("Failed to load old messages.");
      }
    };

    const connectToWebSocket = () => {
      const socket = new SockJS('/ws');
      stompClient = Stomp.over(socket);

      stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame);

        stompClient.subscribe(`/topic/public/${roomId}`, (messageOutput) => {
          const newMessage = JSON.parse(messageOutput.body);
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        });

        toast.success(`Connected to room: ${roomId}`);
      }, (error) => {
        console.error('Error connecting to WebSocket:', error);
        toast.error('Failed to connect to chat room.');
      });
    };

    fetchOldMessages(); 
    connectToWebSocket();

    return () => {
      if (stompClient) {
        stompClient.disconnect();
      }
    };
  }, [roomId]);

  const handleSendMessage = async () => {
    if (messageInput.trim() === '') return;

    const message = {
      chat_id: parseInt(roomId, 10), // Assuming roomId matches the chat_id
      username: localStorage.getItem('username'), // Assuming username is stored in local storage
      msg: messageInput,
      location: localStorage.getItem('homeTown'),
      isLocal:false // Add a location if needed, or adjust as per your logic
    };

    stompClient.send(`/chat.SendMessage`, {}, JSON.stringify(message));
    setMessageInput(''); // Clear the input after sending
  };

  return (
    <div className="p-6 bg-[#151518] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-6">Chat Room: {roomId}</h1>

      <div className="mb-6">
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <div key={index} className="bg-[#202123] p-3 rounded-lg mb-2">
              <strong>{message.username}: </strong>{message.msg}
            </div>
          ))
        ) : (
          <p className="text-gray-400">No messages yet.</p>
        )}
      </div>

      <div className="flex">
        <input
          type="text"
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          className="flex-1 p-2 rounded-lg bg-[#202123] text-white"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 p-2 bg-blue-600 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
