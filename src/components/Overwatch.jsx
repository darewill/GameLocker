import React, { useState } from "react";
import Search from "./Search"; // Adjust the path if necessary

const Overwatch = () => {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState("");

  // Function to fetch player data
  const OWFetchData = async (playerId) => {
    const apiUrl = `https://overfast-api.tekrop.fr/players/${playerId}/summary`;
    try {
      setError(""); // Clear previous errors
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Player not found (status: ${response.status})`);
      }
      const data = await response.json();
      setPlayerData(data); // Update the state with fetched data
    } catch (err) {
      console.error("Error fetching player data:", err);
      setPlayerData(null); // Clear player data if there's an error
      setError(err.message); // Show the error message
    }
  };

  // Handle search input from Search component
  const handleSearch = (username) => {
    OWFetchData(username);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      {/* Use the custom search bar */}
      <Search onSearch={handleSearch} />

      {/* Error Message */}
      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {/* Player Data */}
      {playerData && (
        <div style={{ marginTop: "20px", border: "1px solid #CCC", padding: "20px", borderRadius: "5px" }}>
          <h2>{playerData.username}</h2>
          <img
            src={playerData.avatar}
            alt={`${playerData.username}'s avatar`}
            style={{ width: "100px", borderRadius: "50%" }}
          />
          <p>
            <strong>Title:</strong> {playerData.title || "No title available"}
          </p>
          <p>
            <strong>Endorsement Level:</strong> {playerData.endorsement.level || "N/A"}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(playerData.last_updated_at * 1000).toLocaleString() || "N/A"}
          </p>
        </div>
      )}
    </div>
  );
};

export default Overwatch;
