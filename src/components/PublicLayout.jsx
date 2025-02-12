import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicLayout = () => {
  const { user, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    // Redirect based on user role
    if (user?.role === 'patient') {
      return <Navigate to="/patient/dashboard" replace />;
    } else if (user?.role === 'doctor') {
      return <Navigate to="/doctor/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Simply render the child routes without imposing any layout constraints
  return <Outlet />;
};

export default PublicLayout;
