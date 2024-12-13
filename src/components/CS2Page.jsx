import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "../components/Search";
import FaceitLogo from "../images/faceitLogo.png";
import "../style/CS2Page.css";

export default function CS2Page() {
  const [playerData, setPlayerData] = useState(null);
  const [playerStats, setPlayerStats] = useState(null);
  const [mapSegments, setMapSegments] = useState([]);

  const fetchCS2Data = async (username) => {
    try {
      const playerResponse = await fetch(
        `https://open.faceit.com/data/v4/players?nickname=${username}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_FACEIT_BEARER_KEY}`,
          },
        }
      );

      if (!playerResponse.ok) {
        console.error("Error fetching player data:", playerResponse.statusText);
        return;
      }

      const player = await playerResponse.json();
      setPlayerData({
        nickname: player.nickname,
        avatar: player.avatar,
        country: player.country.toUpperCase(),
        steamNickname: player.steam_nickname,
        faceitElo: player.games?.cs2?.faceit_elo || "N/A",
        region: player.games?.cs2?.region || "N/A",
        skillLevel: player.games?.cs2?.skill_level || "N/A",
      });

      const statsResponse = await fetch(
        `https://open.faceit.com/data/v4/players/${player.player_id}/stats/csgo`,
        {
          headers: {
            Authorization: `Bearer 1783690d-f11b-47eb-9125-d70fdfc845ec`,
          },
        }
      );

      if (!statsResponse.ok) {
        console.error("Error fetching player stats:", statsResponse.statusText);
        return;
      }

      const stats = await statsResponse.json();
      setPlayerStats({
        killsPerMatch: stats.lifetime?.average_kills,
        winRate: stats.lifetime?.["Win Rate %"],
        matchesPlayed: stats.lifetime?.Matches,
        headshots: stats.lifetime?.["Total Headshots %"],
        avgHeadshots: stats.lifetime?.["Average Headshots %"],
        kdRatio: stats.lifetime?.["K/D Ratio"],
        longestWinStreak: stats.lifetime?.["Longest Win Streak"],
        currentWinStreak: stats.lifetime?.["Current Win Streak"],
        recentResults: stats.lifetime?.["Recent Results"]
          ? stats.lifetime["Recent Results"]
              .map((result) => (Number(result) === 0 ? "W" : "L"))
              .join(" ")
          : "N/A",
        wins: stats.lifetime?.Wins,
      });

      setMapSegments(stats.segments || []);
    } catch (error) {
      console.error("Error fetching CS2 Data:", error);
    }
  };

  return (
    <AnimatePresence>
      <div className="cs2-wrapper flex flex-col items-center">
        <motion.div
          key="player-data"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="player-details flex flex-col items-center"
        >
          <img
            src={FaceitLogo}
            className="ft-logo w-[200px] mt-[20%] rounded-xl"
          />
          <Search onSearch={fetchCS2Data} />
        </motion.div>
        <div className="cs2-data text-white">
          {playerData ? (
            <img
              src={playerData.avatar}
              alt={`${playerData.nickname}'s avatar`}
              className="pp w-[150px] rounded-full flex m-auto mt-[50px]"
            />
          ) : (
            <></>
          )}
          <div className="players-info flex flex-row items-center justify-between">
            {playerData && (
              <motion.div
                key="player-data"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="player-details"
              >
                <div className="players-profile">
                  <p className="text-[30px] font-bold italic">
                    {playerData.nickname}
                  </p>
                  <p className="def-txt">{playerData.steamNickname || "N/A"}</p>
                  <p className="def-txt">Region: {playerData.region}</p>
                  <p className="def-txt">
                    Country: {playerData.country || "N/A"}
                  </p>
                  <p className="def-txt">Faceit ELO: {playerData.faceitElo}</p>
                  <p className="def-txt">
                    Faceit Level:{" "}
                    <span
                      className={
                        Number(playerData.skillLevel) <= 3
                          ? "glow-green"
                          : Number(playerData.skillLevel) <= 7
                          ? "glow-yellow"
                          : Number(playerData.skillLevel) <= 9
                          ? "glow-orange"
                          : "glow-red"
                      }
                    >
                      {playerData.skillLevel}
                    </span>
                  </p>
                </div>
              </motion.div>
            )}

            {playerStats && (
              <motion.div
                key="player-stats"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="player-stats"
              >
                <p className="def-txt">
                  Win Rate:{" "}
                  <span
                    style={{
                      color: Number(playerStats.winRate) > 49 ? "green" : "red",
                    }}
                  >
                    {playerStats.winRate}%
                  </span>
                </p>
                <p className="def-txt">
                  Matches Played: {playerStats.matchesPlayed}
                </p>
                <p className="def-txt">Headshots: {playerStats.headshots}</p>
                <p className="def-txt">
                  AVG Headshot:{" "}
                  <span
                    style={{
                      color:
                        Number(playerStats.avgHeadshots) > 49 ? "green" : "red",
                    }}
                  >
                    {playerStats.avgHeadshots}%
                  </span>
                </p>
                <p className="def-txt">
                  Longest Winning Streak: {playerStats.longestWinStreak}
                </p>
                <p className="def-txt">
                  Current Winning Streak: {playerStats.currentWinStreak}
                </p>
                <p className="def-txt">
                  Recent Results: {playerStats.recentResults}
                </p>
                <p className="def-txt">Total Wins: {playerStats.wins}</p>
              </motion.div>
            )}
          </div>

          {mapSegments.length > 0 && (
            <motion.div
              key="map-segments"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="map-details"
            >
              {mapSegments.slice(0, 5).map((map, index) => (
                <div
                  key={index}
                  className="map-details flex flex-row my-[10px]"
                >
                  <img
                    src={map.img_regular}
                    alt={`${map.label} map`}
                    className="map-image h-[50px] w-[80px]"
                  />
                  <p className="map-txt">Map Name: {map.label}</p>
                  <p className="map-txt">Mode: {map.mode}</p>
                  {map.stats && (
                    <div className="flex">
                      <p className="map-txt">
                        K/D Ratio: {map.stats["K/D Ratio"] || "N/A"}
                      </p>
                      <p className="map-txt">
                        Win Rate: {map.stats["Win Rate %"] || "N/A"}%
                      </p>
                      <p className="map-txt">
                        Matches Played: {map.stats["Matches"] || "N/A"}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
      <p className="footer-text flex italic justify-center text-[#939393] items-end">
        powered by: Urim Rexhepi © 2024
      </p>
    </AnimatePresence>
  );
}
