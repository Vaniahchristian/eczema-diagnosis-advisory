// src/pages/TreatmentAdvice.jsx
import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import TreatmentTracker from '../components/TreatmentTracker';

const TreatmentAdvice = ({ treatment }) => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Treatment Management
            </Typography>
            <Typography variant="body1" paragraph>
              Track your eczema treatments, monitor symptoms, and record your progress over time.
              This information will help both you and your healthcare provider make informed decisions
              about your treatment plan.
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Treatment Advice
            </Typography>
            {treatment ? (
              <Typography variant="body1" paragraph>
                {treatment}
              </Typography>
            ) : (
              <Typography variant="body1" paragraph>
                No treatment advice available. Please upload an image.
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <TreatmentTracker />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TreatmentAdvice;
