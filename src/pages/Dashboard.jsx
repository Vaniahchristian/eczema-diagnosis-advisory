import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  PhotoCamera,
  Message,
  School,
  Assessment,
  Notifications,
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext.jsx';

// Dummy data for the dashboard
const dummyNotifications = [
  { id: 1, message: 'Your last diagnosis report is ready', date: '2025-01-12' },
  { id: 2, message: 'Dr. Smith has responded to your consultation', date: '2025-01-11' },
  { id: 3, message: 'New treatment recommendation available', date: '2025-01-10' },
];

const dummyRecentDiagnoses = [
  {
    id: 1,
    date: '2025-01-12',
    severity: 'Moderate',
    area: 'Arms',
    recommendation: 'Apply prescribed cream twice daily',
  },
  {
    id: 2,
    date: '2025-01-05',
    severity: 'Mild',
    area: 'Legs',
    recommendation: 'Keep the area moisturized',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const QuickActionCard = ({ title, description, icon, action, onClick }) => (
    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          {icon}
          <Typography variant="h6" component="h2" sx={{ ml: 1 }}>
            {title}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={onClick}>
          {action}
        </Button>
      </CardActions>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Welcome back, {user?.firstName || 'User'}!
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Quick Actions
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="New Diagnosis"
                description="Upload a photo for instant eczema analysis"
                icon={<PhotoCamera color="primary" />}
                action="Start Diagnosis"
                onClick={() => navigate('/image-upload')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Consult Doctor"
                description="Get professional medical advice"
                icon={<Message color="primary" />}
                action="Start Consultation"
                onClick={() => navigate('/consult')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Education Center"
                description="Learn more about eczema management"
                icon={<School color="primary" />}
                action="Learn More"
                onClick={() => navigate('/education')}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <QuickActionCard
                title="Treatment Tracker"
                description="Track your treatment progress"
                icon={<Assessment color="primary" />}
                action="View Progress"
                onClick={() => navigate('/treatment/history')}
              />
            </Grid>
          </Grid>
        </Grid>

        {/* Recent Diagnoses */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Recent Diagnoses
            </Typography>
            <List>
              {dummyRecentDiagnoses.map((diagnosis) => (
                <ListItem
                  key={diagnosis.id}
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <ListItemText
                    primary={`${diagnosis.severity} Eczema - ${diagnosis.area}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {diagnosis.date}
                        </Typography>
                        {` — ${diagnosis.recommendation}`}
                      </>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Notifications
            </Typography>
            <List>
              {dummyNotifications.map((notification) => (
                <ListItem
                  key={notification.id}
                  sx={{ borderBottom: 1, borderColor: 'divider' }}
                >
                  <ListItemIcon>
                    <Notifications color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={notification.message}
                    secondary={notification.date}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
