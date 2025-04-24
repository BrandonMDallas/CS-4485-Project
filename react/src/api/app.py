from flask import Flask, request, jsonify
import yfinance as yf
import numpy as np
import pandas as pd
import requests
import re
from concurrent.futures import ThreadPoolExecutor
from flask_cors import CORS
import time

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Use your existing Python code here (all functions from your script)
# Remove the OpenAI key and other sensitive information

ALPHA_VANTAGE_API_KEY = '1M4IJ68U3C8UI8AJ'

def generate_stock_network(stock_features):
    # Your existing function code here...
    stock_network = {}
    
    # Group stocks by sector and additional characteristics
    for index, row in stock_features.iterrows():
        stock = row['stock']
        sector = row['sector']
        
        # Initialize network entry if not exists
        if stock not in stock_network:
            stock_network[stock] = {
                'sector_peers': [],
                'similar_market_cap': [],
                'similar_volatility': []
            }
        
        # Find sector peers
        sector_peers = stock_features[
            (stock_features['sector'] == sector) & 
            (stock_features['stock'] != stock)
        ]['stock'].tolist()
        stock_network[stock]['sector_peers'] = sector_peers
        
        # Find similar market cap stocks (within 50% range)
        market_cap_stocks = stock_features[
            (stock_features['market_cap'].notna()) &  # Ensure market cap exists
            (stock_features['stock'] != stock)
        ]
        
        # Calculate market cap similarity
        market_cap_similar = market_cap_stocks[
            (market_cap_stocks['market_cap'] >= row['market_cap'] * 0.5) & 
            (market_cap_stocks['market_cap'] <= row['market_cap'] * 1.5)
        ]['stock'].tolist()
        stock_network[stock]['similar_market_cap'] = market_cap_similar
        
        # Find similar volatility stocks
        volatility_similar = stock_features[
            (stock_features['volatility'] == row['volatility']) & 
            (stock_features['stock'] != stock)
        ]['stock'].tolist()
        stock_network[stock]['similar_volatility'] = volatility_similar
    
    return stock_network

