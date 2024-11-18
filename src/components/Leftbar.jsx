import React from 'react'
import "../style/Leftbar.css";
import Cs2 from "../images/cs2.png";
import Valorant from "../images/valorant.png";
import Overwatch from "../images/overwatch.png";
import Lol from "../images/lol.png";
import { Link } from 'react-router-dom';

export default function Leftbar() {
  return (
    <div className='left-wrapper flex flex-col'>
      <Link to='/'>
      <div className="logo">GameLocker</div>
      </Link>
      <ul className="left-items flex flex-col justify-center text-[30px]">
        <li className='left-games'>
          <img src={Cs2}/>
        </li>
        <li className='left-games'>
        <img src={Valorant}/>
        </li>
        <li className='left-games'>
        <img src={Overwatch}/>
        </li>
        <li className='left-games'>
        <img src={Lol}/>
        </li>
      </ul>
    </div>
  )
}
