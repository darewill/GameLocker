import React, { useState } from "react";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";

export default function ValorantPage() {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState(null);

  const fetchPlayerData = async (username) => {
    setError(null);
    setPlayerData(null);

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
      setPlayerData(data.data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching player data:", err);
    }
  };

  return (
    <div>
      <Search onSearch={fetchPlayerData} />
      <AnimatePresence>
        {error && <div className="text-red">{error}</div>}

        {playerData && (
          <motion.div
            key="player-data"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="player-details"
          >
            <div className="mt-[20px] text-white flex flex-col items-center">
              <p>
                <strong>Name:</strong> {playerData.name}
              </p>
              <p>
                <strong>Tag:</strong> {playerData.tag}
              </p>
              <p>
                <strong>Region:</strong> {playerData.region.toUpperCase()}
              </p>
              <p>
                <strong>Account Level:</strong> {playerData.account_level}
              </p>
              <p>
                <strong>Last Update:</strong> {playerData.last_update}
              </p>
              <img
                src={playerData.card.wide}
                alt="Player Card"
                className="w-[100%] max-w-[400px] mt-[20px]"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
