import React, { useState } from "react";
import Search from "./Search";

const LOLPage = () => {
  const [playerData, setPlayerData] = useState(null);
  const [masteryData, setMasteryData] = useState(null);
  const [profileIconUrl, setProfileIconUrl] = useState(null);
  const [error, setError] = useState("");

  const fetchPlayerData = async (username) => {
    const [gameName, tagLine] = username.split("/");
    const API_URL = `http://localhost:5000/api/player/${gameName}/${tagLine}`;

    try {
      setError("");
      setPlayerData(null);
      setMasteryData(null);
      setProfileIconUrl(null);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Player not found (status: ${response.status})`);
      }

      const data = await response.json();
      setPlayerData(data);

      fetchChampionMastery(data.puuid);

      fetchProfileIcon(data.puuid);
    } catch (err) {
      console.error("Error fetching player data:", err);
      setError(err.message);
    }
  };

  const fetchChampionMastery = async (puuid) => {
    const API_URL = `http://localhost:5000/api/champion-mastery/${puuid}`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Champion mastery data not found (status: ${response.status})`);
      }

      const data = await response.json();
      setMasteryData(data[0]);
    } catch (err) {
      console.error("Error fetching champion mastery data:", err);
      setError(err.message);
    }
  };

  const fetchProfileIcon = async (puuid) => {
    const API_URL = `http://localhost:5000/api/summoner/${puuid}`;

    try {
      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error(`Summoner data not found (status: ${response.status})`);
      }

      const data = await response.json();
      const version = "13.21.1";
      const iconUrl = `http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${data.profileIconId}.png`;
      setProfileIconUrl(iconUrl);
    } catch (err) {
      console.error("Error fetching profile icon data:", err);
      setError(err.message);
    }
  };

  const handleSearch = (username) => {
    fetchPlayerData(username);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <Search onSearch={handleSearch} />

      {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

      {playerData && (
        <div>
          <h2>Player Information</h2>
          {profileIconUrl && (
            <img
              src={profileIconUrl}
              alt={`${playerData.gameName}'s profile`}
              style={{ width: "100px", borderRadius: "50%" }}
            />
          )}
          <p>
            <strong>PUUID:</strong> {playerData.puuid}
          </p>
          <p>
            <strong>Game Name:</strong> {playerData.gameName}
          </p>
          <p>
            <strong>Game Tag:</strong> {playerData.tagLine}
          </p>
        </div>
      )}

      {masteryData && (
        <div>
          <h2>Champion Mastery Information</h2>
          <p>
            <strong>Champion ID:</strong> {masteryData.championId}
          </p>
          <p>
            <strong>Champion Level:</strong> {masteryData.championLevel}
          </p>
          <p>
            <strong>Champion Points:</strong> {masteryData.championPoints}
          </p>
          <p>
            <strong>Last Play Time:</strong>{" "}
            {new Date(masteryData.lastPlayTime).toLocaleString()}
          </p>
          <p>
            <strong>Points Since Last Level:</strong>{" "}
            {masteryData.championPointsSinceLastLevel}
          </p>
          <p>
            <strong>Points Until Next Level:</strong>{" "}
            {masteryData.championPointsUntilNextLevel}
          </p>
          <p>
            <strong>Tokens Earned:</strong> {masteryData.tokensEarned}
          </p>
        </div>
      )}
    </div>
  );
};

export default LOLPage;
