import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';
import Tab from 'react-bootstrap/Tab';

const GameStatsModal = ({ show, handleClose, game, gameType }) => {
  const [activeTeam, setActiveTeam] = useState('team1');
  
  // If no game data is provided, show loading or error state
  if (!game) {
    return (
      <Modal 
        show={show} 
        onHide={handleClose} 
        size="lg" 
        centered
        className="game-stats-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="w-100 text-center">Game Stats</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center p-5">
          No game data available.
        </Modal.Body>
      </Modal>
    );
  }
  
  // Extract team data from the game prop
  const team1 = game.team1 || {};
  const team2 = game.team2 || {};
  const team1Players = team1.players || [];
  const team2Players = team2.players || [];
  const team1Stats = team1.teamStats || {};
  const team2Stats = team2.teamStats || {};
  const score = game.score || { team1: 0, team2: 0 };
  const innings = game.innings || [];
  
  // Determine if we're showing baseball or basketball stats
  const isBaseball = gameType === 'mlb';
  
  return (
    <Modal 
      show={show} 
      onHide={handleClose} 
      size="lg" 
      centered
      className="game-stats-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">
          <div className="d-flex justify-content-between align-items-center">
            <h5>{team1.name || 'Team 1'}</h5>
            <div className="score-display">
              <span className="h4 mx-2">{score.team1}</span>
              <span className="h5 text-muted mx-1">-</span>
              <span className="h4 mx-2">{score.team2}</span>
            </div>
            <h5>{team2.name || 'Team 2'}</h5>
          </div>
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        {/* Innings scoreboard for baseball games */}
        {isBaseball && innings.length > 0 && (
          <div className="innings-scoreboard mb-4">
            <h6 className="text-center mb-3">Scoring by Innings</h6>
            <Table bordered size="sm" className="text-center">
              <thead>
                <tr>
                  <th>Team</th>
                  {innings.map((_, idx) => (
                    <th key={idx}>{idx + 1}</th>
                  ))}
                  <th>R</th>
                  <th>H</th>
                  <th>E</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{team1.name}</td>
                  {innings.map((inning, idx) => (
                    <td key={idx}>{inning.team1 || 0}</td>
                  ))}
                  <td><strong>{team1Stats.runs || 0}</strong></td>
                  <td>{team1Stats.hits || 0}</td>
                  <td>{team1Stats.errors || 0}</td>
                </tr>
                <tr>
                  <td>{team2.name}</td>
                  {innings.map((inning, idx) => (
                    <td key={idx}>{inning.team2 || 0}</td>
                  ))}
                  <td><strong>{team2Stats.runs || 0}</strong></td>
                  <td>{team2Stats.hits || 0}</td>
                  <td>{team2Stats.errors || 0}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        )}
      
        <Nav variant="tabs" className="mb-3">
          <Nav.Item>
            <Nav.Link 
              active={activeTeam === 'team1'} 
              onClick={() => setActiveTeam('team1')}
            >
              {team1.name || 'Team 1'} Stats
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link 
              active={activeTeam === 'team2'} 
              onClick={() => setActiveTeam('team2')}
            >
              {team2.name || 'Team 2'} Stats
            </Nav.Link>
          </Nav.Item>
        </Nav>
        
        {/* Basketball Stats View */}
        {!isBaseball && activeTeam === 'team1' && (
          <div className="team-stats">
            <h6 className="text-center mb-3">Player Stats</h6>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>PTS</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>FG</th>
                  <th>3PT</th>
                  <th>FT</th>
                  <th>MIN</th>
                </tr>
              </thead>
              <tbody>
                {team1Players.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.points}</td>
                    <td>{player.rebounds}</td>
                    <td>{player.assists}</td>
                    <td>{player.steals}</td>
                    <td>{player.blocks}</td>
                    <td>{player.fg}</td>
                    <td>{player.threePt}</td>
                    <td>{player.ft}</td>
                    <td>{player.minutes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <h6 className="text-center mb-3 mt-4">Team Stats</h6>
            <div className="row">
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Field Goal %</td>
                      <td>{team1Stats.fgPercentage}</td>
                    </tr>
                    <tr>
                      <td>3-Point %</td>
                      <td>{team1Stats.threePtPercentage}</td>
                    </tr>
                    <tr>
                      <td>Free Throw %</td>
                      <td>{team1Stats.ftPercentage}</td>
                    </tr>
                    <tr>
                      <td>Rebounds</td>
                      <td>{team1Stats.rebounds}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Assists</td>
                      <td>{team1Stats.assists}</td>
                    </tr>
                    <tr>
                      <td>Steals</td>
                      <td>{team1Stats.steals}</td>
                    </tr>
                    <tr>
                      <td>Blocks</td>
                      <td>{team1Stats.blocks}</td>
                    </tr>
                    <tr>
                      <td>Turnovers</td>
                      <td>{team1Stats.turnovers}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
        
        {!isBaseball && activeTeam === 'team2' && (
          <div className="team-stats">
            <h6 className="text-center mb-3">Player Stats</h6>
            <Table striped bordered hover responsive size="sm">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>PTS</th>
                  <th>REB</th>
                  <th>AST</th>
                  <th>STL</th>
                  <th>BLK</th>
                  <th>FG</th>
                  <th>3PT</th>
                  <th>FT</th>
                  <th>MIN</th>
                </tr>
              </thead>
              <tbody>
                {team2Players.map((player, index) => (
                  <tr key={index}>
                    <td>{player.name}</td>
                    <td>{player.points}</td>
                    <td>{player.rebounds}</td>
                    <td>{player.assists}</td>
                    <td>{player.steals}</td>
                    <td>{player.blocks}</td>
                    <td>{player.fg}</td>
                    <td>{player.threePt}</td>
                    <td>{player.ft}</td>
                    <td>{player.minutes}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            
            <h6 className="text-center mb-3 mt-4">Team Stats</h6>
            <div className="row">
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Field Goal %</td>
                      <td>{team2Stats.fgPercentage}</td>
                    </tr>
                    <tr>
                      <td>3-Point %</td>
                      <td>{team2Stats.threePtPercentage}</td>
                    </tr>
                    <tr>
                      <td>Free Throw %</td>
                      <td>{team2Stats.ftPercentage}</td>
                    </tr>
                    <tr>
                      <td>Rebounds</td>
                      <td>{team2Stats.rebounds}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Assists</td>
                      <td>{team2Stats.assists}</td>
                    </tr>
                    <tr>
                      <td>Steals</td>
                      <td>{team2Stats.steals}</td>
                    </tr>
                    <tr>
                      <td>Blocks</td>
                      <td>{team2Stats.blocks}</td>
                    </tr>
                    <tr>
                      <td>Turnovers</td>
                      <td>{team2Stats.turnovers}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
        
        {/* Baseball Stats View */}
        {isBaseball && activeTeam === 'team1' && (
          <div className="team-stats">
            <Tab.Container defaultActiveKey="batting">
              <Nav variant="pills" className="mb-3 justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="batting">Batting</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="pitching">Pitching</Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Tab.Content>
                <Tab.Pane eventKey="batting">
                  <h6 className="text-center mb-3">Batting Stats</h6>
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>AB</th>
                        <th>R</th>
                        <th>H</th>
                        <th>RBI</th>
                        <th>HR</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>AVG</th>
                        <th>OPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team1Players
                        .filter(player => player.battingStats)
                        .map((player, index) => (
                          <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.battingStats?.atBats || 0}</td>
                            <td>{player.battingStats?.runs || 0}</td>
                            <td>{player.battingStats?.hits || 0}</td>
                            <td>{player.battingStats?.rbi || 0}</td>
                            <td>{player.battingStats?.homeRuns || 0}</td>
                            <td>{player.battingStats?.walks || 0}</td>
                            <td>{player.battingStats?.strikeouts || 0}</td>
                            <td>{player.battingStats?.average || '.000'}</td>
                            <td>{player.battingStats?.ops || '.000'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="pitching">
                  <h6 className="text-center mb-3">Pitching Stats</h6>
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>IP</th>
                        <th>H</th>
                        <th>R</th>
                        <th>ER</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>HR</th>
                        <th>ERA</th>
                        <th>WHIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team1Players
                        .filter(player => player.pitchingStats)
                        .map((player, index) => (
                          <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.pitchingStats?.inningsPitched || 0}</td>
                            <td>{player.pitchingStats?.hitsAllowed || 0}</td>
                            <td>{player.pitchingStats?.runsAllowed || 0}</td>
                            <td>{player.pitchingStats?.earnedRuns || 0}</td>
                            <td>{player.pitchingStats?.walksAllowed || 0}</td>
                            <td>{player.pitchingStats?.strikeouts || 0}</td>
                            <td>{player.pitchingStats?.homerunsAllowed || 0}</td>
                            <td>{player.pitchingStats?.era || '0.00'}</td>
                            <td>{player.pitchingStats?.whip || '0.00'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            
            <h6 className="text-center mb-3 mt-4">Team Stats</h6>
            <div className="row">
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Runs</td>
                      <td>{team1Stats.runs || 0}</td>
                    </tr>
                    <tr>
                      <td>Hits</td>
                      <td>{team1Stats.hits || 0}</td>
                    </tr>
                    <tr>
                      <td>Errors</td>
                      <td>{team1Stats.errors || 0}</td>
                    </tr>
                    <tr>
                      <td>Left on Base</td>
                      <td>{team1Stats.leftOnBase || 0}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Home Runs</td>
                      <td>{team1Stats.homeRuns || 0}</td>
                    </tr>
                    <tr>
                      <td>Batting Avg</td>
                      <td>{team1Stats.battingAvg || '.000'}</td>
                    </tr>
                    <tr>
                      <td>Team ERA</td>
                      <td>{team1Stats.era || '0.00'}</td>
                    </tr>
                    <tr>
                      <td>Double Plays</td>
                      <td>{team1Stats.doublePlays || 0}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
        
        {isBaseball && activeTeam === 'team2' && (
          <div className="team-stats">
            <Tab.Container defaultActiveKey="batting">
              <Nav variant="pills" className="mb-3 justify-content-center">
                <Nav.Item>
                  <Nav.Link eventKey="batting">Batting</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="pitching">Pitching</Nav.Link>
                </Nav.Item>
              </Nav>
              
              <Tab.Content>
                <Tab.Pane eventKey="batting">
                  <h6 className="text-center mb-3">Batting Stats</h6>
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>AB</th>
                        <th>R</th>
                        <th>H</th>
                        <th>RBI</th>
                        <th>HR</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>AVG</th>
                        <th>OPS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team2Players
                        .filter(player => player.battingStats)
                        .map((player, index) => (
                          <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.battingStats?.atBats || 0}</td>
                            <td>{player.battingStats?.runs || 0}</td>
                            <td>{player.battingStats?.hits || 0}</td>
                            <td>{player.battingStats?.rbi || 0}</td>
                            <td>{player.battingStats?.homeRuns || 0}</td>
                            <td>{player.battingStats?.walks || 0}</td>
                            <td>{player.battingStats?.strikeouts || 0}</td>
                            <td>{player.battingStats?.average || '.000'}</td>
                            <td>{player.battingStats?.ops || '.000'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
                <Tab.Pane eventKey="pitching">
                  <h6 className="text-center mb-3">Pitching Stats</h6>
                  <Table striped bordered hover responsive size="sm">
                    <thead>
                      <tr>
                        <th>Player</th>
                        <th>IP</th>
                        <th>H</th>
                        <th>R</th>
                        <th>ER</th>
                        <th>BB</th>
                        <th>SO</th>
                        <th>HR</th>
                        <th>ERA</th>
                        <th>WHIP</th>
                      </tr>
                    </thead>
                    <tbody>
                      {team2Players
                        .filter(player => player.pitchingStats)
                        .map((player, index) => (
                          <tr key={index}>
                            <td>{player.name}</td>
                            <td>{player.pitchingStats?.inningsPitched || 0}</td>
                            <td>{player.pitchingStats?.hitsAllowed || 0}</td>
                            <td>{player.pitchingStats?.runsAllowed || 0}</td>
                            <td>{player.pitchingStats?.earnedRuns || 0}</td>
                            <td>{player.pitchingStats?.walksAllowed || 0}</td>
                            <td>{player.pitchingStats?.strikeouts || 0}</td>
                            <td>{player.pitchingStats?.homerunsAllowed || 0}</td>
                            <td>{player.pitchingStats?.era || '0.00'}</td>
                            <td>{player.pitchingStats?.whip || '0.00'}</td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </Tab.Pane>
              </Tab.Content>
            </Tab.Container>
            
            <h6 className="text-center mb-3 mt-4">Team Stats</h6>
            <div className="row">
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Runs</td>
                      <td>{team2Stats.runs || 0}</td>
                    </tr>
                    <tr>
                      <td>Hits</td>
                      <td>{team2Stats.hits || 0}</td>
                    </tr>
                    <tr>
                      <td>Errors</td>
                      <td>{team2Stats.errors || 0}</td>
                    </tr>
                    <tr>
                      <td>Left on Base</td>
                      <td>{team2Stats.leftOnBase || 0}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-md-6">
                <Table bordered size="sm">
                  <tbody>
                    <tr>
                      <td>Home Runs</td>
                      <td>{team2Stats.homeRuns || 0}</td>
                    </tr>
                    <tr>
                      <td>Batting Avg</td>
                      <td>{team2Stats.battingAvg || '.000'}</td>
                    </tr>
                    <tr>
                      <td>Team ERA</td>
                      <td>{team2Stats.era || '0.00'}</td>
                    </tr>
                    <tr>
                      <td>Double Plays</td>
                      <td>{team2Stats.doublePlays || 0}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </div>
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default GameStatsModal;