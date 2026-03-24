"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";
import FloatingNav from "./FloatingNav";
import Particles from "./Particles";

interface InvitationWrapperProps {
  guestName: string;
  children: React.ReactNode;
}

export default function InvitationWrapper({
  guestName,
  children,
}: InvitationWrapperProps) {
  const [isOpened, setIsOpened] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleOpen = useCallback(() => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      {/* Background Music Audio Element */}
      <audio ref={audioRef} loop src="/audio/wedding-bg.mp3" />

      {/* ===== COVER OVERLAY ===== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center text-center px-6 overflow-hidden grain"
            style={{
              background:
                "radial-gradient(ellipse at center, #161616 0%, #0A0A0A 70%, #060606 100%)",
            }}
          >
            {/* Floating particles */}
            <Particles count={25} light />

            {/* Radial glow in center */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,168,85,0.06) 0%, transparent 70%)",
              }}
            />

            {/* Double corner decorations */}
            <div className="absolute top-8 left-8 w-28 h-28 pointer-events-none">
              <div className="absolute inset-0 border-l border-t border-gold/20" />
              <div className="absolute top-3 left-3 right-6 bottom-6 border-l border-t border-gold/10" />
            </div>
            <div className="absolute top-8 right-8 w-28 h-28 pointer-events-none">
              <div className="absolute inset-0 border-r border-t border-gold/20" />
              <div className="absolute top-3 right-3 left-6 bottom-6 border-r border-t border-gold/10" />
            </div>
            <div className="absolute bottom-8 left-8 w-28 h-28 pointer-events-none">
              <div className="absolute inset-0 border-l border-b border-gold/20" />
              <div className="absolute bottom-3 left-3 right-6 top-6 border-l border-b border-gold/10" />
            </div>
            <div className="absolute bottom-8 right-8 w-28 h-28 pointer-events-none">
              <div className="absolute inset-0 border-r border-b border-gold/20" />
              <div className="absolute bottom-3 right-3 left-6 top-6 border-r border-b border-gold/10" />
            </div>

            {/* Horizontal decorative lines */}
            <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 pointer-events-none">
              <div className="h-[0.5px] bg-gradient-to-r from-transparent via-gold/10 to-transparent mx-12" />
            </div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="relative z-10"
            >
              <p className="text-gold/70 tracking-[0.5em] text-[10px] uppercase mb-10 font-sans font-medium">
                The Wedding of
              </p>

              <h1 className="text-6xl md:text-8xl font-serif text-text-light mb-3 font-light shimmer-gold">
                Romeo
              </h1>
              <p className="text-gold text-3xl font-serif italic my-2">&amp;</p>
              <h1 className="text-6xl md:text-8xl font-serif text-text-light mt-3 font-light shimmer-gold">
                Juliet
              </h1>

              {/* Decorative divider */}
              <div className="flex items-center justify-center gap-3 my-8">
                <div className="h-[0.5px] w-12 bg-gold/30" />
                <span className="text-gold/50 text-[8px]">✦</span>
                <div className="h-[0.5px] w-4 bg-gold/20" />
                <span className="text-gold/60 font-serif text-lg">✝</span>
                <div className="h-[0.5px] w-4 bg-gold/20" />
                <span className="text-gold/50 text-[8px]">✦</span>
                <div className="h-[0.5px] w-12 bg-gold/30" />
              </div>

              {/* Guest Name Card */}
              <div className="bg-white/5 backdrop-blur-sm px-10 py-6 border border-white/20 max-w-xs mx-auto relative">
                {/* tiny corner accents */}
                <span className="absolute top-1 left-1 text-gold/20 text-[8px]">◆</span>
                <span className="absolute top-1 right-1 text-gold/20 text-[8px]">◆</span>
                <span className="absolute bottom-1 left-1 text-gold/20 text-[8px]">◆</span>
                <span className="absolute bottom-1 right-1 text-gold/20 text-[8px]">◆</span>
                <p className="text-text-muted text-[10px] tracking-[0.3em] uppercase mb-2 font-sans">
                  Kepada Yth.
                </p>
                <h2 className="text-2xl font-serif text-text-light capitalize">
                  {guestName}
                </h2>
              </div>

              {/* Open Button */}
              <button
                onClick={handleOpen}
                className="mt-10 px-12 py-3.5 border border-gold text-gold hover:bg-gold hover:text-primary transition-all duration-500 tracking-[0.3em] text-[10px] font-sans font-semibold uppercase"
              >
                Buka Undangan
              </button>

              <p className="mt-6 text-text-muted/40 text-[9px] font-sans tracking-[0.2em]">
                31 . 12 . 2026
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MUSIC PLAYER + FLOATING NAV (after cover opens) ===== */}
      {isOpened && <MusicPlayer audioRef={audioRef} />}
      {isOpened && <FloatingNav />}

      {/* ===== MAIN CONTENT ===== */}
      <div className={!isOpened ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}
