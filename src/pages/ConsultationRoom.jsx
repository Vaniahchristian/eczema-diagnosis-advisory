import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import FeedbackForm from './FeedbackForm'; // Import the FeedbackForm component

const ConsultationRoom = ({ doctorId, consultationType }) => {
  const { user, isAuthenticated } = useContext(AuthContext);
  const [doctor, setDoctor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false); // New state for feedback form
  const navigate = useNavigate();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Fetch doctor details
  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}`);
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor details:', error);
      }
    };
    if (doctorId) {
      fetchDoctor();
    }
  }, [doctorId]);

  // Show feedback form after a delay
  useEffect(() => {
    const feedbackTimeout = setTimeout(() => {
      setShowFeedbackForm(true);
    }, 3000); // Show after 5 minutes (300000 ms)

    return () => clearTimeout(feedbackTimeout); // Cleanup timeout on unmount
  }, []);

  // Handle message input change
  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  // Handle sending a message (for chat consultation)
  const handleSendMessage = async (e) => {
    e.preventDefault();
    const newMessage = { sender: user.name, text: message, timestamp: new Date() };
    setMessages((prev) => [...prev, newMessage]);
    setMessage('');
  };

  return (
    <div className="consultation-room-container">
      <h2 className="text-xl font-semibold mb-4">Consultation with Dr. {doctor?.name}</h2>
      <p className="text-gray-600 mb-4">Consultation Type: {consultationType === 'chat' ? 'Chat' : 'Video'}</p>

      {consultationType === 'chat' ? (
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
      ) : (
        <div className="video-container">
          <p className="text-gray-500">Video consultation will appear here (embed video API or platform as required)</p>
          {/* Video API integration or iframe for the call would go here */}
        </div>
      )}

      {/* Show feedback form after delay */}
      {showFeedbackForm && (
        <div className="feedback-form-container mt-6">
          <FeedbackForm consultationId={doctorId} onFeedbackSubmit={() => setShowFeedbackForm(false)} />
        </div>
      )}
    </div>
  );
};

export default ConsultationRoom;
