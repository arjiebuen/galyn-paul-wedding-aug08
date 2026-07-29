"use client";

import { CalendarDays, Clock3, MapPin, Shirt } from "lucide-react";
import { motion } from "framer-motion";

const details = [
  {
    icon: CalendarDays,
    title: "Wedding Date",
    value: "August 30, 2026",
  },
  {
    icon: Clock3,
    title: "Ceremony",
    value: "3:00 PM",
  },
  {
    icon: MapPin,
    title: "Venue",
    value: "Lla Madoma Agtarap Beachfront",
  },
  {
    icon: Shirt,
    title: "Dress Code",
    value: "Semi-Formal",
  },
];

export default function WeddingDetails() {
  return (
    <section
      id="details"
      className="py-32 bg-gradient-to-b from-[#faf7f4] to-white"
    >
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-4xl sm:text-6xl text-center mb-10 sm:mb-16"
        >
          Wedding Details
        </motion.h2>

        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
          {details.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-white p-5 sm:p-8 shadow-xl"
              >
                <Icon className="text-[#C8A96A]" size={28} />
                <h3 className="mt-6 font-semibold text-xl">{item.title}</h3>
                <p className="mt-3 text-gray-600">{item.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

