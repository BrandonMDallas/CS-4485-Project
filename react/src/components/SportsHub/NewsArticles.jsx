// Grid-based NewsArticles.jsx
import React, { useState, useEffect } from "react";
import useAxiosPrivate from "../../api/useAxiosPrivate";
const NEWS_URL = "/api/newsapi/everything";

const NewsArticles = ({ team }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const axiosPrivate = useAxiosPrivate();

  // Function to format date in a more readable way
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Function to truncate text to a specific length
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    return text.length > maxLength
      ? text.substring(0, maxLength) + "..."
      : text;
  };

  // Function to get placeholder image if no image is available
  const getImageUrl = (article) => {
    return (
      article.urlToImage || "https://via.placeholder.com/300x200?text=No+Image"
    );
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const apiKey = "dd5aee5d09f640748e280fde6759f8a6";
        if (!apiKey) throw new Error("API key not found");

        const rawQuery = `+${team} +team`;

        const params = new URLSearchParams({
          q: rawQuery,
          sortBy: "relevancy",
          searchIn: "title,description,content",
          sources: [
            "espn",
            "bleacher-report",
            "bbc-sport",
            "fox-sports",
            "cbs-sports",
            "nbc-sports",
          ].join(","),
        }).toString();

        const url = `${NEWS_URL}?${params}`;

        const response = await axiosPrivate.get(url);

        const data = response.data;
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

  if (loading) {
    return <div className="loading">Loading the latest {team} news...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (articles.length === 0) {
    return <div className="empty-message">No articles found for {team}</div>;
  }

  return (
    <div className="news-articles">
      {/* Featured Article (first article) */}
      {articles.length > 0 && (
        <article className="news-article featured">
          <div
            className="article-image"
            style={{
              backgroundImage: `url(${getImageUrl(articles[0])})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
          <div className="article-content">
            {articles[0].publishedAt && (
              <div className="article-meta">
                <span className="article-date">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  {formatDate(articles[0].publishedAt)}
                </span>
                <span className="article-source">
                  {articles[0].source?.name}
                </span>
              </div>
            )}

            <h3>
              <a
                href={articles[0].url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {articles[0].title}
              </a>
            </h3>

            <p>{truncateText(articles[0].description, 180)}</p>

            <a
              href={articles[0].url}
              target="_blank"
              rel="noopener noreferrer"
              className="read-more"
            >
              Read full article
            </a>
          </div>
        </article>
      )}

      {/* Regular Articles Grid */}
      {articles.slice(1, 7).map((article, index) => (
        <article key={index} className="news-article">
          {article.publishedAt && (
            <div className="article-meta">
              <span className="article-date">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {formatDate(article.publishedAt)}
              </span>
              <span className="article-source">{article.source?.name}</span>
            </div>
          )}

          <h3>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {truncateText(article.title, 70)}
            </a>
          </h3>

          <p>{truncateText(article.description, 100)}</p>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="read-more"
          >
            Read more
          </a>
        </article>
      ))}
    </div>
  );
};

export default NewsArticles;
