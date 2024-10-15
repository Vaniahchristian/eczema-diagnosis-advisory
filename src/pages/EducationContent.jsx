// src/pages/EducationContent.jsx
import React from 'react';

const EducationContent = () => {
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Eczema Management and Educational Content</h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Eczema is a condition that causes the skin to become itchy, red, and inflamed...
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Common Symptoms</h3>
      <ul className="list-disc list-inside mb-4 text-gray-700 dark:text-gray-300">
        <li>Dry skin</li>
        <li>Red patches</li>
        <li>Itchiness</li>
      </ul>
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">Treatment Options</h3>
      <p className="mb-4 text-gray-700 dark:text-gray-300">
        Use over-the-counter moisturizers, topical creams, and avoid allergens.
      </p>
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800 dark:text-gray-200">When to See a Dermatologist</h3>
      <p className="text-gray-700 dark:text-gray-300">
        If the condition worsens or does not improve with over-the-counter treatments, consult a dermatologist.
      </p>
    </div>
  );
};

export default EducationContent;
