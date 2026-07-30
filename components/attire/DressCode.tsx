"use client";

import { motion } from "framer-motion";

type PaletteColor = { name: string; hex: string };

const sponsorsPalette: PaletteColor[] = [
  { name: "Golden Brown", hex: "#B79050" },
  { name: "Warm Taupe", hex: "#C9A188" },
  { name: "Blush Pink", hex: "#EEC7CC" },
  { name: "Dusty Peach", hex: "#EFB3A8" },
];

const weddingPartyPalette: PaletteColor[] = [
  { name: "Nude Beige", hex: "#D2B28D" },
  { name: "Warm Taupe", hex: "#C9A188" },
];

const flowerGirlsPalette: PaletteColor[] = [
  { name: "Rosy Pink", hex: "#EA89D0" },
  { name: "Soft Peach", hex: "#F4B2A7" },
];

const guestPalette = sponsorsPalette;
const fullPalette = [...sponsorsPalette, weddingPartyPalette[0], ...flowerGirlsPalette];

function Palette({ colors }: { colors: PaletteColor[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
      {colors.map((color) => (
        <div key={color.name} className="rounded-2xl border border-[#EDE5DE] bg-[#FFFCF9] p-3 text-center">
          <div
            className="mx-auto mb-2 h-11 w-11 rounded-full border-2 border-white shadow-md sm:h-14 sm:w-14"
            style={{ backgroundColor: color.hex }}
          />
          <p className="text-xs font-semibold text-[#3A312C]">{color.name}</p>
          <p className="mt-0.5 text-[10px] tracking-wide text-gray-500">{color.hex}</p>
        </div>
      ))}
    </div>
  );
}

function AttireList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="mb-3 text-xs font-semibold uppercase tracking-[2px] text-[#B79050]">{title}</h4>
      <ul className="space-y-2 text-sm leading-relaxed text-[#514740]">
        {items.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-1 text-[#B79050]">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function DressCard({
  title,
  attire,
  palette,
  children,
}: {
  title: string;
  attire: string;
  palette: PaletteColor[];
  children?: React.ReactNode;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55 }}
      className="rounded-3xl bg-white p-6 shadow-xl sm:p-10"
    >
      <div className="mb-7 text-center">
        <h3 className="text-lg font-semibold uppercase tracking-[3px] text-[#3A312C] sm:text-xl">{title}</h3>
        <p className="mt-3 text-xs uppercase tracking-[2px] text-[#B79050]">Attire: {attire}</p>
      </div>
      <p className="mb-3 text-xs uppercase tracking-[2px] text-gray-500">Approved Color Palette</p>
      <Palette colors={palette} />
      {children && <div className="mt-7 border-t border-[#F0E8E1] pt-7">{children}</div>}
    </motion.article>
  );
}

export default function DressCode() {
  return (
    <section id="dress-code" className="bg-[#FAF7F4] py-20 sm:py-32">
      <div className="container mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mb-4 text-center font-heading text-4xl uppercase tracking-[6px] sm:text-6xl"
        >
          Dress Code
        </motion.h2>
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto mb-8 h-px w-24 bg-[#D8C3B5]"
        />
        <p className="mx-auto mb-14 max-w-2xl text-center text-sm leading-7 text-[#675D56] sm:text-base">
          We kindly invite our beloved family and friends to celebrate our special day in semi-formal attire.
          To create a beautiful and harmonious celebration, we encourage everyone to wear colors inspired by our wedding palette.
        </p>

        <div className="space-y-10">
          <DressCard title="Principal & Secondary Sponsors" attire="Formal" palette={sponsorsPalette}>
            <div className="grid gap-8 sm:grid-cols-2">
              <AttireList title="Gentlemen" items={["Barong Tagalog", "Formal Suit", "Dress Shoes"]} />
              <AttireList title="Ladies" items={["Long Formal Gown", "Elegant Heels or Dress Sandals"]} />
            </div>
          </DressCard>

          <DressCard title="Bridesmaids & Groomsmen" attire="Coordinated Wedding Party Attire" palette={weddingPartyPalette} />

          <DressCard title="Flower Girls" attire="Dress" palette={flowerGirlsPalette} />

          <DressCard title="Guests" attire="Semi-Formal" palette={guestPalette}>
            <p className="mb-7 text-center text-sm leading-6 text-[#675D56]">
              We kindly request our guests to wear attire that complements our wedding color palette.
            </p>
            <div className="grid gap-8 sm:grid-cols-2">
              <AttireList
                title="Gentlemen"
                items={["Barong Tagalog", "Long-sleeved Dress Shirt", "Polo with Slacks", "Formal Suit (optional)", "Dress Shoes or Loafers"]}
              />
              <AttireList
                title="Ladies"
                items={["Cocktail Dress", "Midi Dress", "Maxi Dress", "Semi-Formal Jumpsuit", "Elegant Blouse with Skirt or Trousers", "Heels, Dress Sandals, or Formal Flats"]}
              />
            </div>
          </DressCard>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 rounded-3xl border border-[#EBCFC9] bg-[#FFF7F4] p-6 sm:p-10"
        >
          <h3 className="text-center text-lg font-semibold uppercase tracking-[3px] text-[#8C5148] sm:text-xl">Please Avoid</h3>
          <p className="mx-auto mt-4 max-w-xl text-center text-sm leading-6 text-[#675D56]">
            To maintain the elegance of our celebration, we kindly ask guests to avoid wearing:
          </p>
          <div className="mx-auto mt-6 grid max-w-3xl grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {["White (#FFFFFF)", "Ivory (#FFFFF0)", "Neon or overly bright colors", "Casual T-shirts", "Ripped Jeans", "Shorts", "Flip-flops or Rubber Slippers", "Athletic Wear"].map((item) => (
              <p key={item} className="text-sm text-[#514740]"><span className="mr-2 text-[#B79050]">•</span>{item}</p>
            ))}
          </div>
          <p className="mt-7 text-center text-sm font-semibold italic text-[#8C5148]">White and Ivory are reserved exclusively for the Bride.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          className="mt-10 rounded-3xl bg-white p-6 shadow-xl sm:p-10"
        >
          <h3 className="mb-6 text-center text-lg font-semibold uppercase tracking-[3px] text-[#3A312C] sm:text-xl">Wedding Color Palette</h3>
          <Palette colors={fullPalette} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-12 max-w-2xl text-center"
        >
          <p className="font-heading text-3xl text-[#3A312C]">Thank You</p>
          <p className="mt-4 text-sm leading-7 text-[#675D56] sm:text-base">
            Your presence is the greatest gift we could ask for. Thank you for honoring our dress code and helping create a beautiful, elegant, and memorable celebration. We look forward to celebrating this special day with you! 💕
          </p>
        </motion.div>
      </div>
    </section>
  );
}
