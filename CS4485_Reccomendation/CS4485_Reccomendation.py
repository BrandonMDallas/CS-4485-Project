import numpy as np
import pandas as pd
from scipy.sparse import coo_matrix
from lightfm import LightFM
from lightfm.data import Dataset

# Sample user-stock interaction data
interactions = pd.DataFrame({
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4],
    'stock': ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'],
    'score': [1, 1, 1, 1, 1, 1, 1, 1]  # Implicit feedback (1 = invested)
})

# Sample stock metadata (features)
stock_features = pd.DataFrame({
    'stock': ['TSLA', 'NVDA', 'AAPL', 'MSFT', 'GOOGL', 'AMZN', 'META', 'NFLX'],
    'sector': ['EV', 'AI', 'Tech', 'Tech', 'Tech', 'E-commerce', 'Social', 'Streaming'],
    'volatility': ['High', 'High', 'Medium', 'Medium', 'Medium', 'High', 'High', 'Medium']
})

# Initialize LightFM Dataset
dataset = Dataset()
dataset.fit(
    interactions['user_id'], 
    interactions['stock'],
    item_features=stock_features['sector'].tolist() + stock_features['volatility'].tolist()
)

# Convert interactions to sparse matrix
(interactions_matrix, _) = dataset.build_interactions(
    [(row['user_id'], row['stock'], row['score']) for _, row in interactions.iterrows()]
)

# Convert stock metadata to feature matrix
stock_feature_tuples = [(row['stock'], [row['sector'], row['volatility']]) for _, row in stock_features.iterrows()]
stock_feature_matrix = dataset.build_item_features(stock_feature_tuples)

# Train LightFM model (Hybrid: using interactions & stock features)
model = LightFM(loss='warp')
model.fit(interactions_matrix, item_features=stock_feature_matrix, epochs=10, num_threads=2)

# Function to generate stock recommendations
def recommend_stocks(model, dataset, user_id, n_recommendations=3):
    # Get the mapping from internal IDs to stock names
    stock_ids = dataset.mapping()[1]
    # Predict the scores for all items
    scores = model.predict(user_id, np.arange(len(stock_ids)), item_features=stock_feature_matrix)
    # Get the top stock indices by sorting the scores
    top_stock_indices = np.argsort(-scores)[:n_recommendations]
    # Map the internal stock IDs to their names using the dataset mapping
    stock_names = [list(stock_ids.keys())[i] for i in top_stock_indices]
    return stock_names

# Generate recommendations for a sample user
user_id = 1
recommendations = recommend_stocks(model, dataset, user_id)
print(f"Recommended stocks for user {user_id}: {recommendations}")
