import React, { useState } from "react";

const Recommender = () => {
  const [inputSongs, setInputSongs] = useState([{ song: "", artist: "" }]);
  const [recommendations, setRecommendations] = useState([]);

  const handleInputChange = (index, field, value) => {
    const updated = [...inputSongs];
    updated[index][field] = value;
    setInputSongs(updated);
  };

  const addSongField = () => {
    setInputSongs([...inputSongs, { song: "", artist: "" }]);
  };

  const getRecommendations = async () => {
    try {
      const response = await fetch("http://localhost:5000/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ songs: inputSongs }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (error) {
      console.error("Error getting recommendations:", error);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Song Recommender</h2>

      {inputSongs.map((entry, idx) => (
        <div key={idx} className="flex gap-2 mb-2">
          <input
            placeholder="Song"
            value={entry.song}
            onChange={(e) => handleInputChange(idx, "song", e.target.value)}
            className="flex-1 border p-2 rounded"
          />
          <input
            placeholder="Artist"
            value={entry.artist}
            onChange={(e) => handleInputChange(idx, "artist", e.target.value)}
            className="flex-1 border p-2 rounded"
          />
        </div>
      ))}

      <button onClick={addSongField} className="bg-gray-200 px-3 py-1 rounded mr-2">
        + Add Song
      </button>
      <button onClick={getRecommendations} className="bg-blue-600 text-white px-3 py-1 rounded">
        Get Recommendations
      </button>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Recommendations:</h3>
        <ul className="list-disc list-inside">
          {recommendations.map((rec, i) => (
            <li key={i}>
              {rec.name} by {rec.artist}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recommender;
