// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import SidebarItem from "./components/SidebarItem";
import { FaImage, FaDiagnoses, FaStethoscope, FaBook } from "react-icons/fa";
import axios from "axios";

// Import Pages
import ImageUpload from "./pages/ImageUpload";
import DiagnosisResults from "./pages/DiagnosisResults";
import TreatmentAdvice from "./pages/TreatmentAdvice";
import EducationContent from "./pages/EducationContent";
import NotFound from "./pages/NotFound"; // Optional: For 404

// Import Header and Footer
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  const [diagnosis, setDiagnosis] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "", // Optional: URL to user's avatar
  };

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    setDiagnosis(null);
    setConfidence(null);
    setTreatment(null);

    try {
      // Create form data
      const formData = new FormData();
      formData.append("image", file);

      // Replace with your API endpoint
      const response = await axios.post("https://your-api-endpoint.com/diagnose", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Assuming API response structure
      const { diagnosis: diag, confidence: conf, treatment: treat } = response.data;

      setDiagnosis(diag);
      setConfidence(conf);
      setTreatment(treat);
    } catch (err) {
      console.error(err);
      setError("Failed to process the image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        <div className="flex flex-1">
          {/* Sidebar */}
          <Sidebar user={user}>
            <SidebarItem
              icon={<FaImage />}
              label="Image Upload"
              to="/image-upload"
            />
            <SidebarItem
              icon={<FaDiagnoses />}
              label="Diagnosis Results"
              to="/diagnosis-results"
              alert={diagnosis ? true : false}
            />
            <SidebarItem
              icon={<FaStethoscope />}
              label="Treatment Advice"
              to="/treatment-advice"
              alert={treatment ? true : false}
            />
            <SidebarItem
              icon={<FaBook />}
              label="Education Content"
              to="/education-content"
            />
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1 bg-gray-100 p-6">
            {loading && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-2">
                  <svg className="animate-spin h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                  <span className="text-indigo-600">Processing image...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="mb-4 p-4 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            <Routes>
              <Route
                path="/image-upload"
                element={<ImageUpload onImageUpload={handleImageUpload} />}
              />
              <Route
                path="/diagnosis-results"
                element={
                  <DiagnosisResults
                    result={diagnosis}
                    confidence={confidence}
                  />
                }
              />
              <Route
                path="/treatment-advice"
                element={<TreatmentAdvice treatment={treatment} />}
              />
              <Route path="/education-content" element={<EducationContent />} />
              <Route path="/" element={<Navigate to="/image-upload" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
