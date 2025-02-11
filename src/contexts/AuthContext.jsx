import React, { createContext, useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { getProfile } from '../services/api';

export const AuthContext = createContext(null);

// Custom hook for using auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Safe JSON parse function
const safeJSONParse = (data) => {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error parsing JSON:', error);
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const validateSession = async () => {
    try {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!token || !refreshToken) {
        throw new Error('No valid session found');
      }

      // Validate the current session by fetching the user profile
      const response = await getProfile();
      if (response.user) {
        setUser(response.user);
        return true;
      } else {
        logout();
        return false;
      }
    } catch (error) {
      console.error('Session validation error:', error);
      logout();
      return false;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        setError(null);

        const storedUser = safeJSONParse(localStorage.getItem('user'));
        const token = localStorage.getItem('token');
        const refreshToken = localStorage.getItem('refreshToken');

        if (storedUser && token && refreshToken) {
          const isValid = await validateSession();
          if (!isValid) {
            logout();
            setError('Your session has expired. Please log in again.');
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        setError('An error occurred during authentication.');
        logout();
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = async (userData, token, refreshToken) => {
    try {
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('isAuthenticated', 'true'); // Ensure consistent state

      // Navigate based on user role
      if (userData.role === 'patient') {
        navigate('/patient/dashboard');
      } else if (userData.role === 'doctor') {
        navigate('/doctor/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.message);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.clear(); // Clear all localStorage data
    navigate('/login');
  };

  const updateUser = (updates) => {
    setUser((prev) => ({
      ...prev,
      ...updates,
    }));
    const storedUser = safeJSONParse(localStorage.getItem('user'));
    if (storedUser) {
      localStorage.setItem(
        'user',
        JSON.stringify({
          ...storedUser,
          ...updates,
        })
      );
    }
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateUser,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
