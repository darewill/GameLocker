import React from 'react'
import "../style/Home.css";

export default function Home() {
  return (
    <div className='home-wrapper'>
      <div className="search-bar">
        <input type='search' placeholder='Your username/id' />
      </div>
      <div className="display">
        <p className='text-white'>stuff</p>
      </div>
    </div>
  )
}
