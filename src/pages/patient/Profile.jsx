import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../contexts/AuthContext.jsx';
import { getProfile, updateProfile } from '../../services/api.js';
import {
  Box,
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Avatar,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';

const Profile = () => {
  const { user, updateUser, logout } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getProfile();
        if (response.user) {
          updateUser(response.user);
          setEditedData(response.user);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        setError(error.message || 'Failed to load profile');
        if (error.message === 'Not authorized to access this route') {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, [user, updateUser, logout]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...user });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({ ...user });
  };

  const handleChange = (field) => (event) => {
    setEditedData({
      ...editedData,
      [field]: event.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await updateProfile(editedData);
      if (response.user) {
        updateUser(response.user);
        setSuccess('Profile updated successfully');
        setIsEditing(false);
      }
    } catch (error) {
      setError(error.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setOpenDialog(true);
  };

  const confirmLogout = () => {
    setOpenDialog(false);
    logout();
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return (
      <Container maxWidth="sm">
        <Box mt={4}>
          <Alert severity="warning">Please log in to view your profile</Alert>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box my={4}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Paper elevation={3} sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={4}>
            <Avatar
              sx={{
                width: 100,
                height: 100,
                bgcolor: 'primary.main',
                fontSize: '2rem',
              }}
            >
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </Avatar>
            <Box ml={3}>
              <Typography variant="h4">
                {user.firstName} {user.lastName}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user.role?.charAt(0).toUpperCase() + user.role?.slice(1)}
              </Typography>
            </Box>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={isEditing ? editedData.firstName : user.firstName}
                onChange={handleChange('firstName')}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={isEditing ? editedData.lastName : user.lastName}
                onChange={handleChange('lastName')}
                disabled={!isEditing}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                value={isEditing ? editedData.email : user.email}
                onChange={handleChange('email')}
                disabled={!isEditing}
                margin="normal"
                type="email"
              />
            </Grid>
            {user.role === 'doctor' && (
              <>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Specialization"
                    value={isEditing ? editedData.specialization : user.specialization}
                    onChange={handleChange('specialization')}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="License Number"
                    value={isEditing ? editedData.licenseNumber : user.licenseNumber}
                    onChange={handleChange('licenseNumber')}
                    disabled={!isEditing}
                    margin="normal"
                  />
                </Grid>
              </>
            )}
          </Grid>

          <Box mt={4} display="flex" justifyContent="space-between">
            {isEditing ? (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveIcon />}
                  onClick={handleSave}
                  disabled={loading}
                >
                  Save Changes
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Edit Profile
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            )}
          </Box>
        </Paper>
      </Box>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to logout?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Profile;
