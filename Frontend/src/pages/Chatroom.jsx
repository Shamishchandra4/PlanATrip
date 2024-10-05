// import React, { useEffect, useState } from 'react';
// import SockJS from 'sockjs-client';
// import Stomp from 'stompjs';
// import { useParams } from 'react-router-dom';
// import { toast } from 'react-toastify';

// let stompClient = null;
// const ChatRoom = () => {
//   const { roomId } = useParams(); 
//   const [messages, setMessages] = useState([]);

//   useEffect(() => {
//     const connectToWebSocket = () => {
//       const socket = new SockJS('/ws'); 
//       stompClient = Stomp.over(socket);

//       stompClient.connect({}, (frame) => {
//         console.log('Connected: ' + frame);

//         stompClient.subscribe(`/topic/public/${roomId}`, (messageOutput) => {
//           const message = JSON.parse(messageOutput.body).msg;
//           setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         toast.success(`Connected to room: ${roomId}`);
//       }, (error) => {
//         console.error('Error connecting to WebSocket:', error);
//         toast.error('Failed to connect to chat room.');
//       });
//     };

//     connectToWebSocket();

//     return () => {
//       if (stompClient) {
//         stompClient.disconnect();
//       }
//     };
//   }, [roomId]);

//   return (
//     <div className="p-6 bg-[#151518] min-h-screen text-white">
//       <h1 className="text-3xl font-bold mb-6">Chat Room: {roomId}</h1>

//       {/* Display chat messages */}
//       <div className="mb-6">
//         {messages.length > 0 ? (
//           messages.map((message, index) => (
//             <div key={index} className="bg-[#202123] p-3 rounded-lg mb-2">
//               {message}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400">No messages yet.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ChatRoom;
// import React from 'react'

const Chatroom = () => {
  return (
    <div>
      hello
    </div>
  )
}

export default Chatroom
