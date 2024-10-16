// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Import Context and Layouts
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import PrivateLayout from "./components/PrivateLayout";
import PublicLayout from "./components/PublicLayout";

// Import Pages
import Dashboard from "./pages/Dashboard";
import ImageUpload from "./pages/ImageUpload";
import DiagnosisResults from "./pages/DiagnosisResults";
import TreatmentAdvice from "./pages/TreatmentAdvice";
import EducationContent from "./pages/EducationContent";
import LoginSignUp from "./pages/LoginSignUp";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginSignUp />} />
            {/* Redirect root to login */}
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <PrivateLayout />
              </PrivateRoute>
            }
          >
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/image-upload" element={<ImageUpload />} />
            <Route path="/diagnosis-results" element={<DiagnosisResults />} />
            <Route path="/treatment-advice" element={<TreatmentAdvice />} />
            <Route path="/education-content" element={<EducationContent />} />
            {/* Add more protected routes here */}
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
