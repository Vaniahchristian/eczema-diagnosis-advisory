// src/components/PrivateLayout.jsx
import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.jsx';
import Header from './Header.jsx';
import Sidebar from './Sidebar.jsx';

const PrivateLayout = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a loading spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar />
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Header />
        <Box component="main" sx={{ flex: 1, p: 3, bgcolor: 'background.default' }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default PrivateLayout;
