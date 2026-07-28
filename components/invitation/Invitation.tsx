"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export default function Invitation() {
  return (
    <section id="invitation" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative line */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className="h-px w-16 bg-[#D8C3B5]" />
            <Heart className="text-[#C8A96A]" size={20} fill="currentColor" />
            <span className="h-px w-16 bg-[#D8C3B5]" />
          </div>

          <p className="tracking-[8px] uppercase text-sm text-gray-500 mb-6">
            Together with our families
          </p>

          <h2 className="font-heading text-7xl md:text-8xl leading-tight">
            Paul
          </h2>
          <p className="text-2xl md:text-3xl font-heading italic my-4 text-[#C8A96A]">
            &amp;
          </p>
          <h2 className="font-heading text-7xl md:text-8xl leading-tight">
            Galyn
          </h2>

          <div className="mt-10 space-y-3">
            <p className="text-lg text-gray-600">
              Request the honor of your presence
            </p>
            <p className="text-lg text-gray-600">
              as they exchange wedding vows
            </p>
          </div>

          <div className="mt-12 inline-block border-t border-b border-[#D8C3B5] py-4 px-8">
            <p className="text-2xl font-heading text-[#3A312C]">
              August 30, 2026
            </p>
            <p className="text-sm text-gray-500 mt-1 tracking-widest uppercase">
              Three o&apos;clock in the afternoon
            </p>
          </div>

          <div className="mt-12">
            <p className="text-gray-600 leading-relaxed max-w-xl mx-auto">
              Your presence at our wedding is the greatest gift we could ask for.
              Join us as we begin our forever together, surrounded by the people
              who mean the most to us.
            </p>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-16 text-gray-400"
          >
            <p className="text-xs tracking-[6px] uppercase">Scroll down</p>
            <div className="mt-2 w-0.5 h-8 mx-auto bg-[#D8C3B5]" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
