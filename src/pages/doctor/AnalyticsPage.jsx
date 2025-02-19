import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import DoctorAnalytics from '../../components/DoctorAnalytics.jsx';

const AnalyticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Analytics Dashboard
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <DoctorAnalytics />
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
