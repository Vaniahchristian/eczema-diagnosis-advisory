import React, { useState, useContext } from 'react';
import { FaUser, FaLock, FaEnvelope } from 'react-icons/fa';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
  
    if (!formData.email || !formData.password || (!isLogin && !formData.name)) {
      setError('Please fill in all required fields');
      return;
    }
  
    try {
      let response;
      if (isLogin) {
        response = await fetch('http://localhost:5000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: formData.email, password: formData.password }),
        });
      } else {
        response = await fetch('http://localhost:5000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      }
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }
  
      if (isLogin) {
        login();
        setSuccessMessage('Successfully logged in!');
        login(data.user); // Pass the user profile data to the login function
        navigate('/dashboard');
      } else {
        setSuccessMessage('Account created successfully!');
        navigate('/login');
      }

      // Clear success message after a few seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError(err.message);
    }
  };

  // Toggle between Login and Signup
  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      name: '',
      email: '',
      password: '',
    });
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-[url('/public/mum.jpg')]">
      <div className="absolute inset-0 bg-black opacity-50"></div>

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full z-10">
        {successMessage && (
          <p className="mb-4 text-green-500 text-center text-sm">
            {successMessage}
          </p>
        )}
        {error && (
          <p className="mb-4 text-red-500 text-center text-sm">
            {error}
          </p>
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

        <form onSubmit={handleSubmit}>
          {!isLogin && (
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
                  required={!isLogin}
                />
              </div>
            </div>
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
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
          <button onClick={toggleMode} className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 font-medium">
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginSignUp;
