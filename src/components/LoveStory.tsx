"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Particles from "./Particles";

const stories = [
  {
    year: "2020",
    title: "Pertama Bertemu",
    desc: "Di sebuah persekutuan gereja, Tuhan mempertemukan dua hati yang belum saling mengenal. Sebuah pertemuan yang sederhana, namun penuh makna.",
    icon: "✦",
  },
  {
    year: "2021",
    title: "Menjalin Kasih",
    desc: "Setelah setahun saling mengenal dan bertumbuh dalam iman bersama, kami memutuskan untuk memulai perjalanan cinta ini.",
    icon: "♡",
  },
  {
    year: "2023",
    title: "Lamaran",
    desc: "Dengan berkat dan penyertaan Tuhan, sebuah janji diucapkan — dan dengan penuh sukacita, jawaban 'Ya' mengubah segalanya.",
    icon: "◇",
  },
  {
    year: "2026",
    title: "Hari Bahagia",
    desc: "Di hadapan Tuhan, keluarga, dan sahabat, kami siap mengikrarkan janji setia dalam ikatan kudus pernikahan Kristen.",
    icon: "✝",
  },
];

function StoryItem({
  story,
  index,
  isLast,
}: {
  story: (typeof stories)[0];
  index: number;
  isLast: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid md:grid-cols-2 gap-0 md:gap-0">
      {/* Mobile layout (stacked) */}
      <div className="md:hidden flex gap-5 pb-12">
        {/* Left: year + dot */}
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, type: "spring", stiffness: 200 }}
            className="w-8 h-8 rotate-45 flex-shrink-0 relative"
            style={{
              background: "rgba(201,168,76,0.1)",
              border: "0.5px solid rgba(201,168,76,0.4)",
            }}
          >
            <span
              className="absolute inset-0 flex items-center justify-center -rotate-45 font-serif"
              style={{ color: "rgba(201,168,76,0.8)", fontSize: "10px" }}
            >
              {story.icon}
            </span>
          </motion.div>
          {!isLast && (
            <motion.div
              className="w-[0.5px] flex-1 mt-2"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "linear-gradient(to bottom, rgba(201,168,76,0.3), rgba(201,168,76,0.05))",
                transformOrigin: "top",
              }}
            />
          )}
        </div>
        {/* Right: content */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-0.5"
        >
          <span
            className="font-sans text-[10px] tracking-[0.3em] uppercase block mb-2"
            style={{ color: "rgba(201,168,76,0.6)" }}
          >
            {story.year}
          </span>
          <h3
            className="font-serif font-light mb-3"
            style={{ fontSize: "22px", color: "#EDE9E2" }}
          >
            {story.title}
          </h3>
          <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(237,233,226,0.5)" }}>
            {story.desc}
          </p>
        </motion.div>
      </div>

      {/* Desktop layout (alternating left/right) */}
      <div className="hidden md:contents">
        {/* Content block */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? -40 : 40 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className={`py-12 ${isEven ? "pr-20 text-right" : "pl-20 text-left"} ${
            isEven ? "order-1" : "order-3"
          }`}
        >
          <span
            className="font-sans text-[10px] tracking-[0.4em] uppercase block mb-3"
            style={{ color: "rgba(201,168,76,0.55)" }}
          >
            {story.year}
          </span>
          <h3
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(20px, 3vw, 28px)", color: "#EDE9E2" }}
          >
            {story.title}
          </h3>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: "rgba(237,233,226,0.5)", maxWidth: "340px", marginLeft: isEven ? "auto" : "0" }}
          >
            {story.desc}
          </p>
          {/* Horizontal accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: "48px" } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
            className={`h-[0.5px] mt-6 ${isEven ? "ml-auto" : "mr-auto"}`}
            style={{ background: "rgba(201,168,76,0.3)" }}
          />
        </motion.div>

        {/* Center timeline column */}
        <div className="relative flex flex-col items-center order-2">
          {/* Vertical line segment above dot */}
          {index > 0 && (
            <motion.div
              className="w-[0.5px] flex-1"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "linear-gradient(to bottom, rgba(201,168,76,0.08), rgba(201,168,76,0.25))",
                transformOrigin: "top",
              }}
            />
          )}

          {/* Diamond dot */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={isInView ? { scale: 1, rotate: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15, type: "spring", stiffness: 180 }}
            className="w-9 h-9 rotate-45 flex-shrink-0 relative z-10 my-1"
            style={{
              background: "rgba(201,168,76,0.08)",
              border: "0.5px solid rgba(201,168,76,0.45)",
            }}
          >
            {/* Inner glow ring */}
            <span
              className="absolute inset-0 flex items-center justify-center -rotate-45 font-serif"
              style={{ fontSize: "12px", color: "rgba(201,168,76,0.9)" }}
            >
              {story.icon}
            </span>
          </motion.div>

          {/* Vertical line segment below dot */}
          {!isLast && (
            <motion.div
              className="w-[0.5px] flex-1"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              style={{
                background: "linear-gradient(to bottom, rgba(201,168,76,0.25), rgba(201,168,76,0.05))",
                transformOrigin: "top",
              }}
            />
          )}
        </div>

        {/* Empty spacer (opposite side) */}
        <div className={`py-12 ${isEven ? "order-3" : "order-1"}`} />
      </div>
    </div>
  );
}

export default function LoveStory() {
  return (
    <section
      className="relative py-24 overflow-hidden grain"
      style={{ background: "#080808" }}
    >
      <Particles count={14} light />

      {/* Ambient side glows */}
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute right-0 top-1/3 w-64 h-64 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(201,168,76,0.03) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p
            className="font-sans uppercase tracking-[0.5em] text-[9px] mb-5"
            style={{ color: "rgba(201,168,76,0.5)" }}
          >
            Our Journey
          </p>
          <h2
            className="font-serif font-light"
            style={{ fontSize: "clamp(32px, 6vw, 52px)", color: "#EDE9E2" }}
          >
            Perjalanan Cinta
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mt-6"
          >
            <div className="h-[0.5px] w-12" style={{ background: "rgba(201,168,76,0.2)" }} />
            <div className="w-1 h-1 rotate-45" style={{ background: "rgba(201,168,76,0.4)" }} />
            <div className="h-[0.5px] w-12" style={{ background: "rgba(201,168,76,0.2)" }} />
          </motion.div>
        </motion.div>

        {/* Timeline */}
        <div>
          {stories.map((story, i) => (
            <StoryItem
              key={story.year}
              story={story}
              index={i}
              isLast={i === stories.length - 1}
            />
          ))}
        </div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-8"
        >
          <div className="h-[0.5px] w-12" style={{ background: "rgba(201,168,76,0.15)" }} />
          <span className="font-serif text-sm" style={{ color: "rgba(201,168,76,0.4)" }}>✦</span>
          <div className="h-[0.5px] w-4" style={{ background: "rgba(201,168,76,0.1)" }} />
          <span className="font-serif" style={{ color: "rgba(201,168,76,0.5)" }}>✝</span>
          <div className="h-[0.5px] w-4" style={{ background: "rgba(201,168,76,0.1)" }} />
          <span className="font-serif text-sm" style={{ color: "rgba(201,168,76,0.4)" }}>✦</span>
          <div className="h-[0.5px] w-12" style={{ background: "rgba(201,168,76,0.15)" }} />
        </motion.div>
      </div>
    </section>
  );
}