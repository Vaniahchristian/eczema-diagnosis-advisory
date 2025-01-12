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
  CircularProgress,
  Alert,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { useWebSocket } from '../../contexts/WebSocketContext';
import FileUploadDialog from '../../components/FileUploadDialog';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import DoneIcon from '@mui/icons-material/Done';

const MessagingCenter = () => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const { connected, messages, sendMessage, simulateMessage } = useWebSocket();

  // Simulate initial conversations
  useEffect(() => {
    setConversations([
      {
        id: '1',
        patientName: 'John Doe',
        lastMessage: 'Thank you for the advice, doctor.',
        timestamp: new Date('2025-01-12T09:30:00'),
        unread: 2,
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        lastMessage: 'When should I apply the medication?',
        timestamp: new Date('2025-01-12T09:00:00'),
        unread: 0,
      },
    ]);
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      // Update conversation's unread count when selected
      setConversations(prevConversations =>
        prevConversations.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, unread: 0 }
            : conv
        )
      );
    }
  }, [selectedConversation]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedConversation]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation || !connected) return;

    // Send message through WebSocket
    sendMessage(selectedConversation.id, newMessage);

    // Update conversation's last message
    setConversations(prevConversations =>
      prevConversations.map(conv =>
        conv.id === selectedConversation.id
          ? {
              ...conv,
              lastMessage: newMessage,
              timestamp: new Date(),
            }
          : conv
      )
    );

    setNewMessage('');

    // Simulate patient response after 2 seconds
    setTimeout(() => {
      simulateMessage(
        selectedConversation.id,
        'Thank you for your message, doctor. I understand.'
      );
    }, 2000);
  };

  const handleFileAttachment = () => {
    setUploadDialogOpen(true);
  };

  const handleUploadComplete = (uploadedFiles) => {
    // Send file messages
    uploadedFiles.forEach(file => {
      sendMessage(selectedConversation.id, null, {
        type: 'file',
        ...file,
      });
    });
  };

  const renderMessageContent = (message) => {
    if (message.type === 'file') {
      if (message.type.startsWith('image/')) {
        return (
          <Box>
            <img
              src={message.url}
              alt={message.filename}
              style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 4 }}
            />
            <Typography variant="caption" display="block">
              {message.filename} ({formatFileSize(message.size)})
            </Typography>
          </Box>
        );
      } else {
        return (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
            }}
          >
            <AttachFileIcon />
            <Box>
              <Typography variant="body2">{message.filename}</Typography>
              <Typography variant="caption" color="text.secondary">
                {formatFileSize(message.size)}
              </Typography>
            </Box>
          </Box>
        );
      }
    } else {
      return <Typography variant="body1">{message.content}</Typography>;
    }
  };

  const getMessageStatus = (message) => {
    if (message.sender === 'doctor') {
      return (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
          <Typography variant="caption" color="inherit">
            {format(new Date(message.timestamp), 'HH:mm')}
          </Typography>
          {message.delivered ? (
            message.read ? (
              <DoneAllIcon sx={{ fontSize: 16 }} />
            ) : (
              <DoneIcon sx={{ fontSize: 16 }} />
            )
          ) : null}
        </Box>
      );
    } else {
      return (
        <Typography variant="caption" color="inherit">
          {format(new Date(message.timestamp), 'HH:mm')}
        </Typography>
      );
    }
  };

  const filteredConversations = conversations.filter(conv =>
    conv.patientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedConversation
    ? messages[selectedConversation.id] || []
    : [];

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
              {!connected && (
                <Alert severity="warning" sx={{ mt: 1 }}>
                  You are currently offline. Messages will be sent when you reconnect.
                </Alert>
              )}
            </Box>

            {/* Messages */}
            <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
              {currentMessages.map((message) => (
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
                    {renderMessageContent(message)}
                    {getMessageStatus(message)}
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
                    disabled={!connected}
                  />
                </Grid>
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={handleSendMessage}
                    disabled={!connected || !newMessage.trim()}
                  >
                    {connected ? <SendIcon /> : <CircularProgress size={24} />}
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
      <FileUploadDialog
        open={uploadDialogOpen}
        onClose={() => setUploadDialogOpen(false)}
        onUploadComplete={handleUploadComplete}
      />
    </Box>
  );
};

export default MessagingCenter;
