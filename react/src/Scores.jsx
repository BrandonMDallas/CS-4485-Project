import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import GameStatsModal from './GameDataModal.jsx';

const Scores = ({ team }) => {
  const [gamesData, setGamesData] = useState({ completed: [], upcoming: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('completed');
  const [selectedGame, setSelectedGame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [gameStatsLoading, setGameStatsLoading] = useState(false);

  const apiKey = "h";
  const teamNameToCode = {
    "Hawks": "ATL",
    "Celtics": "BOS",
    "Nets": "BKN",
    "Hornets": "CHA",
    "Bulls": "CHI",
    "Cavaliers": "CLE",
    "Mavericks": "DAL",
    "Nuggets": "DEN",
    "Pistons": "DET",
    "Warriors": "GS",
    "Rockets": "HOU",
    "Pacers": "IND",
    "Clippers": "LAC",
    "Lakers": "LAL",
    "Grizzlies": "MEM",
    "Heat": "MIA",
    "Bucks": "MIL",
    "Timberwolves": "MIN",
    "Pelicans": "NOP",
    "Knicks": "NYK",
    "Thunder": "OKC",
    "Magic": "ORL",
    "76ers": "PHI",
    "Suns": "PHX",
    "Trail Blazers": "POR",
    "Kings": "SAC",
    "Spurs": "SAS",
    "Raptors": "TOR",
    "Jazz": "UTA",
    "Wizards": "WAS"
  };
  
  const teamCodeToName = {
    "ATL": "Hawks",
    "BOS": "Celtics",
    "BKN": "Nets",
    "CHA": "Hornets",
    "CHI": "Bulls",
    "CLE": "Cavaliers",
    "DAL": "Mavericks",
    "DEN": "Nuggets",
    "DET": "Pistons",
    "GS": "Warriors",
    "HOU": "Rockets",
    "IND": "Pacers",
    "LAC": "Clippers",
    "LAL": "Lakers",
    "MEM": "Grizzlies",
    "MIA": "Heat",
    "MIL": "Bucks",
    "MIN": "Timberwolves",
    "NOP": "Pelicans",
    "NYK": "Knicks",
    "OKC": "Thunder",
    "ORL": "Magic",
    "PHI": "76ers",
    "PHX": "Suns",
    "POR": "Trail Blazers",
    "SAC": "Kings",
    "SAS": "Spurs",
    "TOR": "Raptors",
    "UTA": "Jazz",
    "WAS": "Wizards"
  };
  useEffect(() => {
    const fetchTeamGames = async () => {
      try {
        setLoading(true);
        const teamCode = teamNameToCode[team];
        const completedGames = [];
        const upcomingGames = [];
        const today = new Date();

        for (let i = 1; i <= 14; i++) {
          const pastDate = new Date(today);
          pastDate.setDate(today.getDate() - i);
          const formattedDate = pastDate.toISOString().split("T")[0];
          try {
            const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${apiKey}`);
            if (res.ok) {
              const data = await res.json();
              const filtered = data.filter(game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && game.Status === "Final");
              completedGames.push(...filtered);
              if (completedGames.length >= 5) break;
            }
          } catch (err) { console.error("Past games fetch error:", err); }
        }

        for (let i = 0; i <= 14; i++) {
          const futureDate = new Date(today);
          futureDate.setDate(today.getDate() + i);
          const formattedDate = futureDate.toISOString().split("T")[0];
          try {
            const res = await fetch(`https://api.sportsdata.io/v3/nba/scores/json/GamesByDate/${formattedDate}?key=${apiKey}`);
            if (res.ok) {
              const data = await res.json();
              const filtered = data.filter(game => (game.HomeTeam === teamCode || game.AwayTeam === teamCode) && game.Status !== "Final");
              upcomingGames.push(...filtered);
              if (upcomingGames.length >= 5) break;
            }
          } catch (err) { console.error("Upcoming games fetch error:", err); }
        }

        setGamesData({
          completed: completedGames.map(game => ({
            GameID: game.GameID,
            DateTime: game.DateTime,
            HomeTeam: teamCodeToName[game.HomeTeam] || game.HomeTeam,
            AwayTeam: teamCodeToName[game.AwayTeam] || game.AwayTeam,
            HomeScore: game.HomeTeamScore,
            AwayScore: game.AwayTeamScore,
            Status: game.Status,
            Season: game.Season,
            HomeTeamID: game.HomeTeamID,
            AwayTeamID: game.AwayTeamID,
            HomeTeamCode: game.HomeTeam,
            AwayTeamCode: game.AwayTeam
          })),
          upcoming: upcomingGames.map(game => ({
            GameID: game.GameID,
            DateTime: game.DateTime,
            HomeTeam: teamCodeToName[game.HomeTeam] || game.HomeTeam,
            AwayTeam: teamCodeToName[game.AwayTeam] || game.AwayTeam,
            Status: game.Status,
            Season: game.Season,
            HomeTeamID: game.HomeTeamID,
            AwayTeamID: game.AwayTeamID,
            HomeTeamCode: game.HomeTeam,
            AwayTeamCode: game.AwayTeam
          }))
        });

        setLoading(false);
      } catch (err) {
        console.error("Error fetching games:", err);
        setGamesData({
          completed: [
            { GameID: 12345, HomeTeam: "Lakers", AwayTeam: "Warriors", HomeScore: 112, AwayScore: 105, DateTime: "2023-04-08T19:30:00", HomeTeamCode: "LAL", AwayTeamCode: "GSW" },
            { GameID: 12346, HomeTeam: "Celtics", AwayTeam: "Lakers", HomeScore: 98, AwayScore: 92, DateTime: "2023-04-05T19:00:00", HomeTeamCode: "BOS", AwayTeamCode: "LAL" }
          ],
          upcoming: [
            { GameID: 12347, HomeTeam: "Lakers", AwayTeam: "Nets", DateTime: "2023-04-15T20:00:00", HomeTeamCode: "LAL", AwayTeamCode: "BKN" },
            { GameID: 12348, HomeTeam: "Clippers", AwayTeam: "Lakers", DateTime: "2023-04-19T19:30:00", HomeTeamCode: "LAC", AwayTeamCode: "LAL" }
          ]
        });
        setError("Couldn't load live data. Showing sample games.");
        setLoading(false);
      }
    };

    fetchTeamGames();
  }, [team]);

  const formatGameDate = (dateString) => {
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    const day = date.getDate();
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
    return `${month} ${day}, ${time}`;
  };

  const fetchGameStats = async (game) => {
    try {
      setGameStatsLoading(true);
      
      // Get the game ID from the game object
      const gameId = game.GameID;
      
      // The correct endpoint for box scores is by game ID, not by date
      const res = await fetch(`https://api.sportsdata.io/v3/nba/stats/json/BoxScore/${gameId}?key=${apiKey}`);
      
      if (!res.ok) {
        throw new Error('Failed to fetch game stats');
      }
      
      const boxScoreData = await res.json();
      
      // Format the data for the GameStatsModal
      const team1 = {
        name: game.HomeTeam,
        teamStats: {
          fgPercentage: `${(boxScoreData.HomeTeamStats.FieldGoalsPercentage * 100).toFixed(1)}%`,
          threePtPercentage: `${(boxScoreData.HomeTeamStats.ThreePointersPercentage * 100).toFixed(1)}%`,
          ftPercentage: `${(boxScoreData.HomeTeamStats.FreeThrowsPercentage * 100).toFixed(1)}%`,
          rebounds: boxScoreData.HomeTeamStats.Rebounds,
          assists: boxScoreData.HomeTeamStats.Assists,
          steals: boxScoreData.HomeTeamStats.Steals,
          blocks: boxScoreData.HomeTeamStats.BlockedShots,
          turnovers: boxScoreData.HomeTeamStats.Turnovers
        },
        players: boxScoreData.PlayerGames
          .filter(player => player.Team === game.HomeTeamCode)
          .map(player => ({
            name: `${player.FirstName} ${player.LastName}`,
            points: player.Points,
            rebounds: player.Rebounds,
            assists: player.Assists,
            steals: player.Steals,
            blocks: player.BlockedShots,
            fg: `${player.FieldGoalsMade}-${player.FieldGoalsAttempted}`,
            threePt: `${player.ThreePointersMade}-${player.ThreePointersAttempted}`,
            ft: `${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`,
            minutes: player.Minutes
          }))
      };
      
      const team2 = {
        name: game.AwayTeam,
        teamStats: {
          fgPercentage: `${(boxScoreData.AwayTeamStats.FieldGoalsPercentage * 100).toFixed(1)}%`,
          threePtPercentage: `${(boxScoreData.AwayTeamStats.ThreePointersPercentage * 100).toFixed(1)}%`,
          ftPercentage: `${(boxScoreData.AwayTeamStats.FreeThrowsPercentage * 100).toFixed(1)}%`,
          rebounds: boxScoreData.AwayTeamStats.Rebounds,
          assists: boxScoreData.AwayTeamStats.Assists,
          steals: boxScoreData.AwayTeamStats.Steals,
          blocks: boxScoreData.AwayTeamStats.BlockedShots,
          turnovers: boxScoreData.AwayTeamStats.Turnovers
        },
        players: boxScoreData.PlayerGames
          .filter(player => player.Team === game.AwayTeamCode)
          .map(player => ({
            name: `${player.FirstName} ${player.LastName}`,
            points: player.Points,
            rebounds: player.Rebounds,
            assists: player.Assists,
            steals: player.Steals,
            blocks: player.BlockedShots,
            fg: `${player.FieldGoalsMade}-${player.FieldGoalsAttempted}`,
            threePt: `${player.ThreePointersMade}-${player.ThreePointersAttempted}`,
            ft: `${player.FreeThrowsMade}-${player.FreeThrowsAttempted}`,
            minutes: player.Minutes
          }))
      };
      
      // Format the final game object for the modal
      const formattedGame = {
        team1,
        team2,
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        }
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      
    } catch (err) {
      console.error("Error fetching game stats:", err);
      
      // Fall back to dummy data if the API call fails
      const formattedGame = {
        team1: {
          name: game.HomeTeam,
          teamStats: {
            fgPercentage: "47.8%",
            threePtPercentage: "38.2%",
            ftPercentage: "82.1%",
            rebounds: 42,
            assists: 26,
            steals: 7,
            blocks: 5,
            turnovers: 12
          },
          players: [
            { name: "Player 1", points: 28, rebounds: 8, assists: 11, steals: 2, blocks: 1, fg: "11-20", threePt: "3-7", ft: "3-4", minutes: 34 },
            { name: "Player 2", points: 24, rebounds: 12, assists: 3, steals: 1, blocks: 0, fg: "10-16", threePt: "3-3", ft: "4-5", minutes: 32 },
            { name: "Player 3", points: 17, rebounds: 6, assists: 6, steals: 1, blocks: 0, fg: "6-12", threePt: "4-8", ft: "1-1", minutes: 30 },
            { name: "Player 4", points: 14, rebounds: 4, assists: 4, steals: 1, blocks: 0, fg: "5-9", threePt: "2-4", ft: "2-2", minutes: 28 },
            { name: "Player 5", points: 12, rebounds: 6, assists: 1, steals: 0, blocks: 0, fg: "5-8", threePt: "2-3", ft: "0-0", minutes: 24 }
          ]
        },
        team2: {
          name: game.AwayTeam,
          teamStats: {
            fgPercentage: "45.1%",
            threePtPercentage: "35.7%",
            ftPercentage: "78.6%",
            rebounds: 38,
            assists: 22,
            steals: 5,
            blocks: 3,
            turnovers: 14
          },
          players: [
            { name: "Player A", points: 26, rebounds: 5, assists: 8, steals: 2, blocks: 0, fg: "10-18", threePt: "4-9", ft: "2-2", minutes: 33 },
            { name: "Player B", points: 21, rebounds: 4, assists: 2, steals: 1, blocks: 0, fg: "8-17", threePt: "5-10", ft: "0-0", minutes: 31 },
            { name: "Player C", points: 8, rebounds: 9, assists: 7, steals: 1, blocks: 2, fg: "3-6", threePt: "0-1", ft: "2-2", minutes: 29 },
            { name: "Player D", points: 14, rebounds: 5, assists: 2, steals: 0, blocks: 1, fg: "6-13", threePt: "2-5", ft: "0-0", minutes: 27 },
            { name: "Player E", points: 6, rebounds: 10, assists: 1, steals: 0, blocks: 0, fg: "3-4", threePt: "0-0", ft: "0-0", minutes: 22 }
          ]
        },
        score: {
          team1: game.HomeScore || 0,
          team2: game.AwayScore || 0
        }
      };
      
      setSelectedGame(formattedGame);
      setShowModal(true);
      setGameStatsLoading(false);
      setError("Couldn't load detailed game stats. Showing sample data.");
    }
  };

  const handleGameClick = (game) => {
    fetchGameStats(game);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedGame(null);
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
      {error && <div className="alert alert-warning mb-4">{error}</div>}
      <ul className="nav nav-tabs mb-4">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'completed' ? 'active' : ''}`} onClick={() => setActiveTab('completed')}>Recent Games</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'upcoming' ? 'active' : ''}`} onClick={() => setActiveTab('upcoming')}>Upcoming Games</button>
        </li>
      </ul>

      <div className="tab-content">
        <div className={`tab-pane ${activeTab === 'completed' ? 'active' : ''}`}>
          {gamesData.completed.length > 0 ? (
            gamesData.completed.map((game, idx) => {
              const isHomeTeam = game.HomeTeam === team;
              const formattedDate = formatGameDate(game.DateTime);
              const didWin = (isHomeTeam && game.HomeScore > game.AwayScore) || (!isHomeTeam && game.AwayScore > game.HomeScore);
              return (
                <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                  <div className="row align-items-center">
                    <div className="col-4">
                      <div className="d-flex align-items-center">
                        {formattedDate.split(',')[0]}
                        <span className={`ms-3 badge ${isHomeTeam ? 'bg-info' : 'bg-secondary'}`}>{isHomeTeam ? 'Home' : 'Away'}</span>
                      </div>
                    </div>
                    <div className="col-8">
                      <strong>{game.HomeTeam}</strong> {game.HomeScore} - {game.AwayScore} <strong>{game.AwayTeam}</strong>
                      <span className={`ms-2 badge ${didWin ? 'bg-success' : 'bg-danger'}`}>{didWin ? 'Win' : 'Loss'}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : <p>No completed games found.</p>}
        </div>

        <div className={`tab-pane ${activeTab === 'upcoming' ? 'active' : ''}`}>
          {gamesData.upcoming.length > 0 ? (
            gamesData.upcoming.map((game, idx) => (
              <div key={idx} className="border-bottom py-3" onClick={() => handleGameClick(game)} style={{ cursor: 'pointer' }}>
                <div className="row align-items-center">
                  <div className="col-4">
                    {formatGameDate(game.DateTime)}
                  </div>
                  <div className="col-8">
                    <strong>{game.HomeTeam}</strong> vs <strong>{game.AwayTeam}</strong>
                    <span className="ms-2 badge bg-warning text-dark">{game.Status}</span>
                  </div>
                </div>
              </div>
            ))
          ) : <p>No upcoming games found.</p>}
        </div>
      </div>

      {/* Loading indicator for game stats */}
      {gameStatsLoading && (
        <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading stats...</span>
          </div>
        </div>
      )}

      {/* Modal Component */}
      <GameStatsModal 
        show={showModal} 
        handleClose={handleCloseModal} 
        game={selectedGame} 
      />
    </div>
  );
};

export default Scores;