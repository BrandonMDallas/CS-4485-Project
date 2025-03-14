import yfinance as yf
import numpy as np
import pandas as pd
import requests
from lightfm import LightFM
from lightfm.data import Dataset
from concurrent.futures import ThreadPoolExecutor

#Fetch a large set of stock tickers dynamically
def get_all_stocks():
    print("Fetching S&P 500 stocks...")
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_stocks = pd.read_html(url)[0]
    print(f"Fetched {len(sp500_stocks)} stocks.")
    return sp500_stocks['Symbol'].tolist()

#Using multiple cores to take in data
def get_stock_data_parallel(tickers):
    stock_data = []
    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_ticker = {executor.submit(fetch_stock_info, ticker): ticker for ticker in tickers}
        for future in future_to_ticker:
            ticker = future_to_ticker[future]
            try:
                result = future.result()
                stock_data.append(result)
            except Exception as e:
                print(f"Error fetching data for {ticker}: {e}")
    print(f"Fetched data for {len(stock_data)} stocks.")
    return pd.DataFrame(stock_data)

#Getting stock information
def fetch_stock_info(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    sector = info.get('sector', 'Unknown')
    volatility = "High" if info.get("beta", 1) > 1 else "Medium"
    return {'stock': ticker, 'sector': sector, 'volatility': volatility}

#Getting real-time stock data
tickers = get_all_stocks()[:50]
stock_list = tickers  # Define stock_list globally
stock_features = get_stock_data_parallel(tickers)

#Creating a mapping of stocks by sector and volatility
sector_map = stock_features.groupby('sector')['stock'].apply(list).to_dict()
volatility_map = stock_features.groupby('volatility')['stock'].apply(list).to_dict()

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

#Enhanced Recommendation function
def recommend_stocks(user_input_stock, n_recommendations=5):
    user_input_stock = user_input_stock.upper()
    if user_input_stock not in stock_features['stock'].values:
        print(f"Stock {user_input_stock} not found in data!")
        return []
    #Get sector and volatility of the given stock
    stock_info = stock_features[stock_features['stock'] == user_input_stock].iloc[0]
    stock_sector = stock_info['sector']
    stock_volatility = stock_info['volatility']
    #Group stocks by sector and volatility
    sector_matches = stock_features[stock_features['sector'] == stock_sector]['stock'].tolist()
    volatility_matches = stock_features[stock_features['volatility'] == stock_volatility]['stock'].tolist()
    #Remove the selected stock itself from recommendations
    sector_matches = [s for s in sector_matches if s != user_input_stock]
    volatility_matches = [s for s in volatility_matches if s != user_input_stock]
    #Select recommendations
    recommendations = []
    for stock in sector_matches[:n_recommendations//2]:  # Prioritize same sector
        recommendations.append((stock, f"Same Sector: {stock_sector}"))
    for stock in volatility_matches[:n_recommendations//2]:  # Then similar volatility
        if stock not in sector_matches:
            recommendations.append((stock, f"Similar Volatility: {stock_volatility}"))
    #Print recommendations
    print("\nRecommended stocks:")
    for stock, reason in recommendations:
        print(f"- {stock} ({reason})")
    return recommendations


def get_stock_news(stock):
    API_KEY = "dd5aee5d09f640748e280fde6759f8a6"  
    url = f"https://newsapi.org/v2/everything?q={stock}&apiKey={API_KEY}"

    try:
        response = requests.get(url)
        data = response.json()
        
        if data["status"] != "ok":
            print("Error fetching news:", data.get("message", "Unknown error"))
            return []
        
        articles = data.get("articles", [])[:5]  # Get top 5 articles
        news_list = [(article["title"], article["url"]) for article in articles]

        return news_list

    except Exception as e:
        print(f"Error fetching news for {stock}: {e}")
        return []
    
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
    """Fetch the Wikipedia summary for a stock using its full company name."""
    company_name = get_company_name(stock_symbol)  # Convert symbol to full name
    
    search_url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{company_name.replace(' ', '_')}"
    
    try:
        response = requests.get(search_url)
        data = response.json()
        
        if "extract" in data:
            return data["extract"]
        else:
            return f"No summary found for {company_name}."
    except Exception as e:
        return f"Error fetching summary for {stock_symbol}: {e}"

# Input
def interactive_recommendation():
    print(f"Available stocks: {', '.join(stock_list[:50])}...")
    user_input = input("Enter a stock name you are interested in: ").strip().upper()
    
    # Fetch and display company summary
    print(f"\nSummary of {user_input}:")
    print(get_company_summary(user_input))

    recommend_stocks(user_input)
    # Fetch and display news articles
    print(f"\nFetching news for {user_input}...\n")
    news_articles = get_stock_news(user_input)

    if news_articles:
        print("Recent News Articles:")
        for title, url in news_articles:
            print(f"- {title} ({url})")
    else:
        print("No news found for this stock.")

#Run the interactive function
interactive_recommendation()
