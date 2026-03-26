"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryItems = [
  { id: 1, src: "/images/gallery/couple.png", label: "Prewedding", aspect: "tall" },
  { id: 2, src: "/images/gallery/rings.png", label: "Cincin", aspect: "square" },
  { id: 3, src: "/images/gallery/bouquet.png", label: "Bouquet", aspect: "square" },
  { id: 4, src: "/images/gallery/church.png", label: "Gereja", aspect: "wide" },
  { id: 5, src: "/images/gallery/hands.png", label: "Together", aspect: "square" },
  { id: 6, src: "/images/gallery/reception.png", label: "Resepsi", aspect: "square" },
];

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i - 1 + galleryItems.length) % galleryItems.length : null));
  }, []);
  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % galleryItems.length : null));
  }, []);

  return (
    <section
      className="relative py-24 overflow-hidden grain"
      style={{ background: "#080808" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p
            className="font-sans uppercase tracking-[0.5em] text-[9px] mb-5"
            style={{ color: "rgba(201,168,76,0.5)" }}
          >
            Our Moments
          </p>
          <h2
            className="font-serif font-light"
            style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#EDE9E2" }}
          >
            Galeri
          </h2>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-3 md:grid-cols-4 gap-2 md:gap-2.5">

          {/* Item 1 — hero tall (spans 2 rows on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0 }}
            viewport={{ once: true }}
            onClick={() => openLightbox(0)}
            className="relative cursor-pointer group col-span-2 row-span-2 overflow-hidden"
            style={{ aspectRatio: "1 / 1.3" }}
          >
            <GalleryImage item={galleryItems[0]} />
          </motion.div>

          {/* Items 2 & 3 — small squares */}
          {[1, 2].map((i) => (
            <motion.div
              key={galleryItems[i].id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(i)}
              className="relative cursor-pointer group overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GalleryImage item={galleryItems[i]} />
            </motion.div>
          ))}

          {/* Item 4 — wide (spans 2 cols on desktop) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            onClick={() => openLightbox(3)}
            className="relative cursor-pointer group col-span-2 overflow-hidden"
            style={{ aspectRatio: "2 / 1" }}
          >
            <GalleryImage item={galleryItems[3]} />
          </motion.div>

          {/* Items 5 & 6 — small squares */}
          {[4, 5].map((i) => (
            <motion.div
              key={galleryItems[i].id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 + i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => openLightbox(i)}
              className="relative cursor-pointer group overflow-hidden"
              style={{ aspectRatio: "1 / 1" }}
            >
              <GalleryImage item={galleryItems[i]} />
            </motion.div>
          ))}
        </div>

        {/* Open gallery hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center font-sans text-[9px] uppercase tracking-[0.4em] mt-10"
          style={{ color: "rgba(201,168,76,0.25)" }}
        >
          Klik foto untuk memperbesar
        </motion.p>
      </div>

      {/* ===== CINEMATIC LIGHTBOX ===== */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] flex items-center justify-center lightbox-overlay"
            style={{ background: "rgba(5,5,5,0.96)" }}
            onClick={closeLightbox}
          >
            {/* Image container */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
              style={{ maxWidth: "min(90vw, 900px)", maxHeight: "85vh" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image frame */}
              <div
                className="relative overflow-hidden"
                style={{
                  border: "0.5px solid rgba(201,168,76,0.2)",
                  maxHeight: "80vh",
                }}
              >
                <div className="relative" style={{ width: "min(85vw, 860px)", height: "min(75vh, 640px)" }}>
                  <Image
                    src={galleryItems[lightboxIndex].src}
                    alt={galleryItems[lightboxIndex].label}
                    fill
                    className="object-contain"
                    sizes="90vw"
                  />
                </div>
              </div>

              {/* Label */}
              <div className="flex items-center justify-center gap-3 mt-4">
                <div className="h-[0.5px] w-8" style={{ background: "rgba(201,168,76,0.2)" }} />
                <span
                  className="font-sans text-[9px] uppercase tracking-[0.4em]"
                  style={{ color: "rgba(201,168,76,0.5)" }}
                >
                  {galleryItems[lightboxIndex].label}
                </span>
                <div className="h-[0.5px] w-8" style={{ background: "rgba(201,168,76,0.2)" }} />
              </div>

              {/* Index indicator */}
              <div className="flex justify-center gap-2 mt-3">
                {galleryItems.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setLightboxIndex(i)}
                    className="w-1.5 h-1.5 rotate-45 transition-all duration-300"
                    style={{
                      background: i === lightboxIndex ? "rgba(201,168,76,0.8)" : "rgba(201,168,76,0.2)",
                    }}
                  />
                ))}
              </div>
            </motion.div>

            {/* Navigation arrows */}
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: "0.5px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.7)" }}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: "0.5px solid rgba(201,168,76,0.3)", color: "rgba(201,168,76,0.7)" }}
            >
              <ChevronRight size={18} />
            </button>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 md:top-6 right-4 md:right-6 w-10 h-10 flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{ border: "0.5px solid rgba(201,168,76,0.25)", color: "rgba(201,168,76,0.6)" }}
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ===== Sub-component: Gallery image tile ===== */
function GalleryImage({ item }: { item: (typeof galleryItems)[0] }) {
  return (
    <>
      <Image
        src={item.src}
        alt={item.label}
        fill
        sizes="(max-width: 768px) 50vw, 400px"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        style={{ filter: "brightness(0.92)" }}
      />

      {/* Hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center"
        style={{ background: "rgba(8,8,8,0.55)" }}
      >
        {/* Inner border */}
        <div
          className="absolute inset-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"
          style={{ border: "0.5px solid rgba(201,168,76,0.3)" }}
        />
        <span
          className="font-sans text-[9px] uppercase tracking-[0.4em] relative z-10"
          style={{ color: "rgba(237,233,226,0.8)" }}
        >
          {item.label}
        </span>
        {/* Plus icon */}
        <div
          className="mt-2 w-5 h-5 relative z-10"
          style={{ color: "rgba(201,168,76,0.7)" }}
        >
          <span
            className="absolute inset-0 flex items-center justify-center font-serif text-sm"
          >
            +
          </span>
        </div>
      </div>
    </>
  );
}