import React, { useState, useContext } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

// Demo users database
const demoUsers = {
  'admin@eczema.com': {
    email: 'admin@eczema.com',
    password: 'admin123',
    firstName: 'System',
    lastName: 'Administrator',
    role: 'admin',
    id: '1',
  },
  'doctor@example.com': {
    email: 'doctor@example.com',
    password: 'password123',
    firstName: 'John',
    lastName: 'Smith',
    role: 'doctor',
    id: '2',
  },
  'patient@example.com': {
    email: 'patient@example.com',
    password: 'password123',
    firstName: 'Jane',
    lastName: 'Doe',
    role: 'patient',
    id: '3',
  },
};

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'patient', // Default role
  });

  // Header specific to this page
  const Header = () => (
    <header className="w-full bg-transparent py-6 text-white text-center">
      <h1 className='text-2xl font-extrabold'>ECZEMA DIAGNOSIS AND ADVISORY SYSTEM</h1>
    </header>
  );

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
      setSuccessMessage('Successfully logged in!');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Navigate based on user role
      switch (user.role) {
        case 'admin':
          navigate('/admin/dashboard');
          break;
        case 'doctor':
          navigate('/doctor/dashboard');
          break;
        case 'patient':
          navigate('/patient/dashboard');
          break;
        default:
          throw new Error('Invalid user role');
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
        password: formData.password,
        firstName: formData.name,
        lastName: '',
        role: formData.role,
        id: `user-${Math.random()}`,
      };

      // Generate tokens
      const token = `demo-token-${Math.random()}`;
      const refreshToken = `demo-refresh-token-${Math.random()}`;

      // Login the new user
      await login(newUser, token, refreshToken);
      setSuccessMessage('Account created successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);

      // Navigation is handled by AuthContext
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Toggle between Login and Signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
      role: 'patient', // Reset to default role
    });
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-cover bg-center bg-[url('/public/eczema1.jpg')]">
      <Header />
      <div className="w-full px-4 py-8 sm:px-0 max-w-[95%] sm:max-w-[500px] mx-auto">
        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-lg shadow-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>

          {error && (
            <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}

          {successMessage && (
            <div className="mb-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              {successMessage}
            </div>
          )}

          <div className="flex justify-center mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`px-4 py-2 font-semibold text-sm rounded-l-lg focus:outline-none ${
                isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`px-4 py-2 font-semibold text-sm rounded-r-lg focus:outline-none ${
                !isLogin ? 'bg-indigo-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="role">
                    Select Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
              </>
            )}

            <div className="mb-4">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder={isLogin ? "Enter your password" : "Create a password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-600 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Login' : 'Sign Up')}
            </button>
          </form>

          {/* Demo Account Information */}
          <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Demo Accounts:
            </h3>
            <div className="space-y-1">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Admin:</strong> admin@eczema.com / admin123
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Doctor:</strong> doctor@example.com / password123
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Patient:</strong> patient@example.com / password123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
