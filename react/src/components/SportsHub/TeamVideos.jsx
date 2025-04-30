// TeamVideos.jsx
import React, { useState, useEffect } from 'react';

const TeamVideos = ({ team }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to extract date from video title
  const extractDate = (title) => {
    const datePattern = /(\w+\s+\d{1,2},\s+\d{4})/;
    const match = title.match(datePattern);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const apiKey = "AIzaSyAVyY60PgE5vyGK8TF_rKVy5uKxUm9v2OA";
        if (!apiKey) throw new Error("API key not found");
        
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=6&q=${team}+basketball+highlights&type=video&key=${apiKey}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch videos");
        
        const data = await response.json();
        setVideos(data.items || []);
        if (data.items && data.items.length > 0) {
          setActiveVideo(data.items[0]);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching videos:", err);
        setError("Failed to fetch videos. Please try again later.");
        setLoading(false);
      }
    };

    fetchVideos();
  }, [team]);

  const selectVideo = (video) => {
    setActiveVideo(video);
    // Scroll to top of video section
    document.getElementById('featured-video')?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center p-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <span className="ms-3">Loading {team} highlights...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16">
          <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </svg>
        {error}
      </div>
    );
  }

  return (
    <div className="team-videos">
      {videos.length > 0 ? (
        <>
          {/* Featured Video */}
          <div id="featured-video" className="mb-4">
            {activeVideo && (
              <div className="card shadow-sm">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`https://www.youtube.com/embed/${activeVideo.id.videoId}`}
                    title={activeVideo.snippet.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="card-body">
                  <h5 className="card-title h6">{activeVideo.snippet.title}</h5>
                  <p className="card-text small text-muted">
                    {formatDate(activeVideo.snippet.publishedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Video Thumbnails */}
          <div className="row row-cols-1 row-cols-md-3 g-3 mb-3">
            {videos.map((video) => (
              <div className="col" key={video.id.videoId}>
                <div 
                  className={`card h-100 video-card ${activeVideo && activeVideo.id.videoId === video.id.videoId ? 'border-primary' : ''}`}
                  onClick={() => selectVideo(video)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="position-relative">
                    <img 
                      src={video.snippet.thumbnails.medium.url} 
                      className="card-img-top" 
                      alt={video.snippet.title}
                      style={{ height: '140px', objectFit: 'cover' }}
                    />
                    <div className="position-absolute top-50 start-50 translate-middle">
                      <div className="play-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="38" fill="currentColor" className="bi bi-play-circle-fill text-white opacity-75" viewBox="0 0 16 16">
                          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="card-body py-2 px-3">
                    <p className="card-title small mb-0 text-truncate fw-medium">
                      {video.snippet.title}
                    </p>
                    <p className="card-text small text-muted mt-1 mb-0">
                      {formatDate(video.snippet.publishedAt)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <a href={`https://www.youtube.com/results?search_query=${team}+basketball+highlights`} 
               className="btn btn-outline-primary btn-sm" 
               target="_blank" 
               rel="noopener noreferrer">
              View more on YouTube
            </a>
          </div>
        </>
      ) : (
        <div className="alert alert-info" role="alert">
          No videos found for {team}
        </div>
      )}
    </div>
  );
};
 
export default TeamVideos;