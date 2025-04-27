from flask import Flask, request, jsonify
import requests
import yfinance as yf

app = Flask(__name__)

# API Keys
LASTFM_API_KEY = "62b9031fea3ec7c3eacf6c6163d55e28"
NEWSAPI_KEY = "YOUR_NEWSAPI_KEY"

# Music Recommendation: fetch similar tracks from Last.fm


def get_similar_tracks(song, artist, api_key=LASTFM_API_KEY, limit=5):
    url = "http://ws.audioscrobbler.com/2.0/"
    params = {
        "method": "track.getsimilar",
        "track": song,
        "artist": artist,
        "api_key": api_key,
        "format": "json",
        "limit": limit,
    }
    response = requests.get(url, params=params)
    data = response.json()

    if "similartracks" in data and "track" in data["similartracks"]:
        return [
            (t["name"], t["artist"]["name"]) for t in data["similartracks"]["track"]
        ]
    return []


# Stock Info: fetch data from Yahoo Finance


def get_stock_info(ticker):
    stock = yf.Ticker(ticker)
    return stock.info


# Stock News: fetch related news via NewsAPI


def get_news(ticker, api_key=NEWSAPI_KEY):
    url = f"https://newsapi.org/v2/everything?q={ticker}&apiKey={api_key}"
    response = requests.get(url)
    return response.json()


# Route: Music recommendations
@app.route("/recommend", methods=["POST"])
def recommend():
    user_songs = request.json.get("songs", [])
    normalized_input = set(
        (s["track"].lower(), s["artist"].lower()) for s in user_songs
    )
    recommendations = set()

    for song_data in user_songs:
        song = song_data["track"]
        artist = song_data["artist"]
        similar = get_similar_tracks(song, artist)
        for rec_track, rec_artist in similar:
            key = (rec_track.lower(), rec_artist.lower())
            if key not in normalized_input:
                recommendations.add((rec_track, rec_artist))

    result = [{"track": t, "artist": a} for t, a in sorted(recommendations)]
    return jsonify({"recommendations": result})


# Route: Stock information
@app.route("/api/stock_info", methods=["GET"])
def stock_info_endpoint():
    ticker = request.args.get("ticker")
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400
    info = get_stock_info(ticker)
    return jsonify(info)


# Route: Stock news
@app.route("/api/stock_news", methods=["GET"])
def stock_news_endpoint():
    ticker = request.args.get("ticker")
    if not ticker:
        return jsonify({"error": "Ticker is required"}), 400
    news = get_news(ticker)
    return jsonify(news)


if __name__ == "__main__":
    app.run(debug=True)
