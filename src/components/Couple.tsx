"use client";

import { motion } from "framer-motion";
import Ornament from "./Ornament";

export default function Couple() {
  return (
    <section className="py-24 bg-surface px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            Bride & Groom
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark font-light">
            Mempelai
          </h2>
        </motion.div>

        {/* Profiles */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Groom */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full mb-8 overflow-hidden border border-gold/20 p-1.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-200 via-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-white text-6xl font-serif font-light drop-shadow-md">
                  R
                </span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-text-dark mb-2 font-light">
              Romeo Montague
            </h3>
            <div className="w-8 h-[0.5px] bg-gold/40 my-3" />
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-sans mb-1">
              Putra dari
            </p>
            <p className="text-text-muted text-sm font-sans">
              Bpk. Lord Montague
              <br />& Ibu Lady Montague
            </p>
          </motion.div>

          {/* Ampersand divider (mobile) */}
          <div className="md:hidden flex justify-center -my-8">
            <span className="text-gold/40 text-4xl font-serif italic">&</span>
          </div>

          {/* Bride */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-full mb-8 overflow-hidden border border-gold/20 p-1.5">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 via-gray-400 to-gray-500 flex items-center justify-center">
                <span className="text-white text-6xl font-serif font-light drop-shadow-md">
                  J
                </span>
              </div>
            </div>
            <h3 className="text-2xl md:text-3xl font-serif text-text-dark mb-2 font-light">
              Juliet Capulet
            </h3>
            <div className="w-8 h-[0.5px] bg-gold/40 my-3" />
            <p className="text-gold text-[10px] tracking-[0.3em] uppercase font-sans mb-1">
              Putri dari
            </p>
            <p className="text-text-muted text-sm font-sans">
              Bpk. Lord Capulet
              <br />& Ibu Lady Capulet
            </p>
          </motion.div>
        </div>

        <Ornament className="mt-16" />
      </div>
    </section>
  );
}