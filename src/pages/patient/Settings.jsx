import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  useTheme,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  Lock as LockIcon,
  Visibility as VisibilityIcon,
  Language as LanguageIcon,
  ColorLens as ThemeIcon,
} from '@mui/icons-material';

const Settings = () => {
  const theme = useTheme();
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    appointmentReminders: true,
    darkMode: false,
    language: 'English',
    privacyMode: false,
  });

  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordError, setPasswordError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);

  const handleSettingChange = (setting) => (event) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: event.target.checked,
    }));
  };

  const handlePasswordChange = (field) => (event) => {
    setPasswordForm((prev) => ({
      ...prev,
      [field]: event.target.value,
    }));
    setPasswordError('');
    setPasswordSuccess(false);
  };

  const handlePasswordSubmit = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordForm;

    // Basic validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      setPasswordError('All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordError('New passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setPasswordSuccess(true);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => {
        setOpenPasswordDialog(false);
        setPasswordSuccess(false);
      }, 1500);
    }, 1000);
  };

  const settingSections = [
    {
      title: 'Notifications',
      icon: <NotificationsIcon />,
      items: [
        {
          name: 'emailNotifications',
          label: 'Email Notifications',
          description: 'Receive updates via email',
        },
        {
          name: 'pushNotifications',
          label: 'Push Notifications',
          description: 'Receive instant notifications',
        },
        {
          name: 'appointmentReminders',
          label: 'Appointment Reminders',
          description: 'Get reminded about upcoming appointments',
        },
      ],
    },
    {
      title: 'Appearance',
      icon: <ThemeIcon />,
      items: [
        {
          name: 'darkMode',
          label: 'Dark Mode',
          description: 'Use dark theme',
        },
      ],
    },
    {
      title: 'Privacy',
      icon: <LockIcon />,
      items: [
        {
          name: 'privacyMode',
          label: 'Enhanced Privacy',
          description: 'Additional privacy protections',
        },
      ],
    },
  ];

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {settingSections.map((section) => (
        <Card key={section.title} sx={{ mb: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              {React.cloneElement(section.icon, {
                sx: { mr: 1, color: theme.palette.primary.main },
              })}
              <Typography variant="h6">{section.title}</Typography>
            </Box>
            <List>
              {section.items.map((item, index) => (
                <React.Fragment key={item.name}>
                  {index > 0 && <Divider />}
                  <ListItem>
                    <ListItemText
                      primary={item.label}
                      secondary={item.description}
                    />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        checked={settings[item.name]}
                        onChange={handleSettingChange(item.name)}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </React.Fragment>
              ))}
            </List>
          </CardContent>
        </Card>
      ))}

      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <LockIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography variant="h6">Security</Typography>
          </Box>
          <Button
            variant="outlined"
            onClick={() => setOpenPasswordDialog(true)}
            fullWidth
          >
            Change Password
          </Button>
        </CardContent>
      </Card>

      <Dialog
        open={openPasswordDialog}
        onClose={() => setOpenPasswordDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Change Password</DialogTitle>
        <DialogContent>
          {passwordError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {passwordError}
            </Alert>
          )}
          {passwordSuccess && (
            <Alert severity="success" sx={{ mb: 2 }}>
              Password successfully updated!
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Current Password"
            type="password"
            fullWidth
            value={passwordForm.currentPassword}
            onChange={handlePasswordChange('currentPassword')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            value={passwordForm.newPassword}
            onChange={handlePasswordChange('newPassword')}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Confirm New Password"
            type="password"
            fullWidth
            value={passwordForm.confirmPassword}
            onChange={handlePasswordChange('confirmPassword')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)}>Cancel</Button>
          <Button onClick={handlePasswordSubmit} variant="contained">
            Update Password
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Settings;
