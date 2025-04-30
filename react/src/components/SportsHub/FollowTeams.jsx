// FollowTeams.jsx with inline styling and quick select integration
import React, { useState, useEffect, useRef } from 'react';

const FollowTeams = ({ activeSport, onTeamFollow, followedTeams, onTeamRemove, onTeamSelect, updateQuickSelect }) => {
  // All teams by sport in alphabetical order
  const allTeams = {
    NBA: [
      'Atlanta Hawks', 'Boston Celtics', 'Brooklyn Nets', 'Charlotte Hornets', 
      'Chicago Bulls', 'Cleveland Cavaliers', 'Dallas Mavericks', 'Denver Nuggets', 
      'Detroit Pistons', 'Golden State Warriors', 'Houston Rockets', 'Indiana Pacers', 
      'LA Clippers', 'Los Angeles Lakers', 'Memphis Grizzlies', 'Miami Heat', 
      'Milwaukee Bucks', 'Minnesota Timberwolves', 'New Orleans Pelicans', 'New York Knicks', 
      'Oklahoma City Thunder', 'Orlando Magic', 'Philadelphia 76ers', 'Phoenix Suns', 
      'Portland Trail Blazers', 'Sacramento Kings', 'San Antonio Spurs', 'Toronto Raptors', 
      'Utah Jazz', 'Washington Wizards'
    ],
    NFL: [
      'Arizona Cardinals', 'Atlanta Falcons', 'Baltimore Ravens', 'Buffalo Bills', 
      'Carolina Panthers', 'Chicago Bears', 'Cincinnati Bengals', 'Cleveland Browns', 
      'Dallas Cowboys', 'Denver Broncos', 'Detroit Lions', 'Green Bay Packers', 
      'Houston Texans', 'Indianapolis Colts', 'Jacksonville Jaguars', 'Kansas City Chiefs', 
      'Las Vegas Raiders', 'Los Angeles Chargers', 'Los Angeles Rams', 'Miami Dolphins', 
      'Minnesota Vikings', 'New England Patriots', 'New Orleans Saints', 'New York Giants', 
      'New York Jets', 'Philadelphia Eagles', 'Pittsburgh Steelers', 'San Francisco 49ers', 
      'Seattle Seahawks', 'Tampa Bay Buccaneers', 'Tennessee Titans', 'Washington Commanders'
    ],
    MLB: [
      'Arizona Diamondbacks', 'Atlanta Braves', 'Baltimore Orioles', 'Boston Red Sox', 
      'Chicago Cubs', 'Chicago White Sox', 'Cincinnati Reds', 'Cleveland Guardians', 
      'Colorado Rockies', 'Detroit Tigers', 'Houston Astros', 'Kansas City Royals', 
      'Los Angeles Angels', 'Los Angeles Dodgers', 'Miami Marlins', 'Milwaukee Brewers', 
      'Minnesota Twins', 'New York Mets', 'New York Yankees', 'Oakland Athletics', 
      'Philadelphia Phillies', 'Pittsburgh Pirates', 'San Diego Padres', 'San Francisco Giants', 
      'Seattle Mariners', 'St. Louis Cardinals', 'Tampa Bay Rays', 'Texas Rangers', 
      'Toronto Blue Jays', 'Washington Nationals'
    ]
  };

  const [searchText, setSearchText] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [filteredTeams, setFilteredTeams] = useState([]);
  const dropdownRef = useRef(null);

  // Component styles
  const styles = {
    container: {
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '20px',
      padding: '15px'
    },
    title: {
      fontSize: '1.1rem',
      marginBottom: '15px',
      paddingBottom: '10px',
      borderBottom: '1px solid #dee2e6'
    },
    dropdownContainer: {
      position: 'relative',
      width: '100%'
    },
    searchBox: {
      display: 'flex',
      marginTop: '10px'
    },
    searchInput: {
      flex: 1,
      padding: '8px 12px',
      border: '1px solid #dee2e6',
      borderRadius: '5px 0 0 5px',
      fontSize: '0.9rem'
    },
    searchButton: {
      backgroundColor: '#0d6efd',
      color: 'white',
      border: 'none',
      padding: '8px 12px',
      borderRadius: '0 5px 5px 0',
      cursor: 'pointer'
    },
    dropdown: {
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      maxHeight: '300px',
      overflowY: 'auto',
      backgroundColor: 'white',
      border: '1px solid #dee2e6',
      borderRadius: '0 0 5px 5px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      zIndex: 10,
      marginTop: '2px'
    },
    dropdownItem: (isFollowed) => ({
      padding: '10px 15px',
      cursor: 'pointer',
      fontSize: '0.9rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: isFollowed ? 'rgba(13, 110, 253, 0.05)' : 'transparent',
      color: isFollowed ? '#0d6efd' : 'inherit',
      transition: 'background-color 0.2s ease'
    }),
    dropdownItemHover: {
      backgroundColor: '#f8f9fa'
    },
    followedIcon: {
      color: '#0d6efd',
      fontWeight: 'bold'
    },
    noTeamsFound: {
      padding: '15px',
      textAlign: 'center',
      color: '#6c757d',
      fontStyle: 'italic'
    },
    teamsHeading: {
      fontSize: '0.9rem',
      margin: '15px 0 10px'
    },
    teamsList: {
      marginTop: '15px'
    },
    noTeams: {
      padding: '15px 0',
      color: '#6c757d',
      fontStyle: 'italic',
      fontSize: '0.9rem'
    },
    teamItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '8px 12px',
      backgroundColor: '#f8f9fa',
      borderRadius: '5px',
      marginBottom: '8px',
      borderLeft: '3px solid transparent',
      transition: 'all 0.2s ease'
    },
    teamItemHover: {
      borderLeftColor: '#0d6efd',
      backgroundColor: '#f1f4f8'
    },
    teamName: {
      cursor: 'pointer',
      transition: 'color 0.2s ease'
    },
    teamNameHover: {
      color: '#0d6efd'
    },
    removeButton: {
      background: 'none',
      border: 'none',
      color: '#dc3545',
      fontSize: '1.2rem',
      cursor: 'pointer',
      opacity: 0.6,
      transition: 'opacity 0.2s ease'
    },
    removeButtonHover: {
      opacity: 1
    }
  };

  // Get sport-specific followed teams
  const getSportFollowedTeams = () => {
    return followedTeams.filter(team => allTeams[activeSport].includes(team));
  };

  // Update quick select with sport-specific followed teams
  useEffect(() => {
    const sportTeams = getSportFollowedTeams();
    // If we have followed teams for this sport, use them for quick select
    if (sportTeams.length > 0) {
      // Take up to 3 most recently followed teams for this sport
      const quickSelectTeams = sportTeams.slice(-3).reverse();
      updateQuickSelect(activeSport, quickSelectTeams);
    }
  }, [followedTeams, activeSport]);

  // Filter teams based on search text
  useEffect(() => {
    if (searchText.trim() === '') {
      setFilteredTeams(allTeams[activeSport]);
    } else {
      const filtered = allTeams[activeSport].filter(team => 
        team.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredTeams(filtered);
    }
  }, [searchText, activeSport]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle team follow
  const handleTeamFollow = (team) => {
    if (!followedTeams.includes(team)) {
      onTeamFollow(team);
      
      // When following a new team, also update the quick select
      const sportTeams = [...getSportFollowedTeams(), team];
      const quickSelectTeams = sportTeams.slice(-3).reverse();
      updateQuickSelect(activeSport, quickSelectTeams);
    }
    setIsDropdownOpen(false);
    setSearchText('');
  };

  // Handle team select
  const handleTeamSelect = (team) => {
    onTeamSelect(team);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
    setIsDropdownOpen(true);
  };

  // Handle search button click
  const handleSearchClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Hover state for team items
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredTeam, setHoveredTeam] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(null);

  return (
    <section style={styles.container}>
      <h3 style={styles.title}>Follow Teams</h3>
      <div style={styles.dropdownContainer} ref={dropdownRef}>
        <div style={styles.searchBox}>
          <input 
            type="text" 
            style={styles.searchInput}
            placeholder="Type team name here..." 
            value={searchText}
            onChange={handleSearchChange}
            onFocus={() => setIsDropdownOpen(true)}
          />
          <button 
            style={styles.searchButton}
            onClick={handleSearchClick}
          >
            <span>🔍</span>
          </button>
        </div>

        {/* Dropdown menu */}
        {isDropdownOpen && (
          <div style={styles.dropdown}>
            {filteredTeams.length > 0 ? (
              filteredTeams.map((team, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.dropdownItem(followedTeams.includes(team)),
                    ...(hoveredItem === index ? styles.dropdownItemHover : {})
                  }}
                  onClick={() => handleTeamFollow(team)}
                  onMouseEnter={() => setHoveredItem(index)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {team}
                  {followedTeams.includes(team) && <span style={styles.followedIcon}>✓</span>}
                </div>
              ))
            ) : (
              <div style={styles.noTeamsFound}>No teams found</div>
            )}
          </div>
        )}
      </div>
      
      <div style={styles.teamsList}>
        <h4 style={styles.teamsHeading}>Your Teams</h4>
        {followedTeams.length > 0 ? (
          followedTeams.map((team, index) => (
            <div 
              key={index} 
              style={{
                ...styles.teamItem,
                ...(hoveredTeam === index ? styles.teamItemHover : {})
              }}
              onMouseEnter={() => setHoveredTeam(index)}
              onMouseLeave={() => setHoveredTeam(null)}
            >
              <span 
                style={{
                  ...styles.teamName,
                  ...(hoveredTeam === index ? styles.teamNameHover : {})
                }}
                onClick={() => handleTeamSelect(team)}
              >
                {team}
              </span>
              <button 
                style={{
                  ...styles.removeButton,
                  ...(hoveredButton === index ? styles.removeButtonHover : {})
                }}
                onClick={() => onTeamRemove(team)}
                onMouseEnter={() => setHoveredButton(index)}
                onMouseLeave={() => setHoveredButton(null)}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <div style={styles.noTeams}>No teams followed yet</div>
        )}
      </div>
    </section>
  );
};

export default FollowTeams;