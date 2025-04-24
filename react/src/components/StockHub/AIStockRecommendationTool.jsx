import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner, Card, Alert, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Make sure to install axios: npm install axios

// AI Stock Recommendation Tool Component
const AIStockRecommendationTool = ({ userStocks, setUserStocks }) => {
  const [showRecommendModal, setShowRecommendModal] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [selectedStock, setSelectedStock] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [feedback, setFeedback] = useState('');
  const [stockSummary, setStockSummary] = useState('');
  const [newsArticles, setNewsArticles] = useState([]);
  const [popularStocks, setPopularStocks] = useState([
    'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 
    'TSLA', 'NVDA', 'JPM', 'V', 'WMT'
  ]);
  
  // Function to get recommendations from the backend
  const getRecommendations = async () => {
    if (!selectedStock) {
      setError('Please enter a stock symbol');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      // Call your Python backend API
      const response = await axios.post('/api/stock-recommendations', {
        stock: selectedStock
      });
      
      const { recommended_stocks, recommendation_reasons, company_summary, news_articles } = response.data;
      
      // Filter out stocks already in user's portfolio
      const filteredStocks = recommended_stocks.filter(stock => !userStocks.includes(stock));
      
      // Create recommendation objects with reasons
      const recommendationObjects = filteredStocks.map((stock, index) => ({
        ticker: stock,
        name: '', // We'll fetch this separately or include it in the API response
        reason: recommendation_reasons[index]
      }));
      
      setRecommendations(recommendationObjects);
      setStockSummary(company_summary);
      setNewsArticles(news_articles);
      
    } catch (err) {
      setError(`Error getting recommendations: ${err.response?.data?.message || err.message}`);
    } finally {
      setLoading(false);
    }
  };
  
  // Function to fetch company name for a stock ticker
  const fetchCompanyNames = async () => {
    if (recommendations.length === 0) return;
    
    const updatedRecommendations = [...recommendations];
    
    for (let i = 0; i < updatedRecommendations.length; i++) {
      try {
        const response = await axios.get(`/api/company-name/${updatedRecommendations[i].ticker}`);
        updatedRecommendations[i].name = response.data.name;
      } catch (err) {
        console.error(`Failed to fetch name for ${updatedRecommendations[i].ticker}`);
      }
    }
    
    setRecommendations(updatedRecommendations);
  };
  
  // Fetch company names when recommendations change
  useEffect(() => {
    fetchCompanyNames();
  }, [recommendations.length]);
  
  const handleAddToPortfolio = (ticker) => {
    if (!userStocks.includes(ticker)) {
      const updatedStocks = [...userStocks, ticker];
      setUserStocks(updatedStocks);
      setFeedback(`Added ${ticker} to your portfolio`);
      
      setTimeout(() => {
        setFeedback('');
      }, 3000);
    }
  };
  
  return (
    <>
      {/* Button to open recommendation modal */}
      <button 
        type="button" 
        style={{ display: 'block', margin: 'auto', float: 'left', borderRadius: '10px'}} 
        data-toggle="tooltip" 
        data-placement="bottom" 
        title="Get AI Stock Recommendations"
        onClick={() => setShowRecommendModal(true)}
      >
        Get recommendations from AI
      </button>
      
      {/* AI Recommendation Modal */}
      <Modal 
        show={showRecommendModal} 
        onHide={() => setShowRecommendModal(false)}
        size="lg"
        dialogClassName="recommendation-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>AI Stock Recommendations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="mb-4">
            <Form.Group>
              <Form.Label>Enter a stock symbol you're interested in</Form.Label>
              <InputGroup>
                <Form.Control 
                  type="text" 
                  placeholder="e.g. AAPL" 
                  value={selectedStock}
                  onChange={(e) => setSelectedStock(e.target.value.toUpperCase())}
                />
                <Button 
                  variant="primary" 
                  onClick={getRecommendations}
                  disabled={loading}
                >
                  Get Recommendations
                </Button>
              </InputGroup>
              <div className="mt-2">
                <small className="text-muted">Popular stocks: </small>
                {popularStocks.map(stock => (
                  <Button 
                    key={stock} 
                    variant="outline-secondary" 
                    size="sm" 
                    className="me-1 mb-1"
                    onClick={() => setSelectedStock(stock)}
                  >
                    {stock}
                  </Button>
                ))}
              </div>
            </Form.Group>
          </Form>
          
          {loading && (
            <div className="text-center my-4">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
              <p className="mt-2">Analyzing market data and finding recommendations...</p>
            </div>
          )}
          
          {error && <Alert variant="danger">{error}</Alert>}
          {feedback && <Alert variant="success">{feedback}</Alert>}
          
          {stockSummary && !loading && (
            <Card className="mb-4">
              <Card.Header>
                <strong>About {selectedStock}</strong>
              </Card.Header>
              <Card.Body>
                <p>{stockSummary}</p>
              </Card.Body>
            </Card>
          )}
          
          {recommendations.length > 0 && !loading && (
            <div>
              <h5 className="mb-3">Similar stocks you might be interested in:</h5>
              {recommendations.map((stock, index) => (
                <Card key={index} className="mb-3">
                  <Card.Header className="d-flex justify-content-between align-items-center">
                    <strong>{stock.ticker} {stock.name ? `- ${stock.name}` : ''}</strong>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => handleAddToPortfolio(stock.ticker)}
                    >
                      Add to Portfolio
                    </Button>
                  </Card.Header>
                  <Card.Body>
                    <p>{stock.reason}</p>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}
          
          {newsArticles && newsArticles.length > 0 && !loading && (
            <div className="mt-4">
              <h5>Recent News</h5>
              <ul className="list-group">
                {newsArticles.map((article, index) => (
                  <li key={index} className="list-group-item">
                    <a href={article[1]} target="_blank" rel="noopener noreferrer">
                      {article[0]}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {!loading && recommendations.length === 0 && !error && !stockSummary && (
            <div className="text-center my-4">
              <p>Enter a stock symbol and click "Get Recommendations" to get started.</p>
            </div>
          )}
          
          <div className="mt-4">
            <p className="text-muted small">
              <strong>Disclaimer:</strong> These recommendations are generated based on AI analysis of market data.
              They do not constitute financial advice. Please do your own research before investing.
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AIStockRecommendationTool;