// src/pages/EducationContent.jsx
import React from 'react';

const EducationContent = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Eczema Management and Educational Content</h2>
      <p className="mb-4 text-gray-700">
        Eczema is a condition that causes the skin to become itchy, red, and inflamed...
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Common Symptoms</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700">
        <li>Dry skin</li>
        <li>Red patches</li>
        <li>Itchiness</li>
      </ul>
      <h3 className="text-xl font-semibold mt-4 mb-2">Treatment Options</h3>
      <p className="mb-4 text-gray-700">
        Use over-the-counter moisturizers, topical creams, and avoid allergens.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2">When to See a Dermatologist</h3>
      <p className="text-gray-700">
        If the condition worsens or does not improve with over-the-counter treatments, consult a dermatologist.
      </p>
    </div>
  );
};

export default EducationContent;
