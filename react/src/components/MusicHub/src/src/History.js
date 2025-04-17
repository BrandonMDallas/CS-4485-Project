import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  return (
    <div className="page-container">
      <h1>Listening History</h1>
      <p>Your listening history will appear here.</p>
      <Link to="/music-hub" className="nav-link">Back to Music Hub</Link>
    </div>
  );
};

export default History;