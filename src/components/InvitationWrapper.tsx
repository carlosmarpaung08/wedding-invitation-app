"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";
import FloatingNav from "./FloatingNav";
import Particles from "./Particles";
import ScrollProgress from "./ScrollProgress";

interface InvitationWrapperProps {
  guestName: string;
  children: React.ReactNode;
}

export default function InvitationWrapper({
  guestName,
  children,
}: InvitationWrapperProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsAnimating(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setIsOpened(true), 900);
  }, []);

  return (
    <>
      <audio ref={audioRef} loop src="/audio/wedding-bg.mp3" />

      {/* ===== SCROLL PROGRESS ===== */}
      {isOpened && <ScrollProgress />}

      {/* ===== COVER OVERLAY ===== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[100] overflow-hidden"
            style={{ background: "#050505" }}
          >
            {/* Deep ambient glow layers */}
            <div className="absolute inset-0 pointer-events-none">
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 40% 40% at 20% 80%, rgba(201,168,76,0.03) 0%, transparent 60%)",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(ellipse 40% 40% at 80% 20%, rgba(201,168,76,0.02) 0%, transparent 60%)",
                }}
              />
            </div>

            {/* Floating particles */}
            <Particles count={30} light />

            {/* Horizontal scan lines (very subtle) */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.015]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.5) 0px, rgba(255,255,255,0.5) 1px, transparent 1px, transparent 4px)",
              }}
            />

            {/* Corner ornaments — refined double-line */}
            {[
              "top-0 left-0",
              "top-0 right-0",
              "bottom-0 left-0",
              "bottom-0 right-0",
            ].map((pos, i) => {
              const isRight = pos.includes("right");
              const isBottom = pos.includes("bottom");
              return (
                <motion.div
                  key={pos}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.5, delay: 0.3 + i * 0.1 }}
                  className={`absolute ${pos} w-32 h-32 md:w-44 md:h-44 pointer-events-none`}
                >
                  <div
                    className="absolute inset-0"
                    style={{
                      borderLeft: isRight ? "none" : "0.5px solid rgba(201,168,76,0.25)",
                      borderRight: isRight ? "0.5px solid rgba(201,168,76,0.25)" : "none",
                      borderTop: isBottom ? "none" : "0.5px solid rgba(201,168,76,0.25)",
                      borderBottom: isBottom ? "0.5px solid rgba(201,168,76,0.25)" : "none",
                    }}
                  />
                  <div
                    className="absolute"
                    style={{
                      top: isBottom ? "auto" : "12px",
                      bottom: isBottom ? "12px" : "auto",
                      left: isRight ? "auto" : "12px",
                      right: isRight ? "12px" : "auto",
                      width: "calc(100% - 24px)",
                      height: "calc(100% - 24px)",
                      borderLeft: isRight ? "none" : "0.5px solid rgba(201,168,76,0.12)",
                      borderRight: isRight ? "0.5px solid rgba(201,168,76,0.12)" : "none",
                      borderTop: isBottom ? "none" : "0.5px solid rgba(201,168,76,0.12)",
                      borderBottom: isBottom ? "0.5px solid rgba(201,168,76,0.12)" : "none",
                    }}
                  />
                </motion.div>
              );
            })}

            {/* Center horizontal lines */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="absolute left-0 right-0 pointer-events-none"
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              <div
                className="h-[0.5px] mx-16 md:mx-32"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(201,168,76,0.08), rgba(201,168,76,0.15), rgba(201,168,76,0.08), transparent)",
                }}
              />
            </motion.div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-8 py-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-center max-w-lg w-full"
              >
                {/* Top label */}
                <motion.p
                  initial={{ opacity: 0, letterSpacing: "0.8em" }}
                  animate={{ opacity: 1, letterSpacing: "0.6em" }}
                  transition={{ duration: 1.5, delay: 0.6 }}
                  className="text-[9px] uppercase font-sans mb-10"
                  style={{ color: "rgba(201,168,76,0.6)" }}
                >
                  The Wedding of
                </motion.p>

                {/* Names — cinematic sizing */}
                <div className="relative mb-4">
                  <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif font-light leading-none shimmer-gold"
                    style={{ fontSize: "clamp(52px, 14vw, 96px)" }}
                  >
                    Romeo
                  </motion.h1>

                  {/* Decorative divider */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 1.0 }}
                    className="flex items-center justify-center gap-4 my-4"
                  >
                    <div className="h-[0.5px] flex-1 max-w-16" style={{ background: "rgba(201,168,76,0.25)" }} />
                    <span className="font-serif italic" style={{ fontSize: "28px", color: "rgba(201,168,76,0.7)" }}>
                      &amp;
                    </span>
                    <div className="h-[0.5px] flex-1 max-w-16" style={{ background: "rgba(201,168,76,0.25)" }} />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
                    className="font-serif font-light leading-none shimmer-gold"
                    style={{ fontSize: "clamp(52px, 14vw, 96px)" }}
                  >
                    Juliet
                  </motion.h1>
                </div>

                {/* Date pill */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.1 }}
                  className="flex items-center justify-center gap-3 mt-8 mb-12"
                >
                  <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.2)" }} />
                  <span className="font-sans text-[10px] tracking-[0.4em]" style={{ color: "rgba(201,168,76,0.5)" }}>
                    31 . 12 . 2026
                  </span>
                  <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.2)" }} />
                </motion.div>

                {/* Guest name card */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 1.3 }}
                  className="relative mx-auto mb-10"
                  style={{
                    maxWidth: "320px",
                    background: "rgba(255,255,255,0.03)",
                    border: "0.5px solid rgba(201,168,76,0.2)",
                    padding: "20px 32px",
                  }}
                >
                  {/* Corner dots */}
                  {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1"].map((pos) => (
                    <span
                      key={pos}
                      className={`absolute ${pos} w-2 h-2 rotate-45`}
                      style={{ background: "rgba(201,168,76,0.4)" }}
                    />
                  ))}
                  <p className="font-sans text-[9px] tracking-[0.4em] uppercase mb-2" style={{ color: "rgba(201,168,76,0.5)" }}>
                    Kepada Yth.
                  </p>
                  <p className="font-serif text-xl font-light" style={{ color: "#EDE9E2" }}>
                    {guestName}
                  </p>
                </motion.div>

                {/* Open button */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOpen}
                  disabled={isAnimating}
                  className="relative group overflow-hidden font-sans text-[10px] uppercase tracking-[0.4em] px-14 py-4 transition-all duration-700 disabled:opacity-60"
                  style={{
                    border: "0.5px solid rgba(201,168,76,0.6)",
                    color: "#C9A84C",
                  }}
                >
                  <span
                    className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-700"
                    style={{ background: "rgba(201,168,76,0.12)" }}
                  />
                  <span className="relative">
                    {isAnimating ? "Membuka..." : "Buka Undangan"}
                  </span>
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MUSIC PLAYER + FLOATING NAV ===== */}
      {isOpened && <MusicPlayer audioRef={audioRef} />}
      {isOpened && <FloatingNav />}

      {/* ===== MAIN CONTENT ===== */}
      <div className={!isOpened ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}