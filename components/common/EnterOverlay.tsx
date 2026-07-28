"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

interface EnterOverlayProps {
  onEnter: () => void;
}

export default function EnterOverlay({ onEnter }: EnterOverlayProps) {
  const [visible, setVisible] = useState(true);

  const handleEnter = () => {
    setVisible(false);
    onEnter();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-[999] bg-[#F7F4EF] flex items-center justify-center cursor-pointer"
          onClick={handleEnter}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center px-6"
          >
            <h1 className="font-heading text-7xl">
              Paul
              <span className="mx-4">&amp;</span>
              Galyn
            </h1>
            <p className="mt-5 tracking-[8px] uppercase text-sm">Wedding Invitation</p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="mt-10 text-[#C8A96A] tracking-[4px] uppercase text-xs"
            >
              Tap to Enter
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
