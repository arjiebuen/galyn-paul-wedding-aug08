"use client";

import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: "easeOut" as const,
    },
  }),
};

export default function Invitation() {
  return (
    <section id="invitation" className="py-20 sm:py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto text-center"
        >
          {/* Decorative line */}
          <motion.div
            variants={fadeUp}
            custom={0}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-16 bg-[#D8C3B5] origin-left"
            />
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, type: "spring" }}
            >
              <Heart className="text-[#C8A96A]" size={20} fill="currentColor" />
            </motion.div>
            <motion.span
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-px w-16 bg-[#D8C3B5] origin-right"
            />
          </motion.div>

          <motion.p
            variants={fadeUp}
            custom={1}
            className="tracking-[8px] uppercase text-sm text-gray-500 mb-6"
          >
            Together with our families
          </motion.p>

          <motion.h2
            variants={fadeUp}
            custom={2}
            className="font-heading text-5xl sm:text-7xl md:text-8xl leading-tight"
          >
            Paul
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="text-xl sm:text-2xl md:text-3xl font-heading italic my-3 sm:my-4 text-[#C8A96A]"
          >
            &amp;
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={4}
            className="font-heading text-5xl sm:text-7xl md:text-8xl leading-tight"
          >
            Galyn
          </motion.h2>

          <motion.div
            variants={fadeUp}
            custom={5}
            className="mt-10 space-y-3"
          >
            <p className="text-base sm:text-lg text-gray-600">
              Request the honor of your presence
            </p>
            <p className="text-base sm:text-lg text-gray-600">
              as they exchange wedding vows
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={6}
            className="mt-12 inline-block border-t border-b border-[#D8C3B5] py-4 px-8"
          >
            <p className="text-xl sm:text-2xl font-heading text-[#3A312C]">
              August 30, 2026
            </p>
            <p className="text-sm text-gray-500 mt-1 tracking-widest uppercase">
              Three o&apos;clock in the afternoon
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={7}
            className="mt-12"
          >
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
              Your presence at our wedding is the greatest gift we could ask for.
              Join us as we begin our forever together, surrounded by the people
              who mean the most to us.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1.5 }}
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-16 text-gray-400"
            >
              <p className="text-xs tracking-[6px] uppercase">Scroll down</p>
              <div className="mt-2 w-0.5 h-8 mx-auto bg-[#D8C3B5]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
