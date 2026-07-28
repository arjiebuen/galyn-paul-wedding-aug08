"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Lightbox from "./Lightbox";

const images = [
  { id: 1, src: "/PAUL&GALYNAUG08/420.png", alt: "Paul & Galyn photo 1", span: "col-span-2 row-span-2" },
  { id: 2, src: "/PAUL&GALYNAUG08/512.png", alt: "Paul & Galyn photo 2", span: "" },
  { id: 3, src: "/PAUL&GALYNAUG08/513.png", alt: "Paul & Galyn photo 3", span: "" },
  { id: 4, src: "/PAUL&GALYNAUG08/533.png", alt: "Paul & Galyn photo 4", span: "col-span-2" },
  { id: 5, src: "/PAUL&GALYNAUG08/534.png", alt: "Paul & Galyn photo 5", span: "" },
  { id: 6, src: "/PAUL&GALYNAUG08/535.png", alt: "Paul & Galyn photo 6", span: "" },
  { id: 7, src: "/PAUL&GALYNAUG08/537.png", alt: "Paul & Galyn photo 7", span: "col-span-2" },
  { id: 8, src: "/PAUL&GALYNAUG08/539.png", alt: "Paul & Galyn photo 8", span: "" },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <section id="gallery" className="py-32 bg-white">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-6xl text-center mb-4"
        >
          Gallery
        </motion.h2>
        <p className="text-center text-gray-500 mb-16 uppercase tracking-[4px] text-sm">
          Our Favorite Moments
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {images.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-2xl cursor-pointer group ${image.span}`}
              onClick={() => setSelectedImage(index)}
            >
              <div className="aspect-square relative overflow-hidden bg-[#F8F4EF]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity text-lg">
                  View Photo
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {selectedImage !== null && (
        <Lightbox
          images={images}
          currentIndex={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </section>
  );
}

