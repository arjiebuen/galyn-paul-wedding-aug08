"use client";

import { motion } from "framer-motion";

export default function Hero() {
  return (
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

        <h1 className="font-heading text-7xl md:text-9xl mt-6">
          Paul
        </h1>

        <p className="text-3xl italic my-3">&</p>

        <h1 className="font-heading text-7xl md:text-9xl">
          Galyn
        </h1>

        <p className="mt-10 text-lg">
          August 30, 2026
        </p>

        <button
          onClick={() => {
            const el = document.getElementById("invitation");
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
          }}
          className="mt-10 rounded-full bg-white px-8 py-4 text-black transition hover:scale-105 cursor-pointer"
        >
          Open Invitation
        </button>
      </motion.div>
    </section>
  );
}