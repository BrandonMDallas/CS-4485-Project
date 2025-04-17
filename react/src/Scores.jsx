import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const Scores = ({ team }) => {
  const [gamesData, setGamesData] = useState({
    completed: [],
    upcoming: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('completed'); // 'completed' or 'upcoming'
  
  // Map team nickname to API code (e.g., "Lakers" to "LAL")
  const teamNameToCode = {
    "Lakers": "LAL",
    "Warriors": "GS",
    "Celtics": "BOS",
    "Knicks": "NYK",
    "Nets": "BKN",
    "76ers": "PHI",
    "Heat": "MIA",
    "Bucks": "MIL",
    // Add more teams as needed
  };

  useEffect(() => {
    const fetchTeamGames = async () => {
      try {
        setLoading(true);
        
        // Get API key from environment variables or use the one provided
        const apiKey = "65d27f8fa91a4d339d05051b69d127bb";
        
        const teamCode = teamNameToCode[team]; // Default to Lakers if team not found
        const completedGames = [];
        const upcomingGames = [];
        
        const today = new Date();
        
        // Check past 14 days for completed games
        for (let i = 1; i <= 14; i++) {
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          const formattedDate = pastDate.toISOString().split("T")[0];
          
          try {
            const response = await fetch(
              `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${apiKey}`
            );
            
            if (response.ok) {
              const data = await response.json();
              const teamGames = data.filter(
                game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && 
                        game.Status === "Final"
              );
              
              if (teamGames.length > 0) {
                completedGames.push(...teamGames);
                if (completedGames.length >= 5) break; // Stop once we have 5 games
              }
            }
          } catch (err) {
            console.error("Fetch error (past):", err);
          }
        }
        
        // Check next 14 days for upcoming games
        for (let i = 0; i <= 14; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          const formattedDate = futureDate.toISOString().split("T")[0];
          
          try {
            const response = await fetch(
              `https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${apiKey}`
            );
            
            if (response.ok) {
              const data = await response.json();
              const teamGames = data.filter(
                game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && 
                        game.Status !== "Final"
              );
              
              if (teamGames.length > 0) {
                upcomingGames.push(...teamGames);
                if (upcomingGames.length >= 5) break; // Stop once we have 5 games
              }
            }
          } catch (err) {
            console.error("Fetch error (future):", err);
          }
        }
        
        // Map API team codes back to full names for display
        const teamCodeToName = {
          "LAL": "Lakers",
          "GS": "Warriors", 
          "BOS": "Celtics",
          "NYK": "Knicks",
          "BKN": "Nets",
          "PHI": "76ers",
          "MIA": "Heat",
          "MIL": "Bucks",
          // Add more teams as needed
        };
        
        // Transform the data to match our display needs
        const transformedCompleted = completedGames.map(game => ({
          DateTime: game.DateTime,
          HomeTeam: teamCodeToName[game.HomeTeam] || game.HomeTeam,
          AwayTeam: teamCodeToName[game.AwayTeam] || game.AwayTeam,
          HomeScore: game.HomeTeamScore,
          AwayScore: game.AwayTeamScore,
          Status: game.Status
        }));
        
        const transformedUpcoming = upcomingGames.map(game => ({
          DateTime: game.DateTime,
          HomeTeam: teamCodeToName[game.HomeTeam] || game.HomeTeam,
          AwayTeam: teamCodeToName[game.AwayTeam] || game.AwayTeam,
          Status: game.Status
        }));
        
        setGamesData({
          completed: transformedCompleted,
          upcoming: transformedUpcoming
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error fetching team games:", err);
        
        // Fallback to mock data if API call fails
        setGamesData({
          completed: [
            { HomeTeam: "Lakers", AwayTeam: "Warriors", HomeScore: 112, AwayScore: 105, DateTime: "2023-04-08T19:30:00" },
            { HomeTeam: "Celtics", AwayTeam: "Lakers", HomeScore: 98, AwayScore: 92, DateTime: "2023-04-05T19:00:00" }
          ],
          upcoming: [
            { HomeTeam: "Lakers", AwayTeam: "Nets", DateTime: "2023-04-15T20:00:00" },
            { HomeTeam: "Clippers", AwayTeam: "Lakers", DateTime: "2023-04-19T19:30:00" }
          ]
        });
        
        setError(`Couldn't load live data. Showing sample games.`);
        setLoading(false);
      }
    };

    fetchTeamGames();
  }, [team]);

  // Format date function for display in "Apr 8, 07:30 PM" format
  const formatGameDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${month} ${day}, ${time}`;
  };

  if (loading) return (
    <div className="modern-panel">
      <div className="d-flex justify-content-center p-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="modern-panel">
      <h2 className="mb-4">Latest Scores</h2>
      
      {error && (
        <div className="alert alert-warning mb-4" role="alert">
          {error}
        </div>
      )}
      
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`}
            onClick={() => setActiveTab('completed')}
          >
            Recent Games
          </button>
        </li>
        <li className="nav-item">
          <button 
            className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`}
            onClick={() => setActiveTab('upcoming')}
          >
            Upcoming Games
          </button>
        </li>
      </ul>
      
      <div className="tab-content">
        {/* Recent Games Tab */}
        <div className={`tab-pane ${activeTab === 'completed' ? 'active' : ''}`}>
          {gamesData.completed.length > 0 ? (
            gamesData.completed.map((game, index) => {
              const isHomeTeam = game.HomeTeam === team;
              const isAwayTeam = game.AwayTeam === team;
              const date = new Date(game.DateTime);
              const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
              
              return (
                <div key={index} className="border-bottom py-3">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        {formattedDate.split(',')[0]}
                        <span className={`ms-3 badge ${isHomeTeam ? 'bg-info' : 'bg-secondary'} text-white`}>
                          {isHomeTeam ? 'Home' : 'Away'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-8">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={isHomeTeam ? "text-primary fw-bold" : ""}>
                          {game.HomeTeam}
                        </span>
                        <span className="fw-bold">{game.HomeScore}</span>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={isAwayTeam ? "text-primary fw-bold" : ""}>
                          {game.AwayTeam}
                        </span>
                        <span className="fw-bold">{game.AwayScore}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted py-3">No recent games found for {team}</p>
          )}
        </div>
        
        {/* Upcoming Games Tab */}
        <div className={`tab-pane ${activeTab === 'upcoming' ? 'active' : ''}`}>
          {gamesData.upcoming.length > 0 ? (
            gamesData.upcoming.map((game, index) => {
              const isHomeTeam = game.HomeTeam === team;
              const isAwayTeam = game.AwayTeam === team;
              const date = new Date(game.DateTime);
              const formattedDate = `${date.toLocaleString('default', { month: 'short' })} ${date.getDate()}, ${date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
              
              return (
                <div key={index} className="border-bottom py-3">
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        {formattedDate.split(',')[0]}
                        <span className={`ms-3 badge ${isHomeTeam ? 'bg-info' : 'bg-secondary'} text-white`}>
                          {isHomeTeam ? 'Home' : 'Away'}
                        </span>
                      </div>
                    </div>
                    
                    <div className="col-8">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className={isHomeTeam ? "text-primary fw-bold" : ""}>
                          {game.HomeTeam}
                        </span>
                        <span className="fw-bold">vs</span>
                        <span className={isAwayTeam ? "text-primary fw-bold" : ""}>
                          {game.AwayTeam}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-muted py-3">No upcoming games found for {team}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Scores;