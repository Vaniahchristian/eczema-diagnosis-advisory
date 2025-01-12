import React, { useState, useContext } from 'react';
import { FaUserCircle, FaBell, FaQuestionCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext.jsx';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Menu,
  MenuItem,
  Typography,
  Box,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// Dummy notifications data
const dummyNotifications = [
  {
    id: 1,
    message: 'Your last diagnosis report is ready',
    time: '5 minutes ago',
  },
  {
    id: 2,
    message: 'Dr. Smith has responded to your consultation',
    time: '1 hour ago',
  },
  {
    id: 3,
    message: 'New treatment recommendation available',
    time: '2 hours ago',
  },
];

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [settingsAnchor, setSettingsAnchor] = useState(null);

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchor(event.currentTarget);
  };

  const handleClose = () => {
    setNotificationsAnchor(null);
    setSettingsAnchor(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      color="default"
      elevation={0}
      sx={{
        bgcolor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }} />

        {/* Logo / Branding */}
        <div className="flex items-center space-x-2">
          <img
            src="medical1.png"  // Replace with the actual path to your logo
            alt="Eczema Advisory Logo"
            className="h-16 w-20"       // Adjust size as needed
          />
          <span className="text-2xl font-bold text-teal-500">
            Eczema Advisory
          </span>
        </div>

        {/* Notifications */}
        <IconButton
          color="inherit"
          onClick={handleNotificationsClick}
          sx={{ ml: 1 }}
        >
          <Badge badgeContent={dummyNotifications.length} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          {dummyNotifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleClose}>
              <Box>
                <Typography variant="body1">{notification.message}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {notification.time}
                </Typography>
              </Box>
            </MenuItem>
          ))}
        </Menu>

        {/* Settings */}
        <IconButton
          color="inherit"
          onClick={handleSettingsClick}
          sx={{ ml: 1 }}
        >
          <SettingsIcon />
        </IconButton>
        <Menu
          anchorEl={settingsAnchor}
          open={Boolean(settingsAnchor)}
          onClose={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClose}>Profile Settings</MenuItem>
          <MenuItem onClick={handleClose}>Notification Settings</MenuItem>
          <MenuItem onClick={handleClose}>Privacy Settings</MenuItem>
        </Menu>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <FaUserCircle className="text-gray-600 w-7 h-7 cursor-pointer hover:text-teal-500" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300">
                Login
              </button>
            </Link>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
