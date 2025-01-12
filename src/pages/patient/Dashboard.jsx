import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  useTheme,
} from '@mui/material';
import {
  PhotoCamera as CameraIcon,
  Event as EventIcon,
  Message as MessageIcon,
  TrendingUp as TrendingUpIcon,
  Assignment as AssignmentIcon,
  Notifications as NotificationsIcon,
  ArrowForward as ArrowForwardIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '../../contexts/AuthContext';
import { useWebSocket } from '../../contexts/WebSocketContext';

const PatientDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notifications, messages } = useWebSocket();

  // Mock data for demonstration
  const recentDiagnosis = {
    date: new Date('2025-01-10'),
    severity: 'Moderate',
    area: 'Left arm',
    recommendation: 'Apply prescribed cream twice daily and avoid hot showers',
  };

  const upcomingAppointment = {
    date: new Date('2025-01-15T14:30:00'),
    doctor: 'Dr. Sarah Johnson',
    type: 'Follow-up consultation',
  };

  const treatmentPlan = {
    medications: [
      { name: 'Hydrocortisone Cream', schedule: 'Twice daily' },
      { name: 'Moisturizer', schedule: 'As needed' },
    ],
    nextReview: new Date('2025-01-20'),
  };

  const quickActions = [
    {
      icon: <CameraIcon />,
      label: 'Upload Image',
      path: '/patient/upload',
      color: theme.palette.primary.main,
    },
    {
      icon: <EventIcon />,
      label: 'Book Appointment',
      path: '/patient/appointments',
      color: theme.palette.secondary.main,
    },
    {
      icon: <MessageIcon />,
      label: 'Message Doctor',
      path: '/patient/messages',
      color: theme.palette.info.main,
    },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {user?.name || 'Patient'}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's an overview of your eczema management progress
        </Typography>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        {quickActions.map((action) => (
          <Grid item xs={12} sm={4} key={action.label}>
            <Card
              sx={{
                height: '100%',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
              onClick={() => navigate(action.path)}
            >
              <CardContent sx={{ textAlign: 'center' }}>
                <Avatar
                  sx={{
                    bgcolor: action.color,
                    width: 56,
                    height: 56,
                    mb: 2,
                    mx: 'auto',
                  }}
                >
                  {action.icon}
                </Avatar>
                <Typography variant="h6" gutterBottom>
                  {action.label}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Click to {action.label.toLowerCase()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Diagnosis */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6">
                  Recent Diagnosis
                </Typography>
                <Chip
                  label={recentDiagnosis.severity}
                  color={recentDiagnosis.severity === 'Moderate' ? 'warning' : 'success'}
                  size="small"
                />
              </Box>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {format(recentDiagnosis.date, 'MMM d, yyyy')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Affected Area: {recentDiagnosis.area}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recentDiagnosis.recommendation}
              </Typography>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/patient/results')}
                sx={{ mt: 2 }}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Appointment */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Appointment
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ bgcolor: theme.palette.primary.main, mr: 2 }}>
                  {upcomingAppointment.doctor.split(' ')[1][0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1">
                    {upcomingAppointment.doctor}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {upcomingAppointment.type}
                  </Typography>
                </Box>
              </Box>
              <Typography variant="body1" gutterBottom>
                {format(upcomingAppointment.date, 'EEEE, MMM d, yyyy')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {format(upcomingAppointment.date, 'h:mm a')}
              </Typography>
              <Button
                variant="outlined"
                endIcon={<EventIcon />}
                onClick={() => navigate('/patient/appointments')}
                sx={{ mt: 2 }}
              >
                Manage Appointments
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Treatment Plan */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Current Treatment Plan
              </Typography>
              <List>
                {treatmentPlan.medications.map((med, index) => (
                  <React.Fragment key={med.name}>
                    {index > 0 && <Divider component="li" />}
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.success.main }}>
                          <AssignmentIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={med.name}
                        secondary={`Schedule: ${med.schedule}`}
                      />
                    </ListItem>
                  </React.Fragment>
                ))}
              </List>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                Next Review: {format(treatmentPlan.nextReview, 'MMM d, yyyy')}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {notifications.slice(0, 3).map((notification) => (
                  <React.Fragment key={notification.id}>
                    <ListItem
                      button
                      onClick={() => navigate(notification.link)}
                      sx={{
                        bgcolor: notification.read ? 'transparent' : 'action.hover',
                      }}
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: theme.palette.info.main }}>
                          <NotificationsIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={notification.message}
                        secondary={format(new Date(notification.timestamp), 'MMM d, yyyy h:mm a')}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Button
                endIcon={<ArrowForwardIcon />}
                onClick={() => navigate('/patient/notifications')}
                sx={{ mt: 2 }}
              >
                View All Activity
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PatientDashboard;
