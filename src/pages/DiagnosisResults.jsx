import React from 'react';
import { useNavigate } from 'react-router-dom';

const DiagnosisResults = ({ result, confidence }) => {
  const navigate = useNavigate();

  const handleConsultDoctor = () => {
    navigate('/doctorinteraction'); // Replace with your actual route for the consultation page
  };

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
          <button
            onClick={handleConsultDoctor}
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Consult a Doctor
          </button>
        </>
      ) : (<>
        <p className="text-gray-500 dark:text-gray-400">No diagnosis available. Please upload an image.</p>
        <button
            onClick={handleConsultDoctor}
            className="mt-4 w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Consult a Doctor
          </button>
        </>
      )}
    </div>
  );
};

export default DiagnosisResults;
