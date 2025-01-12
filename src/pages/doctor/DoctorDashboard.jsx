import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  IconButton,
  TextField,
  InputAdornment,
  Chip,
  Badge,
} from '@mui/material';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  VideoCall as VideoCallIcon,
  Message as MessageIcon,
  CalendarToday as CalendarIcon,
  TrendingUp as TrendingUpIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

// Mock data for demonstration
const recentPatients = [
  {
    id: 1,
    name: 'John Doe',
    lastVisit: '2025-01-10',
    severity: 'Moderate',
    nextAppointment: '2025-01-15',
    status: 'Pending Review',
  },
  {
    id: 2,
    name: 'Jane Smith',
    lastVisit: '2025-01-11',
    severity: 'Severe',
    nextAppointment: '2025-01-14',
    status: 'Follow-up Required',
  },
  // Add more mock patients as needed
];

const upcomingAppointments = [
  {
    id: 1,
    patientName: 'John Doe',
    time: '09:00 AM',
    date: '2025-01-15',
    type: 'Video Consultation',
  },
  {
    id: 2,
    patientName: 'Jane Smith',
    time: '10:30 AM',
    date: '2025-01-14',
    type: 'Follow-up',
  },
  // Add more appointments as needed
];

const DoctorDashboard = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header Section */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" color="primary">
          Doctor's Dashboard
        </Typography>
        <Box>
          <IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Button
            variant="contained"
            startIcon={<VideoCallIcon />}
            sx={{ ml: 2 }}
          >
            Start Consultation
          </Button>
        </Box>
      </Box>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search patients by name, ID, or condition..."
        value={searchTerm}
        onChange={handleSearchChange}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {/* Recent Patients */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recent Patients
            </Typography>
            <List>
              {recentPatients.map((patient) => (
                <React.Fragment key={patient.id}>
                  <ListItem
                    secondaryAction={
                      <Box>
                        <IconButton size="small">
                          <MessageIcon />
                        </IconButton>
                        <IconButton size="small" sx={{ ml: 1 }}>
                          <VideoCallIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={patient.name}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            Last Visit: {patient.lastVisit}
                          </Typography>
                          <br />
                          <Chip
                            label={patient.severity}
                            size="small"
                            color={
                              patient.severity === 'Severe' ? 'error' :
                              patient.severity === 'Moderate' ? 'warning' : 'success'
                            }
                            sx={{ mr: 1 }}
                          />
                          <Chip
                            label={patient.status}
                            size="small"
                            variant="outlined"
                          />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Upcoming Appointments */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Upcoming Appointments
            </Typography>
            <List>
              {upcomingAppointments.map((appointment) => (
                <React.Fragment key={appointment.id}>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
                        <CalendarIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={appointment.patientName}
                      secondary={
                        <React.Fragment>
                          <Typography component="span" variant="body2" color="text.primary">
                            {appointment.date} - {appointment.time}
                          </Typography>
                          <br />
                          <Chip
                            label={appointment.type}
                            size="small"
                            variant="outlined"
                            color="primary"
                          />
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" />
                </React.Fragment>
              ))}
            </List>
          </Paper>

          {/* Quick Stats */}
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    15
                  </Typography>
                  <Typography color="text.secondary">
                    Pending Reviews
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" component="div">
                    8
                  </Typography>
                  <Typography color="text.secondary">
                    Today's Appointments
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        {/* Treatment Trends */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Treatment Trends
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                      Most Common Triggers
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Stress" secondary="45% of cases" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Food Allergies" secondary="30% of cases" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Environmental" secondary="25% of cases" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                      Treatment Success Rate
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Topical Steroids" secondary="85% effective" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Moisturizers" secondary="75% effective" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Dietary Changes" secondary="60% effective" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card>
                  <CardContent>
                    <Typography variant="subtitle1" color="text.secondary">
                      Patient Demographics
                    </Typography>
                    <List dense>
                      <ListItem>
                        <ListItemText primary="Children (0-12)" secondary="40%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Teens (13-19)" secondary="25%" />
                      </ListItem>
                      <ListItem>
                        <ListItemText primary="Adults (20+)" secondary="35%" />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DoctorDashboard;
