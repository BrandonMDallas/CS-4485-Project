import yfinance as yf
import numpy as np
import pandas as pd
from lightfm import LightFM
from lightfm.data import Dataset
from concurrent.futures import ThreadPoolExecutor

# Fetch a large set of stock tickers dynamically
def get_all_stocks():
    print("Fetching S&P 500 stocks...")
    url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies"
    sp500_stocks = pd.read_html(url)[0]
    print(f"Fetched {len(sp500_stocks)} stocks.")
    return sp500_stocks['Symbol'].tolist()

# Fetch stock data in parallel
def get_stock_data_parallel(tickers):
    print("Fetching stock data in parallel...")
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

def fetch_stock_info(ticker):
    stock = yf.Ticker(ticker)
    info = stock.info
    sector = info.get('sector', 'Unknown')
    volatility = "High" if info.get("beta", 1) > 1 else "Medium"
    return {'stock': ticker, 'sector': sector, 'volatility': volatility}

# Fetch real-time stock data
tickers = get_all_stocks() [:50] #struggle to get anything past 50
stock_list = tickers  # Define stock_list globally
stock_features = get_stock_data_parallel(tickers)

# Simulated user interactions
interactions = pd.DataFrame({
    'user_id': np.random.randint(1, 10, len(tickers)),  
    'stock': tickers,
    'score': np.random.randint(1, 3, len(tickers))  
})

# Initialize LightFM dataset
dataset = Dataset()
dataset.fit(interactions['user_id'], interactions['stock'],
            item_features=stock_features['sector'].tolist() + stock_features['volatility'].tolist())

(interactions_matrix, _) = dataset.build_interactions(
    [(row['user_id'], row['stock'], row['score']) for _, row in interactions.iterrows()]
)

stock_feature_tuples = [(row['stock'], [row['sector'], row['volatility']]) for _, row in stock_features.iterrows()]
stock_feature_matrix = dataset.build_item_features(stock_feature_tuples)

# Train model
model = LightFM(loss='warp')
model.fit(interactions_matrix, item_features=stock_feature_matrix, epochs=1, num_threads=2)

# Recommendation function
def recommend_stocks(user_id, n_recommendations=5, stock_list=None):
    if stock_list is None:
        print("Error: stock_list is not defined!")
        return []
    
    print(f"Generating recommendations for user {user_id}...")

    stock_name_to_index = {stock: i for i, stock in enumerate(stock_list)}  
    stock_index_to_name = {v: stock for stock, v in stock_name_to_index.items()}
    
    stock_ids = list(stock_name_to_index.keys())  
    scores = model.predict(user_id, np.arange(len(stock_ids)), item_features=stock_feature_matrix)
    top_stock_indices = np.argsort(-scores)[:n_recommendations]
    
    recommendations = [str(stock_index_to_name[i]) for i in top_stock_indices]

    return recommendations

# Interactive User Interface
def interactive_recommendation():
    print(f"Available stocks: {', '.join(stock_list[:20])}...")
    user_input = input("Enter stock names you are interested in: ")
    selected_stocks = [stock.strip().upper() for stock in user_input.split(',')]
    print(f"Selected stocks: {', '.join(selected_stocks)}")
    user_id = 1
    recommendations = recommend_stocks(user_id, stock_list=stock_list)
    print(f"Recommended stocks: {', '.join(recommendations)}")

interactive_recommendation()
