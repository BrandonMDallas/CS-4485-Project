import requests

def get_similar_tracks(song, artist, api_key):
    url = "http://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "track.getsimilar",
        "track": song,
        "artist": artist,
        "api_key": api_key,
        "format": "json",
        "limit": 5  # Adjust number of recommendations
    }
    response = requests.get(url, params=params)
    data = response.json()
    
    if 'similartracks' in data and 'track' in data['similartracks']:
        return [(t['name'], t['artist']['name']) for t in data['similartracks']['track']]
    return []

def recommend_songs(api_key):
    num_songs = int(input("Enter the number of songs: "))
    user_songs = []
    
    for _ in range(num_songs):
        song = input("Enter song name: ")
        artist = input("Enter artist name: ")
        user_songs.append((song, artist))
    
    recommendations = set()
    for song, artist in user_songs:
        similar_tracks = get_similar_tracks(song, artist, api_key)
        recommendations.update(similar_tracks)
    
    print("\nRecommended Songs:")
    for track, artist in recommendations:
        print(f"{track} by {artist}")

if __name__ == "__main__":
    API_KEY = "62b9031fea3ec7c3eacf6c6163d55e28"  
    recommend_songs(API_KEY)
