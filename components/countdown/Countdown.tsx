"use client";

import { useEffect, useState } from "react";

const weddingDate = new Date("2026-08-30T15:00:00");

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
    <section className="py-32">
      <div className="container mx-auto text-center">
        <h2 className="mb-14 text-6xl font-bold">
          Counting Down
        </h2>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {items.map(([label, value]) => (
            <div
              key={label}
              className="rounded-3xl bg-white p-8 shadow-xl"
            >
              <h3 className="text-5xl font-bold">{value}</h3>
              <p className="mt-3 uppercase tracking-widest text-gray-500">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}