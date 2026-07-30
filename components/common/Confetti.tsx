"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

interface ConfettiProps {
  count?: number;
  colors?: string[];
}

// Pure pseudo-random number generator (deterministic)
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

export default function Confetti({ count = 40, colors = ["#C8A96A", "#D4AF37", "#FFD700", "#F5E6CC", "#E8C771"] }: ConfettiProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const s = i * 137 + 1;
        return {
          id: i,
          x: seededRandom(s) * 100,
          y: -10 - seededRandom(s + 1) * 20,
          size: seededRandom(s + 2) * 8 + 4,
          color: colors[Math.floor(seededRandom(s + 3) * colors.length)],
          rotation: seededRandom(s + 4) * 360,
          duration: seededRandom(s + 5) * 2 + 1.5,
          delay: seededRandom(s + 6) * 0.5,
          shape: seededRandom(s + 7) > 0.5 ? "circle" : "rect",
        };
      }),
    [count, colors]
  );

  return (
    <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: `${p.x}vw`,
            y: `${p.y}vh`,
            rotate: 0,
            opacity: 1,
            scale: 0,
          }}
          animate={{
            y: "110vh",
            rotate: p.rotation * 4,
            opacity: [1, 1, 0],
            scale: [0, 1.2, 1, 0.8],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: "easeIn",
            repeat: 0,
          }}
          className="absolute"
          style={{
            width: p.shape === "circle" ? p.size : p.size * 0.6,
            height: p.shape === "circle" ? p.size : p.size * 1.2,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            background: p.color,
            left: 0,
            top: 0,
          }}
        />
      ))}
    </div>
  );
}

