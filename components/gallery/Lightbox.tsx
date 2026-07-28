"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";

interface LightboxImage {
  id: number;
  src: string;
  alt: string;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [currentIndex, images.length, onClose, onNavigate]);

  const current = images[currentIndex];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[999] bg-black/90 flex items-center justify-center"
        onClick={onClose}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
          aria-label="Close lightbox"
        >
          <X size={32} />
        </button>

        {/* Previous */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
            className="absolute left-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Previous photo"
          >
            <ChevronLeft size={40} />
          </button>
        )}

        {/* Next */}
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
            className="absolute right-6 text-white/70 hover:text-white transition-colors z-10"
            aria-label="Next photo"
          >
            <ChevronRight size={40} />
          </button>
        )}

        {/* Image */}
        <motion.div
          key={current.id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl max-h-[85vh] mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-[90vw] max-w-4xl max-h-[85vh] aspect-auto">
            <Image
              src={current.src}
              alt={current.alt}
              width={1200}
              height={800}
              className="rounded-2xl object-contain max-h-[80vh] w-auto mx-auto"
              priority
            />
          </div>
          <p className="text-white/70 text-center mt-4 text-sm">
            {current.alt} — {currentIndex + 1} of {images.length}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

