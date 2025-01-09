// src/pages/Profile.jsx
import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import axios from 'axios';

const Profile = () => {
  const { user, setUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: token },
        });
        setUser(response.data);
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
      }
    };

    if (!user) {
      fetchUserProfile();
    }
  }, [user, setUser]);

  if (!user) {
    return <p>Loading profile...</p>;  // Fallback for cases where user data is not yet loaded
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-700 dark:text-gray-200">User Profile</h1>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300"><strong>Full Name:</strong> {user.name}</p>
        </div>
        
        <div className="mb-4">
          <p className="text-gray-600 dark:text-gray-300"><strong>Email:</strong> {user.email}</p>
        </div>

        {/* Add other profile fields as needed */}
        
        <button 
          onClick={logout} 
          className="mt-6 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
