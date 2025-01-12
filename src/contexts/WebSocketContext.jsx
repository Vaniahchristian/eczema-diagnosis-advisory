import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';

export const WebSocketContext = createContext(null);

// Mock WebSocket implementation for demo purposes
class MockWebSocket {
  constructor(url) {
    this.url = url;
    this.onmessage = null;
    this.onopen = null;
    this.onclose = null;
    this.onerror = null;
    this.readyState = 0; // CONNECTING

    // Simulate connection delay
    setTimeout(() => {
      this.readyState = 1; // OPEN
      if (this.onopen) {
        this.onopen({ type: 'open' });
      }
    }, 100);
  }

  send(data) {
    // Simulate message echo for demo purposes
    setTimeout(() => {
      if (this.onmessage) {
        this.onmessage({ data });
      }
    }, 100);
  }

  close() {
    this.readyState = 3; // CLOSED
    if (this.onclose) {
      this.onclose({ type: 'close' });
    }
  }
}

export const WebSocketProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState({});

  useEffect(() => {
    if (user) {
      // In a real application, replace 'MockWebSocket' with actual WebSocket
      const ws = new MockWebSocket('wss://api.example.com/ws');

      ws.onopen = () => {
        console.log('WebSocket connected');
        setConnected(true);
        
        // Send authentication message
        ws.send(JSON.stringify({
          type: 'auth',
          token: user.token,
        }));
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          handleWebSocketMessage(data);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };

      ws.onclose = () => {
        console.log('WebSocket disconnected');
        setConnected(false);
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setSocket(ws);

      return () => {
        ws.close();
      };
    }
  }, [user]);

  const handleWebSocketMessage = (data) => {
    switch (data.type) {
      case 'notification':
        setNotifications(prev => [data.notification, ...prev]);
        break;
      
      case 'message':
        setMessages(prev => ({
          ...prev,
          [data.conversationId]: [
            ...(prev[data.conversationId] || []),
            data.message,
          ],
        }));
        break;
      
      case 'appointment_update':
        // Handle appointment updates
        break;
      
      case 'patient_update':
        // Handle patient updates
        break;
      
      default:
        console.log('Unknown message type:', data.type);
    }
  };

  const sendMessage = (conversationId, content, fileData = null) => {
    if (socket && socket.readyState === 1) {
      const messageData = {
        type: 'message',
        conversationId,
        message: {
          id: Date.now(),
          sender: user.id,
          content,
          timestamp: new Date(),
          delivered: false,
          read: false,
          ...(fileData && { type: 'file', ...fileData }),
        },
      };
      
      socket.send(JSON.stringify(messageData));

      // Simulate message delivery after 1 second
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [conversationId]: prev[conversationId].map(msg =>
            msg.id === messageData.message.id
              ? { ...msg, delivered: true }
              : msg
          ),
        }));

        // Simulate message being read after 3 seconds
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [conversationId]: prev[conversationId].map(msg =>
              msg.id === messageData.message.id
                ? { ...msg, read: true }
                : msg
            ),
          }));
        }, 2000);
      }, 1000);
    }
  };

  const markNotificationAsRead = (notificationId) => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({
        type: 'mark_notification_read',
        notificationId,
      }));

      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  };

  const clearNotifications = () => {
    if (socket && socket.readyState === 1) {
      socket.send(JSON.stringify({
        type: 'clear_notifications',
      }));

      setNotifications([]);
    }
  };

  // Demo function to simulate receiving notifications
  const simulateNotification = (type) => {
    const notification = {
      id: Date.now(),
      type,
      message: `Demo ${type} notification`,
      timestamp: new Date(),
      read: false,
    };

    handleWebSocketMessage({
      type: 'notification',
      notification,
    });
  };

  // Demo function to simulate receiving messages
  const simulateMessage = (conversationId, content) => {
    const message = {
      id: Date.now(),
      sender: 'patient',
      content,
      timestamp: new Date(),
    };

    handleWebSocketMessage({
      type: 'message',
      conversationId,
      message,
    });
  };

  const value = {
    connected,
    notifications,
    messages,
    sendMessage,
    markNotificationAsRead,
    clearNotifications,
    // Demo functions
    simulateNotification,
    simulateMessage,
  };

  return (
    <WebSocketContext.Provider value={value}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
};
