import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Nav from 'react-bootstrap/Nav';
import Table from 'react-bootstrap/Table';

const GameStatsModal = ({ show, handleClose, game }) => {
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
        
        {activeTeam === 'team1' && (
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
        
        {activeTeam === 'team2' && (
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
      </Modal.Body>
    </Modal>
  );
};

export default GameStatsModal;