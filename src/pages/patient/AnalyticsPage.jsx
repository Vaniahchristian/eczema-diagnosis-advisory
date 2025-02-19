import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PatientAnalytics from '../../components/PatientAnalytics.jsx';

const AnalyticsPage = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Progress Analytics
      </Typography>
      <Paper elevation={3} sx={{ p: 3 }}>
        <PatientAnalytics />
      </Paper>
    </Box>
  );
};

export default AnalyticsPage;
