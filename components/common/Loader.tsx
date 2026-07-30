"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Loader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-[#F7F4EF] flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center"
          >
            <h1 className="font-heading text-7xl">
              Paul
              <span className="mx-4">&amp;</span>
              Galyn
            </h1>
            <p className="mt-5 tracking-[8px] uppercase">Wedding Invitation</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
