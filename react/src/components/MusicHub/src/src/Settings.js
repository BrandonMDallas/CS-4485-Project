import React from 'react';
import { Link } from 'react-router-dom';

const Settings = () => {
  return (
    <div className="page-container">
      <h1>Settings</h1>
      <p>Adjust your account settings here.</p>
      <Link to="/music-hub" className="nav-link">Back to Music Hub</Link>
    </div>
  );
};

export default Settings;