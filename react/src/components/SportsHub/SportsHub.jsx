// SportsHub.jsx with dynamic Quick Select functionality
import React, { useState, useEffect } from 'react';
import './SportsHub.css';
import aiGifImage from './AIGif.gif';
import Scores from './Scores';
import TeamVideos from './TeamVideos';
import NewsArticles from './NewsArticles';
import FollowTeams from './FollowTeams';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'


const SportsHub = () => {
  // State for dropdown menu
  const [showDropdown, setShowDropdown] = useState(false);
  
  // State for active sport tab
  const [activeSport, setActiveSport] = useState('NBA');
  
  // State for selected team
  const [selectedTeam, setSelectedTeam] = useState('Lakers');

  // State for followed teams
  const [followedTeams, setFollowedTeams] = useState([
    'Los Angeles Lakers', 'Dallas Mavericks', 'Texas Rangers', 'Dallas Cowboys'
  ]);

  // State for quick select teams for each sport
  const [quickSelectTeams, setQuickSelectTeams] = useState({
    NBA: ['Lakers', 'Warriors', 'Celtics'],
    NFL: ['Cowboys', 'Chiefs', 'Eagles'],
    MLB: ['Yankees', 'Dodgers', 'Red Sox']
  });

  // State for chatbot
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hi there! I\'m your Sports Assistant. Ask me anything about your favorite teams, players, or games!' }
  ]);
  const [userInput, setUserInput] = useState('');
  const [showChat, setShowChat] = useState(false);
  
  // Function to update quick select teams for a specific sport
  const updateQuickSelect = (sport, teams) => {
    setQuickSelectTeams(prev => ({
      ...prev,
      [sport]: teams.length > 0 ? teams.slice(0, 3) : prev[sport]
    }));
  };
  
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
  
  // Function to change selected team
  const changeTeam = (team) => {
    setSelectedTeam(team);
    // Add a chatbot message when team changes
    const newMessage = { 
      sender: 'bot', 
      text: `Team changed to ${team}! I can provide you with the latest ${team} news and stats. What would you like to know?` 
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  // Function to handle following a new team
  const handleTeamFollow = (team) => {
    if (!followedTeams.includes(team)) {
      setFollowedTeams([...followedTeams, team]);
    }
  };

  // Function to handle removing a team from followed teams
  const handleTeamRemove = (team) => {
    setFollowedTeams(followedTeams.filter(t => t !== team));
  };

  // Function to handle sport tab change
  const handleSportChange = (sport) => {
    setActiveSport(sport);
    // Set default team for the selected sport to the first quick select team
    setSelectedTeam(quickSelectTeams[sport][0]);
    // Add a chatbot message when sport changes
    const newMessage = { 
      sender: 'bot', 
      text: `Switched to ${sport}! I can help you with ${sport} information. What would you like to know about the ${quickSelectTeams[sport][0]}?` 
    };
    setChatMessages([...chatMessages, newMessage]);
  };

  // Function to handle chatbot input submission
  const handleChatSubmit = (e) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    // Add user message to chat
    const newUserMessage = { sender: 'user', text: userInput };
    setChatMessages([...chatMessages, newUserMessage]);
    
    // Process and generate response
    setTimeout(() => {
      const botResponse = generateBotResponse(userInput, selectedTeam, activeSport);
      setChatMessages(prevMessages => [...prevMessages, { sender: 'bot', text: botResponse }]);
    }, 600);
    
    setUserInput('');
  };

  // Function to generate bot responses based on input
  const generateBotResponse = (input, team, sport) => {
    input = input.toLowerCase();
    
    if (input.includes('score') || input.includes('game') || input.includes('result')) {
      return `The latest ${team} game ended 112-104. They're scheduled to play again this weekend.`;
    } else if (input.includes('player') || input.includes('roster') || input.includes('team member')) {
      return `${team} has several star players in their roster. Would you like me to list the key players?`;
    } else if (input.includes('stats') || input.includes('statistics')) {
      return `${team} is currently ranked 3rd in their division with a record of 24-14.`;
    } else if (input.includes('news') || input.includes('update')) {
      return `The latest news for ${team}: Their star player has recovered from injury and will play in the next game.`;
    } else if (input.includes('hi') || input.includes('hello') || input.includes('hey')) {
      return `Hey there! How can I help you with ${sport} information today?`;
    } else {
      return `I'm not sure about that regarding ${team}. Would you like to know about their recent games, players, or stats?`;
    }
  };

  // Toggle chat window
  const toggleChat = () => {
    setShowChat(!showChat);
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
      <header className="sports-hub-header py-2 border-bottom">
        <div className="container-fluid d-flex align-items-center">
          {/* Left side with back button, title and navigation tabs */}
          <div className="d-flex align-items-center flex-grow-1">
            <button className="btn back-btn me-3" onClick={() => window.location.href='index.html'}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            
            <h1 className="sports-hub-title fs-4 mb-0 me-4">SportsHub</h1>
            
            <nav className="sports-tabs ms-1">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeSport === 'NBA' ? 'active' : ''} px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange('NBA');
                    }}
                  >
                    NBA
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeSport === 'NFL' ? 'active' : ''} px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange('NFL');
                    }}
                  >
                    NFL
                  </a>
                </li>
                <li className="nav-item">
                  <a 
                    className={`nav-link ${activeSport === 'MLB' ? 'active' : ''} px-3 py-1`}
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSportChange('MLB');
                    }}
                  >
                    MLB
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          
          {/* Right side with add sport button */}
          <div className="ms-auto">
            <button className="btn btn-outline-primary add-sport-btn" style={{fontSize: '0.875rem'}}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="me-1">
                <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Add Sport</span>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area - Modern Layout */}
      <main className="modern-content">
        {/* Main Column - News and Videos */}
        <div className="main-column">
          {/* Team Info Banner */}
          <section className="modern-card team-banner">
            <h2 className="modern-section-title">Currently Viewing: {selectedTeam}</h2>
            <div className="team-selection">
              <p>Quick Select:</p>
              <div className="team-buttons">
                {quickSelectTeams[activeSport].map((team) => (
                  <button 
                    key={team}
                    className={`btn btn-sm ${selectedTeam === team ? 'btn-primary' : 'btn-outline-primary'}`} 
                    onClick={() => changeTeam(team)}
                  >
                    {team}
                  </button>
                ))}
              </div>
            </div>
          </section>
          

          {/* News Section */}
          <section className="modern-card news-section">
            <h2 className="modern-section-title">Team News</h2>
            <NewsArticles team={selectedTeam} sport={activeSport} />
          </section>
          
          {/* Video Section */}
          <section className="modern-card video-section">
            <h2 className="modern-section-title">Team Videos</h2>
            <TeamVideos team={selectedTeam} sport={activeSport} />
          </section>
          
          {/* Scores Section */}
          <section className="modern-card news-section">
            <h2 className="modern-section-title">Latest Scores</h2>
            <Scores team={selectedTeam} sport={activeSport} />
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
        </div>
        
        {/* Sidebar Column - AI Assistant and Team Following */}
        <div className="sidebar-column">
          {/* AI Assistant Section - Now with Chatbot */}
          <section className="modern-card ai-assistant">
            <h2 className="modern-section-title">AI Assistant</h2>
            <div className="assistant-content">
              <div className="assistant-avatar">
                {/* Using the imported AIGif.gif image instead of SVG */}
                <img 
                  src={aiGifImage} 
                  alt="AI Assistant animated icon" 
                  className="assistant-gif"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '50%'
                  }}
                />
              </div>
              <div className="assistant-actions">
                <button className="modern-button assistant-button" onClick={toggleChat}>
                  {showChat ? 'Close Chat' : 'Chat with Assistant'}
                </button>
              </div>
            </div>
            
            {/* Chatbot Interface - iOS style with wider message bar */}
            {showChat && (
              <div className="chatbot-container mt-3">
                {/* Chat messages area */}
                <div className="chat-messages p-3 border rounded" style={{
                  height: '250px', 
                  overflowY: 'auto', 
                  backgroundColor: '#f0f0f0', /* Light gray background similar to iOS */
                  backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0.7) 100%)',
                  width: '100%' /* Ensure full width */
                }}>
                  {chatMessages.map((msg, index) => (
                    <div key={index} className={`chat-message ${msg.sender === 'user' ? 'user-message text-end mb-3' : 'bot-message mb-3'}`}>
                      <div 
                        className={`message-bubble d-inline-block p-2 rounded-3`} 
                        style={{
                          maxWidth: '75%', /* Slightly reduced to ensure messages fit */
                          textAlign: 'left',
                          backgroundColor: msg.sender === 'user' ? '#1982FC' : '#e5e5ea', /* iOS-like colors */
                          color: msg.sender === 'user' ? 'white' : 'black',
                          borderRadius: '18px',
                          padding: '8px 12px',
                          boxShadow: '0 1px 1px rgba(0,0,0,0.1)',
                          marginLeft: msg.sender === 'bot' ? '0' : 'auto',
                          marginRight: msg.sender === 'user' ? '0' : 'auto',
                          position: 'relative',
                          wordBreak: 'break-word' /* Ensures long words don't overflow */
                        }}
                      >
                        {msg.text}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Input form - wider input with flexible layout */}
                <form 
                  onSubmit={handleChatSubmit} 
                  className="chat-input-form mt-2" 
                  style={{
                    display: 'flex',
                    width: '100%' /* Full width form */
                  }}
                >
                  <input 
                    type="text" 
                    className="form-control"
                    placeholder="Ask about sports, teams, or players..." 
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    style={{
                      borderRadius: '20px',
                      padding: '10px 50px',
                      border: '1px solid #ccc',
                      flexGrow: 1 /* This makes the input field take up all available space */
                    }}
                  />
                  <button 
                    type="submit" 
                    className="btn btn-primary ms-2"
                    style={{
                      borderRadius: '50%',
                      width: '40px',
                      height: '40px',
                      minWidth: '40px', /* Ensures the button doesn't shrink */
                      padding: '0',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0 /* Prevents button from shrinking */
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </form>
              </div>
            )}
          </section>
          
          {/* Team Following Section - Using the updated FollowTeams component */}
          <FollowTeams 
            activeSport={activeSport}
            onTeamFollow={handleTeamFollow}
            followedTeams={followedTeams}
            onTeamRemove={handleTeamRemove}
            onTeamSelect={changeTeam}
            updateQuickSelect={updateQuickSelect}
          />
        </div>
      </main>

      {/* Add responsive styles for mobile devices */}
      <style jsx>{`
        @media (max-width: 768px) {
          .modern-content {
            flex-direction: column;
          }
          
          .main-column, .sidebar-column {
            width: 100%;
          }
          
          .sidebar-column {
            margin-top: 1rem;
          }
          
          .chatbot-container {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default SportsHub;