import React, { useState } from 'react';
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
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import EventIcon from '@mui/icons-material/Event';
import MessageIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: 'image_upload',
    message: 'John Doe uploaded new images for diagnosis',
    timestamp: new Date('2025-01-12T10:30:00'),
    read: false,
    patientId: '123',
    link: '/doctor/patients/123',
  },
  {
    id: 2,
    type: 'appointment',
    message: 'New appointment request from Jane Smith',
    timestamp: new Date('2025-01-12T09:45:00'),
    read: false,
    patientId: '124',
    link: '/doctor/appointments',
  },
  {
    id: 3,
    type: 'message',
    message: 'New message from Sarah Johnson',
    timestamp: new Date('2025-01-12T08:15:00'),
    read: true,
    patientId: '125',
    link: '/doctor/messages',
  },
];

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const navigate = useNavigate();

  const handleNotificationClick = (notification) => {
    // Mark as read
    setNotifications(notifications.map(notif =>
      notif.id === notification.id ? { ...notif, read: true } : notif
    ));
    
    // Navigate to the relevant page
    navigate(notification.link);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const handleClearAll = () => {
    setNotifications([]);
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
          <Button onClick={handleMarkAllRead} sx={{ mr: 1 }}>
            Mark all as read
          </Button>
          <Button onClick={handleClearAll} color="error">
            Clear all
          </Button>
        </Box>
      </Box>

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
                  secondary={format(notification.timestamp, 'MMM d, yyyy HH:mm')}
                />
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteNotification(notification.id);
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
