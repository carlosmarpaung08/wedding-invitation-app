"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) return;
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        ),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { value: timeLeft.days, label: "Hari" },
    { value: timeLeft.hours, label: "Jam" },
    { value: timeLeft.minutes, label: "Menit" },
    { value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <div className="bg-primary pb-20 pt-4">
      <div className="flex justify-center items-center gap-3 md:gap-6">
        {units.map((unit, i) => (
          <div key={unit.label} className="flex items-center gap-3 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center"
            >
              <div className="w-18 h-18 md:w-24 md:h-24 flex items-center justify-center border border-gold/20 bg-white/5">
                <span className="text-2xl md:text-4xl font-serif text-text-light">
                  {String(unit.value).padStart(2, "0")}
                </span>
              </div>
              <span className="text-[8px] md:text-[9px] uppercase tracking-[0.3em] mt-3 text-gold/50 font-sans font-medium">
                {unit.label}
              </span>
            </motion.div>
            {i < units.length - 1 && (
              <span className="text-gold/20 text-xl font-serif -mt-5">:</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}