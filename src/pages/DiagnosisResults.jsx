import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  CircularProgress,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
} from '@mui/material';
import {
  CheckCircle,
  Warning,
  Info,
  LocalHospital,
  Healing,
  WbSunny,
  Opacity,
} from '@mui/icons-material';

const DiagnosisResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Dummy results
        const dummyResults = {
          severity: 'Moderate',
          confidence: 0.85,
          affectedArea: 'Arms',
          symptoms: [
            'Redness and inflammation',
            'Dry and scaly patches',
            'Mild itching',
          ],
          recommendations: [
            'Apply prescribed corticosteroid cream twice daily',
            'Keep the area moisturized with fragrance-free lotion',
            'Avoid scratching and wear loose-fitting clothes',
            'Take lukewarm baths instead of hot showers',
          ],
          triggers: [
            'Stress',
            'Hot weather',
            'Certain fabrics',
            'Sweat',
          ],
          urgency: 'moderate',
          followUp: 'Consider scheduling a consultation with a dermatologist for a comprehensive treatment plan.',
        };

        setResults(dummyResults);
      } catch (err) {
        setError('Failed to fetch analysis results. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        {error}
      </Alert>
    );
  }

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'success.main';
      case 'moderate':
        return 'warning.main';
      case 'severe':
        return 'error.main';
      default:
        return 'info.main';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'low':
        return <Info color="success" />;
      case 'moderate':
        return <Warning color="warning" />;
      case 'high':
        return <Warning color="error" />;
      default:
        return <Info color="info" />;
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Diagnosis Results
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Analysis Summary
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: getSeverityColor(results.severity),
                  fontWeight: 'bold',
                }}
              >
                {results.severity} Severity
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <List>
              <ListItem>
                <ListItemIcon>
                  <CheckCircle color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Confidence Score"
                  secondary={`${(results.confidence * 100).toFixed(1)}%`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalHospital color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary="Affected Area"
                  secondary={results.affectedArea}
                />
              </ListItem>
            </List>
          </Paper>

          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Symptoms Identified
            </Typography>
            <List>
              {results.symptoms.map((symptom, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <Healing color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={symptom} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Treatment Recommendations
            </Typography>
            <List>
              {results.recommendations.map((recommendation, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircle color="primary" />
                  </ListItemIcon>
                  <ListItemText primary={recommendation} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Potential Triggers
            </Typography>
            <List>
              {results.triggers.map((trigger, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    {trigger.toLowerCase().includes('weather') ? (
                      <WbSunny color="primary" />
                    ) : trigger.toLowerCase().includes('sweat') ? (
                      <Opacity color="primary" />
                    ) : (
                      <Warning color="primary" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={trigger} />
                </ListItem>
              ))}
            </List>
          </Paper>

          <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.light' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {getUrgencyIcon(results.urgency)}
              <Typography variant="h6" sx={{ ml: 1, color: 'white' }}>
                Follow-up Recommendation
              </Typography>
            </Box>
            <Typography sx={{ color: 'white' }}>
              {results.followUp}
            </Typography>
          </Paper>

          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={() => navigate('/consult')}
            >
              Consult Doctor
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={() => navigate('/image-upload')}
            >
              New Analysis
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DiagnosisResults;
