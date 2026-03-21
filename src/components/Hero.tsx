"use client";

import { motion } from "framer-motion";
import Ornament from "./Ornament";

export default function Hero() {
  return (
    <section className="relative py-28 md:py-36 bg-primary text-center overflow-hidden">
      {/* Subtle corner decorations */}
      <div className="absolute top-0 left-0 w-28 h-28 border-l border-t border-gold/8" />
      <div className="absolute top-0 right-0 w-28 h-28 border-r border-t border-gold/8" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto px-6"
      >
        {/* Bible Verse */}
        <p className="text-text-light/60 font-serif text-base md:text-lg italic leading-relaxed mb-6 max-w-lg mx-auto">
          &ldquo;Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu,
          apa yang telah dipersatukan Allah, tidak boleh diceraikan
          manusia.&rdquo;
        </p>
        <p className="text-text-muted/60 text-[10px] tracking-[0.3em] uppercase mb-10 font-sans">
          Matius 19:6
        </p>

        <Ornament light />

        {/* Couple Names */}
        <p className="text-gold/70 tracking-[0.5em] text-[10px] uppercase font-sans font-medium mt-8 mb-4">
          The Wedding of
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-text-light my-4 font-light leading-tight">
          Romeo{" "}
          <span className="text-gold italic text-3xl md:text-5xl mx-2">
            &
          </span>{" "}
          Juliet
        </h1>
        <p className="text-text-muted text-sm tracking-[0.3em] font-sans mt-4">
          31 . 12 . 2026
        </p>
      </motion.div>
    </section>
  );
}