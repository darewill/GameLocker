import React, { useState } from "react";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";
import LolLogo from "../images/LolLogo.png";
import "../style/LOL.css";

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
        throw new Error(
          `Champion mastery data not found (status: ${response.status})`
        );
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
    <AnimatePresence>
      <div className="p-[20px] font-sans flex flex-col items-center">
        <motion.div
          key="player-data"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
          className="player-details flex flex-col items-center"
        >
          <p className="note-txt flex italic justify-center text-[#939393] ">
            NOTE: To search League of Legends players instead of '#' use '/',
            for example 'Player/01234'
          </p>
          <img
            src={LolLogo}
            className="lol-logo w-[150px] h-[150px] mt-[20%]"
          />
          <Search onSearch={handleSearch} />
        </motion.div>
        {error && <p className="text-red-600 text-center">{error}</p>}

        {playerData && (
          <motion.div
            key="player-data"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="player-details"
          >
            <div className="lol-info flex flex-col items-center mt-[40px] text-white">
              {profileIconUrl && (
                <img
                  src={profileIconUrl}
                  alt={`${playerData.gameName}'s profile`}
                  className="w-[100px] rounded-[50%]"
                />
              )}
              <p className="puuid-txt"> 
                <strong>PUUID:</strong> {playerData.puuid}
              </p>
              <p>
                <strong>Game Name:</strong> {playerData.gameName}
              </p>
              <p>
                <strong>Game Tag:</strong> {playerData.tagLine}
              </p>
            </div>
          </motion.div>
        )}

        {masteryData && (
          <motion.div
            key="player-data"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="player-details"
          >
            <div className="flex flex-col text-center text-white mt-[15px]">
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
          </motion.div>
        )}
      </div>
      <p className="flex italic justify-center text-[#939393] items-end">
        powered by: Urim Rexhepi © 2024
      </p>
    </AnimatePresence>
  );
};

export default LOLPage;
