import React, { useContext } from 'react';
import { FaUserCircle, FaBell, FaQuestionCircle } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-lg border-b border-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        
        {/* Logo / Branding */}
        <div className="flex items-center space-x-2">
          <img
            src="medical1.png"  // Replace with the actual path to your logo
            alt="Eczema Advisory Logo"
            className="h-16 w-20"       // Adjust size as needed
          />
          <span className="text-2xl font-bold text-teal-500">
            Eczema Advisory
          </span>
        </div>
        
        {/* Quick Access Icons */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Notifications */}
          <Link to= "/notifications" className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300">
            <FaBell className="w-5 h-5" aria-label="Notifications" />
          </Link>

          {/* Help / Support */}
          <Link to="/faq" className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300">
            <FaQuestionCircle className="w-5 h-5" aria-label="Help and Support" />
          </Link>
        </div>
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/profile">
                <FaUserCircle className="text-gray-600 w-7 h-7 cursor-pointer hover:text-teal-500" />
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300">
                Login
              </button>
            </Link>
          )}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button className="text-gray-600 hover:text-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-300">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
