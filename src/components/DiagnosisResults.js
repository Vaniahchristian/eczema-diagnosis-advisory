import React from 'react';

const DiagnosisResults = ({ result, confidence }) => {
  return (
    <div>
      <h2>Diagnosis Results</h2>
      <p><strong>Diagnosis:</strong> {result}</p>
      <p><strong>Confidence:</strong> {confidence}%</p>
    </div>
  );
};

export default DiagnosisResults;
