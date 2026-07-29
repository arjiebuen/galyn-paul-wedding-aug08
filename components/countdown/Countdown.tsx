"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const weddingDate = new Date("2026-08-30T15:00:00");

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  },
};

export default function WeddingCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const difference = weddingDate.getTime() - Date.now();

      if (difference <= 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / (1000 * 60)) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const items = [
    ["Days", timeLeft.days],
    ["Hours", timeLeft.hours],
    ["Minutes", timeLeft.minutes],
    ["Seconds", timeLeft.seconds],
  ];

  return (
    <section className="py-32 overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }}
          className="mb-10 sm:mb-14 text-4xl sm:text-6xl font-bold"
        >
          Counting Down
        </motion.h2>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 gap-6 md:grid-cols-4"
        >
          {items.map(([label, value]) => (
            <motion.div
              key={label}
              variants={itemVariants}
              className="rounded-3xl bg-white p-4 sm:p-8 shadow-xl"
            >
              <h3 className="text-3xl sm:text-5xl font-bold">{value}</h3>
              <p className="mt-1 sm:mt-3 uppercase tracking-widest text-xs sm:text-base text-gray-500">
                {label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
