import React, { useState, useEffect } from "react";
import api from "../../api/apiClient";
import {
  API_ROUTES,
  DEFAULT_BASE_URL,
  DEFAULT_PYTHON_BASE_URL,
} from "../../config/constants";
import axios from "../../api/axios";
import useAxiosPrivate from "../../api/useAxiosPrivate";
import "./MusicHub.css";
import { useNavigate, Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaSearch,
  FaMusic,
  FaEdit,
  FaTrash,
  FaPlay,
  FaMoon,
  FaUser,
  FaSun,
} from "react-icons/fa";

const TOP_TRACKS_URL = "/api/lastfm/top-tracks";
const TRACK_SEARCH_URL = "/api/lastfm/search";
const SIMILAR_TRACKS_URL = "/api/lastfm/similar-tracks";

// Last.fm API constants
const LASTFM_API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
const LASTFM_API_BASE = "http://ws.audioscrobbler.com/2.0/";
const MusicHub = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedPlaylistForRecs, setSelectedPlaylistForRecs] = useState(1); // Default to first playlist
  const [isLoadingRecs, setIsLoadingRecs] = useState(false);

  useEffect(() => {
    if (playlists.length > 0) {
      fetchRecommendationsForPlaylist(playlists[0]);
    }
  }, []);

  const fetchRecommendationsForPlaylist = async (playlist) => {
    if (!playlist || playlist.songs.length === 0) {
      setRecommendations([]);
      return;
    }

    setIsLoadingRecs(true);
    try {
      const payload = {
        songs: playlist.songs.map((s) => ({
          track: s.name,
          artist: s.artist,
        })),
      };

      api.setBaseURL(DEFAULT_PYTHON_BASE_URL);
      const res = await api.post(
        `${DEFAULT_PYTHON_BASE_URL}${API_ROUTES.RECOMMENDED_TRACKS}`,
        payload
      );

      const recs = res.data.recommendations.map((r, idx) => ({
        id: `${r.track}-${r.artist}-${idx}`,
        name: r.track,
        artist: r.artist,
        url: `https://www.last.fm/music/${encodeURIComponent(
          r.artist
        )}/_/${encodeURIComponent(r.track)}`,
      }));

      setRecommendations(recs);
    } catch (err) {
      console.error("Error fetching recommendations:", err);
      setRecommendations([]);
    } finally {
      api.setBaseURL(DEFAULT_BASE_URL);
      setIsLoadingRecs(false);
    }
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
    document.body.classList.toggle("dark-mode", newMode);
    localStorage.setItem("darkMode", JSON.stringify(newMode));
  };

  useEffect(() => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode !== null) {
      const isDark = JSON.parse(savedDarkMode);
      setIsDarkMode(isDark);
      document.body.classList.toggle("dark-mode", isDark);
    }
  }, []);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const newSearchHistory = [searchQuery, ...searchHistory.slice(0, 4)];
      setSearchHistory(newSearchHistory);

      try {
        const url = `${API_ROUTES.TRACK_SEARCH}?query=${encodeURIComponent(
          searchQuery
        )}`;
        console.log(url);
        const response = await api.get(url);
        console.log("Raw search results:", response.data);

        // Update the state with the search results
        setSearchResults(response.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching search results", error);
      }

      setSearchQuery("");
    }
  };

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

  const editPlaylist = (playlist) => {
    setEditingPlaylist(playlist);
  };

  const updatePlaylistName = (newName) => {
    if (editingPlaylist) {
      const updatedPlaylists = playlists.map((pl) =>
        pl.id === editingPlaylist.id ? { ...pl, name: newName } : pl
      );
      setPlaylists(updatedPlaylists);
      setEditingPlaylist(null);
    }
  };

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
      const updatedPlaylist = updatedPlaylists.find((p) => p.id === playlistId);
      fetchRecommendationsForPlaylist(updatedPlaylist);
    }
  };

  // Add this function to your MusicHub component
  const addRecommendationToPlaylist = (playlistId, song) => {
    // Same functionality as addSongToPlaylist but for recommendations
    const updatedPlaylists = playlists.map((playlist) =>
      playlist.id === playlistId
        ? { ...playlist, songs: [...playlist.songs, song] }
        : playlist
    );
    setPlaylists(updatedPlaylists);

    // Optional: If we're adding to the currently selected playlist for recommendations,
    // update the recommendations to include songs related to this new addition
    if (playlistId === selectedPlaylistForRecs) {
      const updatedPlaylist = updatedPlaylists.find((p) => p.id === playlistId);
      fetchRecommendationsForPlaylist(updatedPlaylist);
    }
  };

  // Fetch trending songs
  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await api.get(API_ROUTES.TOP_TRACKS);
        setTrendingSongs(response.data.slice(0, 10));
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

    const selectedPlaylist = playlists.find((p) => p.id === selectedId);
    if (selectedPlaylist) {
      fetchRecommendationsForPlaylist(selectedPlaylist);
    }
  };

  return (
    <div className="modern-container">
      <div className="modern-header">
        <div className="header-content">
          <div className="header-left">
            <NavLink to="/dashboard">
              <button className="modern-back-button">
                <FaArrowLeft />
              </button>
            </NavLink>
            <h1 className="modern-title heading-blue">Music Hub</h1>
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
          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">
              Trending Songs
            </h2>
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

          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">
              Your Playlists
            </h2>
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
                    {/* Fixed: Display playlist name in its own container above actions */}
                    <div className="playlist-name-container">
                      {editingPlaylist && editingPlaylist.id === playlist.id ? (
                        <input
                          type="text"
                          defaultValue={playlist.name}
                          onBlur={(e) => updatePlaylistName(e.target.value)}
                          autoFocus
                          className="edit-playlist-name"
                        />
                      ) : (
                        <h3 className="playlist-name">{playlist.name}</h3>
                      )}
                    </div>
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
                        onClick={() =>
                          handleChangeRecommendationPlaylist(playlist.id)
                        }
                        disabled={selectedPlaylistForRecs === playlist.id}
                      >
                        Get Recommendations
                      </button>
                    </div>
                  </div>

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
          {/* AI Recommendation Section - Updated to match trending songs styling */}
          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">
              Recommendations Based on{" "}
              {playlists.find((p) => p.id === selectedPlaylistForRecs)?.name ||
                "Your Music"}
            </h2>
            <div className="recommendations-section">
              {isLoadingRecs ? (
                <p>Loading recommendations...</p>
              ) : recommendations.length > 0 ? (
                <div className="trending-songs">
                  {recommendations.map((song) => (
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
                              const selectedPlaylistId = Number(e.target.value);
                              if (selectedPlaylistId)
                                addRecommendationToPlaylist(
                                  selectedPlaylistId,
                                  song
                                );
                              e.target.value = ""; // Reset dropdown after selection
                            }}
                            defaultValue=""
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
              ) : (
                <p className="no-recommendations">
                  {playlists.find((p) => p.id === selectedPlaylistForRecs)
                    ?.songs.length === 0
                    ? "Add songs to your playlist to get recommendations"
                    : "No recommendations available."}
                </p>
              )}
            </div>
          </div>

          {/* Fixed: Ensure search history and results stay within sidebar width */}
          <div className="modern-card oval-box search-sidebar-card">
            <h2 className="modern-section-title heading-blue">
              Search History
            </h2>
            {searchHistory.length > 0 ? (
              <ul className="search-history-list">
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
            <div className="modern-card oval-box search-sidebar-card">
              <h2 className="modern-section-title heading-blue">
                Search Results
              </h2>
              <div className="trending-songs">
                {searchResults.map((song) => (
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
