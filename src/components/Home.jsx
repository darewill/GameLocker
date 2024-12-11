import React from "react";
import "../style/Home.css";
import { motion, AnimatePresence } from "framer-motion";
import Search from "../components/Search";

export default function Home() {
  return (
    <AnimatePresence>
      <div className="home-wrapper">
        <h1 className="text-[50px] font-bold text-white flex">
          This is the Homepage
        </h1>
      </div>
      <p className="flex italic justify-center text-[#939393] items-end">
        powered by: Urim Rexhepi © 2024
      </p>
    </AnimatePresence>
  );
}
