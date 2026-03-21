"use client";

import { useState, useEffect, RefObject } from "react";
import { Music, Music2 } from "lucide-react";

interface MusicPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
}

export default function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);

    // Check initial state
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
    };
  }, [audioRef]);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label={isPlaying ? "Pause music" : "Play music"}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
        isPlaying
          ? "bg-gold text-primary animate-spin-slow"
          : "bg-card-dark text-gold border border-border-dark hover:bg-gold hover:text-primary"
      }`}
    >
      {isPlaying ? <Music2 size={18} /> : <Music size={18} />}
    </button>
  );
}