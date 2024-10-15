import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/image-upload">Image Upload</Link>
        </li>
        <li>
          <Link to="/diagnosis-results">Diagnosis Results</Link>
        </li>
        <li>
          <Link to="/treatment-advice">Treatment Advice</Link>
        </li>
        <li>
          <Link to="/education-content">Education Content</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
