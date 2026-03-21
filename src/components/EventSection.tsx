"use client";

import { motion } from "framer-motion";
import EventCard from "./EventCard";
import Ornament from "./Ornament";

export default function EventSection() {
  return (
    <section className="py-24 bg-surface px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-gold tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            Save The Date
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark font-light">
            Waktu & Tempat
          </h2>
        </motion.div>

        {/* Event Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <EventCard
            title="Pemberkatan Nikah"
            date="Minggu, 31 Desember 2026"
            time="09:00 - 10:00 WIB"
            location="Gereja HKBP Ressort Bekasi"
            address="Jl. Veteran No.10, Margahayu, Bekasi"
            mapsUrl="https://www.google.com/maps/search/?api=1&query=Gereja+HKBP+Bekasi"
            delay={0.1}
          />
          <EventCard
            title="Resepsi"
            date="Minggu, 31 Desember 2026"
            time="11:00 - 13:00 WIB"
            location="Ballroom Hotel Grand"
            address="Jl. Jend. Sudirman Kav. 1, Bekasi"
            mapsUrl="https://www.google.com/maps/search/?api=1&query=Grand+Galaxy+Park+Convention+Hall+Bekasi"
            delay={0.3}
          />
        </div>

        {/* Google Maps Embed — Gereja HKBP Bekasi area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="w-full h-[350px] md:h-[400px] overflow-hidden border border-border-light"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15864.2!2d107.0!3d-6.25!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698c5f8d0c0001%3A0x1234567890abcdef!2sBekasi!5e0!3m2!1sid!2sid!4v1700000000000"
            width="100%"
            height="100%"
            style={{ border: 0, filter: "grayscale(100%)" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>

        <Ornament className="mt-12" />
      </div>
    </section>
  );
}