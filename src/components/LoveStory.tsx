"use client";

import { motion } from "framer-motion";
import Ornament from "./Ornament";
import Particles from "./Particles";

const stories = [
  {
    year: "2020",
    title: "Pertama Bertemu",
    desc: "Di sebuah persekutuan gereja, Tuhan mempertemukan dua hati yang belum saling mengenal. Sebuah pertemuan yang sederhana, namun penuh makna.",
  },
  {
    year: "2021",
    title: "Menjalin Kasih",
    desc: "Setelah setahun saling mengenal dan bertumbuh dalam iman bersama, kami memutuskan untuk memulai perjalanan cinta ini.",
  },
  {
    year: "2023",
    title: "Lamaran",
    desc: "Dengan berkat dan penyertaan Tuhan, sebuah janji diucapkan — dan dengan penuh sukacita, jawaban 'Ya' mengubah segalanya.",
  },
  {
    year: "2026",
    title: "Hari Bahagia",
    desc: "Di hadapan Tuhan, keluarga, dan sahabat, kami siap mengikrarkan janji setia dalam ikatan kudus pernikahan Kristen.",
  },
];

export default function LoveStory() {
  return (
    <section className="relative py-24 bg-primary px-6 overflow-hidden grain">
      <Particles count={12} light />
      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <p className="text-gold/70 tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            Our Journey
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-light font-light">
            Perjalanan Cinta
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[0.5px] bg-gold/15 -translate-x-1/2 hidden md:block" />
          <div className="absolute left-6 top-0 bottom-0 w-[0.5px] bg-gold/15 md:hidden" />

          <div className="space-y-16">
            {stories.map((story, i) => (
              <motion.div
                key={story.year}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year dot */}
                <div className="absolute left-6 md:left-1/2 w-3 h-3 border border-gold/40 bg-primary -translate-x-1/2 rotate-45 z-10" />

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    i % 2 === 0
                      ? "md:pr-16 md:text-right"
                      : "md:pl-16 md:text-left"
                  }`}
                >
                  <span className="text-gold/90 text-xs tracking-[0.3em] font-sans font-medium">
                    {story.year}
                  </span>
                  <h3 className="text-xl font-serif text-text-light mt-2 mb-3 font-light">
                    {story.title}
                  </h3>
                  <p className="text-text-light/65 text-sm font-sans leading-relaxed">
                    {story.desc}
                  </p>
                </div>

                {/* Empty spacer for the other half */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>

        <Ornament light variant="floral" className="mt-16" />
      </div>
    </section>
  );
}
