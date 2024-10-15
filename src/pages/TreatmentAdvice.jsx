// src/pages/TreatmentAdvice.jsx
import React from 'react';

const TreatmentAdvice = ({ treatment }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Treatment Advice</h2>
      {treatment ? (
        <p className="text-gray-700">{treatment}</p>
      ) : (
        <p className="text-gray-500">No treatment advice available. Please upload an image.</p>
      )}
    </div>
  );
};

export default TreatmentAdvice;
