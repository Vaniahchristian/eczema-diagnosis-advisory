// src/components/SidebarItem.jsx
import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import SidebarContext from "../contexts/SidebarContext";

const SidebarItem = React.memo(({ icon, label, to, alert }) => {
  const { expanded } = useContext(SidebarContext);

  return (
    <li className="relative group">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `flex items-center p-2 my-1 rounded-md transition-colors ${
            isActive
              ? "bg-indigo-100 dark:bg-indigo-700 text-indigo-700 dark:text-white"
              : "text-gray-600 dark:text-gray-300 hover:bg-indigo-50 dark:hover:bg-indigo-600 hover:text-indigo-600 dark:hover:text-white"
          }`
        }
      >
        <span className="text-lg">{icon}</span>
        <span
          className={`ml-3 text-sm font-medium transition-all duration-300 ${
            expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
          }`}
        >
          {label}
        </span>
        {alert && expanded && (
          <span className="ml-auto w-2 h-2 bg-red-500 rounded-full"></span>
        )}
      </NavLink>

      {/* Tooltip for collapsed sidebar */}
      {!expanded && (
        <span className="absolute left-full ml-2 whitespace-nowrap bg-gray-800 dark:bg-gray-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {label}
        </span>
      )}
    </li>
  );
});

export default SidebarItem;
