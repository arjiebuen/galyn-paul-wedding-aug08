"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, X } from "lucide-react";

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
}

export default function SuccessDialog({ open, onClose }: SuccessDialogProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative max-w-md w-full rounded-[40px] bg-white/80 backdrop-blur-xl shadow-2xl p-12 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            <Heart className="mx-auto text-red-400" size={48} fill="currentColor" />

            <h3 className="text-3xl font-heading font-bold mt-6">Thank You!</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">
              Your RSVP has been received.
              <br />
              We can&apos;t wait to celebrate with you.
            </p>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="font-semibold tracking-wide uppercase text-sm text-gray-500">
                Gift Guide
              </p>
              <p className="text-sm text-gray-500 mt-3 leading-relaxed">
                Your love, laughter, and company on our wedding day are the greatest gifts we could ask for. However, if you wish to bless us with a gift, a monetary contribution would be greatly appreciated as we begin our new journey together.
              </p>
            </div>

            <div className="mt-8 text-2xl">❤️</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

