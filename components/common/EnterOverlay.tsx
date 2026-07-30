"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

interface EnterOverlayProps {
  onEnter: () => void;
}

export default function EnterOverlay({ onEnter }: EnterOverlayProps) {
  const [visible, setVisible] = useState(true);
  const [videoError, setVideoError] = useState(false);

  const handleEnter = () => {
    setVisible(false);
    onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[999] cursor-pointer bg-black"
          onClick={handleEnter}
        >
          {/* Video Background */}
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ opacity: 1 }}
            >
              <source src="https://res.cloudinary.com/dalnsh7fy/video/upload/v1785244061/weddingvidbackground_i43jwb.mp4" type="video/mp4" />
            </video>
          )}
          {/* Fallback background image if video fails */}
          {videoError && (
            <div
              className="absolute inset-0 w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://res.cloudinary.com/dalnsh7fy/image/upload/v1785280293/hero_fggsay.jpg')",
              }}
            />
          )}

          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50" />

          {/* Text */}
          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.5 }}
              className="text-center px-6"
            >
              <h1 className="font-heading text-7xl md:text-9xl text-white drop-shadow-lg">
                Paul
                <span className="mx-4">&amp;</span>
                Galyn
              </h1>
              <p className="mt-5 tracking-[8px] uppercase text-sm text-white/90 drop-shadow">
                Wedding Invitation
              </p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                className="mt-10 text-[#C8A96A] tracking-[4px] uppercase text-xs drop-shadow"
              >
                Tap to Enter
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
