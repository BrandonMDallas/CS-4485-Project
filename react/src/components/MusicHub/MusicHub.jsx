import React from "react";
import { useRef, useState, useEffect, useContext } from "react";
//import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../api/axios";
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

import "./MusicHub.css";

const MusicHub = () => {
  const navigate = useNavigate();

  // UI state
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Music data
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);

  // Playlist state
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist", songs: [] },
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);

  // Fetch AI recommendations once
  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const { data } = await axios.get(
          "https://api.example.com/music/recommendations"
        );
        setRecommendations(data);
      } catch {
        setRecommendations([
          { id: 1, title: "AI Song 1", artist: "Artist 1" },
          { id: 2, title: "AI Song 2", artist: "Artist 2" },
          { id: 3, title: "AI Song 3", artist: "Artist 3" },
        ]);
      }
    };
    fetchRecommendations();
  }, []);

  // Fetch trending songs once
  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
        const res = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=${apiKey}&format=json`
        );
        const data = await res.json();
        setTrendingSongs(
          data.tracks.track.map((song, idx) => ({
            id: idx + 1,
            name: song.name,
            artist: song.artist.name,
            url: song.url,
          }))
        );
      } catch (err) {
        console.error("Failed to fetch trending songs", err);
      }
    };
    fetchTrendingSongs();
  }, []);

  // Load dark mode preference
  useEffect(() => {
    const saved = localStorage.getItem("darkMode");
    if (saved !== null) {
      const isDark = JSON.parse(saved);
      setIsDarkMode(isDark);
      document.body.classList.toggle("dark-mode", isDark);
    }
  }, []);

  const toggleDropdown = () => setDropdownVisible((v) => !v);

  const toggleDarkMode = () => {
    const next = !isDarkMode;
    setIsDarkMode(next);
    document.body.classList.toggle("dark-mode", next);
    localStorage.setItem("darkMode", JSON.stringify(next));
  };

  const handleSearch = async () => {
    const q = searchQuery.trim();
    if (!q) return;

    setSearchHistory((h) => [q, ...h.slice(0, 4)]);
    setSearchQuery("");

    try {
      const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
      const res = await fetch(
        `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${q}&api_key=${apiKey}&format=json`
      );
      const data = await res.json();
      setSearchResults(
        data.results.trackmatches.track.map((song, idx) => ({
          id: idx + 1,
          name: song.name,
          artist: song.artist,
          url: song.url,
        }))
      );
    } catch (err) {
      console.error("Error fetching search results", err);
    }
  };

  const createPlaylist = () => {
    const name = newPlaylistName.trim();
    if (!name) return;
    setPlaylists((pls) => [
      ...pls,
      { id: Date.now(), name, songs: [], dateCreated: new Date() },
    ]);
    setNewPlaylistName("");
  };

  const editPlaylist = (pl) => setEditingPlaylist(pl);

  const updatePlaylistName = (newName) => {
    if (!editingPlaylist) return;
    setPlaylists((pls) =>
      pls.map((pl) =>
        pl.id === editingPlaylist.id ? { ...pl, name: newName } : pl
      )
    );
    setEditingPlaylist(null);
  };

  const deletePlaylist = (id) =>
    setPlaylists((pls) => pls.filter((pl) => pl.id !== id));

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists((pls) =>
      pls.map((pl) =>
        pl.id === playlistId ? { ...pl, songs: [...pl.songs, song] } : pl
      )
    );
  };

  return (
    <div className="modern-container">
      {/* Header */}
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

      {/* Main Content */}
      <div className="modern-content">
        <div className="main-column">
          {/* Trending Songs */}
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
                    {playlists.length > 0 && (
                      <select
                        onChange={(e) => {
                          const pid = Number(e.target.value);
                          if (pid) addSongToPlaylist(pid, song);
                        }}
                      >
                        <option value="">Add to Playlist</option>
                        {playlists.map((pl) => (
                          <option key={pl.id} value={pl.id}>
                            {pl.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Your Playlists */}
          <div className="modern-card">
            <h2 className="modern-section-title">Your Playlists</h2>
            <div className="playlist-creator">
              <input
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                placeholder="New playlist name"
              />
              <button className="modern-button" onClick={createPlaylist}>
                <FaPlus /> Create Playlist
              </button>
            </div>
            <div className="playlist-grid">
              {playlists.map((pl) => (
                <div key={pl.id} className="playlist-card">
                  <div className="playlist-details">
                    <h3>
                      {editingPlaylist?.id === pl.id ? (
                        <input
                          defaultValue={pl.name}
                          onBlur={(e) => updatePlaylistName(e.target.value)}
                          autoFocus
                        />
                      ) : (
                        pl.name
                      )}
                    </h3>
                    <div className="playlist-actions">
                      <button
                        className="modern-button modern-button-outline"
                        onClick={() => editPlaylist(pl)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="modern-button modern-button-outline"
                        onClick={() => deletePlaylist(pl.id)}
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </div>
                  {pl.songs.length > 0 ? (
                    <ul className="playlist-songs">
                      {pl.songs.map((song) => (
                        <li key={song.id}>
                          {song.name} - {song.artist}{" "}
                          <a
                            href={song.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Play
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

        {/* Sidebar */}
        <div className="sidebar-column">
          {/* Profile Dropdown */}
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

          {/* AI Recommendations */}
          <div className="modern-card">
            <h2 className="modern-section-title">AI Recommendations</h2>
            <div className="recommendations-section">
              {recommendations.length > 0 ? (
                <ul className="recommendations-list">
                  {recommendations.map((song) => (
                    <li key={song.id} className="recommendation-item">
                      <FaMusic /> {song.title} – {song.artist}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="no-recommendations">
                  No recommendations available.
                </p>
              )}
            </div>
          </div>

          {/* Search History */}
          <div className="modern-card">
            <h2 className="modern-section-title">Search History</h2>
            {searchHistory.length > 0 ? (
              <ul>
                {searchHistory.map((q, i) => (
                  <li key={i} className="history-item">
                    {q}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-history">No recent searches</p>
            )}
          </div>

          {/* Search Results */}
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
                    <a
                      href={song.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="play-pause-button">
                        <FaPlay />
                      </button>
                    </a>
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
