import React from 'react';
import { Link } from 'react-router-dom';

const Favorites = () => {
  return (
    <div className="page-container">
      <h1>Your Favorites</h1>
      <p>Your favorite songs and playlists will appear here.</p>
      <Link to="/music-hub" className="nav-link">Back to Music Hub</Link>
    </div>
  );
};

export default Favorites;