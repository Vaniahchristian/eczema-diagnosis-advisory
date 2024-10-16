// src/components/PublicLayout.jsx
import React, { useContext } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const PublicLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    // If authenticated, redirect to the main system
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
