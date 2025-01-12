import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Tabs,
  Tab,
  Button,
  Alert,
} from '@mui/material';
import VideoConsultation from '../../components/VideoConsultation';
import TreatmentTracker from '../../components/TreatmentTracker';
import axios from 'axios';

const ConsultationRoom = ({ doctorId, consultationType }) => {
  const { consultationId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [consultation, setConsultation] = useState(null);
  const [error, setError] = useState('');
  const [doctor, setDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    fetchConsultationDetails();
    fetchDoctorDetails();
  }, [consultationId, doctorId]);

  const fetchConsultationDetails = async () => {
    try {
      const response = await axios.get(`/api/consultation/${consultationId}`);
      setConsultation(response.data.data);
    } catch (err) {
      setError('Failed to load consultation details');
    }
  };

  const fetchDoctorDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
      const data = await response.json();
      setDoctor(data);
    } catch (error) {
      console.error('Error fetching doctor details:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEndConsultation = async () => {
    try {
      await axios.put(`/api/consultation/${consultationId}/status`, {
        status: 'completed'
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to end consultation');
    }
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = { sender: 'User', text: message, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  if (!consultation) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading consultation...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}>
              <Tabs value={activeTab} onChange={handleTabChange}>
                <Tab label="Video Consultation" />
                <Tab label="Treatment Tracking" />
                {consultationType === 'chat' && <Tab label="Chat" />}
              </Tabs>
            </Box>

            {activeTab === 0 && (
              <Box>
                <VideoConsultation
                  consultationId={consultationId}
                  onEnd={handleEndConsultation}
                />
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <TreatmentTracker />
              </Box>
            )}

            {activeTab === 2 && consultationType === 'chat' && (
              <Box>
                <div className="chat-container">
                  <div className="chat-messages bg-gray-100 p-4 rounded mb-4 h-64 overflow-y-scroll">
                    {messages.map((msg, index) => (
                      <div key={index} className="message mb-2">
                        <span className="font-semibold">{msg.sender}:</span> {msg.text}
                        <span className="text-xs text-gray-500 ml-2">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                      </div>
                    ))}
                  </div>
                  <form onSubmit={handleSendMessage} className="flex">
                    <input
                      type="text"
                      className="w-full p-2 border rounded-l-md"
                      placeholder="Type your message"
                      value={message}
                      onChange={handleMessageChange}
                      required
                    />
                    <button type="submit" className="bg-teal-600 text-white px-4 rounded-r-md hover:bg-teal-700">Send</button>
                  </form>
                </div>
              </Box>
            )}

            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleEndConsultation}
              >
                End Consultation
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ConsultationRoom;