def recommend_stocks(user_input_stock, stock_network, stock_features, n_recommendations=4):
    # Your existing function code here...
    COMPETITOR_MAP = {
        # Technology
        'AAPL': ['MSFT', 'GOOGL', 'DELL', 'SAMSUNG', 'GOOG'],
        'MSFT': ['AAPL', 'GOOGL', 'GOOG', 'ORACLE', 'CRM'],
        'GOOGL': ['AAPL', 'MSFT', 'AMZN', 'FB', 'CRM'],
        'NVDA': ['AMD', 'INTC', 'QCOM', 'TSMC'],
        'AMD': ['NVDA', 'INTC', 'QCOM'],
        
        # Telecommunications
        'VZ': ['T', 'TMUS', 'S', 'DISH'],
        'T': ['VZ', 'TMUS', 'S'],
        'TMUS': ['VZ', 'T', 'S'],
        
        # Financial Services
        'JPM': ['BAC', 'WFC', 'GS', 'C'],
        'BAC': ['JPM', 'WFC', 'GS'],
        
        # Cloud/Enterprise Software
        'AMZN': ['MSFT', 'GOOGL', 'CRM', 'ADBE'],
        'ADBE': ['CRM', 'MSFT', 'ORCL'],
        'CRM': ['MSFT', 'ORCL', 'GOOGL', 'ADBE'],
        
        # Semiconductors
        'INTC': ['AMD', 'NVDA', 'QCOM', 'TSMC'],
        'QCOM': ['NVDA', 'AMD', 'INTC', 'TSMC']
    }
    
    # Industry-specific sector mapping
    SECTOR_COMPETITIVE_KEYWORDS = {
        'Technology': ['TECH', 'SOFTWARE', 'CLOUD', 'SEMICONDUCTOR'],
        'Communication Services': ['TELECOM', 'MEDIA', 'NETWORK'],
        'Information Technology': ['SOFTWARE', 'CLOUD', 'SEMICONDUCTOR', 'NETWORKING'],
        'Financials': ['BANKING', 'INVESTMENT', 'FINTECH'],
        'Telecommunications': ['MOBILE', 'NETWORK', 'CARRIER']
    }

    user_input_stock = user_input_stock.upper()
    
    if user_input_stock not in stock_features['stock'].values:
        print(f"Stock {user_input_stock} not found in data!")
        return [], []

    # Get current stock's information
    current_stock_info = stock_features[stock_features['stock'] == user_input_stock].iloc[0]
    
    # Initialize recommendations
    recommendations = []
    recommendation_reasons = []
    
    # First, check direct competitors from hardcoded map
    direct_competitors = COMPETITOR_MAP.get(user_input_stock, [])
    for stock in direct_competitors:
        if stock not in recommendations and stock != user_input_stock:
            recommendations.append(stock)
            recommendation_reasons.append(f"{stock} (Direct Competitor)")
    
    # If not enough recommendations, look at sector competitors
    if len(recommendations) < n_recommendations:
        sector_keywords = SECTOR_COMPETITIVE_KEYWORDS.get(current_stock_info['sector'], [])
        
        sector_competitors = stock_features[
            (stock_features['stock'] != user_input_stock) &
            (~stock_features['stock'].isin(recommendations)) &
            (stock_features['sector'] == current_stock_info['sector'])
        ]
        
        for _, row in sector_competitors.iterrows():
            if len(recommendations) < n_recommendations:
                recommendations.append(row['stock'])
                recommendation_reasons.append(f"{row['stock']} (Sector Competitor)")
    
    # Fallback: add stocks from similar market cap if still not enough
    if len(recommendations) < n_recommendations:
        market_cap_similar = stock_features[
            (stock_features['market_cap'].notna()) &
            (stock_features['market_cap'] >= current_stock_info['market_cap'] * 0.5) & 
            (stock_features['market_cap'] <= current_stock_info['market_cap'] * 1.5) &
            (stock_features['stock'] != user_input_stock) &
            (~stock_features['stock'].isin(recommendations))
        ]
        
        for _, row in market_cap_similar.iterrows():
            if len(recommendations) < n_recommendations:
                recommendations.append(row['stock'])
                recommendation_reasons.append(f"{row['stock']} (Similar Market Cap)")
    
    # Final fallback: random stocks from same sector
    if len(recommendations) < n_recommendations:
        additional_stocks = stock_features[
            (stock_features['sector'] == current_stock_info['sector']) & 
            (~stock_features['stock'].isin(recommendations + [user_input_stock]))
        ]['stock'].tolist()
        
        for stock in additional_stocks:
            if len(recommendations) < n_recommendations:
                recommendations.append(stock)
                recommendation_reasons.append(f"{stock} (Additional Sector Stock)")
    
    return recommendations, recommendation_reasons

def get_all_stocks():
    try:
        print("Fetching S&P 500 stocks...")
        url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
        sp500_stocks = pd.read_html(url)[0]
        print(f"Fetched {len(sp500_stocks)} stocks.")
        return sp500_stocks['Symbol'].tolist()
    except Exception as e:
        print(f"Error fetching stocks: {e}")
        # Fallback to hardcoded top stocks
        return ["AAPL", "MSFT", "GOOGL", "AMZN", "TSLA", "META", "NVDA", "JPM", "V", "WMT", "JNJ", "PG", "MA", "UNH", "HD"]

def fetch_stock_info(ticker):
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        return {
            'stock': ticker,
            'sector': info.get('sector', 'Unknown'),
            'volatility': "High" if info.get("beta", 1) > 1 else "Medium",
            'market_cap': info.get('marketCap', None)
        }
    except Exception as e:
        print(f"Error fetching data for {ticker}: {e}")
        return None

def get_stock_data_parallel(tickers):
    stock_data = []
    with ThreadPoolExecutor(max_workers=10) as executor:  # Reduced workers for server stability
        results = list(executor.map(fetch_stock_info, tickers))
    
    stock_data = [res for res in results if res]
    print(f"Fetched data for {len(stock_data)} stocks.")
    return pd.DataFrame(stock_data)

