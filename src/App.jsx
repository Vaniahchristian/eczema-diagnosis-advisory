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
import AboutUs from "./pages/AboutUs";
import LoginSignUp from "./pages/LoginSignUp";
import NotFound from "./pages/NotFound";
import Profile from './pages/Profile';
import ConsultDoctor from './pages/ConsultDoctor';
import FAQ from './pages/FAQ';
import Notifications from './pages/Notifications';
import DoctorInteraction from './pages/DoctorInteraction';
import ConsultationRoom from './pages/ConsultationRoom';




const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Private Routes */}
          <Route
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
            <Route path="/about" element={<AboutUs />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/doctor" element={<ConsultDoctor />} />
            <Route path="/faq" element={< FAQ />} />
            <Route path="/notifications" element={< Notifications />} />
            <Route path="/doctorinteraction" element={< DoctorInteraction />} />
            <Route path="/consultation-room" element={< ConsultationRoom />} />
          </Route>

          {/* Catch-All Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
