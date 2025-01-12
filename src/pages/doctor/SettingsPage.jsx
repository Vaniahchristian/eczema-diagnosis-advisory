import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  Grid,
  Alert,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { format, parse } from 'date-fns';

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    notifications: {
      newPatients: true,
      appointments: true,
      messages: true,
      imageUploads: true,
    },
    availability: {
      monday: { start: '09:00', end: '17:00', enabled: true },
      tuesday: { start: '09:00', end: '17:00', enabled: true },
      wednesday: { start: '09:00', end: '17:00', enabled: true },
      thursday: { start: '09:00', end: '17:00', enabled: true },
      friday: { start: '09:00', end: '17:00', enabled: true },
      saturday: { start: '10:00', end: '14:00', enabled: false },
      sunday: { start: '10:00', end: '14:00', enabled: false },
    },
    profile: {
      firstName: 'John',
      lastName: 'Smith',
      email: 'doctor@example.com',
      phone: '+1234567890',
      specialization: 'Dermatologist',
      bio: 'Experienced dermatologist specializing in eczema treatment.',
    },
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleNotificationChange = (key) => (event) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: event.target.checked,
      },
    });
  };

  const handleAvailabilityChange = (day, field) => (event) => {
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        [day]: {
          ...settings.availability[day],
          [field]: event.target.checked,
        },
      },
    });
  };

  const handleTimeChange = (day, field, newValue) => {
    setSettings({
      ...settings,
      availability: {
        ...settings.availability,
        [day]: {
          ...settings.availability[day],
          [field]: format(newValue, 'HH:mm'),
        },
      },
    });
  };

  const handleProfileChange = (field) => (event) => {
    setSettings({
      ...settings,
      profile: {
        ...settings.profile,
        [field]: event.target.value,
      },
    });
  };

  const handleSave = () => {
    // TODO: Implement actual save functionality
    setSnackbar({
      open: true,
      message: 'Settings saved successfully',
      severity: 'success',
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Profile Settings */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Profile Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={settings.profile.firstName}
                  onChange={handleProfileChange('firstName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={settings.profile.lastName}
                  onChange={handleProfileChange('lastName')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  type="email"
                  value={settings.profile.email}
                  onChange={handleProfileChange('email')}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={settings.profile.phone}
                  onChange={handleProfileChange('phone')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Specialization"
                  value={settings.profile.specialization}
                  onChange={handleProfileChange('specialization')}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  value={settings.profile.bio}
                  onChange={handleProfileChange('bio')}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notification Preferences
            </Typography>
            <List>
              <ListItem>
                <ListItemText primary="New Patient Registrations" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.newPatients}
                    onChange={handleNotificationChange('newPatients')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Appointment Updates" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.appointments}
                    onChange={handleNotificationChange('appointments')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="New Messages" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.messages}
                    onChange={handleNotificationChange('messages')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem>
                <ListItemText primary="Image Uploads" />
                <ListItemSecondaryAction>
                  <Switch
                    checked={settings.notifications.imageUploads}
                    onChange={handleNotificationChange('imageUploads')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
        </Grid>

        {/* Availability Settings */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Availability Schedule
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              {Object.entries(settings.availability).map(([day, schedule]) => (
                <Box key={day} sx={{ mb: 2 }}>
                  <Grid container spacing={2} alignItems="center">
                    <Grid item xs={4}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={schedule.enabled}
                            onChange={handleAvailabilityChange(day, 'enabled')}
                          />
                        }
                        label={day.charAt(0).toUpperCase() + day.slice(1)}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TimePicker
                        label="Start Time"
                        value={parse(schedule.start, 'HH:mm', new Date())}
                        onChange={(newValue) => handleTimeChange(day, 'start', newValue)}
                        disabled={!schedule.enabled}
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TimePicker
                        label="End Time"
                        value={parse(schedule.end, 'HH:mm', new Date())}
                        onChange={(newValue) => handleTimeChange(day, 'end', newValue)}
                        disabled={!schedule.enabled}
                      />
                    </Grid>
                  </Grid>
                </Box>
              ))}
            </LocalizationProvider>
          </Paper>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default SettingsPage;
