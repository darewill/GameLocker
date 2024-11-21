import React, { useState } from "react";
import Search from "../components/Search";
import "../style/ValorantPage.css";

export default function ValorantPage() {
  const [playerData, setPlayerData] = useState(null);
  const [matches, setMatches] = useState([]);

  const fetchPUUID = async (username) => {
    const [gameName, tagLine] = username.split("#");
    const baseURL = "https://americas.api.riotgames.com";

    try {
      const response = await fetch(
        `${baseURL}/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
        {
          headers: {
            "X-Riot-Token": "YOUR_API_KEY",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch PUUID");
      const data = await response.json();
      return { puuid: data.puuid, gameName, tagLine };
    } catch (error) {
      console.error("Error fetching PUUID:", error);
      return null;
    }
  };

  const getRegionByShard = (shard) => {
    const shardRegionMap = {
      na: "americas",
      br: "americas",
      latam: "americas",
      eu: "europe",
      ap: "asia",
      kr: "asia",
    };
    return shardRegionMap[shard] || "americas";
  };

  const fetchValData = async (username) => {
    try {
      const playerInfo = await fetchPUUID(username);
      if (!playerInfo) return;

      const { puuid, gameName, tagLine } = playerInfo;

      const shard = "eu"; 
      const region = getRegionByShard(shard);

      const baseURL = `https://${region}.api.riotgames.com`;

      const rankResponse = await fetch(
        `${baseURL}/val/ranked/v1/leaderboards/by-act/{actId}?puuid=${puuid}`,
        {
          headers: {
            "X-Riot-Token": "YOUR_API_KEY",
          },
        }
      );

      if (!rankResponse.ok) throw new Error("Failed to fetch rank");
      const rankData = await rankResponse.json();

      const matchHistoryResponse = await fetch(
        `${baseURL}/val/match/v1/matches/by-puuid/${puuid}`,
        {
          headers: {
            "X-Riot-Token": "YOUR_API_KEY",
          },
        }
      );

      if (!matchHistoryResponse.ok)
        throw new Error("Failed to fetch match history");
      const matchHistoryData = await matchHistoryResponse.json();

      setPlayerData({
        gameName,
        tagLine,
        rank: rankData.rank || "Unranked",
        rr: rankData.rr || "N/A",
      });
      setMatches(matchHistoryData.matches);
    } catch (error) {
      console.error("Error fetching Valorant Data:", error);
    }
  };

  return (
    <div className="valorant-container">


      
      <Search onSearch={fetchValData} />

      
      {playerData && (
        <div className="player-data">
          <h2 className="text-xl font-bold">
            {playerData.gameName}#{playerData.tagLine}
          </h2>
          <p>Rank: {playerData.rank}</p>
          <p>Ranked Rating (RR): {playerData.rr}</p>
        </div>
      )}

      
      {matches.length > 0 && (
        <div className="match-history mt-4">
          <h3 className="text-lg font-bold mb-2">Match History</h3>
          <ul>
            {matches.map((match, index) => (
              <li key={index} className="mb-2">
                <p>Match ID: {match.match_id}</p>
                <p>Agent: {match.agent || "Unknown"}</p>
                <p>Weapon: {match.weapon || "Unknown"}</p>
                <p>Kills: {match.kills}</p>
                <p>Deaths: {match.deaths}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
