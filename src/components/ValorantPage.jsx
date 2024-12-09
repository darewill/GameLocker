import React, { useState } from "react";
import Search from "./Search"; // Import your Search component

export default function ValorantPage() {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlayerData = async (username) => {
    setError(null); // Reset any previous errors
    setPlayerData(null); // Reset previous player data

    const [gameName, tagLine] = username.split("#").map((part) => part.trim());
    if (!gameName || !tagLine) {
      setError("Please enter a valid username in the format: GameName#TagLine");
      return;
    }

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

      {/* Use the Search component */}
      <Search onSearch={fetchPlayerData} />

      {error && <div style={{ color: "red" }}>{error}</div>}

      {playerData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Player Info</h2>
          <p>
            <strong>Name:</strong> {playerData.name}
          </p>
          <p>
            <strong>Tag:</strong> {playerData.tag}
          </p>
          <p>
            <strong>Region:</strong> {playerData.region}
          </p>
          <p>
            <strong>Account Level:</strong> {playerData.account_level}
          </p>
          <p>
            <strong>Last Update:</strong> {playerData.last_update}
          </p>

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
