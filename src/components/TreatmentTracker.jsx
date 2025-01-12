import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const severityLevels = ['Mild', 'Moderate', 'Severe'];

const TreatmentTracker = () => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTreatment, setNewTreatment] = useState({
    treatment: '',
    severity: 'Mild',
    symptoms: '',
    date: new Date().toISOString().split('T')[0]
  });

  useEffect(() => {
    fetchTreatmentHistory();
  }, []);

  const fetchTreatmentHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_URL}/eczema/history`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setTreatments(response.data.treatments);
      } else {
        throw new Error(response.data.message || 'Failed to fetch treatment history');
      }
    } catch (error) {
      console.error('Error fetching treatment history:', error);
      setError(error.response?.data?.message || 'Failed to load treatment history');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTreatment(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `${API_URL}/eczema/treatment`,
        newTreatment,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.data.success) {
        setTreatments(prev => [...prev, response.data.treatment]);
        setNewTreatment({
          treatment: '',
          severity: 'Mild',
          symptoms: '',
          date: new Date().toISOString().split('T')[0]
        });
      } else {
        throw new Error(response.data.message || 'Failed to add treatment');
      }
    } catch (error) {
      console.error('Error adding treatment:', error);
      setError(error.response?.data?.message || 'Failed to add treatment');
    } finally {
      setLoading(false);
    }
  };

  const chartData = treatments.map(t => ({
    date: new Date(t.date).toLocaleDateString(),
    severity: severityLevels.indexOf(t.severity) + 1
  }));

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Treatment Tracker
        </Typography>
        
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Treatment"
                name="treatment"
                value={newTreatment.treatment}
                onChange={handleInputChange}
                required
                disabled={loading}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Severity</InputLabel>
                <Select
                  name="severity"
                  value={newTreatment.severity}
                  onChange={handleInputChange}
                  required
                  disabled={loading}
                >
                  {severityLevels.map(level => (
                    <MenuItem key={level} value={level}>
                      {level}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Symptoms"
                name="symptoms"
                value={newTreatment.symptoms}
                onChange={handleInputChange}
                multiline
                rows={2}
                disabled={loading}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="date"
                label="Date"
                name="date"
                value={newTreatment.date}
                onChange={handleInputChange}
                required
                disabled={loading}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={loading}
                sx={{ mt: 2 }}
              >
                {loading ? <CircularProgress size={24} /> : 'Add Treatment'}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>

      {treatments.length > 0 && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Severity Trend
          </Typography>
          <Box sx={{ width: '100%', height: 300, mt: 2 }}>
            <LineChart
              width={600}
              height={300}
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis
                domain={[0, 4]}
                ticks={[1, 2, 3]}
                tickFormatter={(value) => severityLevels[value - 1]}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="severity"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
                name="Severity Level"
              />
            </LineChart>
          </Box>
        </Paper>
      )}

      {treatments.length > 0 && (
        <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Treatment History
          </Typography>
          <Box sx={{ mt: 2 }}>
            {treatments.map((treatment, index) => (
              <Paper
                key={index}
                elevation={1}
                sx={{ p: 2, mb: 2, bgcolor: 'background.default' }}
              >
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">
                      <strong>Treatment:</strong> {treatment.treatment}
                    </Typography>
                    <Typography>
                      <strong>Date:</strong> {new Date(treatment.date).toLocaleDateString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography>
                      <strong>Severity:</strong> {treatment.severity}
                    </Typography>
                    {treatment.symptoms && (
                      <Typography>
                        <strong>Symptoms:</strong> {treatment.symptoms}
                      </Typography>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            ))}
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default TreatmentTracker;
