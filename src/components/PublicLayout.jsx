import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, Container, Paper } from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.jsx';

const PublicLayout = () => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
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
