"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RSVPCard from "./RSVPCard";
import SuccessDialog from "./SuccessDialog";

export default function RSVP() {
  const [showSuccess, setShowSuccess] = useState(false);

  return (
    <section id="rsvp" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-[#FAF7F4]" />

      <div className="relative container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-4"
        >
          Join the Celebration
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mb-16 uppercase tracking-[4px] text-sm"
        >
          Please RSVP by August 10, 2026
        </motion.p>

        <RSVPCard onSuccess={() => setShowSuccess(true)} />
      </div>

      <SuccessDialog
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
      />
    </section>
  );
}

