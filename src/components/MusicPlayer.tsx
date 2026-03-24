"use client";

import { useState, useEffect, RefObject } from "react";
import { Music2, Pause } from "lucide-react";

interface MusicPlayerProps {
  audioRef: RefObject<HTMLAudioElement | null>;
}

const SONG_TITLE = "Canon in D — Pachelbel";

export default function MusicPlayer({ audioRef }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
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
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 pl-4 pr-3 py-2.5 bg-card-dark border border-border-dark hover:border-gold/50 transition-all duration-300 group shadow-xl"
    >
      {/* Song title — only when playing */}
      {isPlaying && (
        <span className="text-[9px] text-gold/80 font-sans tracking-[0.2em] uppercase max-w-[120px] truncate">
          {SONG_TITLE}
        </span>
      )}

      {/* Equalizer bars animation */}
      {isPlaying && (
        <div className="flex items-end gap-[3px] h-4">
          {[1, 2, 3, 4].map((bar) => (
            <div
              key={bar}
              className="w-[3px] bg-gold rounded-sm"
              style={{
                height: `${Math.random() * 50 + 30}%`,
                animation: `pulse-gold ${0.6 + bar * 0.15}s ease-in-out infinite alternate`,
              }}
            />
          ))}
        </div>
      )}

      {/* Icon */}
      <div className={`w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300 ${isPlaying ? "bg-gold text-primary" : "text-gold"}`}>
        {isPlaying ? <Pause size={14} fill="currentColor" /> : <Music2 size={15} />}
      </div>
    </button>
  );
}