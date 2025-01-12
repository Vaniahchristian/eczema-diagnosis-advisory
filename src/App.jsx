import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { WebSocketProvider } from "./contexts/WebSocketContext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Import Theme
import theme from "./theme";

// Import Layouts
import PublicLayout from "./components/PublicLayout.jsx";
import PrivateLayout from "./components/PrivateLayout.jsx";
import DoctorLayout from "./layouts/DoctorLayout";
import PatientLayout from "./layouts/PatientLayout.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// Import Public Pages
import LoginSignUp from "./pages/LoginSignUp.jsx";
import NotFound from "./pages/NotFound.jsx";

// Import Patient Pages
import PatientDashboard from "./pages/patient/Dashboard.jsx";
import ImageUpload from "./pages/patient/ImageUpload.jsx";
import DiagnosisResults from "./pages/patient/DiagnosisResults.jsx";
import Appointments from "./pages/patient/Appointments.jsx";
import MessagingCenter from "./pages/patient/MessagingCenter.jsx";
import DoctorInteraction from "./pages/patient/DoctorInteraction.jsx";
import EducationContent from "./pages/patient/EducationContent.jsx";
import Settings from "./pages/patient/Settings.jsx";
import Profile from "./pages/patient/Profile.jsx";
import Notifications from "./pages/patient/Notifications.jsx";
import FAQ from "./pages/patient/FAQ.jsx";
import AboutUs from "./pages/patient/AboutUs.jsx";
import ConsultationRoom from "./pages/patient/ConsultationRoom.jsx";
import TreatmentAdvice from "./pages/patient/TreatmentAdvice.jsx";

// Import Doctor Pages
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import DoctorAppointments from "./pages/doctor/AppointmentsPage";
import DoctorMessaging from "./pages/doctor/MessagingCenter";
import DoctorNotifications from "./pages/doctor/NotificationsPage";
import DoctorSettings from "./pages/doctor/SettingsPage";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <WebSocketProvider>
          <CssBaseline />
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/login" element={<LoginSignUp />} />
              <Route path="/register" element={<LoginSignUp />} />
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/faq" element={<FAQ />} />
            </Route>

            {/* Patient Routes */}
            <Route element={<PrivateRoute allowedRoles={['patient']} />}>
              <Route element={<PatientLayout />}>
                <Route path="/patient/dashboard" element={<PatientDashboard />} />
                <Route path="/patient/upload" element={<ImageUpload />} />
                <Route path="/patient/results" element={<DiagnosisResults />} />
                <Route path="/patient/appointments" element={<Appointments />} />
                <Route path="/patient/messages" element={<MessagingCenter />} />
                <Route path="/patient/doctors" element={<DoctorInteraction />} />
                <Route path="/patient/education" element={<EducationContent />} />
                <Route path="/patient/settings" element={<Settings />} />
                <Route path="/patient/profile" element={<Profile />} />
                <Route path="/patient/notifications" element={<Notifications />} />
                <Route path="/patient/consultation/:id" element={<ConsultationRoom />} />
                <Route path="/patient/treatment/:id" element={<TreatmentAdvice />} />
              </Route>
            </Route>

            {/* Doctor Routes */}
            <Route element={<PrivateRoute allowedRoles={['doctor']} />}>
              <Route element={<DoctorLayout />}>
                <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
                <Route path="/doctor/appointments" element={<DoctorAppointments />} />
                <Route path="/doctor/messages" element={<DoctorMessaging />} />
                <Route path="/doctor/notifications" element={<DoctorNotifications />} />
                <Route path="/doctor/settings" element={<DoctorSettings />} />
              </Route>
            </Route>

            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </WebSocketProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
