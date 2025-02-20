import React from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  LinearProgress,
  useTheme,
} from '@mui/material';
import {
  People as UsersIcon,
  Assignment as DiagnosisIcon,
  Event as AppointmentIcon,
  MonitorHeart as SystemHealthIcon,
  Refresh as RefreshIcon,
  ArrowUpward as IncreaseIcon,
  ArrowDownward as DecreaseIcon,
} from '@mui/icons-material';

const StatCard = ({ title, value, icon, trend, trendValue, color }) => {
  const theme = useTheme();
  const isPositiveTrend = trend === 'up';

  return (
    <Card>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ 
            p: 1, 
            borderRadius: 1, 
            bgcolor: `${color}.light`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2
          }}>
            {icon}
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isPositiveTrend ? (
            <IncreaseIcon sx={{ color: 'success.main', fontSize: 16, mr: 0.5 }} />
          ) : (
            <DecreaseIcon sx={{ color: 'error.main', fontSize: 16, mr: 0.5 }} />
          )}
          <Typography
            variant="body2"
            color={isPositiveTrend ? 'success.main' : 'error.main'}
          >
            {trendValue}% from last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

const SystemHealthCard = () => {
  const metrics = [
    { name: 'CPU Usage', value: 45 },
    { name: 'Memory Usage', value: 62 },
    { name: 'Storage', value: 78 },
    { name: 'Network', value: 25 },
  ];

  return (
    <Card>
      <CardHeader
        title="System Health"
        action={
          <IconButton>
            <RefreshIcon />
          </IconButton>
        }
      />
      <CardContent>
        {metrics.map((metric) => (
          <Box key={metric.name} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{metric.name}</Typography>
              <Typography variant="body2">{metric.value}%</Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={metric.value}
              color={metric.value > 80 ? 'error' : metric.value > 60 ? 'warning' : 'primary'}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

const RecentActivityCard = () => {
  const activities = [
    { action: 'New user registration', time: '5 minutes ago', user: 'John Doe' },
    { action: 'System backup completed', time: '1 hour ago', user: 'System' },
    { action: 'User role updated', time: '2 hours ago', user: 'Admin' },
    { action: 'New diagnosis uploaded', time: '3 hours ago', user: 'Dr. Smith' },
  ];

  return (
    <Card>
      <CardHeader title="Recent Activity" />
      <List>
        {activities.map((activity, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={activity.action}
                secondary={activity.time}
              />
              <ListItemSecondaryAction>
                <Typography variant="caption" color="text.secondary">
                  {activity.user}
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
            {index < activities.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Card>
  );
};

const Dashboard = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4 }}>
        System Overview
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Users"
            value="2,543"
            icon={<UsersIcon sx={{ color: 'primary.main' }} />}
            trend="up"
            trendValue={12}
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Diagnoses Today"
            value="156"
            icon={<DiagnosisIcon sx={{ color: 'success.main' }} />}
            trend="up"
            trendValue={8}
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Appointments"
            value="89"
            icon={<AppointmentIcon sx={{ color: 'warning.main' }} />}
            trend="down"
            trendValue={5}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="System Load"
            value="42%"
            icon={<SystemHealthIcon sx={{ color: 'info.main' }} />}
            trend="up"
            trendValue={3}
            color="info"
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <SystemHealthCard />
        </Grid>
        <Grid item xs={12} md={6}>
          <RecentActivityCard />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
