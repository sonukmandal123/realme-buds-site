"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Navbar() {
  const { scrollY } = useScroll();
  
  // Softer fade-in over a larger scroll distance
  const backgroundColor = useTransform(
    scrollY,
    [50, 150],
    ["rgba(5, 5, 5, 0)", "rgba(5, 5, 5, 0.5)"]
  );

  const backdropFilter = useTransform(
    scrollY,
    [50, 150],
    ["blur(0px)", "blur(16px)"]
  );

  const opacity = useTransform(
    scrollY,
    [0, 50],
    [1, 0.9]
  );

  return (
    <motion.nav
      style={{
        backgroundColor,
        backdropFilter,
        opacity
      }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5 transition-all duration-300 ease-in-out"
    >
      <div className="flex-1 flex items-center">
        <span className="text-white font-bold tracking-tight text-lg">Realme Buds</span>
      </div>
      
      <div className="hidden md:flex flex-1 justify-center space-x-10 text-white/50">
        {["Overview", "Technology", "Sound", "Specs"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="hover:text-white transition-colors tracking-wide text-[11px] font-bold uppercase letter-spacing-wider"
          >
            {item}
          </a>
        ))}
      </div>
      
      <div className="flex-1 flex justify-end">
        <a 
          href="https://buy.realme.com/in/goods/719"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black px-6 py-2 rounded-full text-xs font-bold hover:bg-neutral-200 transition-all shadow-[0_4px_14px_rgba(255,255,255,0.15)] hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] inline-block"
        >
          Buy Now
        </a>
      </div>
    </motion.nav>
  );
}
