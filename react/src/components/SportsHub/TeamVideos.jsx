// TeamVideos.jsx
import React, { useState, useEffect } from 'react';

const TeamVideos = ({ team }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = "AIzaSyAVyY60PgE5vyGK8TF_rKVy5uKxUm9v2OA"
        //import.meta.env.VITE_YOUTUBE_API_KEY;
        if (!apiKey) throw new Error("API key not found");
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${team}+basketball+highlights&type=video&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch videos");
        
        const data = await response.json();
        setVideos(data.items || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to fetch articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, [team]);

  if (loading) return <div>Loading videos...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="team-videos">
      {videos.length > 0 ? (
        videos.map((video) => (
          <div key={video.id.videoId} className="video-item">
            <h3>{video.snippet.title}</h3>
            <iframe
              width="100%"
              height="200"
              src={`https://www.youtube.com/embed/${video.id.videoId}`}
              title={video.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ))
      ) : (
        <p>No videos found for {team}</p>
      )}
    </div>
  );
};

export default TeamVideos;