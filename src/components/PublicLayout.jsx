import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // If the user is authenticated, redirect to the dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    // Public layout wrapper for unauthenticated pages
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Outlet /> {/* Render nested public routes like login or signup */}
    </div>
  );
};

export default PublicLayout;
