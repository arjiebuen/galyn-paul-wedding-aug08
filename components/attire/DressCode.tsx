"use client";

import { motion } from "framer-motion";
import { wedding } from "@/data/wedding";

const colorMap: Record<string, string> = {
  "Beige": "#F1DEC9",
  "Blush Pink": "#DE5D83",
};

const attire = [
  {
    title: "Principal & Secondary Sponsors",
    colors: wedding.attire.sponsors,
  },
  {
    title: "Bridesmaids & Groomsmen",
    colors: wedding.attire.entourage,
  },
  {
    title: "Flower Girls",
    colors: wedding.attire.flowerGirls,
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
          className="font-heading text-4xl sm:text-6xl text-center mb-4 tracking-[6px] uppercase"
        >
          Dress Code
        </motion.h2>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-24 h-px bg-[#D8C3B5] mx-auto mb-12 sm:mb-16"
        />

        {/* Attire Categories */}
        <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
          {attire.map((item) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white shadow-xl p-6 sm:p-8 text-center"
            >
              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-[3px] text-[#3A312C] mb-6">
                {item.title}
              </h3>
              <div className="flex justify-center gap-4 sm:gap-5">
                {item.colors.map((color) => (
                  <div
                    key={color}
                    className="w-14 sm:w-20 h-14 sm:h-20 rounded-full border-2 border-gray-200 shadow-inner"
                    style={{ background: colorMap[color] || color.toLowerCase() }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guests Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto mt-12 sm:mt-16 rounded-3xl bg-white shadow-xl p-6 sm:p-8 text-center"
        >
          <h3 className="text-base sm:text-lg font-semibold uppercase tracking-[3px] text-[#3A312C] mb-3">
            Guests
          </h3>
          <p className="text-sm text-[#C8A96A] uppercase tracking-[4px] mb-4">
            Semi-Formal Attire
          </p>
          <div className="flex justify-center gap-4 sm:gap-5 mb-6">
            {wedding.attire.guests.map((color) => (
              <div
                key={color}
                className="w-14 sm:w-20 h-14 sm:h-20 rounded-full border-2 border-gray-200 shadow-inner"
                style={{ background: colorMap[color] || color.toLowerCase() }}
              />
            ))}
          </div>
          <p className="text-sm text-gray-500 leading-relaxed">
            Please wear colors that complement our wedding palette.
          </p>
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-24 h-px bg-[#D8C3B5] mx-auto my-12 sm:my-16"
        />

        {/* White dress notice */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto rounded-2xl border-2 border-red-200 bg-red-50/80 px-6 sm:px-10 py-5 sm:py-6 text-center"
        >
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[4px] text-red-600">
            ⚠ White is strictly reserved for the Bride
          </p>
        </motion.div>
      </div>
    </section>
  );
}
