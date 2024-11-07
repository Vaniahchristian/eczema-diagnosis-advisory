// src/pages/ImageUpload.jsx
import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleImageChange = (e) => {
    setError(null);
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ["image/jpeg", "image/png", "image/gif"];
      if (!validTypes.includes(file.type)) {
        setError("Unsupported file type. Please upload a JPEG, PNG, or GIF image.");
        return;
      }

      // Validate file size (e.g., max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setError("File size exceeds 5MB. Please upload a smaller image.");
        return;
      }

      setImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      onImageUpload(file);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Upload Image for Eczema Diagnosis</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full mb-4 text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-teal-500 file:text-white hover:file:bg-teal-600 dark:file:bg-teal-700 dark:hover:file:bg-teal-600"
        aria-label="Upload Image"
      />
      {previewUrl && (
        <div className="mb-4">
          <img src={previewUrl} alt="Preview" className="w-full h-auto rounded-md" />
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUpload;
