"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Gift, Check } from "lucide-react";
import Ornament from "./Ornament";

export default function WeddingGift() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const banks = [
    {
      id: "bca",
      name: "Bank BCA",
      holder: "Romeo Montague",
      number: "1234567890",
    },
    {
      id: "mandiri",
      name: "Bank Mandiri",
      holder: "Juliet Capulet",
      number: "0987654321",
    },
  ];

  return (
    <section className="py-24 bg-surface px-6 text-center">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Gift
            className="w-8 h-8 text-gold/50 mx-auto mb-6"
            strokeWidth={1}
          />
          <p className="text-gold tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            Wedding Gift
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-dark font-light mb-4">
            Amplop Digital
          </h2>
          <p className="text-text-muted italic text-sm font-sans max-w-md mx-auto mb-14">
            Doa restu Anda merupakan karunia yang sangat berarti. Namun jika
            Anda ingin memberikan tanda kasih:
          </p>
        </motion.div>

        {/* Bank Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {banks.map((bank, i) => (
            <motion.div
              key={bank.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-8 bg-card border border-border-light hover:border-gold/30 transition-colors duration-500 group"
            >
              <p className="font-sans font-semibold text-text-dark mb-1">{bank.name}</p>
              <p className="text-text-muted text-xs font-sans mb-6">
                A/N {bank.holder}
              </p>
              <div className="flex items-center justify-center gap-3 bg-surface py-3 px-5 border border-dashed border-border-light">
                <span className="font-mono font-bold text-sm text-text-dark tracking-wider">
                  {bank.number}
                </span>
                <button
                  onClick={() => copyToClipboard(bank.number, bank.id)}
                  className="text-gold hover:text-gold-dark transition-colors"
                  aria-label="Copy account number"
                >
                  {copiedId === bank.id ? (
                    <Check size={14} className="text-green-600" />
                  ) : (
                    <Copy size={14} />
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Toast Notification */}
        <AnimatePresence>
          {copiedId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-20 left-1/2 -translate-x-1/2 bg-primary text-text-light px-6 py-3 text-xs font-sans tracking-wider z-50 shadow-xl border border-border-dark"
            >
              ✓ Nomor rekening berhasil disalin
            </motion.div>
          )}
        </AnimatePresence>

        <Ornament className="mt-16" />
      </div>
    </section>
  );
}