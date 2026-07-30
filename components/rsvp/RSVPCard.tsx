"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import RSVPForm from "./RSVPForm";

interface RSVPCardProps {
  onSuccess: () => void;
}

export default function RSVPCard({ onSuccess }: RSVPCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="max-w-lg mx-auto rounded-[40px] bg-white/30 backdrop-blur-xl shadow-xl border border-white/20 p-10"
    >
      <Mail className="text-[#C8A96A] mx-auto" size={32} />
      <h3 className="text-2xl font-heading font-bold text-center mt-4 mb-8">
        RSVP
      </h3>
      <RSVPForm onSuccess={onSuccess} />
    </motion.div>
  );
}

