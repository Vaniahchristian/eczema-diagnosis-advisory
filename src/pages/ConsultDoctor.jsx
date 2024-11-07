import React, { useState } from 'react';

const ConsultDoctor = () => {
  const doctors = [
    { name: "Dr. Jane Doe", specialization: "Dermatologist", availability: "Available" },
    { name: "Dr. John Smith", specialization: "Pediatric Dermatologist", availability: "Available" },
  ];

  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentSuccess, setAppointmentSuccess] = useState(false);

  const handleSchedule = (doctor) => {
    setSelectedDoctor(doctor);
    // Mock appointment confirmation
    setAppointmentSuccess(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-teal-500 mb-4">Consult a Doctor</h1>
      <div className="space-y-6">
        {doctors.map((doctor, index) => (
          <div key={index} className="p-4 bg-white shadow-md rounded-md">
            <h2 className="text-xl font-semibold text-gray-800">{doctor.name}</h2>
            <p className="text-gray-600">Specialization: {doctor.specialization}</p>
            <p className={`text-${doctor.availability === 'Available' ? 'green' : 'red'}-500`}>{doctor.availability}</p>
            <button
              onClick={() => handleSchedule(doctor)}
              className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
            >
              Schedule Appointment
            </button>
          </div>
        ))}
      </div>
      {appointmentSuccess && selectedDoctor && (
        <div className="mt-6 p-4 bg-green-100 border border-green-300 text-green-700">
          Appointment with {selectedDoctor.name} has been scheduled successfully!
        </div>
      )}
    </div>
  );
};

export default ConsultDoctor;
