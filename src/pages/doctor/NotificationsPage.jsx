import React from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Paper,
  Chip,
  Divider,
  Button,
  Alert,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { useWebSocket } from '../../contexts/WebSocketContext';

const NotificationsPage = () => {
  const navigate = useNavigate();
  const {
    connected,
    notifications,
    markNotificationAsRead,
    clearNotifications,
    simulateNotification, // For demo purposes
  } = useWebSocket();

  const handleNotificationClick = (notification) => {
    // Mark as read
    markNotificationAsRead(notification.id);
    
    // Navigate based on notification type
    switch (notification.type) {
      case 'image_upload':
        navigate(`/doctor/patients/${notification.patientId}`);
        break;
      case 'appointment':
        navigate('/doctor/appointments');
        break;
      case 'message':
        navigate('/doctor/messages');
        break;
      default:
        console.log('Unknown notification type:', notification.type);
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'image_upload':
        return <ImageIcon color="primary" />;
      case 'appointment':
        return <EventIcon color="secondary" />;
      case 'message':
        return <MessageIcon color="info" />;
      default:
        return <NotificationsIcon />;
    }
  };

  // For demo purposes - simulate different types of notifications
  const handleSimulateNotification = () => {
    const types = ['image_upload', 'appointment', 'message'];
    const randomType = types[Math.floor(Math.random() * types.length)];
    simulateNotification(randomType);
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h4" gutterBottom>
          Notifications
          {unreadCount > 0 && (
            <Chip
              label={`${unreadCount} unread`}
              color="primary"
              size="small"
              sx={{ ml: 2 }}
            />
          )}
        </Typography>
        <Box>
          {/* Demo controls */}
          <Button
            onClick={handleSimulateNotification}
            variant="outlined"
            sx={{ mr: 1 }}
          >
            Simulate Notification
          </Button>
          <Button onClick={clearNotifications} color="error">
            Clear all
          </Button>
        </Box>
      </Box>

      {!connected && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          You are currently offline. You may miss new notifications until you reconnect.
        </Alert>
      )}

      <Paper>
        <List>
          {notifications.map((notification, index) => (
            <React.Fragment key={notification.id}>
              {index > 0 && <Divider />}
              <ListItem
                button
                onClick={() => handleNotificationClick(notification)}
                sx={{
                  bgcolor: notification.read ? 'transparent' : 'action.hover',
                }}
              >
                <ListItemIcon>
                  {getNotificationIcon(notification.type)}
                </ListItemIcon>
                <ListItemText
                  primary={notification.message}
                  secondary={format(new Date(notification.timestamp), 'MMM d, yyyy HH:mm')}
                />
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    markNotificationAsRead(notification.id);
                  }}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            </React.Fragment>
          ))}
          {notifications.length === 0 && (
            <ListItem>
              <ListItemText
                primary={
                  <Typography align="center" color="text.secondary">
                    No notifications
                  </Typography>
                }
              />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};

export default NotificationsPage;
