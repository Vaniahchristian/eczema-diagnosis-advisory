import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
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

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
        py: 3,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
          <Outlet />
        </Paper>
      </Container>
    </Box>
  );
};

export default PublicLayout;
