import React, { useState } from 'react';

const ImageUpload = ({ onImageUpload }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      onImageUpload(file);
    }
  };

  return (
    <div>
      <h2>Upload Image for Eczema Diagnosis</h2>
      <input type="file" accept="image/*" onChange={handleImageChange} />
    </div>
  );
};

export default ImageUpload;
