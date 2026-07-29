"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

const colorMap: Record<string, string> = {
  "Beige": "#F5F5DC",
  "Blush Pink": "#DE5D83",
};

const attire = [
  {
    title: "Principal & Secondary Sponsors",
    colors: wedding.attire.sponsors,
  },
  {
    title: "Groomsmen & Bridesmaids",
    colors: wedding.attire.entourage,
  },
  {
    title: "Flower Girls",
    colors: wedding.attire.flowerGirls,
  },
  {
    title: "Guests",
    colors: wedding.attire.guests,
  },
];

export default function DressCode() {
  return (
    <section id="dress-code" className="py-20 sm:py-32 bg-[#FAF7F4]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-heading text-4xl sm:text-6xl text-center mb-4"
        >
          Dress Guide
        </motion.h2>
        <p className="text-center text-gray-500 mb-10 sm:mb-16 uppercase tracking-[4px] text-sm">
          Theme: {wedding.attire.theme}
        </p>

        {/* White dress notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-lg mx-auto mb-10 sm:mb-14 rounded-2xl border-2 border-red-200 bg-red-50/80 px-4 sm:px-8 py-4 sm:py-5 text-center"
        >
          <p className="text-sm font-semibold uppercase tracking-[3px] text-red-600">
            ⚠ White is strictly reserved for the Bride
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {attire.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl bg-white shadow-xl p-5 sm:p-8"
            >
              <h3 className="text-lg sm:text-2xl font-semibold">{item.title}</h3>
              <div className="flex gap-3 sm:gap-6 mt-6 sm:mt-8">
                {item.colors.map((color) => (
                  <div
                    key={color}
                    className="w-16 sm:w-24 h-16 sm:h-24 rounded-full border-2 border-gray-200"
                    style={{ background: colorMap[color] || color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

