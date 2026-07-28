"use client";

import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

export default function Venue() {
  return (
    <section id="venue" className="py-32 bg-[#FAF7F4]">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-4"
        >
          The Venue
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mb-16 uppercase tracking-[4px] text-sm"
        >
          Lla Madoma Agtarap Beachfront
        </motion.p>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          {/* Venue Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="rounded-3xl bg-white p-8 shadow-xl">
              <MapPin className="text-[#C8A96A]" size={32} />
              <h3 className="text-2xl font-semibold mt-4">Lla Madoma Agtarap Beachfront</h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                A stunning beachfront venue where the sand meets the sea — the perfect setting for a sunset wedding ceremony.
              </p>
              <a
                href="https://maps.google.com/?q=La+Madomma+Agtarap+Beachfront"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 bg-[#C8A96A] text-white rounded-full hover:bg-[#b8985e] transition-colors"
              >
                <Navigation size={18} />
                Get Directions
              </a>
            </div>
          </motion.div>

          {/* Map Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl overflow-hidden shadow-xl aspect-[4/3] bg-[#e8e0d8] flex items-center justify-center"
          >
            <div className="text-center text-gray-400">
              <MapPin size={48} className="mx-auto text-[#C8A96A]" />
              <p className="mt-4 text-lg">Google Maps Embed</p>
              <p className="text-sm">Lla Madoma Agtarap Beachfront</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

