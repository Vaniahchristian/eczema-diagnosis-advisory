import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  Badge,
  Divider,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import {
  Send as SendIcon,
  AttachFile as AttachFileIcon,
  Event as EventIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { useWebSocket } from '../../contexts/WebSocketContext';

const DoctorInteraction = () => {
  const { user } = useAuth();
  const {
    connected,
    messages,
    onlineDoctors,
    typing,
    appointments,
    sendMessage,
    bookAppointment,
    cancelAppointment,
    sendTypingIndicator,
    getConversationHistory,
  } = useWebSocket();

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const messagesEndRef = useRef(null);

  const conversationId = selectedDoctor
    ? `${user.id}-${selectedDoctor.id}`
    : null;

  const currentMessages = conversationId ? messages[conversationId] || [] : [];

  useEffect(() => {
    if (selectedDoctor) {
      loadConversationHistory();
    }
  }, [selectedDoctor]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessages]);

  const loadConversationHistory = async () => {
    if (!conversationId) return;

    try {
      setLoading(true);
      await getConversationHistory(conversationId);
    } catch (error) {
      setError('Failed to load conversation history');
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!messageInput.trim() && !file) return;

    try {
      let fileData = null;
      if (file) {
        // In a real app, implement file upload to a server/cloud storage
        fileData = {
          name: file.name,
          type: file.type,
          size: file.size,
        };
      }

      await sendMessage(conversationId, messageInput, fileData);
      setMessageInput('');
      setFile(null);
    } catch (error) {
      setError('Failed to send message');
    }
  };

  const handleTyping = (event) => {
    setMessageInput(event.target.value);
    sendTypingIndicator(conversationId, event.target.value.length > 0);
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      // Add file size validation
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size should not exceed 5MB');
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleBookAppointment = async () => {
    if (!appointmentDate || !appointmentType) {
      setError('Please fill in all appointment details');
      return;
    }

    try {
      setLoading(true);
      await bookAppointment(selectedDoctor.id, appointmentDate, appointmentType);
      setBookingOpen(false);
      setAppointmentDate('');
      setAppointmentType('');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await cancelAppointment(appointmentId);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ height: '100%', p: 2 }}>
      <Grid container spacing={2} sx={{ height: '100%' }}>
        {/* Doctors List */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ height: '100%', p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Available Doctors
            </Typography>
            <List>
              {onlineDoctors.map((doctor) => (
                <ListItem
                  key={doctor.id}
                  button
                  selected={selectedDoctor?.id === doctor.id}
                  onClick={() => setSelectedDoctor(doctor)}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant="dot"
                      color="success"
                    >
                      <Avatar>{doctor.firstName[0]}</Avatar>
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                    secondary={doctor.specialization}
                  />
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
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      <Avatar>{selectedDoctor.firstName[0]}</Avatar>
                    </Grid>
                    <Grid item xs>
                      <Typography variant="h6">
                        Dr. {selectedDoctor.firstName} {selectedDoctor.lastName}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {selectedDoctor.specialization}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Button
                        variant="outlined"
                        startIcon={<EventIcon />}
                        onClick={() => setBookingOpen(true)}
                      >
                        Book Appointment
                      </Button>
                    </Grid>
                  </Grid>
                </Box>

                {/* Messages */}
                <Box
                  sx={{
                    flex: 1,
                    overflowY: 'auto',
                    p: 2,
                    bgcolor: 'grey.50',
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
                      <CircularProgress />
                    </Box>
                  ) : (
                    currentMessages.map((msg) => (
                      <Box
                        key={msg.id}
                        sx={{
                          display: 'flex',
                          justifyContent: msg.sender === user.id ? 'flex-end' : 'flex-start',
                          mb: 2,
                        }}
                      >
                        <Paper
                          sx={{
                            p: 2,
                            maxWidth: '70%',
                            bgcolor: msg.sender === user.id ? 'primary.main' : 'background.paper',
                            color: msg.sender === user.id ? 'primary.contrastText' : 'text.primary',
                          }}
                        >
                          {msg.file ? (
                            <Box>
                              <Typography variant="body2" color="inherit">
                                File: {msg.file.name}
                              </Typography>
                              <Typography variant="caption" color="inherit">
                                Size: {(msg.file.size / 1024).toFixed(2)}KB
                              </Typography>
                            </Box>
                          ) : (
                            <Typography>{msg.content}</Typography>
                          )}
                          <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                            {format(new Date(msg.timestamp), 'HH:mm')}
                            {msg.sender === user.id && (
                              <span style={{ marginLeft: 8 }}>
                                {msg.read ? '✓✓' : msg.delivered ? '✓' : ''}
                              </span>
                            )}
                          </Typography>
                        </Paper>
                      </Box>
                    ))
                  )}
                  {typing[conversationId]?.isTyping && typing[conversationId]?.user !== user.id && (
                    <Typography variant="caption" sx={{ pl: 2 }}>
                      Dr. {selectedDoctor.firstName} is typing...
                    </Typography>
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, bgcolor: 'background.paper' }}>
                  {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                      {error}
                    </Alert>
                  )}
                  <Grid container spacing={2}>
                    <Grid item xs>
                      <TextField
                        fullWidth
                        placeholder="Type a message..."
                        value={messageInput}
                        onChange={handleTyping}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                    </Grid>
                    <Grid item>
                      <input
                        type="file"
                        id="file-input"
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                      />
                      <label htmlFor="file-input">
                        <IconButton component="span" color={file ? 'primary' : 'default'}>
                          <AttachFileIcon />
                        </IconButton>
                      </label>
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={handleSendMessage}
                        disabled={!messageInput.trim() && !file}
                      >
                        <SendIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
                  {file && (
                    <Box sx={{ mt: 1 }}>
                      <Typography variant="caption">
                        Selected file: {file.name}
                        <IconButton size="small" onClick={() => setFile(null)}>
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </Typography>
                    </Box>
                  )}
                </Box>
              </>
            ) : (
              <Box
                sx={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="body1" color="text.secondary">
                  Select a doctor to start a conversation
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Appointment Booking Dialog */}
      <Dialog open={bookingOpen} onClose={() => setBookingOpen(false)}>
        <DialogTitle>Book Appointment</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              type="datetime-local"
              label="Appointment Date & Time"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth>
              <InputLabel>Appointment Type</InputLabel>
              <Select
                value={appointmentType}
                onChange={(e) => setAppointmentType(e.target.value)}
                label="Appointment Type"
              >
                <MenuItem value="initial">Initial Consultation</MenuItem>
                <MenuItem value="followup">Follow-up</MenuItem>
                <MenuItem value="emergency">Emergency</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingOpen(false)}>Cancel</Button>
          <Button
            onClick={handleBookAppointment}
            variant="contained"
            disabled={loading || !appointmentDate || !appointmentType}
          >
            {loading ? <CircularProgress size={24} /> : 'Book'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DoctorInteraction;
