"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MusicPlayer from "./MusicPlayer";

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
      <audio
        ref={audioRef}
        loop
        src="/audio/wedding-bg.mp3"
      />

      {/* ===== COVER OVERLAY ===== */}
      <AnimatePresence>
        {!isOpened && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-primary flex flex-col items-center justify-center text-center px-6 overflow-hidden"
          >
            {/* Corner Decorations */}
            <div className="absolute top-8 left-8 w-24 h-24 border-l border-t border-gold/15" />
            <div className="absolute top-8 right-8 w-24 h-24 border-r border-t border-gold/15" />
            <div className="absolute bottom-8 left-8 w-24 h-24 border-l border-b border-gold/15" />
            <div className="absolute bottom-8 right-8 w-24 h-24 border-r border-b border-gold/15" />

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
            >
              <p className="text-gold/70 tracking-[0.5em] text-[10px] uppercase mb-10 font-sans font-medium">
                The Wedding of
              </p>

              <h1 className="text-6xl md:text-8xl font-serif text-text-light mb-3 font-light">
                Romeo
              </h1>
              <p className="text-gold text-3xl font-serif italic my-2">&</p>
              <h1 className="text-6xl md:text-8xl font-serif text-text-light mt-3 font-light">
                Juliet
              </h1>

              {/* Guest Name Card */}
              <div className="mt-14 bg-white/5 backdrop-blur-sm px-10 py-6 border border-white/10 max-w-xs mx-auto">
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
                className="mt-12 px-12 py-3.5 border border-gold text-gold hover:bg-gold hover:text-primary transition-all duration-500 tracking-[0.3em] text-[10px] font-sans font-semibold uppercase"
              >
                Buka Undangan
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MUSIC PLAYER (always visible after cover opens) ===== */}
      {isOpened && <MusicPlayer audioRef={audioRef} />}

      {/* ===== MAIN CONTENT ===== */}
      <div className={!isOpened ? "h-screen overflow-hidden" : ""}>
        {children}
      </div>
    </>
  );
}
