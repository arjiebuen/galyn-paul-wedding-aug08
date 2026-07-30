"use client";

import { motion } from "framer-motion";

const fireflies = [
  { left: "7%", top: "18%", size: 4, delay: 0, duration: 7 },
  { left: "16%", top: "71%", size: 3, delay: 1.4, duration: 8 },
  { left: "24%", top: "39%", size: 5, delay: 2.2, duration: 6 },
  { left: "32%", top: "86%", size: 3, delay: 0.8, duration: 9 },
  { left: "39%", top: "14%", size: 4, delay: 3.1, duration: 7 },
  { left: "47%", top: "58%", size: 3, delay: 1.8, duration: 8 },
  { left: "55%", top: "31%", size: 5, delay: 0.4, duration: 7 },
  { left: "61%", top: "79%", size: 3, delay: 2.7, duration: 9 },
  { left: "68%", top: "10%", size: 4, delay: 1.1, duration: 8 },
  { left: "74%", top: "49%", size: 3, delay: 3.4, duration: 7 },
  { left: "82%", top: "26%", size: 5, delay: 2.4, duration: 8 },
  { left: "89%", top: "83%", size: 3, delay: 0.6, duration: 9 },
  { left: "94%", top: "61%", size: 4, delay: 1.7, duration: 7 },
  { left: "11%", top: "46%", size: 3, delay: 2.9, duration: 8 },
];

export default function FireflyEffect({ beatPulse }: { beatPulse: number }) {
  const beatPhase = beatPulse % 2;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {fireflies.map((firefly, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: firefly.left, top: firefly.top }}
          animate={{ x: [0, 12, -7, 0], y: [0, -18, -8, 0] }}
          transition={{ duration: firefly.duration, delay: firefly.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.span
            className="block rounded-full bg-[#F6D987] shadow-[0_0_10px_3px_rgba(246,217,135,0.35)]"
            style={{ width: firefly.size, height: firefly.size }}
            animate={{
              opacity: beatPhase ? 0.9 : 0.48,
              scale: beatPhase ? 1.65 : 1,
            }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
