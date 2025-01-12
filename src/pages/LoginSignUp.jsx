import React, { useState } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Tab,
  Tabs,
  Alert,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Demo users database
const demoUsers = {
  'doctor@example.com': {
    email: 'doctor@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'doctor',
    id: '1',
  },
  'patient@example.com': {
    email: 'patient@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'patient',
    id: '2',
  },
};

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    role: 'patient', // Default role
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = demoUsers[formData.email];
      
      if (!user || user.password !== formData.password) {
        throw new Error('Invalid email or password');
      }

      // Generate tokens
      const token = `demo-token-${Math.random()}`;
      const refreshToken = `demo-refresh-token-${Math.random()}`;

      // Login the user
      await login(user, token, refreshToken);

      // Navigation is handled by AuthContext
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Check if email already exists
      if (demoUsers[formData.email]) {
        throw new Error('Email already exists');
      }

      // Create new user
      const newUser = {
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: formData.role,
        id: `user-${Math.random()}`,
      };

      // Generate tokens
      const token = `demo-token-${Math.random()}`;
      const refreshToken = `demo-refresh-token-${Math.random()}`;

      // Login the new user
      await login(newUser, token, refreshToken);

      // Navigation is handled by AuthContext
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}>
      <Typography variant="h4" align="center" gutterBottom>
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>

      <Tabs
        value={isLogin ? 0 : 1}
        onChange={(_, value) => setIsLogin(value === 0)}
        centered
        sx={{ mb: 3 }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={isLogin ? handleLogin : handleSignUp}>
        {!isLogin && (
          <>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              margin="normal"
              required
            />
          </>
        )}
        
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          required
        />

        {!isLogin && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <MenuItem value="patient">Patient</MenuItem>
              <MenuItem value="doctor">Doctor</MenuItem>
            </Select>
          </FormControl>
        )}

        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{ mt: 3 }}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            isLogin ? 'Login' : 'Sign Up'
          )}
        </Button>
      </form>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <Button
          color="primary"
          onClick={() => setIsLogin(!isLogin)}
          sx={{ textTransform: 'none' }}
        >
          {isLogin ? 'Sign Up' : 'Login'}
        </Button>
      </Typography>

      {/* Demo Account Information */}
      <Box sx={{ mt: 4, p: 2, bgcolor: 'grey.100', borderRadius: 1 }}>
        <Typography variant="subtitle2" gutterBottom>
          Demo Accounts:
        </Typography>
        <Typography variant="body2">
          Doctor: doctor@example.com / password123
        </Typography>
        <Typography variant="body2">
          Patient: patient@example.com / password123
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginSignUp;
