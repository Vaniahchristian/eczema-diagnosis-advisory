import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  TextField,
  IconButton,
  Divider,
  Badge,
  Grid,
  InputAdornment,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';

// Mock data for conversations
const mockConversations = [
  {
    id: '1',
    patientName: 'John Doe',
    lastMessage: 'Thank you for the advice, doctor.',
    timestamp: new Date('2025-01-12T09:30:00'),
    unread: 2,
    messages: [
      {
        id: 1,
        sender: 'patient',
        content: 'Hello doctor, I have a question about my treatment.',
        timestamp: new Date('2025-01-12T09:25:00'),
      },
      {
        id: 2,
        sender: 'doctor',
        content: 'Of course, how can I help you?',
        timestamp: new Date('2025-01-12T09:28:00'),
      },
      {
        id: 3,
        sender: 'patient',
        content: 'Thank you for the advice, doctor.',
        timestamp: new Date('2025-01-12T09:30:00'),
      },
    ],
  },
  // Add more mock conversations as needed
];

const MessagingCenter = () => {
  const [conversations, setConversations] = useState(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedConversation]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const newMsg = {
      id: Date.now(),
      sender: 'doctor',
      content: newMessage,
      timestamp: new Date(),
    };

    setConversations(conversations.map(conv =>
      conv.id === selectedConversation.id
        ? {
            ...conv,
            messages: [...conv.messages, newMsg],
            lastMessage: newMessage,
            timestamp: new Date(),
          }
        : conv
    ));

    setNewMessage('');
    // TODO: Implement real-time message sending
  };

  const handleFileAttachment = () => {
    // TODO: Implement file attachment functionality
    console.log('File attachment clicked');
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex' }}>
      {/* Conversations List */}
      <Paper sx={{ width: 320, borderRight: 1, borderColor: 'divider' }}>
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            placeholder="Search conversations"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Divider />
        <List sx={{ overflow: 'auto', maxHeight: 'calc(100vh - 165px)' }}>
          {filteredConversations.map((conv) => (
            <ListItem
              key={conv.id}
              button
              selected={selectedConversation?.id === conv.id}
              onClick={() => setSelectedConversation(conv)}
            >
              <ListItemAvatar>
                <Badge
                  badgeContent={conv.unread}
                  color="error"
                  invisible={!conv.unread}
                >
                  <Avatar>{conv.patientName[0]}</Avatar>
                </Badge>
              </ListItemAvatar>
              <ListItemText
                primary={conv.patientName}
                secondary={conv.lastMessage}
                secondaryTypographyProps={{
                  noWrap: true,
                  style: { maxWidth: 150 },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {format(conv.timestamp, 'HH:mm')}
              </Typography>
            </ListItem>
          ))}
        </List>
      </Paper>

      {/* Chat Area */}
      <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <Typography variant="h6">
                {selectedConversation.patientName}
              </Typography>
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {selectedConversation.messages.map((message) => (
                <Box
                  key={message.id}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'doctor' ? 'flex-end' : 'flex-start',
                    mb: 2,
                  }}
                >
                  <Paper
                    sx={{
                      p: 2,
                      maxWidth: '70%',
                      bgcolor: message.sender === 'doctor' ? 'primary.light' : 'grey.100',
                      color: message.sender === 'doctor' ? 'white' : 'text.primary',
                    }}
                  >
                    <Typography variant="body1">{message.content}</Typography>
                    <Typography variant="caption" color={message.sender === 'doctor' ? 'white' : 'text.secondary'}>
                      {format(message.timestamp, 'HH:mm')}
                    </Typography>
                  </Paper>
                </Box>
              ))}
              <div ref={messagesEndRef} />
            </Box>

            {/* Message Input */}
            <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
              <Grid container spacing={1}>
                <Grid item>
                  <IconButton onClick={handleFileAttachment}>
                    <AttachFileIcon />
                  </IconButton>
                </Grid>
                <Grid item xs>
                  <TextField
                    fullWidth
                    placeholder="Type a message"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
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
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
            }}
          >
            <Typography variant="h6" color="text.secondary">
              Select a conversation to start messaging
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MessagingCenter;
