import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,  // Add user data here
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);  // New state for user profile

  // On component mount, check localStorage for auth status and user profile
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));  // Parse and set user data if it exists
    }
  }, []);

  // Function to handle login, now accepting user profile data
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));  // Store user data
  };

  // Function to handle logout
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');  // Clear user data from storage
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
