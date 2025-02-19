import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  PhotoCamera as CameraIcon,
  Assignment as ResultsIcon,
  Event as AppointmentIcon,
  Message as MessageIcon,
  MenuBook as EducationIcon,
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Person as PersonIcon,
  ExitToApp as LogoutIcon,
  LocalHospital as DoctorIcon,
  BarChart as AnalyticsIcon,
} from '@mui/icons-material';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useWebSocket } from '../contexts/WebSocketContext';

const drawerWidth = 280;

const menuItems = [
  {
    text: 'Dashboard',
    icon: <DashboardIcon />,
    path: '/patient/dashboard',
  },
  {
    text: 'Upload Image',
    icon: <CameraIcon />,
    path: '/patient/upload',
  },
  {
    text: 'Diagnosis Results',
    icon: <ResultsIcon />,
    path: '/patient/results',
  },
  {
    text: 'Doctors',
    icon: <DoctorIcon />,
    path: '/patient/doctors',
  },
  {
    text: 'Appointments',
    icon: <AppointmentIcon />,
    path: '/patient/appointments',
  },
  {
    text: 'Messages',
    icon: <MessageIcon />,
    path: '/patient/messages',
  },
  {
    text: 'Educational Resources',
    icon: <EducationIcon />,
    path: '/patient/education',
  },
  {
    text: 'Analytics',
    icon: <AnalyticsIcon />,
    path: '/patient/analytics',
  },
  {
    text: 'Settings',
    icon: <SettingsIcon />,
    path: '/patient/settings',
  },
];

const PatientLayout = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const { notifications, messages } = useWebSocket();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState(null);

  const unreadNotifications = notifications.filter(n => !n.read).length;
  const unreadMessages = Object.values(messages).flat().filter(m => !m.read && m.sender !== user?.id).length;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationClick = (event) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchorEl(null);
  };

  const handleLogout = async () => {
    handleMenuClose();
    await logout();
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) setMobileOpen(false);
  };

  const drawer = (
    <Box>
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar sx={{ bgcolor: theme.palette.primary.main }}>
          {user?.firstName?.[0] || 'P'}
        </Avatar>
        <Box>
          <Typography variant="subtitle1">
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Patient
          </Typography>
        </Box>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>
                {item.text === 'Messages' ? (
                  <Badge badgeContent={unreadMessages} color="error">
                    {item.icon}
                  </Badge>
                ) : item.text === 'Notifications' ? (
                  <Badge badgeContent={unreadNotifications} color="error">
                    {item.icon}
                  </Badge>
                ) : (
                  item.icon
                )}
              </ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            {menuItems.find(item => item.path === location.pathname)?.text || 'Dashboard'}
          </Typography>
          <IconButton
            color="inherit"
            onClick={handleNotificationClick}
            sx={{ mr: 1 }}
          >
            <Badge badgeContent={unreadNotifications} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton
            onClick={handleMenuClick}
            sx={{ ml: 1 }}
          >
            <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
              {user?.name?.[0] || <PersonIcon />}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>

      {/* Profile Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        onClick={handleMenuClose}
      >
        <MenuItem onClick={() => navigate('/patient/profile')}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>
        <MenuItem onClick={() => navigate('/patient/settings')}>
          <ListItemIcon>
            <SettingsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </MenuItem>
      </Menu>

      {/* Notifications Menu */}
      <Menu
        anchorEl={notificationAnchorEl}
        open={Boolean(notificationAnchorEl)}
        onClose={handleNotificationClose}
        onClick={handleNotificationClose}
        PaperProps={{
          sx: { width: 360 },
        }}
      >
        {notifications.length > 0 ? (
          notifications.slice(0, 5).map((notification) => (
            <MenuItem
              key={notification.id}
              onClick={() => navigate(notification.link)}
              sx={{
                whiteSpace: 'normal',
                bgcolor: notification.read ? 'transparent' : 'action.hover',
              }}
            >
              <ListItemIcon>
                {notification.type === 'message' && <MessageIcon color="info" />}
                {notification.type === 'appointment' && <AppointmentIcon color="primary" />}
                {notification.type === 'result' && <ResultsIcon color="secondary" />}
              </ListItemIcon>
              <ListItemText
                primary={notification.message}
                secondary={new Date(notification.timestamp).toLocaleString()}
              />
            </MenuItem>
          ))
        ) : (
          <MenuItem disabled>
            <ListItemText primary="No new notifications" />
          </MenuItem>
        )}
        <Divider />
        <MenuItem onClick={() => navigate('/patient/notifications')}>
          <ListItemText primary="View all notifications" />
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default PatientLayout;
