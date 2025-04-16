from flask import Flask, request, jsonify
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Allow cross-origin requests from React

API_KEY = "62b9031fea3ec7c3eacf6c6163d55e28"

# This is the main method to get similar tracks
def get_similar_tracks(song, artist, api_key):
    url = "http://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "track.getsimilar",
        "track": song,
        "artist": artist,
        "api_key": api_key,
        "format": "json",
        "limit": 5  # Number of recommendations, can be adjusted
    }
    response = requests.get(url, params=params)
    data = response.json()
    
    if 'similartracks' in data and 'track' in data['similartracks']:
        return [(t['name'], t['artist']['name']) for t in data['similartracks']['track']]
    return []

@app.route('/recommendations', methods=['POST'])
def get_recommendations():
    try:
        # Step 1: Get the music data from the front end
        data = request.get_json()
        
        # Assuming the front end sends a list of songs in this format:
        # {
        #   "songs": [
        #     {"song": "Song Name", "artist": "Artist Name"},
        #     {"song": "Another Song", "artist": "Another Artist"}
        #   ]
        # }
        
        songs = data.get('songs', [])
        
        if not songs:
            return jsonify({'error': 'No songs provided'}), 400
        
        recommendations = set()
        
        # Step 2: Call the music recommendation function (from the recommender file)
        for entry in songs:
            song = entry.get('song')
            artist = entry.get('artist')
            if song and artist:
                similar_tracks = get_similar_tracks(song, artist, API_KEY)
                recommendations.update(similar_tracks)
        
        # Step 3: Remove duplicates and format the recommendations
        recommendations_list = [{"name": name, "artist": artist} for name, artist in recommendations]
        
        # Step 4: Return the recommendations to the front end
        return jsonify({'recommendations': recommendations_list}), 200
    
    except Exception as e:
        # Handle any errors that might occur
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
