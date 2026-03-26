"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

export default function Countdown({ targetDate }: { targetDate: string }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const prevTime = useRef({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [flipping, setFlipping] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const calculate = () => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;
      if (distance < 0) return;

      const next = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      };

      const prev = prevTime.current;
      const newFlipping: Record<string, boolean> = {};
      (["days", "hours", "minutes", "seconds"] as const).forEach((key) => {
        if (prev[key] !== next[key]) newFlipping[key] = true;
      });

      if (Object.keys(newFlipping).length > 0) {
        setFlipping(newFlipping);
        setTimeout(() => setFlipping({}), 500);
      }

      prevTime.current = next;
      setTimeLeft(next);
    };

    calculate();
    const timer = setInterval(calculate, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  const units = [
    { key: "days", value: timeLeft.days, label: "Hari" },
    { key: "hours", value: timeLeft.hours, label: "Jam" },
    { key: "minutes", value: timeLeft.minutes, label: "Menit" },
    { key: "seconds", value: timeLeft.seconds, label: "Detik" },
  ];

  return (
    <section
      className="relative py-16 pb-24 overflow-hidden"
      style={{ background: "#080808" }}
    >
      {/* Ambient background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Verse teaser */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center font-sans text-[9px] uppercase tracking-[0.5em] mb-12"
          style={{ color: "rgba(201,168,76,0.4)" }}
        >
          Menghitung Hari
        </motion.p>

        {/* Countdown grid */}
        <div className="flex justify-center items-start gap-0">
          {units.map((unit, i) => (
            <div key={unit.key} className="flex items-start">
              {/* Unit block */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="flex flex-col items-center px-3 md:px-6"
              >
                {/* Number container */}
                <div
                  className="relative overflow-hidden"
                  style={{
                    width: "clamp(64px, 14vw, 96px)",
                    height: "clamp(72px, 16vw, 108px)",
                  }}
                >
                  {/* Background */}
                  <div
                    className="absolute inset-0"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: "0.5px solid rgba(201,168,76,0.15)",
                    }}
                  />

                  {/* Top/bottom inner lines */}
                  <div
                    className="absolute left-2 right-2 top-0 h-[1px]"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  />
                  <div
                    className="absolute left-2 right-2 bottom-0 h-[1px]"
                    style={{ background: "rgba(201,168,76,0.08)" }}
                  />

                  {/* Middle split line */}
                  <div
                    className="absolute left-0 right-0 top-1/2 h-[0.5px] z-20"
                    style={{
                      background: "rgba(8,8,8,0.8)",
                      transform: "translateY(-50%)",
                    }}
                  />

                  {/* Flip animation wrapper */}
                  <motion.div
                    key={`${unit.key}-${unit.value}`}
                    initial={flipping[unit.key] ? { y: "-100%", opacity: 0 } : { y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <span
                      className="font-serif font-light select-none"
                      style={{
                        fontSize: "clamp(28px, 7vw, 48px)",
                        color: "#EDE9E2",
                        lineHeight: 1,
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {String(unit.value).padStart(2, "0")}
                    </span>
                  </motion.div>

                  {/* Gold shimmer overlay on active second */}
                  {unit.key === "seconds" && flipping[unit.key] && (
                    <motion.div
                      initial={{ opacity: 0.3 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "rgba(201,168,76,0.06)" }}
                    />
                  )}
                </div>

                {/* Label */}
                <span
                  className="font-sans uppercase mt-3 block"
                  style={{
                    fontSize: "9px",
                    letterSpacing: "0.35em",
                    color: "rgba(201,168,76,0.5)",
                  }}
                >
                  {unit.label}
                </span>
              </motion.div>

              {/* Separator */}
              {i < units.length - 1 && (
                <div
                  className="flex flex-col gap-2 items-center pt-2"
                  style={{ marginTop: "clamp(22px, 5vw, 34px)" }}
                >
                  <div
                    className="w-1 h-1 rotate-45"
                    style={{ background: "rgba(201,168,76,0.35)" }}
                  />
                  <div
                    className="w-1 h-1 rotate-45"
                    style={{ background: "rgba(201,168,76,0.2)" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom accent */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-4 mt-14"
        >
          <div
            className="h-[0.5px] w-16"
            style={{ background: "rgba(201,168,76,0.15)" }}
          />
          <span
            className="font-sans text-[8px] uppercase tracking-[0.5em]"
            style={{ color: "rgba(201,168,76,0.3)" }}
          >
            31 Desember 2026
          </span>
          <div
            className="h-[0.5px] w-16"
            style={{ background: "rgba(201,168,76,0.15)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}