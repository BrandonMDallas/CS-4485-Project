import React, { useState, useEffect } from "react";
import api from "../../api/apiClient";
import { API_ROUTES } from "../../config/constants";
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
      const trackSeeds = playlist.songs.map((song) => ({
        artist: song.artist,
        track: song.name,
        id: song.id,
      }));

      // Get recommendations from Last.fm API
      let recommendationsMap = new Map(); // Map to store recommendations per song
      let failedSongs = [];

      // Process all songs in the playlist
      for (const songSeed of trackSeeds) {
        try {
          // First try with original track name
          let response = await fetchSimilarTracksFromLastFM(
            songSeed.artist,
            songSeed.track
          );

          // If no results, try alternative search formats
          if (!response || response.length === 0) {
            console.log(
              `No recommendations found for "${songSeed.track}" by ${songSeed.artist}, trying alternatives...`
            );

            // Try removing "featuring" and anything after it
            if (songSeed.track.toLowerCase().includes("feat")) {
              const simplifiedTrack = songSeed.track
                .replace(/\s+(feat\.?|featuring)\s+.*/i, "")
                .trim();
              console.log(`Trying simplified track name: "${simplifiedTrack}"`);
              response = await fetchSimilarTracksFromLastFM(
                songSeed.artist,
                simplifiedTrack
              );
            }

            // If still no results, try with just the artist
            if (!response || response.length === 0) {
              console.log(
                `Still no recommendations, trying artist-only search for ${songSeed.artist}`
              );
              response = await fetchArtistTopTracksFromLastFM(songSeed.artist);
            }
          }

          if (response && response.length > 0) {
            recommendationsMap.set(songSeed.id, response);
            console.log(
              `Got ${response.length} recommendations for "${songSeed.track}" by ${songSeed.artist}`
            );
          } else {
            failedSongs.push(songSeed);
            console.log(
              `Failed to get any recommendations for "${songSeed.track}" by ${songSeed.artist}`
            );
          }
        } catch (error) {
          console.error(
            `Error fetching recommendations for ${songSeed.track}:`,
            error
          );
          failedSongs.push(songSeed);
        }
      }

      console.log(
        `Got recommendations for ${recommendationsMap.size} out of ${trackSeeds.length} songs`
      );

      if (failedSongs.length > 0) {
        console.log(
          `Failed to get recommendations for ${failedSongs.length} songs:`,
          failedSongs
        );
      }

      // If we have no recommendations at all
      if (recommendationsMap.size === 0) {
        console.log("No recommendations found for any songs in the playlist");
        // Fallback to getting general recommendations
        const fallbackRecs = await fetchGeneralRecommendations();
        setRecommendations(fallbackRecs);
        setIsLoadingRecs(false);
        return;
      }

      // Use round-robin selection to get an equal number of recommendations from each song
      const finalRecommendations = selectRecommendationsRoundRobin(recommendationsMap, 10);

      setRecommendations(finalRecommendations);
    } catch (error) {
      console.error("Error fetching music recommendations:", error);
      setRecommendations([]);
    } finally {
      setIsLoadingRecs(false);
    }
  };

  // New helper function to fetch artist's top tracks as a fallback
  const fetchArtistTopTracksFromLastFM = async (artist) => {
    try {
      // First try using our backend proxy if available
      try {
        const url = `/api/lastfm/artist-top-tracks?artist=${encodeURIComponent(
          artist
        )}`;
        const response = await axiosPrivate.get(url);
        return response.data;
      } catch (proxyError) {
        console.warn(
          "Backend proxy unavailable for artist tracks, using direct Last.fm API:",
          proxyError
        );

        // Fall back to direct Last.fm API call
        const params = new URLSearchParams({
          method: "artist.getTopTracks",
          artist: artist,
          api_key: LASTFM_API_KEY,
          format: "json",
          limit: 5,
        });

        const response = await axios.get(`${LASTFM_API_BASE}?${params}`);

        if (
          response.data &&
          response.data.toptracks &&
          response.data.toptracks.track
        ) {
          return response.data.toptracks.track.map((item) => ({
            id: item.mbid || `${item.name}-${artist}`,
            name: item.name,
            artist: artist,
            url: item.url,
          }));
        }
        return [];
      }
    } catch (error) {
      console.error(`Error fetching top tracks for artist ${artist}:`, error);
      return [];
    }
  };

  // Fallback function to get general music recommendations
  const fetchGeneralRecommendations = async () => {
    try {
      const response = await api.get(API_ROUTES.TOP_TRACKS);
      return response.data.slice(0, 10);
    } catch (error) {
      console.error("Failed to fetch general recommendations", error);
      return [];
    }
  };

  // Helper function to select recommendations in a round-robin fashion
  const selectRecommendationsRoundRobin = (recommendationsMap, totalLimit) => {
    const allSongIds = Array.from(recommendationsMap.keys());
    let finalRecommendations = [];
    let currentIndex = 0;
    let recommendationIndices = new Map(); // Track which recommendation we're at for each song

    // Initialize indices
    allSongIds.forEach((songId) => recommendationIndices.set(songId, 0));

    // Round-robin selection
    while (finalRecommendations.length < totalLimit) {
      const songId = allSongIds[currentIndex];
      const recommendations = recommendationsMap.get(songId);
      const recIndex = recommendationIndices.get(songId);

      // If we have a recommendation at this index
      if (recIndex < recommendations.length) {
        const recommendation = recommendations[recIndex];

        // Check if this recommendation is already in our list
        const isDuplicate = finalRecommendations.some(
          (rec) =>
            rec.name === recommendation.name &&
            rec.artist === recommendation.artist
        );

        if (!isDuplicate) {
          finalRecommendations.push(recommendation);
        }

        // Increment the index for this song
        recommendationIndices.set(songId, recIndex + 1);
      }

      // Move to the next song
      currentIndex = (currentIndex + 1) % allSongIds.length;

      // Safety check - if we've gone through all songs at all indices and can't find any more
      // recommendations, break out of the loop
      if (
        finalRecommendations.length === 0 ||
        (finalRecommendations.length > 0 &&
          allSongIds.every(
            (songId) =>
              recommendationIndices.get(songId) >=
              recommendationsMap.get(songId).length
          ))
      ) {
        break;
      }
    }

    return finalRecommendations;
  };
  // Helper function to fetch similar tracks from Last.fm API
  const fetchSimilarTracksFromLastFM = async (artist, track) => {
    try {
      // First try using our backend proxy if available
      try {
        const url = `${SIMILAR_TRACKS_URL}?artist=${encodeURIComponent(
          artist
        )}&track=${encodeURIComponent(track)}`;
        const response = await axiosPrivate.get(url);
        return response.data;
      } catch (proxyError) {
        console.warn(
          "Backend proxy unavailable, using direct Last.fm API:",
          proxyError
        );

        // Fall back to direct Last.fm API call if backend proxy fails
        const params = new URLSearchParams({
          method: "track.getSimilar",
          artist: artist,
          track: track,
          api_key: LASTFM_API_KEY,
          format: "json",
          limit: 10,
        });

        const response = await axios.get(`${LASTFM_API_BASE}?${params}`);

        if (
          response.data &&
          response.data.similartracks &&
          response.data.similartracks.track
        ) {
          return response.data.similartracks.track.map((item) => ({
            id: item.mbid || `${item.name}-${item.artist.name}`,
            name: item.name,
            artist: item.artist.name,
            url: item.url,
          }));
        }
        return [];
      }
    } catch (error) {
      console.error(
        `Error fetching similar tracks for ${track} by ${artist}:`,
        error
      );
      return [];
    }
  };

  // Helper function to remove duplicate recommendations
  const removeDuplicateRecommendations = (recommendations) => {
    const seen = new Set();
    return recommendations.filter((rec) => {
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
            <button
              className="modern-back-button"
            >
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
          {/* MOVED: Recommendations section is now where trending songs used to be */}
          <div className="modern-card oval-box">
            <h2 className="modern-section-title heading-blue">
              Personalized Music Recommendations
              {playlists.find((p) => p.id === selectedPlaylistForRecs)?.name
                ? ` Based on "${playlists.find((p) => p.id === selectedPlaylistForRecs)?.name}"`
                : ""}
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
                <div className="no-recommendations-prominent">
                  <p>
                    {playlists.length === 0
                      ? "Create a playlist and add songs to get personalized recommendations!"
                      : playlists.find((p) => p.id === selectedPlaylistForRecs)?.songs
                          .length === 0
                      ? "Add songs to your playlist to get personalized recommendations!"
                      : "No recommendations available at the moment."}
                  </p>
                  {playlists.length > 0 && (
                    <div className="recommendation-playlist-selector">
                      <label>Select a playlist for recommendations:</label>
                      <select
                        value={selectedPlaylistForRecs}
                        onChange={(e) => handleChangeRecommendationPlaylist(e.target.value)}
                      >
                        {playlists.map((playlist) => (
                          <option key={playlist.id} value={playlist.id}>
                            {playlist.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* MOVED: Trending Songs moved to the bottom */}
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
        </div>

        <div className="sidebar-column">
          {/* MOVED: Playlists section is now in the sidebar */}
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

          {/* Search History Section */}
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

          {/* Search Results Section */}
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