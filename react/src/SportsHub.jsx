// SportsHub.jsx with modern UI/UX
import React, { useState, useEffect } from 'react';
import './SportsHub.css';
import Scores from './scores';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'


const SportsHub = () => {
  // State for dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);
  
  // Function to toggle dropdown
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };
  
  // Function to handle window click to close dropdown
  const handleWindowClick = (event) => {
    if (!event.target.matches('.hamburger-menu') && 
        !event.target.matches('.hamburger-line')) {
      setShowDropdown(false);
    }
  };
  
  // Function to open settings window
  const openSettingsWindow = () => {
    window.open('sportsSettings.html', 'Settings Window Sports', 'top=100, left=100, width=400, height=500, status=1');
  };
  
  // Adding event listener for window clicks (equivalent to window.onclick)
  useEffect(() => {
    window.addEventListener('click', handleWindowClick);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);
  
  return (
    <div className="modern-container">
      {/* Header Navigation - Modern Redesign */}
      <header className="modern-header">
        <div className="header-content">
          <div className="header-left">
            <button className="modern-back-button" onClick={() => window.location.href='index.html'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center gap-3">
                  <h1 className="modern-title mb-0">SportsHub</h1>

                  <nav>
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a className="nav-link active" href="#">NBA</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">NFL</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">MLB</a>
                      </li>
                    </ul>
                  </nav>
                </div>

          </div>
          
          <div className="header-right">
          <button className="btn btn-outline-primary d-flex align-items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Add Widget</span>
            </button>
            
            <button className="btn btn-outline-primary d-flex align-items-center gap-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 20C18 16.6863 15.3137 14 12 14C8.68629 14 6 16.6863 6 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Profile</span>
            </button>
            
            <div className="modern-menu-container">
              <button className={`hamburger-menu ${showDropdown ? 'active' : ''}`} onClick={toggleDropdown}>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
                <span className="hamburger-line"></span>
              </button>
              
              <div className={`modern-dropdown ${showDropdown ? 'show' : ''}`}>
                <a href="#" className="dropdown-item">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 7H20M12 12H20M12 17H20M4 7H8M4 12H8M4 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>My Teams</span>
                </a>
                <a href="#" className="dropdown-item" onClick={openSettingsWindow}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>                  </svg>
                  <span>Settings</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content Area - Modern Layout */}
      <main className="modern-content">
        {/* Main Column - News and Videos */}
        <div className="main-column">
          {/* News Section */}
          <section className="modern-card news-section">
            <h2 className="modern-section-title">News of the Week</h2>
            <Scores />
            <div className="modern-panel">
              <h3 className="panel-title">Latest Events</h3>
              <div className="events-list">
                <p className="no-events">No events found</p>
              </div>
            </div>
            
            <div className="modern-panel">
              <h3 className="panel-title">Search Events</h3>
              <div className="modern-search">
                <input type="text" placeholder="Type here..." name="search" />
                <button type="submit" className="search-button">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </section>
          
          {/* Video Section */}
          <section className="modern-card video-section">
            <h2 className="modern-section-title">Watch the Latest Game</h2>
            
            <div className="main-video">
              <div className="video-placeholder">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 8L16 12L10 16V8Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <p>Main Video Player</p>
              </div>
            </div>
            
            <h3 className="subsection-title">Previous Games</h3>
            <div className="video-grid">
              <div className="video-thumbnail">
                <div className="thumbnail-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8L16 12L10 16V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>Lakers vs Warriors</p>
              </div>
              <div className="video-thumbnail">
                <div className="thumbnail-overlay">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 8L16 12L10 16V8Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>Celtics vs Bucks</p>
              </div>
            </div>
            
            <button className="btn btn-outline-primary w-10">
                View more videos
            </button>
            
            <h3 className="subsection-title">Search for Game Videos</h3>
            <div className="modern-search">
              <input type="text" placeholder="Type here..." name="search" />
              <button type="submit" className="search-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </section>
        </div>
        
        {/* Sidebar Column - AI Assistant and Team Following */}
        <div className="sidebar-column">
          {/* AI Assistant Section */}
          <section className="modern-card ai-assistant">
            <h2 className="modern-section-title">AI Assistant</h2>
            <div className="assistant-content">
              <div className="assistant-avatar">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M4.93 19.07L6.34 17.66" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.66 6.34L19.07 4.93" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div className="assistant-actions">
                <button className="modern-button assistant-button">
                  Get Recommendations
                </button>
              </div>
            </div>
          </section>
          
          {/* Team Following Section */}
          <section className="modern-card team-following">
            <h2 className="modern-section-title">Follow Teams</h2>
            <div className="modern-search">
              <input type="text" placeholder="Type team name here..." name="search" />
              <button type="submit" className="search-button">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <div className="team-info">
              <h3 className="team-section-title">Your Teams</h3>
              <div className="empty-teams">
                <p>(Enter a team to follow)</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SportsHub;
