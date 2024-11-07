import React, { createContext, useState, useEffect } from 'react';

// Create the AuthContext with default values
export const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  login: () => {},
  logout: () => {},
});

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // Safe JSON parsing helper function
  const safeParseJSON = (value) => {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      return null;
    }
  };

  // Check if 'isAuthenticated' exists; if not, set it to false
  useEffect(() => {
    if (localStorage.getItem('isAuthenticated') === null) {
      localStorage.setItem('isAuthenticated', JSON.stringify(false));
    }

    // Load auth state from localStorage
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');

    if (storedAuth === 'true') {
      setIsAuthenticated(true);
      setUser(safeParseJSON(storedUser));
    }
  }, []);

  // Login function to set authentication and user data
  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Logout function to clear authentication and user data
  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
