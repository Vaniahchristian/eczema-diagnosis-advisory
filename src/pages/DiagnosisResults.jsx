// src/pages/DiagnosisResults.jsx
import React from 'react';

const DiagnosisResults = ({ result, confidence }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Diagnosis Results</h2>
      {result ? (
        <>
          <p className="mb-2">
            <strong className="text-gray-700">Diagnosis:</strong> {result}
          </p>
          <p>
            <strong className="text-gray-700">Confidence:</strong> {confidence}%
          </p>
        </>
      ) : (
        <p className="text-gray-500">No diagnosis available. Please upload an image.</p>
      )}
    </div>
  );
};

export default DiagnosisResults;
