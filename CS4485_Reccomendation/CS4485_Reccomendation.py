import yfinance as yf
import numpy as np
import pandas as pd
import requests
import re
import openai
from lightfm import LightFM
from lightfm.data import Dataset
from concurrent.futures import ThreadPoolExecutor
from bs4 import BeautifulSoup

openai.api_key = "h"
ALPHA_VANTAGE_API_KEY = '1M4IJ68U3C8UI8AJ'

def generate_stock_network(stock_features):
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
#Fetch a large set of stock tickers dynamically
def get_all_stocks():
    print("Fetching S&P 500 stocks...")
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_stocks = pd.read_html(url)[0]
    print(f"Fetched {len(sp500_stocks)} stocks.")
    return sp500_stocks['Symbol'].tolist()

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
    with ThreadPoolExecutor(max_workers=20) as executor:  # Increased workers for efficiency
        results = list(executor.map(fetch_stock_info, tickers))
    
    stock_data = [res for res in results if res]
    print(f"Fetched data for {len(stock_data)} stocks.")
    return pd.DataFrame(stock_data)

#Getting real-time stock data
tickers = get_all_stocks()
stock_list = tickers  # Define stock_list globally
stock_features = get_stock_data_parallel(tickers)

# Generate stock network
stock_network = generate_stock_network(stock_features)

#Simulated user interactions
interactions = pd.DataFrame({
    'user_id': np.random.randint(1, 10, len(tickers)),  
    'stock': tickers,
    'score': np.random.randint(1, 3, len(tickers))  
})

#Initialize LightFM dataset
dataset = Dataset()
dataset.fit(interactions['user_id'], interactions['stock'],
            item_features=stock_features['sector'].tolist() + stock_features['volatility'].tolist())

(interactions_matrix, _) = dataset.build_interactions(
    [(row['user_id'], row['stock'], row['score']) for _, row in interactions.iterrows()]
)

stock_feature_tuples = [(row['stock'], [row['sector'], row['volatility']]) for _, row in stock_features.iterrows()]
stock_feature_matrix = dataset.build_item_features(stock_feature_tuples)

#Train model
model = LightFM(loss='warp')
model.fit(interactions_matrix, item_features=stock_feature_matrix, epochs=1, num_threads=2)

def get_stock_news(stock_symbols):
    API_KEY = "dd5aee5d09f640748e280fde6759f8a6"  
    all_news = []

    # Limit to first 2-3 stocks to avoid rate limiting
    stock_symbols = stock_symbols[:3]

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
    # Fetch recent news updates using the newsAPI
    news_articles = get_stock_news(stock_symbol)
    
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
    summary += f"{short_description} "

    # Filter news to remove question-style headlines
    filtered_news = [title for title, _ in news_articles[:5] if not re.search(r"\?$", title)]

    # Include latest news if available
    if filtered_news:
        latest_news = "Recently, " + "; ".join(filtered_news) + "."
        summary += latest_news
    
    return summary

# Input
def interactive_recommendation():
    print(f"Available stocks: {', '.join(stock_list[:50])}...")
    user_input = input("Enter a stock name you are interested in: ").strip().upper()

    # Fetch and display company summary
    print(f"\nSummary of {user_input}:")
    print(get_company_summary(user_input))

    # Get recommended stocks and their reasons
    recommended_stocks, recommendation_reasons = recommend_stocks(user_input, stock_network, stock_features)
    all_stocks_to_fetch = [user_input] + recommended_stocks

    print("\nRecommended Stocks:")
    for reason in recommendation_reasons:
        print(f"- {reason}")

    # Fetch and display news articles for input stock and recommendations
    print(f"\nFetching news for {', '.join(all_stocks_to_fetch)}...\n")
    news_articles = get_stock_news(all_stocks_to_fetch)

    # Limit the number of news articles displayed
    max_articles = 5  
    news_articles = news_articles[:max_articles]  

    if news_articles:
        print("Recent News Articles:")
        for title, url in news_articles:
            print(f"- {title} ({url})")
    else:
        print("No news found for these stocks.")

#Run the interactive function
interactive_recommendation()
