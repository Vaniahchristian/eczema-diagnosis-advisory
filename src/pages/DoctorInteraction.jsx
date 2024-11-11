import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const DoctorInteraction = () => {
  const { user, isAuthenticated } = useContext(AuthContext); // Access user and authentication status from context
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [consultationType, setConsultationType] = useState('chat');
  const [scheduledTime, setScheduledTime] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        const data = await response.json();
        setDoctors(data);
      } catch (err) {
        console.error('Error fetching doctors:', err);
      }
    };
    fetchDoctors();
  }, []);

  const handleSchedule = async (e) => {
    e.preventDefault();
    if (!selectedDoctor || !scheduledTime) {
      setError('Please select a doctor and specify a time for the consultation.');
      return;
    }

    if (!isAuthenticated) {
      setError('Please log in to schedule a consultation.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/consultations/schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id, // Use logged-in user's ID here
          doctorId: selectedDoctor,
          consultationType,
          scheduledTime,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Consultation scheduled successfully!');
        navigate('/consultation-room');
      } else {
        navigate('/consultation-room');
        throw new Error(data.message || 'Failed to schedule consultation');
        
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Consult a Doctor </h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSchedule}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Doctor</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setSelectedDoctor(e.target.value)}
            value={selectedDoctor || ''}
          >
            <option value="">Choose a doctor...</option>
            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                Dr. {doctor.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Consultation Type</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setConsultationType(e.target.value)}
            value={consultationType}
          >
            <option value="chat">Chat</option>
            <option value="video">Video</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Select Time</label>
          <input
            type="datetime-local"
            className="w-full p-2 border rounded-md"
            onChange={(e) => setScheduledTime(e.target.value)}
            value={scheduledTime}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Schedule Consultation
        </button>
      </form>
    </div>
  );
};

export default DoctorInteraction;
