import { NotificationContext } from '@/hooks/useNotifications';
import React, { useState, useEffect, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  userId?: string;
  metadata?: Record<string, any>;
}

const BACKEND_URL = 'http://localhost:3000';
const TEST_USER_ID = 'user-123'; // Replace with actual user ID from auth

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Initialize socket connection
    const socketInstance = io(BACKEND_URL, {
      withCredentials: true,
      transports: ['websocket'],
    });

    socketInstance.on('connect', () => {
      console.log('✅ Connected to Socket.IO');
      socketInstance.emit('register', TEST_USER_ID);
    });

    // Listen for notifications
    socketInstance.on('notification', (data: Notification) => {
      console.log('🔔 Notification received:', data);

      setNotifications((prev) => [data, ...prev]);

      // Optional: Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(data.title, {
          body: data.message,
          icon: '/notification-icon.png',
        });
      }
    });

    socketInstance.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO');
    });

    setSocket(socketInstance);

    // Request browser notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  }, []);

  const clearNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        clearNotification,
        clearAllNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}
