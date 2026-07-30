"use client";

import { motion } from "framer-motion";

const colorMap: Record<string, string> = {
  "Golden Brown": "#C8A96A",
  "Taupe": "#A0846B",
  "Blush Pink": "#DE5D83",
  "Dusty Peach": "#E6A88A",
  "Nude Beige": "#F1DEC9",
  "Bright Pink": "#E75480",
  "Soft Peach": "#FFDAB9",
};

const sponsorsPalette = ["Golden Brown", "Taupe", "Blush Pink", "Dusty Peach"];
const bridesmaidsPalette = ["Taupe", "Nude Beige"];
const groomsmenPalette = ["Taupe", "Nude Beige"];
const flowerGirlsPalette = ["Bright Pink", "Soft Peach"];
const guestsPalette = ["Golden Brown", "Taupe", "Blush Pink", "Dusty Peach"];

function ColorCircles({ colors }: { colors: string[] }) {
  return (
    <div className="flex justify-center gap-3 sm:gap-4 flex-wrap">
      {colors.map((color, i) => (
        <div key={i} className="flex flex-col items-center gap-1.5">
          <div
            className="w-10 sm:w-14 h-10 sm:h-14 rounded-full border-2 border-gray-200 shadow-inner"
            style={{ background: colorMap[color] }}
          />
          <span className="text-[10px] sm:text-xs text-gray-500 whitespace-nowrap">{color}</span>
        </div>
      ))}
    </div>
  );
}

export default function DressCode() {
  return (
    <section id="dress-code" className="py-20 sm:py-32 bg-[#FAF7F4]">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Title */}
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
          className="w-24 h-px bg-[#D8C3B5] mx-auto mb-16 sm:mb-20"
        />

        {/* ─── Principal & Secondary Sponsors ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-white shadow-xl p-6 sm:p-10 text-center mb-10"
        >
          <h3 className="text-base sm:text-xl font-semibold uppercase tracking-[3px] text-[#3A312C] mb-6">
            Principal &amp; Secondary Sponsors
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px] mb-3">
            Palette
          </p>
          <ColorCircles colors={sponsorsPalette} />
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px] mb-2">
              Recommended attire
            </p>
            <p className="text-sm sm:text-base text-[#3A312C]">
              Gentlemen: Barong or Suit in any palette color
            </p>
            <p className="text-sm sm:text-base text-[#3A312C]">
              Ladies: Long Formal Gown
            </p>
          </div>
        </motion.div>

        {/* ─── Bridesmaids & Groomsmen ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-3xl bg-white shadow-xl p-6 sm:p-10 mb-10"
        >
          <h3 className="text-base sm:text-xl font-semibold uppercase tracking-[3px] text-[#3A312C] text-center mb-8">
            Bridesmaids &amp; Groomsmen
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Bridesmaids */}
            <div className="text-center">
              <h4 className="text-sm font-semibold uppercase tracking-[2px] text-[#C8A96A] mb-4">
                Bridesmaids
              </h4>
              <ColorCircles colors={bridesmaidsPalette} />
            </div>

            {/* Groomsmen */}
            <div className="text-center">
              <h4 className="text-sm font-semibold uppercase tracking-[2px] text-[#C8A96A] mb-4">
                Groomsmen
              </h4>
              <ColorCircles colors={groomsmenPalette} />
            </div>

          <div className="mt-6 pt-6 border-t border-gray-100 text-center">
            <p className="text-xs sm:text-sm text-gray-500">
              White polo with matching tie/bow tie (optional)
            </p>
          </div>
        </motion.div>

        {/* ─── Flower Girls ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-3xl bg-white shadow-xl p-6 sm:p-10 text-center mb-10"
        >
          <h3 className="text-base sm:text-xl font-semibold uppercase tracking-[3px] text-[#3A312C] mb-6">
            Flower Girls
          </h3>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px] mb-3">
            Palette
          </p>
          <ColorCircles colors={flowerGirlsPalette} />
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px] mb-2">
              Recommended attire
            </p>
            <p className="text-sm sm:text-base text-[#3A312C]">
              Knee-length or floor-length dress
            </p>
          </div>
        </motion.div>

        {/* ─── Guests ─── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="rounded-3xl bg-white shadow-xl p-6 sm:p-10 text-center mb-10"
        >
          <h3 className="text-base sm:text-xl font-semibold uppercase tracking-[3px] text-[#3A312C] mb-3">
            Guests
          </h3>
          <p className="text-sm text-[#C8A96A] uppercase tracking-[4px] mb-6">
            Semi-Formal
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Please wear attire inspired by our wedding color palette.
          </p>
          <p className="text-xs sm:text-sm text-gray-500 uppercase tracking-[2px] mb-3">
            Color Palette
          </p>
          <ColorCircles colors={guestsPalette} />
        </motion.div>

        {/* Decorative divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
