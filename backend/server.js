// Import necessary packages
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// User Schema and Model
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['user', 'doctor'], default: 'user' } // New role field
});

const User = mongoose.model('User', userSchema);



const consultationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  scheduledTime: Date,
  consultationType: { type: String, enum: ['chat', 'video'], default: 'chat' },
  notes: String,
  feedback: String,
  chatLogs: [{ message: String, sender: String, timestamp: Date }],
});

const Consultation = mongoose.model('Consultation', consultationSchema);



// Register Route
app.post('/api/signup', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate inputs
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields (name, email, password) are required' });
  }

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, role: role || 'user' }); // Default to 'user' if no role is provided
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: 'User registration failed' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Get All Doctors Route
app.get('/api/doctors', async (req, res) => {
  try {
    const doctors = await User.find({ role: 'doctor' }); // Fetch only users with the 'doctor' role
    res.json(doctors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch doctors' });
  }
});

//Endpoints for Consultation Scheduling and Details
app.post('/api/consultations/schedule', async (req, res) => {
  const { userId, doctorId, scheduledTime, consultationType } = req.body;
  try {
    const consultation = new Consultation({
      user: userId,
      doctor: doctorId,
      scheduledTime,
      consultationType,
    });
    await consultation.save();
    // Send notification logic (e.g., email or push notification)
    res.status(201).json({ message: 'Consultation scheduled successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to schedule consultation' });
  }
});

//An endpoint to submit feedback after a consultation.
app.post('/api/consultations/:id/feedback', async (req, res) => {
  const { id } = req.params;
  const { feedback } = req.body;
  try {
    const consultation = await Consultation.findByIdAndUpdate(id, { feedback }, { new: true });
    res.json(consultation);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit feedback' });
  }
});

// Get User Profile Route
app.get('/api/profile', async (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
