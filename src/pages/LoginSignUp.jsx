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
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center">
      <Header />
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isLogin ? 'Login' : 'Sign Up'}
        </h2>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={isLogin ? handleLogin : handleSignUp}>
          {!isLogin && (
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-400">
                  <FaUser />
                </span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Enter your name"
                />
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">
                <FaEnvelope />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2 text-gray-400">
                <FaLock />
              </span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Enter your password"
              />
            </div>
          </div>

          {!isLogin && (
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Role
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Please wait...' : isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-500 hover:text-indigo-600"
          >
            {isLogin
              ? "Don't have an account? Sign Up"
              : 'Already have an account? Login'}
          </button>
        </div>

        {/* Demo Account Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-bold text-gray-700 mb-2">Demo Accounts:</h3>
          <div className="text-xs text-gray-600">
            <p><strong>Admin:</strong> admin@eczema.com / admin123</p>
            <p><strong>Doctor:</strong> doctor@example.com / password123</p>
            <p><strong>Patient:</strong> patient@example.com / password123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
