"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Mempelai", href: "#couple" },
  { label: "Kisah", href: "#story" },
  { label: "Acara", href: "#event" },
  { label: "Galeri", href: "#gallery" },
  { label: "Hadiah", href: "#gift" },
  { label: "RSVP", href: "#rsvp" },
];

export default function FloatingNav() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-6 left-6 z-50"
        >
          {/* Menu items */}
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.25 }}
                className="absolute bottom-14 left-0 flex flex-col gap-2 min-w-[140px]"
              >
                {navItems.map((item, i) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 }}
                    onClick={() => scrollTo(item.href)}
                    className="text-left px-4 py-2 bg-primary border border-border-dark text-text-light text-[10px] font-sans uppercase tracking-[0.25em] hover:border-gold/60 hover:text-gold transition-all duration-300"
                  >
                    {item.label}
                  </motion.button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Toggle Button */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            aria-label="Navigation menu"
            className="w-12 h-12 bg-card-dark border border-border-dark flex flex-col items-center justify-center gap-1.5 hover:border-gold/50 transition-all duration-300 group"
          >
            <span className={`block w-5 h-[0.5px] bg-gold transition-all duration-300 ${open ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`block w-5 h-[0.5px] bg-gold transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-[0.5px] bg-gold transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
