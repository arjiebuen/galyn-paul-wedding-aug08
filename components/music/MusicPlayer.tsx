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
  const isMobileRef = useRef<boolean>(false);

  // Detect mobile immediately — not inside a useEffect — so it's available
  // before any other effect that checks isMobileRef runs.
  if (typeof window !== "undefined") {
    isMobileRef.current =
      /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
  }

  // Create audio immediately on mount, preload eagerly
  useEffect(() => {
    if (!audioRef.current) {
      const audio = new Audio(AUDIO_URL);
      audio.loop = true;
      audio.volume = 0.3;
      audio.preload = "auto";
      audioRef.current = audio;
    }
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

  // On mobile: pause when user leaves tab/window, resume when they come back
  // On desktop: do nothing — music keeps playing until user manually stops it
  useEffect(() => {
    if (!autoPlay || !isMobileRef.current) return;

    const handleVisibilityChange = () => {
      const audio = audioRef.current;
      if (!audio) return;

      if (document.hidden) {
        // User left the tab — pause on mobile
        setIsPlaying(false);
        audio.pause();
      } else {
        // User came back — resume if was playing
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [autoPlay]);

  // Handle page blur/focus as well (catches more mobile scenarios)
  useEffect(() => {
    if (!autoPlay || !isMobileRef.current) return;

    const handleBlur = () => {
      const audio = audioRef.current;
      if (audio) {
        setIsPlaying(false);
        audio.pause();
      }
    };

    const handleFocus = () => {
      const audio = audioRef.current;
      if (audio) {
        audio.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
    return () => {
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, [autoPlay]);

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
