import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

export const useStompClient = (roomId, onMessageReceived) => {
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Initialize the STOMP client
    const stompClient = new Client({
      brokerURL: 'ws://your-websocket-url', // Replace with your WebSocket URL
      reconnectDelay: 5000, // Try reconnecting after 5 seconds if the connection is lost
      onConnect: () => {
        console.log('Connected to WebSocket server');

        // Subscribe to a chat room based on roomId
        stompClient.subscribe(`/chat-room/${roomId}`, (message) => {
          if (message.body) {
            onMessageReceived(message.body); // Pass the message to the callback
          }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket server');
      },
    });

    // Activate the client
    stompClient.activate();
    setClient(stompClient);

    // Clean up when the component is unmounted
    return () => {
      if (stompClient) {
        stompClient.deactivate();
      }
    };
  }, [roomId, onMessageReceived]);

  return client;
};
