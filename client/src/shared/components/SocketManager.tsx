'use client';

import { useEffect } from 'react';
import { io } from 'socket.io-client';

const { VITE_BACKEND_URL } = import.meta.env;

// This must match the ID used in your backend setInterval simulation
const TEST_USER_ID = 'user-123';

export default function SocketManager() {
  useEffect(() => {
    // 1. Initialize connection
    const socket = io(VITE_BACKEND_URL, {
      withCredentials: true,
      transports: ['websocket'], // Force websocket to avoid polling issues
    });

    socket.on('connect', () => {
      console.log('✅ Frontend: Connected to Socket.IO');

      // 2. Register immediately so the backend adds us to the room
      socket.emit('register', TEST_USER_ID);
    });

    // 3. Listen for the event name we defined in the backend
    socket.on('notification', (data) => {
      console.log('🔔 NOTIFICATION RECEIVED:', data);

      // Optional: Browser Alert or Toast here
      alert(`New Notification: ${data.title}\n${data.message}`);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
      console.log('❌ Frontend: Disconnected');
    };
  }, []);

  return null; // This component handles logic only, no UI
}
