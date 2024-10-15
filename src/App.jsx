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
      <div className="flex">
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
        <main className="flex-1 bg-gray-100 min-h-screen p-6">
          {loading && (
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-4 rounded-md shadow-lg">
                <p className="text-blue-500">Processing image...</p>
              </div>
            </div>
          )}
          {error && (
            <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
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
    </Router>
  );
};

export default App;
