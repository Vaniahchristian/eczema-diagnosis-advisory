import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider, DatePicker, TimePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { useWebSocket } from '../../contexts/WebSocketContext';
import api from '../../config/api';

const Appointments = () => {
  const { user } = useAuth();
  const { sendNotification } = useWebSocket();
  
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [reason, setReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user?.id) {
      fetchDoctors();
      fetchAppointments();
    }
  }, [user?.id]);

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await api.get('/doctors');
      setDoctors(response.data);
    } catch (error) {
      setError('Failed to load doctors');
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/appointments/patient/${user.id}`);
      if (Array.isArray(response.data)) {
        setAppointments(response.data);
      } else {
        setAppointments([]);
        console.error('Invalid appointments data:', response.data);
      }
    } catch (error) {
      setError('Failed to load appointments');
      console.error('Error fetching appointments:', error);
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime || !reason) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setLoading(true);
      const appointmentDateTime = new Date(selectedDate);
      appointmentDateTime.setHours(selectedTime.getHours());
      appointmentDateTime.setMinutes(selectedTime.getMinutes());

      const appointmentData = {
        doctorId: selectedDoctor,
        patientId: user.id,
        datetime: appointmentDateTime,
        reason: reason,
        status: 'pending',
      };

      const response = await api.post('/appointments', appointmentData);
      
      // Send notification to doctor
      sendNotification({
        type: 'appointment_request',
        recipientId: selectedDoctor,
        data: {
          appointmentId: response.data._id,
          patientName: `${user.firstName} ${user.lastName}`,
          datetime: appointmentDateTime,
        },
      });

      setAppointments(prevAppointments => [...prevAppointments, response.data]);
      handleCloseDialog();
      
    } catch (error) {
      setError('Failed to book appointment');
      console.error('Error booking appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    try {
      setLoading(true);
      await api.patch(`/appointments/${appointmentId}`, {
        status: 'cancelled',
      });
      
      // Update local state
      setAppointments(prevAppointments => 
        prevAppointments.map(apt => 
          apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        )
      );

      // Send notification to doctor
      const appointment = appointments.find(apt => apt._id === appointmentId);
      if (appointment) {
        sendNotification({
          type: 'appointment_cancelled',
          recipientId: appointment.doctorId,
          data: {
            appointmentId,
            patientName: `${user.firstName} ${user.lastName}`,
            datetime: appointment.datetime,
          },
        });
      }
    } catch (error) {
      setError('Failed to cancel appointment');
      console.error('Error cancelling appointment:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
    setError('');
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedDoctor('');
    setSelectedDate(null);
    setSelectedTime(null);
    setReason('');
    setError('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success.main';
      case 'pending':
        return 'warning.main';
      case 'cancelled':
        return 'error.main';
      default:
        return 'text.primary';
    }
  };

  if (!user?.id) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="body1" color="text.secondary">
          Please log in to view your appointments.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" component="h1">
          My Appointments
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenDialog}
          disabled={loading}
        >
          Book Appointment
        </Button>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
          <CircularProgress />
        </Box>
      ) : appointments.length === 0 ? (
        <Paper sx={{ p: 3, textAlign: 'center' }}>
          <Typography variant="body1" color="text.secondary">
            No appointments found. Book your first appointment now!
          </Typography>
        </Paper>
      ) : (
        <Grid container spacing={2}>
          {appointments.map((appointment) => (
            <Grid item xs={12} key={appointment._id}>
              <Paper sx={{ p: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle1">
                      Dr. {doctors.find(d => d._id === appointment.doctorId)?.firstName} {' '}
                      {doctors.find(d => d._id === appointment.doctorId)?.lastName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {doctors.find(d => d._id === appointment.doctorId)?.specialization}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="body1">
                      {format(new Date(appointment.datetime), 'MMM dd, yyyy')}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {format(new Date(appointment.datetime), 'hh:mm a')}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography
                      variant="body1"
                      sx={{ color: getStatusColor(appointment.status) }}
                    >
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    {appointment.status !== 'cancelled' && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleCancelAppointment(appointment._id)}
                        disabled={loading}
                      >
                        Cancel
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Book Appointment Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Select Doctor</InputLabel>
              <Select
                value={selectedDoctor}
                onChange={(e) => setSelectedDoctor(e.target.value)}
                label="Select Doctor"
              >
                {doctors.map((doctor) => (
                  <MenuItem key={doctor._id} value={doctor._id}>
                    Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialization}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Box sx={{ mb: 2 }}>
                <DatePicker
                  label="Select Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TimePicker
                  label="Select Time"
                  value={selectedTime}
                  onChange={setSelectedTime}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Box>
            </LocalizationProvider>

            <TextField
              fullWidth
              multiline
              rows={3}
              label="Reason for Visit"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleBookAppointment}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
