const express = require('express');
const router = express.Router();
const Doctor = require('../models/Doctor');
const auth = require('../middleware/auth');

// Get all doctors
router.get('/', async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific doctor
router.get('/:id', async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new doctor (admin only)
router.post('/', auth, async (req, res) => {
  const doctor = new Doctor({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    specialization: req.body.specialization,
    qualifications: req.body.qualifications,
    experience: req.body.experience,
    availability: req.body.availability,
  });

  try {
    const newDoctor = await doctor.save();
    res.status(201).json(newDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update doctor's status
router.patch('/:id/status', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    doctor.online = req.body.online;
    const updatedDoctor = await doctor.save();
    res.json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add a review for a doctor
router.post('/:id/reviews', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    const review = {
      patientId: req.user._id,
      rating: req.body.rating,
      comment: req.body.comment,
    };

    doctor.reviews.push(review);

    // Update average rating
    const totalRating = doctor.reviews.reduce((sum, r) => sum + r.rating, 0);
    doctor.rating = totalRating / doctor.reviews.length;

    const updatedDoctor = await doctor.save();
    res.status(201).json(updatedDoctor);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
