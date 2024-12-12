import React from "react";
import "../style/Home.css";
import { motion, AnimatePresence } from "framer-motion";
import Goku from "../images/Goku.png";
import Search from "../components/Search";

export default function Home() {
  return (
    <AnimatePresence>
      <motion.div
        key="player-data"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
        className="player-details flex flex-col items-center"
      >
        <div className="home-wrapper flex flex-col columns-2 justify-center">
          <div className="titles flex mt-[10%]">
            <div className="flex flex-col main-title text-[50px] font-bold text-white flex mr-[100px]">
              <h1>TRACK.</h1>
              <h1 className="bg-[#FF0000]">COMPETE.</h1>
              <h1>DOMINATE.</h1>
            </div>

            <h1 className="text-[50px] font-bold text-white flex m-[-40px]">
              Track your stats, analyze your performance, and dominate the
              competition in your favorite games.
            </h1>
          </div>
          <div className="second-content mt-[150px] flex items-center text-white">
            <img src={Goku} className="h-[300px] w-[250px] mr-[100px]" />
            <div className="descr-text bg-[#171717] p-[20px] rounded">
              <h1 className='font-bold text-red-600'>Welcome to GameLocker!</h1>
              <br />
              <h1 className='font-semibold'>
                I developed this project to track and analyze player stats for
                the first 4 games that came to my mind.This project was created
                to demonstrate my programming skills, including both front-end
                and little back-end development. While there may be some bugs, I have
                prioritized making the application as user-friendly as possible
                while maintaining a professional standard of work.
              </h1>
              <br />
              <a href='https://github.com/darewill' className='italic hover:text-cyan-600'>https://github.com/darewill</a>
              <h1 className='italic font-semibold'>
                -U.R
              </h1>
            </div>
          </div>
        </div>
      </motion.div>
      <p className="flex italic justify-center text-[#939393] items-end">
        powered by: Urim Rexhepi © 2024
      </p>
    </AnimatePresence>
  );
}
