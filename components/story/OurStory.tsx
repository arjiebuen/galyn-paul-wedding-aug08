"use client";

import { motion } from "framer-motion";

export default function OurStory() {
  return (
    <section id="story" className="py-40 bg-[#F8F4EF]">
      <div className="max-w-5xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p className="tracking-[8px] uppercase text-center text-sm text-gray-500">
            Our Journey
          </p>
          <h2 className="font-heading text-7xl text-center my-10">
            A Love Story
          </h2>
          <p className="leading-10 text-lg text-center text-gray-700 max-w-3xl mx-auto">
            Every beautiful story begins with a single moment.
            What started as two separate journeys became one path filled with love, laughter, faith, and countless unforgettable memories.
            <br /><br />
            Today, we joyfully invite you to witness the beginning of our forever as we exchange vows before God, our families, and our cherished friends.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

