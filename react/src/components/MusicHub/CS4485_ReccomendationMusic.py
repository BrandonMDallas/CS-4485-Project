from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

API_KEY = "62b9031fea3ec7c3eacf6c6163d55e28"

def get_similar_tracks(song, artist, api_key, limit=5):
    url = "http://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "track.getsimilar",
        "track": song,
        "artist": artist,
        "api_key": api_key,
        "format": "json",
        "limit": 3
    }
    response = requests.get(url, params=params)
    data = response.json()

    if 'similartracks' in data and 'track' in data['similartracks']:
        return [(t['name'], t['artist']['name']) for t in data['similartracks']['track']]
    return []

@app.route("/recommend", methods=["POST"])
def recommend():
    user_songs = request.json.get("songs", [])
    normalized_input = set((s['track'].lower(), s['artist'].lower()) for s in user_songs)

    recommendations = set()

    for song_data in user_songs:
        song = song_data['track']
        artist = song_data['artist']
        similar = get_similar_tracks(song, artist, API_KEY)
        for rec_track, rec_artist in similar:
            key = (rec_track.lower(), rec_artist.lower())
            if key not in normalized_input:
                recommendations.add((rec_track, rec_artist))

    result = [{"track": t, "artist": a} for t, a in sorted(recommendations)]
    return jsonify({"recommendations": result})

if __name__ == "__main__":
    app.run(debug=True)
