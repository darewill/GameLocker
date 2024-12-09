import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 5000;

app.use(cors());

const API_KEY = process.env.VITE_LOL_API_KEY;
const VAL_KEY = process.env.VITE_VAL_API_KEY;

app.get("/api/player/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;
  const API_URL = `https://americas.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Player not found" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching player data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/champion-mastery/:puuid", async (req, res) => {
  const { puuid } = req.params;
  const API_URL = `https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Champion mastery data not found" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching champion mastery data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/summoner/:puuid", async (req, res) => {
  const { puuid } = req.params;
  const API_URL = `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}?api_key=${API_KEY}`;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Summoner data not found" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching summoner data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/valorant/player/:gameName/:tagLine", async (req, res) => {
  const { gameName, tagLine } = req.params;
  const API_URL = `https://api.henrikdev.xyz/valorant/v1/account/${gameName}/${tagLine}`;

  try {
    const response = await fetch(API_URL, {
      headers: {
        Authorization: `${process.env.VITE_VAL_API_KEY}`, // Directly use your HDEV key
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error(`Error: ${response.status} - ${error}`);
      return res.status(response.status).json({ error: "Player not found or API error" });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Error fetching Valorant player data:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});