import React, { useState } from "react";
import Search from "./Search";
import { motion, AnimatePresence } from "framer-motion";

const Overwatch = () => {
  const [playerData, setPlayerData] = useState(null);
  const [error, setError] = useState("");

  const OWFetchData = async (playerId) => {
    const apiUrl = `https://overfast-api.tekrop.fr/players/${playerId}/summary`;
    try {
      setError("");
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(
          `Player not found (status: ${response.status}), Check the name again!`
        );
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
    OWFetchData(username);
  };

  return (
    <div className='p-[20px] font-sans'>
      <p className="flex italic justify-center text-[#939393] ">
        NOTE: To search Overwatch players instead of '#' use '-', for example
        'Player-01234'
      </p>
      <Search onSearch={handleSearch} />
      <AnimatePresence>
        {error && <p className='text-red text-center'>{error}</p>}

        {playerData && (
          <motion.div
            key="player-data"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="player-details"
          >
            <div className="mt-[20px] p-[20px] rounded-[5px] text-white flex flex-col items-center">
              <div className="pr-name flex justify-center">
                <h2 className="font-bold uppercase italic text-[35px] absolute mt-[20px]">
                  {playerData.username}
                </h2>
                <img src={playerData.namecard} className="w-[50%] m-auto" />
              </div>

              <img
                src={playerData.avatar}
                alt={`${playerData.username}'s avatar`}
                className="w-[100px] rounded-[50%] my-[10px]"
              />
              <p>
                <strong>Title:</strong>{" "}
                {playerData.title || "No title available"}
              </p>
              <p>
                <strong>Endorsement Level:</strong>{" "}
                <img
                  src={playerData.endorsement.frame}
                  className="w-[50px] m-auto"
                />
              </p>
              <p>
                <strong>Season:</strong> {playerData.competitive.pc.season}
              </p>
              <p>
                <div className="stats flex columns-3 justify-center">
                  <div className="tank m-[70px]">
                    <p className="text-center font-bold mb-[5px]">Tank</p>
                    <img
                      src={playerData.competitive.pc.tank.role_icon}
                      className="w-[30px] m-auto mb-[10px]"
                    />
                    <img
                      src={playerData.competitive.pc.tank.rank_icon}
                      className="w-[80px] m-auto"
                    />
                    <img
                      src={playerData.competitive.pc.tank.tier_icon}
                      className="w-[50px] m-auto mb-[10px]"
                    />
                    <p className="text-center font-semibold uppercase">
                      {playerData.competitive.pc.tank.division}
                    </p>
                  </div>
                  <div className="dmg m-[70px]">
                    <p className="text-center font-bold mb-[5px]">Damage</p>
                    <img
                      src={playerData.competitive.pc.damage.role_icon}
                      className="w-[30px] m-auto mb-[10px]"
                    />
                    <img
                      src={playerData.competitive.pc.damage.rank_icon}
                      className="w-[80px] m-auto"
                    />
                    <img
                      src={playerData.competitive.pc.damage.tier_icon}
                      className="w-[50px] m-auto mb-[10px]"
                    />
                    <p className="text-center font-semibold uppercase">
                      {playerData.competitive.pc.damage.division}
                    </p>
                  </div>
                  <div className="supp m-[70px]">
                    <p className="text-center font-bold mb-[5px]">Support</p>
                    <img
                      src={playerData.competitive.pc.support.role_icon}
                      className="w-[30px] m-auto mb-[10px]"
                    />
                    <img
                      src={playerData.competitive.pc.support.rank_icon}
                      className="w-[80px] m-auto"
                    />
                    <img
                      src={playerData.competitive.pc.support.tier_icon}
                      className="w-[50px] m-auto mb-[10px]"
                    />
                    <p className="text-center font-semibold uppercase">
                      {playerData.competitive.pc.support.division}
                    </p>
                  </div>
                </div>
                <p className="text-center">
                  <strong>Last Updated:</strong>{" "}
                  {new Date(
                    playerData.last_updated_at * 1000
                  ).toLocaleString() || "N/A"}
                </p>
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Overwatch;
