import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { io } from 'socket.io-client';
import { format } from 'date-fns';
import { useAuth } from './AuthContext';

export const WebSocketContext = createContext(null);

// Constants
const SOCKET_URL = 'http://localhost:3001'; // Replace with your actual WebSocket server URL
const RECONNECTION_ATTEMPTS = 5;
const RECONNECTION_DELAY = 2000;

export const WebSocketProvider = ({ children }) => {
  const { user } = useAuth();
  const [socket, setSocket] = useState(null);
  const [connected, setConnected] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [messages, setMessages] = useState({});
  const [appointments, setAppointments] = useState([]);
  const [onlineDoctors, setOnlineDoctors] = useState([]);
  const [typing, setTyping] = useState({});

  // Initialize WebSocket connection
  useEffect(() => {
    if (user?.token) {
      const socketInstance = io(SOCKET_URL, {
        auth: {
          token: user.token,
        },
        reconnectionAttempts: RECONNECTION_ATTEMPTS,
        reconnectionDelay: RECONNECTION_DELAY,
        transports: ['websocket'],
      });

      socketInstance.on('connect', () => {
        console.log('WebSocket connected');
        setConnected(true);
        
        // Join user's room
        socketInstance.emit('join', {
          userId: user.id,
          role: user.role,
        });
      });

      socketInstance.on('disconnect', () => {
        console.log('WebSocket disconnected');
        setConnected(false);
      });

      // Handle incoming messages
      socketInstance.on('message', (data) => {
        handleIncomingMessage(data);
      });

      // Handle notifications
      socketInstance.on('notification', (data) => {
        handleNotification(data);
      });

      // Handle appointment updates
      socketInstance.on('appointment_update', (data) => {
        handleAppointmentUpdate(data);
      });

      // Handle online doctors
      socketInstance.on('online_doctors', (doctors) => {
        setOnlineDoctors(doctors);
      });

      // Handle typing indicators
      socketInstance.on('typing', (data) => {
        setTyping(prev => ({
          ...prev,
          [data.conversationId]: {
            isTyping: data.isTyping,
            user: data.user,
          },
        }));
      });

      setSocket(socketInstance);

      return () => {
        socketInstance.disconnect();
      };
    }
  }, [user]);

  // Message handling
  const handleIncomingMessage = useCallback((data) => {
    const { conversationId, message } = data;
    
    setMessages(prev => ({
      ...prev,
      [conversationId]: [
        ...(prev[conversationId] || []),
        {
          ...message,
          timestamp: new Date(message.timestamp),
        },
      ].sort((a, b) => a.timestamp - b.timestamp),
    }));

    // Mark message as delivered
    if (socket) {
      socket.emit('message_delivered', {
        messageId: message.id,
        conversationId,
      });
    }
  }, [socket]);

  // Notification handling
  const handleNotification = useCallback((notification) => {
    setNotifications(prev => [
      {
        ...notification,
        timestamp: new Date(notification.timestamp),
      },
      ...prev,
    ]);
  }, []);

  // Appointment handling
  const handleAppointmentUpdate = useCallback((data) => {
    setAppointments(prev => {
      const updated = [...prev];
      const index = updated.findIndex(apt => apt.id === data.appointment.id);
      
      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          ...data.appointment,
        };
      } else {
        updated.push(data.appointment);
      }

      return updated.sort((a, b) => new Date(a.date) - new Date(b.date));
    });
  }, []);

  // Send message
  const sendMessage = useCallback((conversationId, content, fileData = null) => {
    if (socket && connected) {
      const messageData = {
        conversationId,
        content,
        timestamp: new Date(),
        sender: user.id,
        ...(fileData && { file: fileData }),
      };

      socket.emit('send_message', messageData);
    }
  }, [socket, connected, user]);

  // Book appointment
  const bookAppointment = useCallback(async (doctorId, date, type) => {
    if (socket && connected) {
      return new Promise((resolve, reject) => {
        socket.emit('book_appointment', {
          doctorId,
          date,
          type,
        }, (response) => {
          if (response.success) {
            resolve(response.appointment);
          } else {
            reject(new Error(response.error));
          }
        });
      });
    }
    return Promise.reject(new Error('Socket not connected'));
  }, [socket, connected]);

  // Cancel appointment
  const cancelAppointment = useCallback(async (appointmentId) => {
    if (socket && connected) {
      return new Promise((resolve, reject) => {
        socket.emit('cancel_appointment', {
          appointmentId,
        }, (response) => {
          if (response.success) {
            resolve(response.appointment);
          } else {
            reject(new Error(response.error));
          }
        });
      });
    }
    return Promise.reject(new Error('Socket not connected'));
  }, [socket, connected]);

  // Mark notification as read
  const markNotificationAsRead = useCallback((notificationId) => {
    if (socket && connected) {
      socket.emit('mark_notification_read', { notificationId });
      setNotifications(prev =>
        prev.map(notif =>
          notif.id === notificationId ? { ...notif, read: true } : notif
        )
      );
    }
  }, [socket, connected]);

  // Clear notifications
  const clearNotifications = useCallback(() => {
    if (socket && connected) {
      socket.emit('clear_notifications');
      setNotifications([]);
    }
  }, [socket, connected]);

  // Send typing indicator
  const sendTypingIndicator = useCallback((conversationId, isTyping) => {
    if (socket && connected) {
      socket.emit('typing', {
        conversationId,
        isTyping,
      });
    }
  }, [socket, connected]);

  // Get conversation history
  const getConversationHistory = useCallback(async (conversationId) => {
    if (socket && connected) {
      return new Promise((resolve, reject) => {
        socket.emit('get_conversation_history', { conversationId }, (response) => {
          if (response.success) {
            setMessages(prev => ({
              ...prev,
              [conversationId]: response.messages.map(msg => ({
                ...msg,
                timestamp: new Date(msg.timestamp),
              })),
            }));
            resolve(response.messages);
          } else {
            reject(new Error(response.error));
          }
        });
      });
    }
    return Promise.reject(new Error('Socket not connected'));
  }, [socket, connected]);

  const value = {
    connected,
    notifications,
    messages,
    appointments,
    onlineDoctors,
    typing,
    sendMessage,
    bookAppointment,
    cancelAppointment,
    markNotificationAsRead,
    clearNotifications,
    sendTypingIndicator,
    getConversationHistory,
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
