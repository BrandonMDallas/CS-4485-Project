import React from 'react';
import { Link } from 'react-router-dom';

const Profile = () => {
  return (
    <div className="page-container">
      <h1>Your Profile</h1>
      <p>Your profile information will appear here.</p>
      <Link to="/music-hub" className="nav-link">Back to Music Hub</Link>
    </div>
  );
};

export default Profile;