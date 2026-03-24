"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { submitRSVP } from "@/app/actions";

export default function RSVPForm({ defaultName, guestId }: { defaultName: string; guestId: string | null }) {
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [formData, setFormData] = useState({
    name: defaultName,
    is_attending: true,
    total_guests: 1,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) return;
    setStatus("submitting");
    try {
      await submitRSVP({ ...formData, guest_id: guestId });
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-20 px-6"
      >
        <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6 rotate-45">
          <span className="text-gold text-lg -rotate-45">✓</span>
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-text-light mb-3 font-light">
          Terima Kasih
        </h3>
        <p className="text-text-muted text-sm font-sans">
          Konfirmasi dan ucapan Anda telah kami terima.
        </p>
      </motion.div>
    );
  }

  return (
    <div className="py-24 bg-primary px-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-gold/70 tracking-[0.4em] text-[10px] uppercase font-sans font-medium mb-4">
            RSVP
          </p>
          <h2 className="text-3xl md:text-5xl font-serif text-text-light font-light mb-4">
            Konfirmasi Kehadiran
          </h2>
          <p className="text-text-light/60 text-sm font-sans italic">
            Berikan doa restu dan konfirmasi kehadiran Anda
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="space-y-6 bg-card-dark p-8 md:p-10 border border-border-dark"
        >
          {/* Name */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans font-medium mb-2">
              Nama Lengkap
            </label>
            <input
              type="text"
              required
              className="w-full p-3 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Attendance + Total */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans font-medium mb-2">
                Konfirmasi
              </label>
              <select
                className="w-full p-3 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors"
                value={formData.is_attending ? "true" : "false"}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    is_attending: e.target.value === "true",
                  })
                }
              >
                <option value="true">Hadir</option>
                <option value="false">Tidak Hadir</option>
              </select>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans font-medium mb-2">
                Jumlah Tamu
              </label>
              <input
                type="number"
                min="1"
                max="5"
                className="w-full p-3 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors"
                value={formData.total_guests}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    total_guests: Math.max(1, parseInt(e.target.value) || 1),
                  })
                }
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label className="block text-[10px] uppercase tracking-[0.3em] text-gold/60 font-sans font-medium mb-2">
              Ucapan & Doa
            </label>
            <textarea
              rows={4}
              required
              placeholder="Tuliskan ucapan dan doa restu Anda..."
              className="w-full p-3 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors placeholder:text-text-muted/30 resize-none"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full py-4 bg-gold text-primary font-sans font-semibold uppercase tracking-[0.3em] text-[10px] hover:bg-gold-dark transition-all duration-500 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {status === "submitting" ? "Mengirim..." : "Kirim Konfirmasi"}
          </button>

          {status === "error" && (
            <p className="text-red-300 text-xs text-center font-sans">
              Terjadi kesalahan. Silakan coba lagi.
            </p>
          )}
        </motion.form>
      </div>
    </div>
  );
}