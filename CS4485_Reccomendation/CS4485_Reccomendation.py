import numpy as np
import pandas as pd
from lightfm import LightFM
from lightfm.data import Dataset

#Stock and user interaction data
interactions = pd.DataFrame({
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4],
    'stock': ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'],
    'score': [1, 1, 1, 1, 1, 1, 1, 1]  #Based on 
})

#Stock metadata and attributes
stock_features = pd.DataFrame({
    'stock': ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'],
    'sector': ['EV', 'AI', 'Tech', 'Tech', 'Tech', 'E-commerce', 'Social', 'Streaming'],
    'volatility': ['High', 'High', 'Medium', 'Medium', 'Medium', 'High', 'High', 'Medium']
})

#Initialize the LightFM dataset
dataset = Dataset()
dataset.fit(
    interactions['user_id'], 
    interactions['stock'],
    item_features=stock_features['sector'].tolist() + stock_features['volatility'].tolist()
)

#Convert interactions to sparse matrix for reccomendation
(interactions_matrix, _) = dataset.build_interactions(
    [(row['user_id'], row['stock'], row['score']) for _, row in interactions.iterrows()]
)

#Convert stock attributes to feature matrix for reccomendations
stock_feature_tuples = [(row['stock'], [row['sector'], row['volatility']]) for _, row in stock_features.iterrows()]
stock_feature_matrix = dataset.build_item_features(stock_feature_tuples)

#Train the LightFM model
model = LightFM(loss='warp')
model.fit(interactions_matrix, item_features=stock_feature_matrix, epochs=10, num_threads=2)

#Function to generate stock recommendations
def recommend_stocks(model, dataset, user_id, n_recommendations=3):
    
    stock_name_to_index = dataset.mapping()[1] 
    stock_index_to_name = {v: k for k, v in stock_name_to_index.items()} 
    stock_ids = list(stock_name_to_index.keys())
    scores = model.predict(user_id, np.arange(len(stock_ids)), item_features=stock_feature_matrix)
    top_stock_indices = np.argsort(-scores)[:n_recommendations]
    recommended_stock_names = [stock_index_to_name[i] for i in top_stock_indices]
    return recommended_stock_names

#Recommendation function based on user preferences
def interactive_recommendation():
    available_stocks = ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX']
    print(f"Available stocks: {', '.join(available_stocks)}")
    #Ask the user to enter the stocks they are interested in
    user_input = input("Enter the stocks names that you are interested in: ")
    selected_stocks = [stock.strip() for stock in user_input.split(',')]
    #Check if the entered stocks are valid
    invalid_stocks = [stock for stock in selected_stocks if stock not in available_stocks]
    if invalid_stocks:
        print(f"Invalid stock(s) entered: {', '.join(invalid_stocks)}")
        return
    
    print(f"Your selected stocks: {', '.join(selected_stocks)}")
    user_id = 1
    recommendations = recommend_stocks(model, dataset, user_id)
    recommendations_str = [str(stock) for stock in recommendations]
    print(f"Recommended stocks for user {user_id}: {', '.join(recommendations_str)}")
interactive_recommendation()
