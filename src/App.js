import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import ImageUpload from './components/ImageUpload';
import DiagnosisResults from './components/DiagnosisResults';
import TreatmentAdvice from './components/TreatmentAdvice';
import EducationContent from './components/EducationContent';
import './App.css';


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route path="image-upload" element={<ImageUpload />} />
            <Route path="diagnosis-results" element={<DiagnosisResults />} />
            <Route path="treatment-advice" element={<TreatmentAdvice />} />
            <Route path="education-content" element={<EducationContent />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
