import React from 'react';
import { Link } from 'react-router-dom';
import { FaImage, FaDiagnoses, FaStethoscope, FaBook } from 'react-icons/fa'; // Importing icons

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/image-upload">
            <FaImage /> Image Upload
          </Link>
        </li>
        <li>
          <Link to="/diagnosis-results">
            <FaDiagnoses /> Diagnosis Results
          </Link>
        </li>
        <li>
          <Link to="/treatment-advice">
            <FaStethoscope /> Treatment Advice
          </Link>
        </li>
        <li>
          <Link to="/education-content">
            <FaBook /> Education Content
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
