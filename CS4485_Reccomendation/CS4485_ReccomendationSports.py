import numpy as np
import pandas as pd
from lightfm import LightFM
from lightfm.data import Dataset

#Player and user interaction data
interactions = pd.DataFrame({
    'user_id': [1, 1, 2, 2, 3, 3, 4, 4],
    'player': ['Luka Doncic', 'LeBron James', 'Stephen Curry', 'Giannis Antetokounmpo', 'Kevin Durant', 'James Harden', 'Joel Embiid', 'Kawhi Leonard'],
    'team': ['Mavericks', 'Lakers', 'Warriors', 'Bucks', 'Nets', 'Sixers', 'Raptors', 'Clippers'],
    'score': [1, 1, 1, 1, 1, 1, 1, 1]  #Baseline for Player Preference
})
#Player attributes
player_features = pd.DataFrame({
    'player': ['Luka Doncic', 'LeBron James', 'Giannis Antetokounmpo', 'Stephen Curry', 'Kawhi Leonard', 'James Harden', 'Kevin Durant', 'Damian Lillard'],
    'team': ['Mavericks', 'Lakers', 'Bucks', 'Warriors', 'Clippers', '76ers', 'Nets', 'Trail Blazers'],
    'position': ['PG', 'SF', 'PF', 'PG', 'SF', 'SG', 'SF', 'PG'],
    'ppg': [28.8, 25.0, 29.9, 32.0, 27.1, 24.6, 29.0, 24.0]  #Points per game
})
#Team attributes
team_features = pd.DataFrame({
    'team': ['Mavericks', 'Lakers', 'Bucks', 'Warriors', 'Clippers', '76ers', 'Nets', 'Trail Blazers'],
    'city': ['Dallas', 'Los Angeles', 'Milwaukee', 'San Francisco', 'Los Angeles', 'Philadelphia', 'Brooklyn', 'Portland'],
    'championships': [1, 17, 1, 6, 0, 3, 0, 0]
})

#Initialize the LightFM dataset
dataset = Dataset()
dataset.fit(
    interactions['user_id'], 
    interactions['player'].tolist() + interactions['team'].tolist(), 
    item_features=player_features['position'].tolist() + team_features['city'].tolist() 
)
(interactions_matrix, _) = dataset.build_interactions(
    [(row['user_id'], row['player'], row['score']) for _, row in interactions.iterrows()] + 
    [(row['user_id'], row['team'], row['score']) for _, row in interactions.iterrows()]
)
#Convert player and team attributes to feature matrix
player_feature_tuples = [(row['player'], [row['position']]) for _, row in player_features.iterrows()]
team_feature_tuples = [(row['team'], [row['city']]) for _, row in team_features.iterrows()]
item_feature_matrix = dataset.build_item_features(player_feature_tuples + team_feature_tuples)

#Train the LightFM model
model = LightFM(loss='warp')
model.fit(interactions_matrix, item_features=item_feature_matrix, epochs=10, num_threads=2)

#Function to generate player or team recommendations
def recommend_players_teams(model, dataset, user_id, n_recommendations=3):
    player_name_to_index = dataset.mapping()[1]
    team_name_to_index = dataset.mapping()[2]
    player_index_to_name = {v: k for k, v in player_name_to_index.items()}
    team_index_to_name = {v: k for k, v in team_name_to_index.items()}
    player_ids = list(player_name_to_index.keys())
    team_ids = list(team_name_to_index.keys())
    #Predict scores for the user
    player_scores = model.predict(user_id, np.arange(len(player_ids)), item_features=item_feature_matrix)
    team_scores = model.predict(user_id, np.arange(len(team_ids)), item_features=item_feature_matrix)
    #Get recommendations based on highest predicted scores
    top_player_indices = np.argsort(-player_scores)[:n_recommendations]
    top_team_indices = np.argsort(-team_scores)[:n_recommendations]
    recommended_players = [player_index_to_name[i] for i in top_player_indices]
    recommended_teams = [team_index_to_name[i] for i in top_team_indices]
    return recommended_players, recommended_teams
#Interactive recommendation function based on user preferences
def interactive_recommendation():
    available_players = ['Luka Doncic', 'LeBron James', 'Giannis Antetokounmpo', 'Stephen Curry', 'Kawhi Leonard', 'James Harden', 'Kevin Durant', 'Damian Lillard']
    available_teams = ['Mavericks', 'Lakers', 'Bucks', 'Warriors', 'Clippers', '76ers', 'Nets', 'Trail Blazers']
    print(f"Available players: {', '.join(available_players)}")
    print(f"Available teams: {', '.join(available_teams)}")
    #Ask the user to enter the players or teams they are interested in
    user_input = input("Enter the players or teams you are interested in (comma-separated): ")
    selected_items = [item.strip() for item in user_input.split(',')]
    #Check if the entered items are valid players or teams
    invalid_items = [item for item in selected_items if item not in available_players and item not in available_teams]
    if invalid_items:
        print(f"Invalid player/team(s) entered: {', '.join(invalid_items)}")
        return
    print(f"Your selected items: {', '.join(selected_items)}")
    user_id = 1
    recommended_players, recommended_teams = recommend_players_teams(model, dataset, user_id)
    print(f"Recommended players for you: {', '.join(recommended_players)}")
    print(f"Recommended teams for you: {', '.join(recommended_teams)}")
interactive_recommendation()
