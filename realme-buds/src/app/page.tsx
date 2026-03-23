"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "@/components/ui/Navbar";
import ScrollSequence from "@/components/ui/ScrollSequence";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSpecs, setShowSpecs] = useState(false);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Engineering Reveal: 15% to 35%
  const opacityEng = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [0, 1, 1, 0]);
  const yEng = useTransform(scrollYProgress, [0.15, 0.2, 0.3, 0.35], [100, 0, 0, -100]);
  const displayEng = useTransform(scrollYProgress, (v) => (v < 0.12 || v > 0.38) ? "none" : "flex");

  // Noise Cancelling: 35% to 55%
  const opacityNoise = useTransform(scrollYProgress, [0.38, 0.43, 0.52, 0.58], [0, 1, 1, 0]);
  const yNoise = useTransform(scrollYProgress, [0.38, 0.43, 0.52, 0.58], [100, 0, 0, -100]);
  const displayNoise = useTransform(scrollYProgress, (v) => (v < 0.35 || v > 0.6) ? "none" : "flex");

  // Sound Quality: 60% to 85%
  const opacitySound = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.88], [0, 1, 1, 0]);
  const ySound = useTransform(scrollYProgress, [0.6, 0.65, 0.8, 0.88], [100, 0, 0, -100]);
  const displaySound = useTransform(scrollYProgress, (v) => (v < 0.58 || v > 0.9) ? "none" : "flex");

  // Final CTA Buttons: Fade in smoothly from 80% to 85% scroll depth
  // We lock it to 1 opacity very early (85%) so even if the browser stops scroll calculation
  // before 100%, the button will still be fully visible without transparency glitches.
  const opacityEnd = useTransform(scrollYProgress, [0.8, 0.85, 1], [0, 1, 1]);
  const yEnd = useTransform(scrollYProgress, [0.8, 0.85, 1], [40, 0, 0]);
  const displayEnd = useTransform(scrollYProgress, (v) => v < 0.75 ? "none" : "block");

  return (
    <main className="relative bg-[#050505] text-white">
      <Navbar />
      
      <div ref={containerRef} className="relative h-[500vh]">
        
        <ScrollSequence progress={scrollYProgress} />

        <div className="absolute top-0 left-0 w-full h-[500vh] pointer-events-none">
          
          {/* PERMANENT HERO TEXT WITH FADING CTA */}
          <div className="fixed inset-0 flex flex-col items-center justify-center pt-32 h-screen w-full z-10">
            <div className="text-center relative">
              <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-white drop-shadow-2xl">
                Realme Buds
              </h1>
              <p className="text-xl md:text-2xl text-white/60 tracking-wide font-light">
                Pure sound. Zero distraction.
              </p>
              <p className="mt-8 text-sm text-white/40 tracking-widest uppercase font-bold">
                Scroll to explore
              </p>

              {/* Fades in smoothly at the end. mt-24 ensures it clears the case's logo */}
              <motion.div 
                style={{ opacity: opacityEnd, y: yEnd, display: displayEnd }}
                className="absolute left-0 right-0 top-full mt-24 pointer-events-auto"
              >
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <a 
                    href="https://buy.realme.com/in/goods/719"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white text-black px-10 py-4 rounded-full font-bold text-sm tracking-wide hover:bg-neutral-200 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.2)] hover:shadow-[0_4px_30px_rgba(255,255,255,0.4)] inline-block text-center"
                  >
                    Buy Realme Buds
                  </a>
                  <button 
                    onClick={() => setShowSpecs(true)}
                    className="text-white hover:text-white/70 transition-colors font-medium tracking-wide border border-white/20 px-10 py-4 rounded-full hover:bg-white/5"
                  >
                    View specs
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* ENGINEERING REVEAL */}
          <motion.div 
            style={{ opacity: opacityEng, y: yEng, display: displayEng }}
            className="fixed inset-0 items-center justify-start px-8 md:px-16 lg:px-24 h-screen w-full z-20"
            id="technology"
          >
            <div className="max-w-md bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/5">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">
                Precision in every detail.
              </h2>
              <p className="text-lg text-white/80 mb-2 font-light">
                Compact acoustic design with advanced internal engineering.
              </p>
              <p className="text-lg text-white/60 font-light">
                Built for clarity, balance, and all-day comfort.
              </p>
            </div>
          </motion.div>

          {/* NOISE CANCELLING */}
          <motion.div 
            style={{ opacity: opacityNoise, y: yNoise, display: displayNoise }}
            className="fixed inset-0 items-center justify-end px-8 md:px-16 lg:px-24 h-screen w-full z-20"
            id="overview"
          >
            <div className="max-w-md text-right bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/5">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4 text-[#F0B90B]">
                Adaptive noise control.
              </h2>
              <ul className="space-y-2 text-lg text-white/80 font-light">
                <li>Multi-mic system detects your environment</li>
                <li>Real-time noise adjustment</li>
                <li>Focus on what matters</li>
              </ul>
            </div>
          </motion.div>

          {/* SOUND QUALITY */}
          <motion.div 
            style={{ opacity: opacitySound, y: ySound, display: displaySound }}
            className="fixed inset-0 items-center justify-start px-8 md:px-16 lg:px-24 h-screen w-full z-20"
            id="sound"
          >
            <div className="max-w-md bg-black/40 p-8 rounded-3xl backdrop-blur-md border border-white/5">
              <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-4">
                Immersive sound, refined.
              </h2>
              <p className="text-lg text-white/80 mb-2 font-light">
                High-performance drivers deliver depth and clarity.
              </p>
              <p className="text-lg text-white/60 font-light">
                Tuned for detail, texture, and presence.
              </p>
            </div>
          </motion.div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="w-full bg-[#050505] py-8 md:py-12 border-t border-white/10 relative z-50 flex flex-col items-center justify-center backdrop-blur-md">
        <p className="text-white/40 text-sm md:text-base font-light tracking-wide">
          © Realme 2026, Designed by Sonu Mandal.
        </p>
      </footer>

      {/* SPECS MODAL */}
      <AnimatePresence>
        {showSpecs && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowSpecs(false)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="bg-[#0A0A0C]/90 border border-white/10 rounded-3xl p-8 md:p-12 max-w-lg w-full shadow-2xl backdrop-blur-xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setShowSpecs(false)}
                className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors p-2"
                aria-label="Close"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>

              <h3 className="text-2xl font-semibold mb-8 text-white tracking-tight">Technical Specs.</h3>
              
              <ul className="space-y-5 text-sm md:text-base text-white/70 font-light tracking-wide">
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>360° Spatial Audio</span>
                  <span className="text-white font-medium">12.4mm Bass Driver</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>46dB ANC</span>
                  <span className="text-white font-medium">45ms Low Latency</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>40H Playback</span>
                  <span className="text-white font-medium">Fast Charge (10 min = 5 hrs)</span>
                </li>
                <li className="flex justify-between items-center border-b border-white/5 pb-4">
                  <span>IP55 Water & Dust Resistant</span>
                  <span className="text-white font-medium">Bluetooth 5.4</span>
                </li>
                <li className="flex justify-center items-center pt-2">
                  <span className="text-[#F0B90B] font-medium tracking-widest uppercase text-xs">Dual Device Connectivity</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
