import React, { useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import "../style/Home.css";

export default function Search({onSearch}) {
  const [username, setUsername] = useState("");

  const handleSearch = () => {
    if(username.trim()){
      onSearch(username);
    }
  };

  return (
    <div className="search-wrapper">
      <h1 className="text-[35px] text-white flex justify-center uppercase font-bold mt-[50px] mb-[50px] font-sans">
        Search a player by their username or id
      </h1>
      <div className="search-container flex items-center justify-center">
        <Input
          type="text"
          value={username}
          placeholder="Players Username / ID"
          className="search-bar rounded-r-none font-semibold"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="destructive"
          className="search-btn rounded-l-none font-semibold"
          onClick={handleSearch}
       >
          Search
        </Button>
      </div>
    </div>
  );
}
