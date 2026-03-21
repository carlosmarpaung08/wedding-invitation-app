"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

interface EventProps {
  title: string;
  date: string;
  time: string;
  location: string;
  address: string;
  mapsUrl: string;
  delay?: number;
}

export default function EventCard({
  title,
  date,
  time,
  location,
  address,
  mapsUrl,
  delay = 0,
}: EventProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="bg-card p-10 border border-border-light flex flex-col items-center text-center group hover:border-gold/30 transition-colors duration-500"
    >
      <h3 className="text-2xl md:text-3xl font-serif text-text-dark mb-8 font-light">
        {title}
      </h3>

      <div className="space-y-5 mb-10 text-text-muted text-sm font-sans">
        <div className="flex flex-col items-center">
          <Calendar className="w-4 h-4 text-gold/60 mb-2" strokeWidth={1.5} />
          <p>{date}</p>
        </div>
        <div className="flex flex-col items-center">
          <Clock className="w-4 h-4 text-gold/60 mb-2" strokeWidth={1.5} />
          <p>{time}</p>
        </div>
        <div className="flex flex-col items-center">
          <MapPin className="w-4 h-4 text-gold/60 mb-2" strokeWidth={1.5} />
          <p className="font-medium text-text-dark">{location}</p>
          <p className="max-w-[220px] mt-1 text-xs">{address}</p>
        </div>
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-8 py-2.5 border border-primary text-primary hover:bg-primary hover:text-text-light transition-all duration-500 text-[10px] font-sans font-semibold uppercase tracking-[0.3em]"
      >
        Lihat Lokasi
      </a>
    </motion.div>
  );
}