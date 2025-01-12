// src/components/Sidebar.jsx
import React, { useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  PhotoCamera as PhotoCameraIcon,
  Message as MessageIcon,
  School as SchoolIcon,
  Assessment as AssessmentIcon,
  QuestionAnswer as QuestionAnswerIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { AuthContext } from '../contexts/AuthContext.jsx';

const drawerWidth = 240;

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/image-upload', label: 'New Diagnosis', icon: <PhotoCameraIcon /> },
  { path: '/consult', label: 'Consult Doctor', icon: <MessageIcon /> },
  { path: '/education', label: 'Education', icon: <SchoolIcon /> },
  { path: '/treatment/history', label: 'Treatment History', icon: <AssessmentIcon /> },
  { path: '/faq', label: 'FAQ', icon: <QuestionAnswerIcon /> },
  { path: '/about', label: 'About Us', icon: <InfoIcon /> },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout, user } = useContext(AuthContext);

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          bgcolor: 'background.paper',
          borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        {/* App Title */}
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" noWrap component="div" color="primary">
            Eczema Advisor
          </Typography>
        </Box>

        <Divider />

        {/* User Profile Section */}
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <IconButton
              sx={{
                width: 40,
                height: 40,
                bgcolor: 'primary.main',
                color: 'white',
                '&:hover': { bgcolor: 'primary.dark' },
              }}
              onClick={() => navigate('/profile')}
            >
              <PersonIcon />
            </IconButton>
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" noWrap>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography variant="caption" color="text.secondary" noWrap>
                {user?.email}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Navigation Menu */}
        <List>
          {menuItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  '&.Mui-selected': {
                    bgcolor: 'primary.light',
                    '&:hover': {
                      bgcolor: 'primary.light',
                    },
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: location.pathname === item.path ? 'primary.main' : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  sx={{
                    '& .MuiTypography-root': {
                      color: location.pathname === item.path ? 'primary.main' : 'inherit',
                      fontWeight: location.pathname === item.path ? 'bold' : 'normal',
                    },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        {/* Logout Button */}
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon color="error" />
              </ListItemIcon>
              <ListItemText
                primary="Logout"
                sx={{ color: 'error.main' }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
