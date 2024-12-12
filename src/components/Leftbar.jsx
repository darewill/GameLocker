import React, { useState } from 'react';
import "../style/Leftbar.css";
import Cs2 from "../images/cs2.png";
import Valorant from "../images/valorant.png";
import Overwatch from "../images/overwatch.png";
import Lol from "../images/lol.png";
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from "framer-motion";

export default function Leftbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Desktop LeftBar */}
      <div className="left-wrapper desktop-view">
        <Link to='/'>
          <div className="logo">GameLocker</div>
        </Link>
        <ul className="left-items flex flex-col justify-center text-[30px]">
          <li className="left-games">
            <Link to='/cs2'>
              <img src={Cs2} alt="CS2" />
            </Link>
          </li>
          <li className="left-games">
            <Link to='/valorant'>
              <img src={Valorant} alt="Valorant" />
            </Link>
          </li>
          <li className="left-games">
            <Link to='/overwatch'>
              <img src={Overwatch} alt="Overwatch" />
            </Link>
          </li>
          <li className="left-games">
            <Link to='/leagueoflegends'>
              <img src={Lol} alt="League of Legends" />
            </Link>
          </li>
        </ul>
      </div>

      {/* Mobile Burger Menu */}
      <button className="burger-menu" onClick={toggleMobileMenu}>
        ☰
      </button>
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.ul
              className="mobile-menu-items"
              initial={{ y: "-100%" }}
              animate={{ y: "0%" }}
              exit={{ y: "-100%" }}
            >
              <ul className='lb-items'>
              <li>
                <Link to='/' onClick={toggleMobileMenu}>Home</Link>
              </li>
              <li>
                <Link to='/cs2' onClick={toggleMobileMenu}>CS2</Link>
              </li>
              <li>
                <Link to='/valorant' onClick={toggleMobileMenu}>Valorant</Link>
              </li>
              <li>
                <Link to='/overwatch' onClick={toggleMobileMenu}>Overwatch</Link>
              </li>
              <li>
                <Link to='/leagueoflegends' onClick={toggleMobileMenu}>LoL</Link>
              </li>
              </ul>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
