import React from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import "../style/Home.css";

export default function Search() {
  return (
    <div className="search-wrapper">
      <h1 className="text-[35px] text-white flex justify-center uppercase font-bold mb-[50px] font-sans">
        Search a player by their username or id
      </h1>
      <div className="search-container flex items-center justify-center">
        <Input
          type="text"
          placeholder="Players Username / ID"
          className="search-bar rounded-r-none font-semibold"
        />
        <Button
          variant="destructive"
          className="search-btn rounded-l-none font-semibold"
        >
          Search
        </Button>
      </div>
      <div className="display-data flex justify-center">
        <p className="text-white">stuff</p>
      </div>
    </div>
  );
}
