// NewsArticles.jsx
import React, { useState, useEffect } from 'react';

const NewsArticles = ({ team }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = "dd5aee5d09f640748e280fde6759f8a6"
        //import.meta.env.VITE_NEWS_API_KEY;
        if (!apiKey) throw new Error("API key not found");
        
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=${team}+basketball&sortBy=publishedAt&apiKey=${apiKey}`
        );
        
        if (!response.ok) throw new Error("Failed to fetch articles");
        
        const data = await response.json();
        setArticles(data.articles || []);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError("Failed to fetch articles. Please try again later.");
        setLoading(false);
      }
    };

    fetchArticles();
  }, [team]);

  if (loading) return <div>Loading articles...</div>;
  if (error) return <div className="error-message">{error}</div>;
  
  return (
    <div className="news-articles">
      {articles.length > 0 ? (
        articles.slice(0, 5).map((article, index) => (
          <div key={index} className="news-article">
            <h3>{article.title}</h3>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
          </div>
        ))
      ) : (
        <p>No articles found for {team}</p>
      )}
    </div>
  );
};

export default NewsArticles;