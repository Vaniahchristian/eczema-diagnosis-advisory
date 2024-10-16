// src/components/Sidebar.jsx
import React, { useState } from "react";
import { 
  FaChevronLeft, 
  FaChevronRight, 
  FaUserCircle, 
  FaTachometerAlt, 
  FaImage, 
  FaClipboardCheck,
  FaInfoCircle, 
  FaStethoscope, 
  FaBook 
} from "react-icons/fa";
import SidebarContext from "../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => setExpanded((prev) => !prev);

  // Placeholder user data
  const user = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    avatar: "", // Optional: URL to user's avatar
  };

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      <aside
        className={`h-screen bg-white dark:bg-gray-800 border-r shadow-sm flex flex-col transition-all duration-300 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <img
            src="https://img.logoipsum.com/243.svg"
            alt="Company Logo"
            className={`transition-all duration-300 ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          {/* Toggle Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2">
          <ul className="mt-4">
            {/* Dashboard */}
            <SidebarItem
              icon={<FaTachometerAlt />}
              label="Dashboard"
              to="/dashboard"
            />

            {/* Image Upload */}
            <SidebarItem
              icon={<FaImage />}
              label="Image Upload"
              to="/image-upload"
            />

            {/* Diagnosis Results */}
            <SidebarItem
              icon={<FaClipboardCheck />}
              label="Diagnosis Results"
              to="/diagnosis-results"
              alert={true} // Example: Show alert if needed
            />

            {/* Treatment Advice */}
            <SidebarItem
              icon={<FaStethoscope />}
              label="Treatment Advice"
              to="/treatment-advice"
              alert={true} // Example: Show alert if needed
            />

            {/* Education Content */}
            <SidebarItem
              icon={<FaBook />}
              label="Education Content"
              to="/education-content"
            />
            
            {/* About Us */}
            <SidebarItem
              icon={<FaInfoCircle />}
              label="About Us"
              to="/about"
            />
          </ul>
        </nav>

        {/* User Info Footer */}
        <div className="border-t p-4 flex items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={`${user.name}'s Avatar`}
              className="w-10 h-10 rounded-full"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
              <FaUserCircle className="text-gray-600" />
            </div>
          )}
          <div
            className={`flex items-center ml-3 transition-all duration-300 ${
              expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            <div>
              <h4 className="font-semibold text-gray-800 dark:text-gray-200">{user.name}</h4>
              <span className="text-sm text-gray-600 dark:text-gray-400">{user.email}</span>
            </div>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
