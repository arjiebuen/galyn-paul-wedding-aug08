"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, Play, Pause } from "lucide-react";

interface MusicPlayerProps {
  autoPlay?: boolean;
  track: "opening" | "afterAuthentication";
  onBeat?: (intensity: number) => void;
}

const tracks = {
  opening: {
    src: "https://res.cloudinary.com/dalnsh7fy/video/upload/v1785244862/I_Prayed_for_You_osuzbo.m4a",
    title: "I Prayed for You",
    artist: "Matt Stell",
  },
  afterAuthentication: {
    src: "https://res.cloudinary.com/dalnsh7fy/video/upload/v1785297636/Wilbert_Ross_-_Dulo_Ng_Pahina_Official_Lyric_Video_M4A_128K_ntktp9.m4a",
    title: "Dulo Ng Pahina",
    artist: "Wilbert Ross",
  },
} as const;

export default function MusicPlayer({ autoPlay = false, track, onBeat }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const beatHandlerRef = useRef(onBeat);
  const currentTrack = tracks[track];

  useEffect(() => {
    beatHandlerRef.current = onBeat;
  }, [onBeat]);

  useEffect(() => {
    const pauseWhenInactive = () => {
      const audio = audioRef.current;
      if (!audio || audio.paused) return;
      audio.pause();
      setIsPlaying(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) pauseWhenInactive();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", pauseWhenInactive);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", pauseWhenInactive);
    };
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.crossOrigin = "anonymous";
    audio.src = currentTrack.src;
    audio.loop = true;
    audio.volume = 0.3;
    audioRef.current = audio;
    let animationFrame = 0;
    let audioContext: AudioContext | undefined;

    try {
      audioContext = new AudioContext();
      audioContextRef.current = audioContext;
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaElementSource(audio);
      analyser.fftSize = 64;
      analyser.smoothingTimeConstant = 0.76;
      const frequencies = new Uint8Array(analyser.frequencyBinCount);
      source.connect(analyser);
      analyser.connect(audioContext.destination);

      let averageBass = 0;
      const detectBeat = () => {
        if (!audio.paused) {
          analyser.getByteFrequencyData(frequencies);
          const bass = (frequencies[0] + frequencies[1] + frequencies[2] + frequencies[3]) / 4;
          if (bass > Math.max(64, averageBass * 1.22)) {
            beatHandlerRef.current?.(Math.min(1, bass / 180));
          }
          averageBass = averageBass * 0.9 + bass * 0.1;
        }
        animationFrame = requestAnimationFrame(detectBeat);
      };
      detectBeat();
    } catch {
      // Music remains playable even if a browser blocks audio analysis.
    }

    const startTrack = () => {
      if (track === "opening") audio.currentTime = 70;
      if (autoPlay) {
        void audioContext?.resume();
        audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    };

    setIsPlaying(false);
    if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) {
      startTrack();
    } else {
      audio.addEventListener("loadedmetadata", startTrack, { once: true });
    }

    return () => {
      cancelAnimationFrame(animationFrame);
      audio.pause();
      void audioContext?.close();
      if (audioContextRef.current === audioContext) audioContextRef.current = null;
      if (audioRef.current === audio) audioRef.current = null;
    };
  }, [autoPlay, currentTrack.src, track]);

  const handleToggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      void audioContextRef.current?.resume();
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
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
              <span className="text-sm font-semibold">{currentTrack.title}</span>
              <span className="text-xs text-gray-500">{currentTrack.artist}</span>
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
