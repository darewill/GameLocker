import React from 'react';
import "../style/Home.css";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className='home-wrapper'>
      <div className="search-bar flex w-full max-w-sm items-center space-x-2">
        <Input type="email" placeholder="Email" />
        <Button type="submit">Search</Button>
      </div>
      <div className="display">
        <p className='text-white'>stuff</p>
      </div>
    </div>
  )
}
