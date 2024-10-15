// src/components/Sidebar.jsx
import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaUserCircle } from "react-icons/fa";
import SidebarContext from "../contexts/SidebarContext";
import SidebarItem from "./SidebarItem";

const Sidebar = ({ children, user }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => setExpanded((prev) => !prev);

  return (
    <SidebarContext.Provider value={{ expanded, toggleSidebar }}>
      <aside
        className={`h-screen bg-white border-r shadow-sm flex flex-col transition-all duration-300 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <img
            src="https://img.logoipsum.com/243.svg"
            alt="Company Logo"
            className={`transition-all duration-300 ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          >
            {expanded ? <FaChevronLeft /> : <FaChevronRight />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-2">
          <ul className="mt-4">{children}</ul>
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
              <h4 className="font-semibold text-gray-800">{user.name}</h4>
              <span className="text-sm text-gray-600">{user.email}</span>
            </div>
          </div>
        </div>
      </aside>
    </SidebarContext.Provider>
  );
};

export default Sidebar;
