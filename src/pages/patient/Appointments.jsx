import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  useTheme,
  Alert,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Event as EventIcon,
  VideoCall as VideoCallIcon,
  Edit as EditIcon,
  Cancel as CancelIcon,
} from '@mui/icons-material';
import { format } from 'date-fns';

const Appointments = () => {
  const theme = useTheme();
  const [openBooking, setOpenBooking] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointmentType, setAppointmentType] = useState('');
  const [notes, setNotes] = useState('');
  const [bookingError, setBookingError] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Simulated data
  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Dermatologist' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Dermatologist' },
    { id: 3, name: 'Dr. Emily Brown', specialty: 'Dermatologist' },
  ];

  const appointmentTypes = [
    { value: 'initial', label: 'Initial Consultation' },
    { value: 'followup', label: 'Follow-up Visit' },
    { value: 'emergency', label: 'Emergency Consultation' },
  ];

  const appointments = [
    {
      id: 1,
      doctor: 'Dr. Sarah Johnson',
      date: new Date(2024, 0, 15, 10, 30),
      type: 'Follow-up Visit',
      status: 'upcoming',
      isVideo: true,
    },
    {
      id: 2,
      doctor: 'Dr. Michael Chen',
      date: new Date(2024, 0, 20, 14, 0),
      type: 'Initial Consultation',
      status: 'upcoming',
      isVideo: false,
    },
    {
      id: 3,
      doctor: 'Dr. Emily Brown',
      date: new Date(2024, 0, 5, 11, 0),
      type: 'Emergency Consultation',
      status: 'completed',
      isVideo: true,
    },
  ];

  const handleBookAppointment = () => {
    // Basic validation
    if (!selectedDate || !selectedTime || !selectedDoctor || !appointmentType) {
      setBookingError('Please fill in all required fields');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setBookingSuccess(true);
      setBookingError('');
      
      // Reset form
      setTimeout(() => {
        setOpenBooking(false);
        setSelectedDate(null);
        setSelectedTime(null);
        setSelectedDoctor('');
        setAppointmentType('');
        setNotes('');
        setBookingSuccess(false);
      }, 1500);
    }, 1000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return theme.palette.primary.main;
      case 'completed':
        return theme.palette.success.main;
      case 'cancelled':
        return theme.palette.error.main;
      default:
        return theme.palette.grey[500];
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={3}>
        {/* Header and Book Appointment Button */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Typography variant="h4">Appointments</Typography>
            <Button
              variant="contained"
              startIcon={<EventIcon />}
              onClick={() => setOpenBooking(true)}
            >
              Book Appointment
            </Button>
          </Box>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointments
              </Typography>
              <List>
                {appointments
                  .filter((apt) => apt.status === 'upcoming')
                  .map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      divider
                      sx={{
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Typography variant="subtitle1">
                              {appointment.doctor}
                            </Typography>
                            {appointment.isVideo && (
                              <VideoCallIcon
                                sx={{ ml: 1, color: 'primary.main' }}
                              />
                            )}
                          </Box>
                        }
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {format(appointment.date, 'MMMM d, yyyy')} at{' '}
                              {format(appointment.date, 'h:mm a')}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {appointment.type}
                            </Typography>
                          </>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="edit"
                          sx={{ mr: 1 }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="cancel">
                          <CancelIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Past Appointments */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Past Appointments
              </Typography>
              <List>
                {appointments
                  .filter((apt) => apt.status === 'completed')
                  .map((appointment) => (
                    <ListItem
                      key={appointment.id}
                      divider
                      sx={{
                        '&:last-child': {
                          borderBottom: 'none',
                        },
                      }}
                    >
                      <ListItemText
                        primary={appointment.doctor}
                        secondary={
                          <>
                            <Typography variant="body2" color="text.secondary">
                              {format(appointment.date, 'MMMM d, yyyy')}
                            </Typography>
                            <Chip
                              label={appointment.status}
                              size="small"
                              sx={{
                                backgroundColor: getStatusColor(appointment.status),
                                color: 'white',
                                mt: 1,
                              }}
                            />
                          </>
                        }
                      />
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Book Appointment Dialog */}
      <Dialog
        open={openBooking}
        onClose={() => setOpenBooking(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Book an Appointment</DialogTitle>
        <DialogContent>
          {bookingError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {bookingError}
            </Alert>
          )}
          {bookingSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Appointment booked successfully!
            </Alert>
          )}
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Select Doctor"
                  value={selectedDoctor}
                  onChange={(e) => setSelectedDoctor(e.target.value)}
                >
                  {doctors.map((doctor) => (
                    <MenuItem key={doctor.id} value={doctor.id}>
                      {doctor.name} - {doctor.specialty}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  select
                  fullWidth
                  label="Appointment Type"
                  value={appointmentType}
                  onChange={(e) => setAppointmentType(e.target.value)}
                >
                  {appointmentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DatePicker
                  label="Date"
                  value={selectedDate}
                  onChange={setSelectedDate}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                  minDate={new Date()}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TimePicker
                  label="Time"
                  value={selectedTime}
                  onChange={setSelectedTime}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Notes (Optional)"
                  multiline
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                />
              </Grid>
            </Grid>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBooking(false)}>Cancel</Button>
          <Button
            onClick={handleBookAppointment}
            variant="contained"
            disabled={bookingSuccess}
          >
            Book Appointment
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Appointments;
