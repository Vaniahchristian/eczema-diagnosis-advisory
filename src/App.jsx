import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Import Layouts
import PublicLayout from "./components/PublicLayout.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import DoctorLayout from "./layouts/DoctorLayout";

// Import Pages
import LoginSignUp from "./pages/LoginSignUp.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import ImageUpload from "./pages/ImageUpload.jsx";
import DiagnosisResults from "./pages/DiagnosisResults.jsx";
import TreatmentAdvice from "./pages/TreatmentAdvice.jsx";
import ConsultDoctor from "./pages/ConsultDoctor.jsx";
import ConsultationRoom from "./pages/ConsultationRoom.jsx";
import EducationContent from "./pages/EducationContent.jsx";
import FAQ from "./pages/FAQ.jsx";
import AboutUs from "./pages/AboutUs.jsx";
import NotFound from "./pages/NotFound.jsx";

// Import Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import PatientList from "./pages/doctor/PatientList";
import PatientDetail from "./pages/doctor/PatientDetail";
import AppointmentsPage from "./pages/doctor/AppointmentsPage";
import MessagingCenter from "./pages/doctor/MessagingCenter";
import NotificationsPage from "./pages/doctor/NotificationsPage";
import SettingsPage from "./pages/doctor/SettingsPage";

// Import Components
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
      light: '#ff4081',
      dark: '#c51162',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicLayout />}>
            <Route path="/login" element={<LoginSignUp />} />
            <Route path="/" element={<Navigate to="/login" replace />} />
          </Route>

          {/* Doctor Routes */}
          <Route path="/doctor" element={<DoctorLayout />}>
            <Route index element={<Navigate to="/doctor/dashboard" replace />} />
            <Route path="dashboard" element={<DoctorDashboard />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="patients/:id" element={<PatientDetail />} />
            <Route path="appointments" element={<AppointmentsPage />} />
            <Route path="messages" element={<MessagingCenter />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Private Routes */}
          <Route element={<PrivateLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/image-upload" element={<ImageUpload />} />
            <Route path="/diagnosis/:id" element={<DiagnosisResults />} />
            <Route path="/treatment/:id" element={<TreatmentAdvice />} />
            <Route path="/consult" element={<ConsultDoctor />} />
            <Route path="/consultation/:id" element={<ConsultationRoom />} />
            <Route path="/education" element={<EducationContent />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
