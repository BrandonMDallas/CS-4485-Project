import React, { useState, useEffect } from "react";
import axios from "../../api/axios";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import "./MusicHub.css";
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
  FaSun,
} from "react-icons/fa";

const TOP_TRACKS_URL = "/api/lastfm/top-tracks";
const TRACK_SEARCH_URL = "/api/lastfm/search";
const SIMILAR_TRACKS_URL = "/api/lastfm/similar-tracks";

// Last.fm API constants
const LASTFM_API_KEY = "h";
const LASTFM_API_BASE = "http://ws.audioscrobbler.com/2.0/";

const MusicHub = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [playlists, setPlaylists] = useState([
    { 
      id: 1, 
      name: "My Playlist", 
      songs: [
        // Test songs for recommendations
        { id: "1", name: "Starboy", artist: "The Weeknd", url: "https://www.last.fm/music/The+Weeknd+Feat.+Daft+Punk/Starboy/Starboy" },
        { id: "2", name: "NOKIA", artist: "Drake", url: "https://www.last.fm/music/Drake/_/Nokia" }
      ] 
    },
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPlaylistForRecs, setSelectedPlaylistForRecs] = useState(1); // Default to first playlist
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    // Initial fetch of recommendations based on the default playlist
    if (playlists.length > 0) {
      fetchRecommendationsForPlaylist(playlists[0]);
    }
  }, []);

  // Function to get recommendations based on a playlist
  const fetchRecommendationsForPlaylist = async (playlist) => {
    if (!playlist || playlist.songs.length === 0) {
      setRecommendations([]);
      return;
    }

    setIsLoadingRecs(true);
    
    try {
      // Create array of tracks to base recommendations on
      const trackSeeds = playlist.songs.map(song => ({
        artist: song.artist,
        track: song.name
      }));
      
      // Get recommendations from Last.fm API
      let allRecommendations = [];
      
      // Only process up to 3 songs to avoid too many requests
      const songsToProcess = trackSeeds.slice(0, 3);
      
      for (const songSeed of songsToProcess) {
        const response = await fetchSimilarTracksFromLastFM(songSeed.artist, songSeed.track);
        if (response && response.length > 0) {
          allRecommendations = [...allRecommendations, ...response];
        }
      }
      
      // Remove duplicates and limit to 10 recommendations
      const uniqueRecs = removeDuplicateRecommendations(allRecommendations);
      const limitedRecs = uniqueRecs.slice(0, 10);
      
      setRecommendations(limitedRecs);
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
      setRecommendations([]);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  // Helper function to fetch similar tracks from Last.fm API
  const fetchSimilarTracksFromLastFM = async (artist, track) => {
    try {
      // First try using our backend proxy if available
      try {
        const url = `${SIMILAR_TRACKS_URL}?artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(track)}`;
        const response = await axiosPrivate.get(url);
        return response.data;
      } catch (proxyError) {
        console.warn("Backend proxy unavailable, using direct Last.fm API:", proxyError);
        
        // Fall back to direct Last.fm API call if backend proxy fails
        const params = new URLSearchParams({
          method: 'track.getSimilar',
          artist: artist,
          track: track,
          api_key: LASTFM_API_KEY,
          format: 'json',
          limit: 5
        });
        
        const response = await axios.get(`${LASTFM_API_BASE}?${params}`);
        
        if (response.data && response.data.similartracks && response.data.similartracks.track) {
          return response.data.similartracks.track.map(item => ({
            id: item.mbid || `${item.name}-${item.artist.name}`,
            name: item.name,
            artist: item.artist.name,
            url: item.url
          }));
        }
        return [];
      }
    } catch (error) {
      console.error(`Error fetching similar tracks for ${track} by ${artist}:`, error);
      return [];
    }
  };

  // Helper function to remove duplicate recommendations
  const removeDuplicateRecommendations = (recommendations) => {
    const seen = new Set();
    return recommendations.filter(rec => {
      const key = `${rec.artist}-${rec.name}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  // Toggle dropdown menu
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Apply dark mode class to body
    document.body.classList.toggle("dark-mode", newMode);

    // Save preference to localStorage
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  // Checking for saved dark mode preference on component mount
  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      document.body.classList.toggle("dark-mode", isDark);
    }
  }, []);

  // Handle search function
  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const newSearchHistory = [searchQuery, ...searchHistory.slice(0, 4)];
      setSearchHistory(newSearchHistory);

      try {
        const url = `${TRACK_SEARCH_URL}?query=${encodeURIComponent(
          searchQuery
        )}`;
        console.log(url);
        const response = await axiosPrivate.get(url);
        console.log("Raw search results:", response.data);

        // Update the state with the search results
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results", error);
      }

      // Clear the search query input
      setSearchQuery("");
    }
  };

  // Create new playlist
  const createPlaylist = () => {
    if (newPlaylistName.trim()) {
      const newPlaylist = {
        id: Date.now(),
        name: newPlaylistName,
        songs: [],
        dateCreated: new Date(),
      };
      setPlaylists([...playlists, newPlaylist]);
      setNewPlaylistName("");
    }
  };

  // Edit playlist
  const editPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
  };

  // Update playlist name
  const updatePlaylistName = (newName) => {
    if (editingPlaylist) {
      const updatedPlaylists = playlists.map((pl) =>
        pl.id === editingPlaylist.id ? { ...pl, name: newName } : pl
      );
      setPlaylists(updatedPlaylists);
      setEditingPlaylist(null);
    }
  };

  // Delete playlist
  const deletePlaylist = (playlistId) => {
    const updatedPlaylists = playlists.filter((pl) => pl.id !== playlistId);
    setPlaylists(updatedPlaylists);
    
    // If the deleted playlist was selected for recommendations, reset to the first available playlist
    if (selectedPlaylistForRecs === playlistId && updatedPlaylists.length > 0) {
      setSelectedPlaylistForRecs(updatedPlaylists[0].id);
      fetchRecommendationsForPlaylist(updatedPlaylists[0]);
    }
  };

  const addSongToPlaylist = (playlistId, song) => {
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    );
    
    setPlaylists(updatedPlaylists);
    
    // If we're adding to the currently selected playlist for recommendations,
    // update the recommendations
    if (playlistId === selectedPlaylistForRecs) {
      const updatedPlaylist = updatedPlaylists.find(p => p.id === playlistId);
      fetchRecommendationsForPlaylist(updatedPlaylist);
    }
  };

  // Fetch trending songs
  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await axiosPrivate.get(TOP_TRACKS_URL);
        console.log(response.data);
        setTrendingSongs(response.data);
      } catch (error) {
        console.error("Failed to fetch trending songs", error);
      }
    };

    fetchTrendingSongs();
  }, []);

  // Handle changing which playlist to base recommendations on
  const handleChangeRecommendationPlaylist = (playlistId) => {
    const selectedId = Number(playlistId);
    setSelectedPlaylistForRecs(selectedId);
    
    const selectedPlaylist = playlists.find(p => p.id === selectedId);
    if (selectedPlaylist) {
      fetchRecommendationsForPlaylist(selectedPlaylist);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="modern-title">Music Hub</h1>
            <button
              className="modern-back-button"
              onClick={() => navigate("/")}
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
              <button className="search-button" onClick={handleSearch}>
                <FaSearch />
              </button>

              <button className="dark-mode-toggle" onClick={toggleDarkMode}>
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
              {trendingSongs.map((song) => (
                <div key={song.id} className="song-item">
                  <div className="song-info">
                    <span>{song.name}</span>
                    <span className="song-artist">{song.artist}</span>
                  </div>
                  <div className="song-actions">
                    <button
                      className="play-pause-button"
                      onClick={() => window.open(song.url, "_blank")}
                    >
                      <FaPlay />
                    </button>

                    {/* Dropdown to select a playlist and add song */}
                    {playlists.length > 0 && (
                      <select
                        onChange={(e) => {
                          const selectedPlaylistId = Number(e.target.value);
                          if (selectedPlaylistId)
                            addSongToPlaylist(selectedPlaylistId, song);
                        }}
                      >
                        <option value="">Add to Playlist</option>
                        {playlists.map((playlist) => (
                          <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              <button className="modern-button" onClick={createPlaylist}>
                <FaPlus /> Create Playlist
              </button>
            </div>
            <div className="playlist-grid">
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-card">
                  <div className="playlist-details">
                    <h3>
                      {editingPlaylist && editingPlaylist.id === playlist.id ? (
                        <input
                          type="text"
                          defaultValue={playlist.name}
                          onBlur={(e) => updatePlaylistName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        playlist.name
                      )}
                    </h3>
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
                      <button 
                        className="modern-button modern-button-primary"
                        onClick={() => handleChangeRecommendationPlaylist(playlist.id)}
                        disabled={selectedPlaylistForRecs === playlist.id}
                      >
                        Get Recommendations
                      </button>
                    </div>
                  </div>

                  {/* Display Songs in Playlist */}
                  {playlist.songs.length > 0 ? (
                    <ul className="playlist-songs">
                      {playlist.songs.map((song) => (
                        <li key={song.id}>
                          {song.name} - {song.artist}
                          <a
                            href={song.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {" "}
                            Play{" "}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="empty-playlist">No songs yet</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="sidebar-column">
          {/* User Profile Dropdown */}
          <div className="menuContainer">
            <button className="mainButton" onClick={toggleDropdown}>
              <FaUser /> Profile
            </button>
            {dropdownVisible && (
              <div className="dropdownContent">
                <Link to="/profile" className="menuLink">
                  My Profile
                </Link>
                <Link to="/settings" className="menuLink">
                  Settings
                </Link>
                <Link to="/logout" className="menuLink">
                  Logout
                </Link>
              </div>
            )}
          </div>

          {/* AI Recommendation Section */}
          <div className="modern-card">
            <h2 className="modern-section-title">
              Recommendations Based on{" "}
              {playlists.find(p => p.id === selectedPlaylistForRecs)?.name || "Your Music"}
            </h2>
            <div className="recommendations-section">
              {isLoadingRecs ? (
                <p>Loading recommendations...</p>
              ) : recommendations.length > 0 ? (
                <ul className="recommendations-list">
                  {recommendations.map((song) => (
                    <li key={song.id} className="recommendation-item">
                      <FaMusic />{" "}
                      <span className="song-title">{song.name}</span> -{" "}
                      <span className="song-artist">{song.artist}</span>
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="play-link"
                      >
                        <button className="play-pause-button">
                          <FaPlay />
                        </button>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-recommendations">
                  {playlists.find(p => p.id === selectedPlaylistForRecs)?.songs.length === 0
                    ? "Add songs to your playlist to get recommendations"
                    : "No recommendations available."}
                </p>
              )}
            </div>
          </div>

          {/* Search History */}
          <div className="modern-card">
            <h2 className="modern-section-title">Search History</h2>
            {searchHistory.length > 0 ? (
              <ul>
                {searchHistory.map((query, index) => (
                  <li key={index} className="history-item">
                    {query}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-history">No recent searches</p>
            )}
          </div>

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
                    <div className="song-actions">
                      <a
                        href={song.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="play-link"
                      >
                        <button className="play-pause-button">
                          <FaPlay />
                        </button>
                      </a>
                      
                      {/* Add to playlist dropdown */}
                      {playlists.length > 0 && (
                        <select
                          onChange={(e) => {
                            const selectedPlaylistId = Number(e.target.value);
                            if (selectedPlaylistId)
                              addSongToPlaylist(selectedPlaylistId, song);
                          }}
                        >
                          <option value="">Add to Playlist</option>
                          {playlists.map((playlist) => (
                            <option key={playlist.id} value={playlist.id}>
                              {playlist.name}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicHub;