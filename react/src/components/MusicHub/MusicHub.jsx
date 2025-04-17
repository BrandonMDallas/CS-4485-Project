import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MusicHub.css";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaPlus,
  FaSearch,
  FaMusic,
  FaEdit,
  FaTrash,
  FaPlay,
  FaMoon,
  FaSun,
} from "react-icons/fa";

const MusicHub = () => {
  const navigate = useNavigate();
  const [trendingSongs, setTrendingSongs] = useState([]);
  const [playlists, setPlaylists] = useState([
    { id: 1, name: "My Playlist", songs: [] },
  ]);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get(
          "https://api.example.com/music/recommendations"
        );
        setRecommendations(response.data);
      } catch (error) {
        console.error("Error fetching AI recommendations:", error);
        setRecommendations([
          { id: 1, title: "AI Song 1", artist: "Artist 1" },
          { id: 2, title: "AI Song 2", artist: "Artist 2" },
          { id: 3, title: "AI Song 3", artist: "Artist 3" },
        ]);
      }
    };

    fetchRecommendations();
  }, []);

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
        const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
        const response = await fetch(
          `https://ws.audioscrobbler.com/2.0/?method=track.search&track=${searchQuery}&api_key=${apiKey}&format=json`
        );
        const data = await response.json();

        const searchResultsData = data.results.trackmatches.track.map(
          (song, index) => ({
            id: index + 1,
            name: song.name,
            artist: song.artist,
            url: song.url,
          })
        );

        setSearchResults(searchResultsData);
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
  };

  const addSongToPlaylist = (playlistId, song) => {
    setPlaylists(
      playlists.map((playlist) =>
        playlist.id === playlistId
          ? { ...playlist, songs: [...playlist.songs, song] }
          : playlist
      )
    );
  };

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const apiKey = process.env.REACT_APP_LASTFM_API_KEY;
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
            <h1 className="modern-title heading-blue">Music Hub</h1>
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
          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">Trending Songs</h2>
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
            <h2 className="modern-section-title heading-blue">Your Playlists</h2>
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
                      {editingPlaylist &&
                      editingPlaylist.id === playlist.id ? (
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
          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">AI Recommendations</h2>
            <div className="recommendations-section">
              {recommendations.length > 0 ? (
                <ul className="recommendations-list">
                  {recommendations.map((song) => (
                    <li key={song.id} className="recommendation-item">
                      <FaMusic />{" "}
                      <span className="song-title">{song.title}</span> -{" "}
                      <span className="song-artist">{song.artist}</span>
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

          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">Search History</h2>
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
            <div className="modern-card oval-box">
              <h2 className="modern-section-title heading-blue">Search Results</h2>
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
                      className="play-link"
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
