"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  autoPlay?: boolean;
}

const AUDIO_URL = "https://res.cloudinary.com/dalnsh7fy/video/upload/v1785297636/Wilbert_Ross_-_Dulo_Ng_Pahina_Official_Lyric_Video_M4A_128K_ntktp9.m4a";

export default function MusicPlayer({ autoPlay = false }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const autoPlayRef = useRef(autoPlay);

  // Keep ref in sync
  useEffect(() => {
    autoPlayRef.current = autoPlay;
  }, [autoPlay]);

  // Create audio immediately on mount, preload eagerly
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = "auto";
      audioRef.current = audio;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Auto-play as soon as component gets green light
  useEffect(() => {
    if (!autoPlay) return;
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [autoPlay]);

  // ─── SECURED: pause on ANY user-leaves-page scenario ───
  // Covers: tab switch, window blur/minimize, mobile Safari bfcache,
  //         browser freeze/resource-saving, page close/navigate away
  useEffect(() => {
    const pauseAudio = () => {
      if (!autoPlayRef.current) return;
      const audio = audioRef.current;
      if (!audio) return;
      // Unconditionally pause — no check for audio.paused to ensure
      // it catches every edge case even if state is somehow out of sync
      try {
        audio.pause();
      } catch {
        // silently fail
      }
      setIsPlaying(false);
    };

    // 1. Visibility change — tab switch, minimize, lock screen
    const handleVisibility = () => {
      if (document.hidden) {
        pauseAudio();
      }
    };

    // 2. Window blur — click outside, alt+tab, etc.
    const handleBlur = () => {
      pauseAudio();
    };

    // 3. Page hide — mobile Safari bfcache, navigating away
    const handlePageHide = () => {
      pauseAudio();
    };

    // 4. Browser freeze — resource-saving mode (Chrome, etc.)
    const handleFreeze = () => {
      pauseAudio();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("freeze", handleFreeze);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("freeze", handleFreeze);
    };
  }, []); // no deps — always active, uses ref for autoPlay

  const handleToggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  }, [isPlaying]);

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
              <span className="text-sm font-semibold">Dulo Ng Pahina</span>
              <span className="text-xs text-gray-500">Wilbert Ross</span>
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
