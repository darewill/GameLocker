import React, { useState } from "react";
import Search from "./Search";

const LOLPage = () => {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState("");

  const fetchPlayerData = async (username) => {
    const apiKey = `${import.meta.env.VITE_LOL_API_KEY}`;
    const apiUrl = `https://Europe.api.riotgames.com/lol/summoner/v4/summoners/by-name/${username}?api_key=${apiKey}`;
    try {
      setError("");
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`Player not found (status: ${response.status})`);
      }
      const data = await response.json();
      setPlayerData(data);
    } catch (err) {
      console.error("Error fetching player data:", err);
      setPlayerData(null);
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
        <div className="mt-[20px] p-[20px] rounded-[5px] text-white flex flex-col items-center">
          <h2 className="font-bold uppercase text-[35px]">
            {playerData.name}
          </h2>
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/12.22.1/img/profileicon/${playerData.profileIconId}.png`}
            alt={`${playerData.name}'s avatar`}
            className="w-[100px] rounded-[50%] my-[10px]"
          />
          <p>
            <strong>Level:</strong> {playerData.summonerLevel}
          </p>
          <p>
            <strong>Last Updated:</strong>{" "}
            {new Date(playerData.revisionDate).toLocaleString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default LOLPage;
