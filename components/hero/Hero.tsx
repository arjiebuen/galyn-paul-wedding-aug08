"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Confetti from "@/components/common/Confetti";

interface HeroProps {
  onInvitationOpened?: () => void;
  onCountdownReady?: () => void;
}

export default function Hero({ onInvitationOpened, onCountdownReady }: HeroProps) {
  const [opening, setOpening] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [cardRevealed, setCardRevealed] = useState(false);
  const [cardExiting, setCardExiting] = useState(false);

  const handleOpen = () => {
    setOpening(true);

    // Card reveals faster (1s instead of 1.7s)
    const t1 = setTimeout(() => {
      setCardRevealed(true);
      setShowConfetti(true);
    }, 1000);

    // Card visible for ~2.5s, then fades out (3.5s instead of 6.5s)
    const t2 = setTimeout(() => {
      setCardExiting(true);
    }, 3500);

    // Overlay gone at ~4.8s instead of 8s - countdown fades in
    const t3 = setTimeout(() => {
      setOpening(false);
      setCardExiting(false);
      onInvitationOpened?.();
      onCountdownReady?.();
      const el = document.getElementById("invitation");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 4800);

    // Stop confetti earlier
    const t4 = setTimeout(() => setShowConfetti(false), 2500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  };

  return (
    <>
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dalnsh7fy/image/upload/v1785280293/hero_fggsay.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-black/35" />

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center text-white px-6"
        >
          <p className="tracking-[8px] uppercase text-sm">
            Together with our families
          </p>

          <h1 className="font-heading text-5xl sm:text-6xl md:text-9xl mt-6">Paul</h1>
          <p className="text-2xl sm:text-3xl italic my-2 sm:my-3">&</p>
          <h1 className="font-heading text-5xl sm:text-6xl md:text-9xl">Galyn</h1>

          <p className="mt-6 sm:mt-10 text-base sm:text-lg">August 30, 2026</p>

          <motion.button
            onClick={handleOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-6 sm:mt-10 rounded-full bg-white px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base text-black font-medium transition cursor-pointer flex items-center gap-2 mx-auto"
          >
            <span>💌</span>
            Open Invitation
          </motion.button>
        </motion.div>
      </section>

      {/* Confetti */}
      {showConfetti && <Confetti count={50} />}

      {/* Envelope & Card Opening Overlay */}
      <AnimatePresence>
        {opening && !cardRevealed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[998] flex items-center justify-center bg-[#F7F4EF]"
          >
            {/* Envelope body */}
            <div className="relative w-64 sm:w-80 h-44 sm:h-56">
              {/* Envelope back */}
              <div className="absolute inset-0 bg-[#e8ddd4] rounded-2xl shadow-2xl" />

              {/* Envelope flap opening */}
              <motion.div
                initial={{ rotateX: 0 }}
                animate={{ rotateX: -180 }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
                style={{ transformOrigin: "top center", transformStyle: "preserve-3d" }}
                className="absolute top-0 left-0 right-0 h-1/2 z-10"
              >
                <div
                  className="w-full h-full"
                  style={{
                    background: "#d4c4b8",
                    clipPath: "polygon(0 0, 50% 100%, 100% 0)",
                    borderRadius: "12px 12px 0 0",
                  }}
                />
              </motion.div>

              {/* Letter coming out */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: -80, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                className="absolute inset-x-4 bottom-4 bg-white rounded-xl shadow-lg p-4 text-center z-20"
              >
                <p className="font-heading text-lg sm:text-2xl text-[#3A312C]">Paul & Galyn</p>
                <p className="text-xs text-gray-400 tracking-widest uppercase mt-1">August 30, 2026</p>
              </motion.div>

              {/* Wax seal */}
              <motion.div
                initial={{ scale: 1, opacity: 1 }}
                animate={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.3, delay: 0.8 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#C8A96A] flex items-center justify-center text-white text-lg z-30 shadow-md"
              >
                💍
              </motion.div>
            </div>

            {/* Sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0],
                  x: Math.cos((i / 6) * Math.PI * 2) * 120,
                  y: Math.sin((i / 6) * Math.PI * 2) * 120,
                }}
                transition={{ duration: 0.8, delay: 1.0 + i * 0.05 }}
                className="absolute text-xl"
              >
                ✨
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Full Invitation Card Reveal */}
      <AnimatePresence>
        {opening && cardRevealed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{
              opacity: cardExiting ? 0 : 1,
              scale: cardExiting ? 0.92 : 1,
              filter: cardExiting ? "blur(3px)" : "blur(0px)",
            }}
            exit={{ opacity: 0, scale: 0.85, filter: "blur(6px)" }}
            transition={{
              duration: cardExiting ? 1.3 : 0.6,
              ease: "easeInOut",
            }}
            className="fixed inset-0 z-[998] flex items-center justify-center bg-[#F7F4EF]/95"
          >
            {/* Invitation Card with Shimmering Gold Border */}
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative max-w-lg w-[90%] mx-auto"
            >
              {/* Glow behind card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: [0, 0.6, 0.3, 0.5], scale: 1 }}
                transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                className="absolute -inset-8 rounded-3xl bg-[#C8A96A]/20 blur-3xl"
              />

              {/* Gold border with shimmer */}
              <motion.div
                className="relative rounded-3xl p-1 overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #C8A96A, #D4AF37, #F5E6CC, #C8A96A)",
                  backgroundSize: "400% 400%",
                }}
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              >
                {/* Inner white card */}
                <div className="bg-white rounded-2xl p-6 sm:p-10 md:p-14 text-center relative">
                  {/* Decorative top border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="h-px bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mb-8 origin-center"
                  />

                  {/* Staggered content entrance */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <p className="tracking-[6px] uppercase text-[10px] text-gray-400 mb-4">
                      Together with their families
                    </p>
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#3A312C]"
                  >
                    Paul
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 1.0 }}
                    className="my-2 sm:my-4 flex items-center justify-center gap-3 sm:gap-4"
                  >
                    <span className="h-px w-8 sm:w-12 bg-[#D8C3B5]" />
                    <span className="text-xl sm:text-2xl text-[#C8A96A] font-heading italic">&amp;</span>
                    <span className="h-px w-8 sm:w-12 bg-[#D8C3B5]" />
                  </motion.div>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.1 }}
                    className="font-heading text-4xl sm:text-6xl md:text-7xl text-[#3A312C]"
                  >
                    Galyn
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="mt-6 space-y-2"
                  >
                    <p className="text-lg text-gray-500 font-heading">request the honor of your presence</p>
                    <p className="text-lg text-gray-500 font-heading">as they exchange wedding vows</p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.5 }}
                    className="mt-8 inline-block border-t border-b border-[#D8C3B5] py-3 px-6"
                  >
                    <p className="text-2xl font-heading text-[#C8A96A]">August 30, 2026</p>
                    <p className="text-xs text-gray-400 mt-1 tracking-widest uppercase">
                      Three o&apos;clock in the afternoon
                    </p>
                  </motion.div>

                  {/* Decorative bottom border */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
                    className="h-px bg-gradient-to-r from-transparent via-[#C8A96A] to-transparent mt-8 origin-center"
                  />

                  {/* Subtle scroll text */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 2, delay: 2.0, repeat: Infinity }}
                    className="mt-6 text-[10px] tracking-[4px] uppercase text-gray-300"
                  >
                    Opening invitation...
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
