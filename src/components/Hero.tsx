"use client";

import { motion } from "framer-motion";
import Ornament from "./Ornament";
import Particles from "./Particles";

export default function Hero() {
  return (
    <section
      className="relative py-28 md:py-36 text-center overflow-hidden grain"
      style={{
        background: "linear-gradient(160deg, #0A0A0A 0%, #131313 50%, #0D0D0D 100%)",
      }}
    >
      {/* Particles */}
      <Particles count={18} light />

      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-6 left-6 w-20 h-20 border-l border-t border-gold/20" />
        <div className="absolute top-8 left-8 w-14 h-14 border-l border-t border-gold/10" />
      </div>
      <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none">
        <div className="absolute top-6 right-6 w-20 h-20 border-r border-t border-gold/20" />
        <div className="absolute top-8 right-8 w-14 h-14 border-r border-t border-gold/10" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="relative z-10 max-w-2xl mx-auto px-6"
      >
        {/* Bible Verse */}
        <p className="text-text-light/90 font-serif text-base md:text-lg italic leading-relaxed mb-6 max-w-lg mx-auto">
          &ldquo;Demikianlah mereka bukan lagi dua, melainkan satu. Karena itu,
          apa yang telah dipersatukan Allah, tidak boleh diceraikan
          manusia.&rdquo;
        </p>
        <p className="text-gold/80 text-[10px] tracking-[0.3em] uppercase mb-10 font-sans">
          Matius 19:6
        </p>

        {/* Cross ornament — Christian themed */}
        <Ornament light variant="cross" />

        {/* Couple Names */}
        <p className="text-gold/70 tracking-[0.5em] text-[10px] uppercase font-sans font-medium mt-8 mb-4">
          The Wedding of
        </p>
        <h1 className="text-5xl md:text-7xl font-serif text-text-light my-4 font-light leading-tight shimmer-gold">
          Romeo{" "}
          <span className="italic text-3xl md:text-5xl mx-2">&amp;</span>{" "}
          Juliet
        </h1>
        <p className="text-text-light/70 text-sm tracking-[0.3em] font-sans mt-4">
          31 . 12 . 2026
        </p>
      </motion.div>
    </section>
  );
}