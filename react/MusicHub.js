import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaPlus, 
  FaUser, 
  FaSearch, 
  FaMusic, 
  FaEdit, 
  FaTrash, 
  FaPlay,
  FaMoon,
  FaSun
} from "react-icons/fa";
import "./MusicHub.css"; 

const MusicHub = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);


  //Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);   
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    
    // Apply dark mode class to body
    document.body.classList.toggle('dark-mode', newMode);
    
    // Optional: Save preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(newMode));
  };

  // Check for saved dark mode preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      document.body.classList.toggle('dark-mode', isDark);
    }
  }, []);

  // Handle search function
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const newSearchHistory = [searchQuery, ...searchHistory.slice(0, 4)];
      setSearchHistory(newSearchHistory);
  
      try {
        const apiKey = process.env.REACT_APP_LASTFM_API_KEY;  // Use your API key
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${apiKey}&format=json`
        );
        const data = await response.json();
  
        // Map the search results into a structure suitable for your component
        const searchResultsData = data.results.trackmatches.track.map((song, index) => ({
          id: index + 1,
          name: song.name,
          artist: song.artist,
          url: song.url,
        }));
  
        // Update the state with the search results
        setSearchResults(searchResultsData);
      } catch (error) {
        console.error("Error fetching search results", error);
      }
  
      // Clear the search query input
      setSearchQuery('');
    }
  };
  

  // Create new playlist
  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = { 
        id: Date.now(), 
        name: newPlaylistName, 
        songs: [],
        dateCreated: new Date()
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName('');
    }
  };

  // Edit playlist
  const editPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
  };

  // Update playlist name
  const updatePlaylistName = (newName) => {
    if (editingPlaylist) {
      const updatedPlaylists = playlists.map(pl => 
        pl.id === editingPlaylist.id 
          ? { ...pl, name: newName } 
          : pl
      );
      setPlaylists(updatedPlaylists);
      setEditingPlaylist(null);
    }
  };

  // Delete playlist
  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter(pl => pl.id !== playlistId);
    setPlaylists(updatedPlaylists);
  };

  // Fetch trending songs (simulated API call)
  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const apiKey = process.env.REACT_APP_LASTFM_API_KEY;  // Use API Key
  
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
        );
        const data = await response.json();
  
        const trendingData = data.tracks.track.map((song, index) => ({
          id: index + 1, 
          name: song.name,
          artist: song.artist.name,
          duration: "N/A",
          url: song.url,
        }));
  
        setTrendingSongs(trendingData);
      } catch (error) {
        console.error("Failed to fetch trending songs", error);
      }
    };

    fetchTrendingSongs();
  }, []);

  return (
    <div className="modern-container">
      <div className="modern-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="modern-title">Music Hub</h1>
            <button 
              className="modern-back-button" 
              onClick={() => navigate('/')}
            >

              <FaArrowLeft />
            </button>
          </div>
          <div className="header-right">
            <div className="modern-search">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search music..." 
              />
              <button 
                className="search-button" 
                onClick={handleSearch}
              >
                <FaSearch />
              </button>

              <button 
              className="dark-mode-toggle" 
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <FaSun /> : <FaMoon />}
            </button>

            </div>
          </div>
        </div>
      </div>

      <div className="modern-content">
        <div className="main-column">

          {/* Trending Songs Section */}
          <div className="modern-card">
            <h2 className="modern-section-title">Trending Songs</h2>
            <div className="trending-songs">
              {trendingSongs.map(song => (
                <div key={song.id} className="song-item">
                  <div className="song-info">
                    <span>{song.name}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                  <button 
                    className="play-pause-button"
                    onClick={() => window.open(song.url, '_blank')}
                  >
                    <FaPlay />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Search Results Section */}
          {searchResults.length > 0 && (
            <div className="modern-card">
              <h2 className="modern-section-title">Search Results</h2>
              <div className="search-results">
                {searchResults.map((song) => (
                  <div key={song.id} className="song-item">
                    <div className="song-info">
                      <span>{song.name}</span>
                      <span className="song-artist">{song.artist}</span>
                    </div>
                    <a href={song.url} target="_blank" rel="noopener noreferrer" className="play-link">
                      <button className="play-pause-button">
                        <FaPlay />
                      </button>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Playlists Section */}
          <div className="modern-card">
            <h2 className="modern-section-title">Your Playlists</h2>
            <div className="playlist-creator">
              <input 
                type="text" 
                value={newPlaylistName} 
                onChange={(e) => setNewPlaylistName(e.target.value)} 
                placeholder="New playlist name" 
              />
              <button 
                className="modern-button" 
                onClick={createPlaylist}
              >
                <FaPlus /> Create Playlist
              </button>
            </div>
            <div className="playlist-grid">
              {playlists.map(playlist => (
                <div key={playlist.id} className="playlist-card">
                  <div className="playlist-details">
                    <h3>{editingPlaylist && editingPlaylist.id === playlist.id ? (
                      <input 
                        type="text" 
                        defaultValue={playlist.name}
                        onBlur={(e) => updatePlaylistName(e.target.value)}
                        autoFocus
                      />
                    ) : (
                      playlist.name
                    )}</h3>
                    <div className="playlist-actions">
                      <button 
                        className="modern-button modern-button-outline"
                        onClick={() => editPlaylist(playlist)}
                      >
                        <FaEdit />
                      </button>
                      <button 
                        className="modern-button modern-button-outline"
                        onClick={() => deletePlaylist(playlist.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  <p>{playlist.songs.length} songs</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          {/* User Profile Dropdown */}
          <div className="menuContainer">
            <button 
              className="mainButton" 
              onClick={toggleDropdown}
            >
              <FaUser /> Profile
            </button>
            {dropdownVisible && (
              <div className="dropdownContent">
                <Link to="/profile" className="menuLink">My Profile</Link>
                <Link to="/settings" className="menuLink">Settings</Link>
                <Link to="/logout" className="menuLink">Logout</Link>
              </div>
            )}
          </div>

          {/* AI Recommendation Section */}
          <div className="modern-card">
            <h2 className="modern-section-title">AI Recommendations</h2>
            <div className="assistant-content">
              <div className="assistant-avatar">
                <FaMusic />
              </div>
              <div className="assistant-actions">
                <button className="modern-button assistant-button">
                  Recommend Song
                </button>
                <button className="modern-button assistant-button">
                  Recommend Artist
                </button>
              </div>
            </div>
          </div>

          {/* Search History */}
          <div className="modern-card">
            <h2 className="modern-section-title">Search History</h2>
            {searchHistory.length > 0 ? (
              <ul>
                {searchHistory.map((query, index) => (
                  <li key={index} className="history-item">{query}</li>
                ))}
              </ul>
            ) : (
              <p className="empty-history">No recent searches</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicHub;
