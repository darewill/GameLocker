import React, { useState } from "react";

export default function ValorantPage() {
  const [gameName, setGameName] = useState("");
  const [tagLine, setTagLine] = useState("");
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlayerData = async () => {
    setError(null); // Reset any previous errors
    setPlayerData(null); // Reset previous player data
    try {
      const response = await fetch(
        `http://localhost:5000/api/valorant/player/${gameName}/${tagLine}`
      );
      if (!response.ok) {
        throw new Error("Player not found or API error");
      }
      const data = await response.json();
      setPlayerData(data.data); // Accessing the "data" key
    } catch (err) {
      setError(err.message);
      console.error("Error fetching player data:", err);
    }
  };

  return (
    <div>
      <h1>Valorant Player Stats</h1>
      <input
        type="text"
        placeholder="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tag Line"
        value={tagLine}
        onChange={(e) => setTagLine(e.target.value)}
      />
      <button onClick={fetchPlayerData}>Search</button>

      {error && <div style={{ color: "red" }}>{error}</div>}

      {playerData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Player Info</h2>
          <p><strong>Name:</strong> {playerData.name}</p>
          <p><strong>Tag:</strong> {playerData.tag}</p>
          <p><strong>Region:</strong> {playerData.region}</p>
          <p><strong>Account Level:</strong> {playerData.account_level}</p>
          <p><strong>Last Update:</strong> {playerData.last_update}</p>

          <h3>Player Card</h3>
          <img
            src={playerData.card.wide}
            alt="Player Card"
            style={{ width: "100%", maxWidth: "400px" }}
          />
        </div>
      )}
    </div>
  );
}