def get_stock_news(stock_symbols):
    API_KEY = "dd5aee5d09f640748e280fde6759f8a6"  
    all_news = []

    # Limit to first 2 stocks to avoid rate limiting
    stock_symbols = stock_symbols[:2]

    # Iterate over each stock symbol
    for stock in stock_symbols:
        url = f"https://newsapi.org/v2/everything?q={stock}&apiKey={API_KEY}"

        try:
            response = requests.get(url)
            data = response.json()
            
            if data.get("status") != "ok":
                print(f"Error fetching news for {stock}: {data.get('message', 'Unknown error')}")
                continue
            
            articles = data.get("articles", [])[:3]  # Reduce to 3 articles per stock
            stock_news = [(article["title"], article["url"]) for article in articles]
            all_news.extend(stock_news)  # Collect news from each stock

        except Exception as e:
            print(f"Error fetching news for {stock}: {e}")
            continue

    return all_news

def get_company_name(stock_symbol):
    try:
        url = f"https://query2.finance.yahoo.com/v1/finance/search?q={stock_symbol}"
        response = requests.get(url, headers={"User-Agent": "Mozilla/5.0"})
        data = response.json()

        if "quotes" in data and len(data["quotes"]) > 0:
            return data["quotes"][0].get("shortname", stock_symbol)  # Get full company name
        else:
            return stock_symbol  # Default to the symbol if not found
    except Exception as e:
        return stock_symbol  # Return symbol if API fails

def get_company_summary(stock_symbol):
    # Fetch company data from Yahoo Finance
    stock = yf.Ticker(stock_symbol)
    info = stock.info
    
    company_name = info.get("longName", stock_symbol)
    sector = info.get("sector", "Unknown")
    industry = info.get("industry", "Unknown")
    market_cap = info.get("marketCap", None)
    description = info.get("longBusinessSummary", "No description available.")
    
    # Format market capitalization
    market_cap_str = f"${market_cap / 1e9:.1f} Billion" if isinstance(market_cap, (int, float)) else "N/A"
    
    # Extract first two sentences from description for brevity
    sentences = description.split(". ")
    short_description = ". ".join(sentences[:2]) + "." if len(sentences) > 1 else description

    # Construct summary
    summary = f"{company_name} is a company with a market capitalization of {market_cap_str}. "
    summary += f"It operates in the {sector.lower()} sector, specifically in the {industry.lower()} industry. "
    summary += f"{short_description}"
    
    return summary

# Initialize global variables - we'll load these when the server starts
print("Initializing stock data...")
tickers = get_all_stocks()
stock_list = tickers[:100]  # Limit to top 100 for performance
print(f"Starting to fetch data for {len(stock_list)} stocks...")
stock_features = get_stock_data_parallel(stock_list)
print("Generating stock network...")
stock_network = generate_stock_network(stock_features)
print("Initialization complete!")

@app.route('/api/stock-recommendations', methods=['POST'])
def recommend_endpoint():
    try:
        data = request.get_json()
        print("Received data:", data)  # DEBUG
        user_input_stock = data.get("stock")
        print("User input stock:", user_input_stock)

        # Make sure stock_features and stock_network are loaded
        print("Available keys in stock_network:", list(stock_network.keys())[:5])
        
        recommendations, reasons = recommend_stocks(user_input_stock, stock_network, stock_features)
        summary = get_company_summary(user_input_stock)
        news = get_recent_news(user_input_stock)
        
        return jsonify({
            "recommended_stocks": recommendations,
            "recommendation_reasons": reasons,
            "company_summary": summary,
            "news_articles": news
        })
    except Exception as e:
        print("Error:", str(e))  # Print full error stack
        return jsonify({"message": str(e)}), 500

@app.route('/api/company-name/<ticker>', methods=['GET'])
def company_name(ticker):
    try:
        name = get_company_name(ticker)
        return jsonify({'name': name})
    except Exception as e:
        return jsonify({'error': str(e)}), 500
@app.route('/api/test', methods=['GET'])
def test_api():
    return jsonify({'status': 'success', 'message': 'API is working'})
if __name__ == '__main__':
    app.run(debug=True, port=5000)

