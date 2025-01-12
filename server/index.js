const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const doctorRoutes = require('./routes/doctorRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const userRoutes = require('./routes/userRoutes');
const { setupWebSocket } = require('./websocket');

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect('mongodb://localhost:27017/eczema-diagnosis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/users', userRoutes);

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Setup WebSocket
setupWebSocket(server);

module.exports = server;
