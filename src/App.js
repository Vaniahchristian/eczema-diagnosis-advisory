import React, { useState } from 'react';
import ImageUpload from './components/ImageUpload';
import DiagnosisResults from './components/DiagnosisResults';
import TreatmentAdvice from './components/TreatmentAdvice';
import EducationContent from './components/EducationContent';
import axios from 'axios';

const App = () => {
  const [diagnosis, setDiagnosis] = useState('');
  const [confidence, setConfidence] = useState('');
  const [treatment, setTreatment] = useState('');

  const handleImageUpload = async (image) => {
    // You would call your backend API here to get the diagnosis result.
    // This is a mock request.
    const formData = new FormData();
    formData.append('file', image);

    try {
      const response = await axios.post('YOUR_BACKEND_API_URL', formData);
      setDiagnosis(response.data.diagnosis);
      setConfidence(response.data.confidence);
      setTreatment(response.data.treatment);
    } catch (error) {
      console.error('Error uploading the image:', error);
    }
  };

  return (
    <div className="App">
      <ImageUpload onImageUpload={handleImageUpload} />
      {diagnosis && (
        <>
          <DiagnosisResults result={diagnosis} confidence={confidence} />
          <TreatmentAdvice treatment={treatment} />
        </>
      )}
      <EducationContent />
    </div>
  );
};

export default App;
