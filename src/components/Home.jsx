import React from 'react';
import "../style/Home.css";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className='home-wrapper'>
      <h1 className='text-[35px] text-white flex justify-center uppercase font-bold mb-[50px] font-sans'>Search a player by their username or id</h1>
      <div className="search-container flex items-center justify-center">
        <Input type="text" placeholder="Players Username / ID" className='search-bar rounded-r-none font-semibold'/>
        <Button variant="destructive" className='search-btn rounded-l-none font-semibold'>Search</Button>
      </div>
      <div className="flex justify-center">
        <p className='text-white'>stuff</p>
      </div>
    </div>
  )
}
