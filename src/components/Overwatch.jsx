import React, { useState } from "react";
import Search from "../components/Search"; // Assuming Search.jsx is located here
import "../style/Overwatch.css";

export default function Overwatch() {
    const [playerData, setPlayerData] = useState(null);

    const OWFetchData = async (playerId) => {
        try {
            const response = await fetch(`https://overfast-api.tekrop.fr/players/${playerId}/stats/summary`);
            if (!response.ok) {
                console.error("Failed to fetch player data:", response.statusText);
                return;
            }
            const data = await response.json();
            setPlayerData(data.summary); // Store the `summary` object from the API
        } catch (error) {
            console.error("Error fetching Overwatch data:", error);
        }
    };

    return (
        <div className="overwatch-wrapper flex flex-col items-center">
            <h1 className="text-white text-[30px] mb-4">Overwatch Player Stats</h1>
            <Search onSearch={OWFetchData} /> {/* Use your existing Search component */}
            {playerData && (
                <div className="player-stats-container">
                    {/* Profile Section */}
                    <div className="player-profile">
                        <img src={playerData.avatar} alt="Avatar" className="avatar" />
                        <p className="player-name">{playerData.username}</p>
                        <img src={playerData.namecard} alt="Namecard" className="namecard" />
                        <p className="player-title">{playerData.title}</p>
                        <div className="endorsement">
                            <img src={playerData.endorsement.frame} alt="Endorsement Frame" />
                            <p>Endorsement Level: {playerData.endorsement.level}</p>
                        </div>
                    </div>

                    {/* Competitive Section */}
                    <div className="competitive-section">
                        <h2>Competitive PC Stats</h2>
                        {["tank", "damage", "support", "open"].map((role) => (
                            playerData.competitive.pc[role] && (
                                <div key={role} className="role-stats">
                                    <img src={playerData.competitive.pc[role].role_icon} alt={`${role} Role`} />
                                    <p>
                                        {role.charAt(0).toUpperCase() + role.slice(1)}:{" "}
                                        {playerData.competitive.pc[role].division} Tier{" "}
                                        {playerData.competitive.pc[role].tier}
                                    </p>
                                    <img src={playerData.competitive.pc[role].tier_icon} alt="Tier Icon" />
                                    <img src={playerData.competitive.pc[role].rank_icon} alt="Rank Icon" />
                                </div>
                            )
                        ))}
                    </div>

                    {/* Statistics Section */}
                    <div className="player-statistics">
                        <h2>Player Statistics</h2>
                        <p>Average Kills: {playerData.average_kills || "N/A"}</p>
                        <p>Average Damage: {playerData.average_damage || "N/A"}</p>
                        <p>Average Deaths: {playerData.average_deaths || "N/A"}</p>
                        <p>Average Assists: {playerData.average_assists || "N/A"}</p>
                        <p>Average Healing: {playerData.average_healing || "N/A"}</p>
                        <p>Average Eliminations: {playerData.average_eliminations || "N/A"}</p>
                        <p>Games Lost: {playerData.games_lost || "N/A"}</p>
                        <p>Games Played: {playerData.games_played || "N/A"}</p>
                        <p>Games Won: {playerData.games_won || "N/A"}</p>
                        <p>KDA: {playerData.kda || "N/A"}</p>
                        <p>Time Played: {playerData.time_played || "N/A"}</p>
                        <p>Winrate: {playerData.winrate || "N/A"}%</p>
                    </div>

                    {/* Totals Section */}
                    <div className="player-totals">
                        <h2>Total Stats</h2>
                        <p>Total Assists: {playerData.total_assists || "N/A"}</p>
                        <p>Total Damage: {playerData.total_damage || "N/A"}</p>
                        <p>Total Deaths: {playerData.total_deaths || "N/A"}</p>
                        <p>Total Healing: {playerData.total_healing || "N/A"}</p>
                        <p>Total Eliminations: {playerData.total_eliminations || "N/A"}</p>
                    </div>

                    {/* Top Heroes Section */}
                    <div className="top-heroes">
                        <h2>Top 5 Heroes</h2>
                        {playerData.top_heroes?.slice(0, 5).map((hero, index) => (
                            <div key={index} className="hero">
                                <p>{hero.name}</p>
                                <p>Games Played: {hero.games_played}</p>
                                <p>Winrate: {hero.winrate}%</p>
                                <p>Time Played: {hero.time_played}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
