"use client";

import { motion } from "framer-motion";

export default function PhotoUpload() {
  return (
    <section className="relative py-20 sm:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#3A312C]" />

      {/* Glass effect card */}
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-2xl mx-auto rounded-3xl p-8 sm:p-12 text-center
                     bg-white/10 backdrop-blur-xl border border-white/20
                     shadow-2xl shadow-black/20"
        >
          {/* Bible Verse */}
          <div className="mb-10">
            <p className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed font-light italic">
              &ldquo;What therefore God has joined together, let not man separate.&rdquo;
            </p>
            <p className="text-sm sm:text-base text-[#C8A96A] mt-3 tracking-wider">
              — Mark 10:9 ESV
            </p>
          </div>

          {/* Divider */}
          <div className="w-16 h-px bg-white/20 mx-auto mb-10" />

          {/* Upload Message */}
          <p className="text-sm sm:text-base text-white/70 leading-relaxed max-w-lg mx-auto mb-10">
            We&apos;d love to see our special day through your eyes! If you captured any
            photos or videos, please upload them to our shared album using the QR code
            provided.
          </p>

          {/* QR Code */}
          <div className="inline-flex items-center justify-center p-4 bg-white rounded-2xl shadow-lg">
            <img
              src="https://res.cloudinary.com/dalnsh7fy/image/upload/v1785378644/Messenger_creation_11F09543-DD33-4DE0-BE06-ED646379347C_zvuqds.jpg"
              alt="QR Code - Upload your photos"
              className="w-40 sm:w-48 h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

