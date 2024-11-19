import React from 'react'
import "../style/Leftbar.css";
import Cs2 from "../images/cs2.png";
import Valorant from "../images/valorant.png";
import Overwatch from "../images/overwatch.png";
import Lol from "../images/lol.png";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

export default function Leftbar() {
  return (
    <div className='left-wrapper flex flex-col'>
      <Link to='/'>
      <div className="logo">GameLocker</div>
      </Link>
      <ul className="left-items flex flex-col justify-center text-[30px]">
        <li className='left-games'>
          <Link to='/cs2'>
          <img src={Cs2} alt='CS2'/>
          </Link>
        </li>
        <li className='left-games'>
        <Link to='valorant/'>
        <img src={Valorant}/>
        </Link>
        </li>
        <li className='left-games'>
        <Link to='/'>
        <img src={Overwatch}/>
        </Link>
        </li>
        <li className='left-games'>
        <Link to='/'>
        <img src={Lol}/>
        </Link>
        </li>
      </ul>
    </div>
  )
}
