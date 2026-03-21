"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const galleryItems = [
  { id: 1, src: "/images/gallery/couple.png", span: "col-span-2 row-span-2", label: "Prewedding" },
  { id: 2, src: "/images/gallery/rings.png", span: "col-span-1 row-span-1", label: "Cincin" },
  { id: 3, src: "/images/gallery/bouquet.png", span: "col-span-1 row-span-1", label: "Bouquet" },
  { id: 4, src: "/images/gallery/church.png", span: "col-span-1 row-span-2", label: "Gereja" },
  { id: 5, src: "/images/gallery/hands.png", span: "col-span-1 row-span-1", label: "Together" },
  { id: 6, src: "/images/gallery/reception.png", span: "col-span-1 row-span-1", label: "Resepsi" },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section className="py-24 bg-primary px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold/70 tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            Our Moments
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-light font-light">
            Galeri
          </h2>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-3 gap-2 md:gap-3 auto-rows-[150px] md:auto-rows-[200px]">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`${item.span} relative overflow-hidden group cursor-pointer`}
              onClick={() => setLightbox(item.src)}
            >
              {/* Real Image */}
              <Image
                src={item.src}
                alt={item.label}
                fill
                sizes="(max-width: 768px) 33vw, 400px"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                <span className="text-white/0 group-hover:text-white/80 transition-all duration-500 text-xs font-sans tracking-[0.3em] uppercase font-medium">
                  {item.label}
                </span>
              </div>

              {/* Border frame on hover */}
              <div className="absolute inset-3 border border-white/0 group-hover:border-white/20 transition-all duration-500" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[90] bg-black/90 flex items-center justify-center p-6 cursor-pointer"
          onClick={() => setLightbox(null)}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="relative max-w-3xl max-h-[80vh] w-full h-full"
          >
            <Image
              src={lightbox}
              alt="Gallery"
              fill
              className="object-contain"
            />
          </motion.div>
          <button
            className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl font-sans"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
        </motion.div>
      )}
    </section>
  );
}
