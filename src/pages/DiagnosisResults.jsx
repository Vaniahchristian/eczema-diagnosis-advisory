// src/pages/DiagnosisResults.jsx
import React from 'react';

const DiagnosisResults = ({ result, confidence }) => {
  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Diagnosis Results</h2>
      {result ? (
        <>
          <p className="mb-2 text-gray-700 dark:text-gray-300">
            <strong className="text-gray-800 dark:text-gray-100">Diagnosis:</strong> {result}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <strong className="text-gray-800 dark:text-gray-100">Confidence:</strong> {confidence}%
          </p>
        </>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No diagnosis available. Please upload an image.</p>
      )}
    </div>
  );
};

export default DiagnosisResults;
