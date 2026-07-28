"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause } from "lucide-react";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const startedRef = useRef(false);
  const handlerRef = useRef<() => void>(() => {});

  useEffect(() => {
    const audio = new Audio("/music/I%20Prayed%20for%20You.m4a");
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;

    const handler = () => {
      if (startedRef.current) return;
      audio.play().then(() => {
        startedRef.current = true;
        setIsPlaying(true);
      }).catch(() => {});
    };

    handlerRef.current = handler;

    // Try immediate autoplay
    audio.play().then(() => {
      startedRef.current = true;
      setIsPlaying(true);
    }).catch(() => {
      window.addEventListener("scroll", handler, { once: true });
      window.addEventListener("click", handler, { once: true });
      window.addEventListener("touchstart", handler, { once: true });
      window.addEventListener("keydown", handler, { once: true });
    });

    return () => {
      audio.pause();
      audioRef.current = null;
      window.removeEventListener("scroll", handler);
      window.removeEventListener("click", handler);
      window.removeEventListener("touchstart", handler);
      window.removeEventListener("keydown", handler);
    };
  }, []);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => {
        startedRef.current = true;
        setIsPlaying(true);
      }).catch(() => {});
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="fixed bottom-6 left-6 z-50"
        >
          <div className="flex items-center gap-3 bg-white/80 backdrop-blur-xl rounded-full shadow-xl px-5 py-3 border border-white/20">
            <button
              onClick={handleToggle}
              className="w-10 h-10 rounded-full bg-[#C8A96A] flex items-center justify-center text-white hover:bg-[#b8985e] transition-colors"
              aria-label={isPlaying ? "Pause music" : "Play music"}
            >
              {isPlaying ? <Pause size={18} fill="currentColor" /> : <Play size={18} fill="currentColor" />}
            </button>

            <div className="flex flex-col">
              <span className="text-sm font-semibold">I Prayed for You</span>
              <span className="text-xs text-gray-500">Matt Stell</span>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className="ml-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close music player"
            >
              <Music size={16} />
            </button>
          </div>
        </motion.div>
      )}

      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          onClick={() => setIsVisible(true)}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-[#C8A96A] flex items-center justify-center text-white shadow-xl hover:bg-[#b8985e] transition-colors"
          aria-label="Show music player"
        >
          <Music size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
