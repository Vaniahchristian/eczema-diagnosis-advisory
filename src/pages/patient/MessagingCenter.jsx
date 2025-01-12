import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  useTheme,
  CircularProgress,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Image as ImageIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useWebSocket } from '../../contexts/WebSocketContext';

const MessagingCenter = () => {
  const theme = useTheme();
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [message, setMessage] = useState('');
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const { sendMessage, lastMessage } = useWebSocket();

  // Simulated doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Dermatologist',
      avatar: '/avatars/doctor1.jpg',
      lastMessage: 'Your latest test results look good.',
      timestamp: new Date(2024, 0, 12, 10, 30),
      unread: 2,
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Dermatologist',
      avatar: '/avatars/doctor2.jpg',
      lastMessage: 'Please schedule a follow-up appointment.',
      timestamp: new Date(2024, 0, 11, 15, 45),
      unread: 0,
    },
  ];

  // Simulated messages
  const sampleMessages = [
    {
      id: 1,
      senderId: 1,
      content: 'Hello! How can I help you today?',
      timestamp: new Date(2024, 0, 12, 10, 0),
      type: 'text',
    },
    {
      id: 2,
      senderId: 'user',
      content: 'I have a question about my treatment plan.',
      timestamp: new Date(2024, 0, 12, 10, 5),
      type: 'text',
    },
    {
      id: 3,
      senderId: 1,
      content: 'Of course! What would you like to know?',
      timestamp: new Date(2024, 0, 12, 10, 10),
      type: 'text',
    },
  ];

  useEffect(() => {
    if (selectedDoctor) {
      setLoading(true);
      // Simulate API call to fetch messages
      setTimeout(() => {
        setMessages(sampleMessages);
        setLoading(false);
      }, 1000);
    }
  }, [selectedDoctor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (lastMessage) {
      handleNewMessage(lastMessage);
    }
  }, [lastMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleNewMessage = (newMessage) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (message.trim() || fileInputRef.current?.files?.length) {
      const newMessage = {
        id: Date.now(),
        senderId: 'user',
        content: message,
        timestamp: new Date(),
        type: 'text',
      };

      setMessages((prev) => [...prev, newMessage]);
      setMessage('');

      // Send via WebSocket
      sendMessage({
        type: 'chat',
        recipientId: selectedDoctor.id,
        content: message,
      });
    }
  };

  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage = {
          id: Date.now(),
          senderId: 'user',
          content: e.target.result,
          timestamp: new Date(),
          type: file.type.startsWith('image/') ? 'image' : 'file',
          fileName: file.name,
        };
        setMessages((prev) => [...prev, newMessage]);
      };
      reader.readAsDataURL(file);
    }
  };

  const formatMessageTime = (date) => {
    return format(date, 'HH:mm');
  };

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Doctors List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', overflow: 'auto' }}>
            <Typography variant="h6" sx={{ p: 2 }}>
              Conversations
            </Typography>
            <Divider />
            <List>
              {doctors.map((doctor) => (
                <ListItem
                  key={doctor.id}
                  button
                  selected={selectedDoctor?.id === doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <ListItemAvatar>
                    <Badge
                      badgeContent={doctor.unread}
                      color="primary"
                      invisible={!doctor.unread}
                    >
                      <Avatar src={doctor.avatar} alt={doctor.name}>
                        {doctor.name[0]}
                      </Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={doctor.name}
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {doctor.specialty}
                        </Typography>
                        <br />
                        {doctor.lastMessage}
                      </>
                    }
                  />
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ ml: 2 }}
                  >
                    {format(doctor.timestamp, 'MMM d')}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Chat Area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {selectedDoctor ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6">{selectedDoctor.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedDoctor.specialty}
                  </Typography>
                </Box>

                {/* Messages */}
                <Box
                  sx={{
                    flex: 1,
                    overflow: 'auto',
                    p: 2,
                    backgroundColor: theme.palette.grey[50],
                  }}
                >
                  {loading ? (
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <CircularProgress />
                    </Box>
                  ) : (
                    messages.map((msg) => (
                      <Box
                        key={msg.id}
                        sx={{
                          display: 'flex',
                          justifyContent:
                            msg.senderId === 'user' ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '70%',
                            backgroundColor:
                              msg.senderId === 'user'
                                ? theme.palette.primary.main
                                : theme.palette.background.paper,
                            color:
                              msg.senderId === 'user'
                                ? theme.palette.primary.contrastText
                                : theme.palette.text.primary,
                            borderRadius: 2,
                            p: 2,
                            boxShadow: 1,
                          }}
                        >
                          {msg.type === 'image' ? (
                            <img
                              src={msg.content}
                              alt="Shared"
                              style={{ maxWidth: '100%', borderRadius: 4 }}
                            />
                          ) : (
                            <Typography>{msg.content}</Typography>
                          )}
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              mt: 0.5,
                              color:
                                msg.senderId === 'user'
                                  ? 'rgba(255,255,255,0.7)'
                                  : 'text.secondary',
                            }}
                          >
                            {formatMessageTime(msg.timestamp)}
                          </Typography>
                        </Box>
                      </Box>
                    ))
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, backgroundColor: 'background.paper' }}>
                  <Grid container spacing={1}>
                    <Grid item>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                        accept="image/*,.pdf,.doc,.docx"
                      />
                      <IconButton
                        color="primary"
                        onClick={handleFileSelect}
                        size="large"
                      >
                        <AttachFileIcon />
                      </IconButton>
                    </Grid>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                        multiline
                        maxRows={4}
                      />
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        size="large"
                      >
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MessagingCenter;
