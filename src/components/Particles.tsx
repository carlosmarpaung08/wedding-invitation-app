"use client";

import { useEffect, useRef } from "react";

interface ParticleProps {
  count?: number;
  light?: boolean;
}

export default function Particles({ count = 20, light = false }: ParticleProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const particles: HTMLDivElement[] = [];

    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");

      const size = Math.random() * 3 + 1;
      const x = Math.random() * 100;
      const delay = Math.random() * 8;
      const duration = Math.random() * 10 + 8;
      const opacity = Math.random() * 0.4 + 0.1;

      p.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}%;
        bottom: -10px;
        border-radius: 50%;
        background: ${light ? `rgba(212,168,85,${opacity})` : `rgba(212,168,85,${opacity})`};
        box-shadow: 0 0 ${size * 2}px rgba(212,168,85,0.3);
        animation: floatUp ${duration}s ${delay}s ease-in infinite;
        pointer-events: none;
      `;

      container.appendChild(p);
      particles.push(p);
    }

    return () => {
      particles.forEach((p) => p.remove());
    };
  }, [count, light]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
