import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Music Hub Home</h1>
      <p>Welcome to the Music Hub application!</p>
      <Link to="/music-hub" className="nav-link">Go to Music Hub</Link>
    </div>
  );
};

export default Home;