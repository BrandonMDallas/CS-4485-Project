import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ScoreArrows = ({ league = 'NBA' }) => {
  // Sample data for different leagues
  const [allScorePages, setAllScorePages] = useState({
    NBA: [
      // NBA Scores - Page 1
      [
        { homeTeam: "Lakers", homeScore: 112, awayTeam: "Warriors", awayScore: 105 },
        { homeTeam: "Celtics", homeScore: 98, awayTeam: "Bucks", awayScore: 92 }
      ],
      // NBA Scores - Page 2
      [
        { homeTeam: "Heat", homeScore: 115, awayTeam: "Knicks", awayScore: 109 },
        { homeTeam: "76ers", homeScore: 104, awayTeam: "Nets", awayScore: 99 }
      ]
    ],
    NFL: [
      // NFL Scores - Page 1
      [
        { homeTeam: "Chiefs", homeScore: 28, awayTeam: "Raiders", awayScore: 24 },
        { homeTeam: "Eagles", homeScore: 31, awayTeam: "Cowboys", awayScore: 27 }
      ],
      // NFL Scores - Page 2
      [
        { homeTeam: "Packers", homeScore: 35, awayTeam: "Bears", awayScore: 17 },
        { homeTeam: "49ers", homeScore: 24, awayTeam: "Seahawks", awayScore: 21 }
      ]
    ],
    MLB: [
      // MLB Scores - Page 1
      [
        { homeTeam: "Yankees", homeScore: 5, awayTeam: "Red Sox", awayScore: 3 },
        { homeTeam: "Dodgers", homeScore: 8, awayTeam: "Giants", awayScore: 5 }
      ],
      // MLB Scores - Page 2
      [
        { homeTeam: "Cubs", homeScore: 4, awayTeam: "Cardinals", awayScore: 2 },
        { homeTeam: "Braves", homeScore: 6, awayTeam: "Mets", awayScore: 3 }
      ]
    ]
  });

  // Current page index
  const [currentPage, setCurrentPage] = useState(0);
  
  // Reset current page when league changes
  useEffect(() => {
    setCurrentPage(0);
  }, [league]);

  // Get the scores for the current league
  const leagueScores = allScorePages[league] || allScorePages.NBA;

  return (
    <div className="modern-panel">
      <div className="d-flex align-items-center">
        {/* Left arrow */}
        <button 
          className="btn btn-light border d-flex align-items-center justify-content-center" 
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
        </button>

        {/* Score card content */}
        <div className="flex-grow-1 mx-3">
          <h3 className="panel-title">Latest {league} Results</h3>
          <div className="results-container">
            {leagueScores[currentPage].map((game, index) => (
              <div key={index} className="result-item">
                <div className="team-matchup">
                  <span className="team">{game.homeTeam}</span>
                  <span className="score">{game.homeScore}</span>
                </div>
                <div className="versus">vs</div>
                <div className="team-matchup">
                  <span className="team">{game.awayTeam}</span>
                  <span className="score">{game.awayScore}</span>
                </div>
              </div>
            ))}
            
            {/* Page indicators */}
            <div className="text-center mt-3">
              {leagueScores.map((_, idx) => (
                <span 
                  key={idx}
                  style={{
                    display: 'inline-block',
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    backgroundColor: currentPage === idx ? '#007bff' : '#dee2e6',
                    margin: '0 4px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setCurrentPage(idx)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right arrow */}
        <button 
          className="btn btn-light border d-flex align-items-center justify-content-center" 
          style={{ width: '40px', height: '40px', borderRadius: '50%' }}
          onClick={() => setCurrentPage(prev => Math.min(leagueScores.length - 1, prev + 1))}
          disabled={currentPage === leagueScores.length - 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ScoreArrows;
