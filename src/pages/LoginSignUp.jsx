import React, { useState, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Tab,
  Tabs,
  Alert,
  CircularProgress,
} from '@mui/material';
import { AuthContext } from '../contexts/AuthContext.jsx';
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
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
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

      // Redirect based on role
      if (user.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/dashboard');
      }
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
        firstName: formData.firstName,
        lastName: formData.lastName,
        role: 'patient', // New users are always patients
        id: `user-${Object.keys(demoUsers).length + 1}`,
      };

      // Generate tokens
      const token = `demo-token-${Math.random()}`;
      const refreshToken = `demo-refresh-token-${Math.random()}`;

      // Login the user
      await login(newUser, token, refreshToken);
      navigate('/dashboard');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: 400,
        mx: 'auto',
        p: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        {isLogin ? 'Login' : 'Sign Up'}
      </Typography>

      <Tabs
        value={isLogin ? 0 : 1}
        onChange={(e, newValue) => setIsLogin(newValue === 0)}
        sx={{ mb: 2 }}
      >
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>

      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
          {error}
        </Alert>
      )}

      <Box
        component="form"
        onSubmit={isLogin ? handleLogin : handleSignUp}
        sx={{ width: '100%' }}
      >
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

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            isLogin ? 'Login' : 'Sign Up'
          )}
        </Button>
      </Box>

      {isLogin && (
        <Typography variant="body2" sx={{ mt: 1 }}>
          Demo credentials: doctor@example.com / password123 or patient@example.com / password123
        </Typography>
      )}
    </Box>
  );
};

export default LoginSignUp;
