"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitRSVP } from "@/app/actions";
import { Check, Minus, Plus } from "lucide-react";

export default function RSVPForm({
  defaultName,
  guestId,
}: {
  defaultName: string;
  guestId: string | null;
}) {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
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
      <div className="py-24 px-6" style={{ background: "#080808" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-md mx-auto text-center"
        >
          {/* Checkmark diamond */}
          <motion.div
            initial={{ rotate: -45, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring", stiffness: 160 }}
            className="w-20 h-20 mx-auto mb-8 flex items-center justify-center"
            style={{ border: "0.5px solid rgba(201,168,76,0.4)", background: "rgba(201,168,76,0.06)" }}
          >
            <Check size={24} style={{ color: "#C9A84C" }} strokeWidth={1.5} />
          </motion.div>

          <h3 className="font-serif font-light mb-3" style={{ fontSize: "32px", color: "#EDE9E2" }}>
            Terima Kasih
          </h3>
          <p className="font-sans text-sm" style={{ color: "rgba(237,233,226,0.45)" }}>
            Konfirmasi dan ucapan Anda telah kami terima.
            <br />Tuhan memberkati.
          </p>

          {/* Ornament */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.2)" }} />
            <span className="font-serif" style={{ color: "rgba(201,168,76,0.4)", fontSize: "12px" }}>✝</span>
            <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.2)" }} />
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-24 px-6" style={{ background: "#080808" }}>
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p
            className="font-sans uppercase tracking-[0.5em] text-[9px] mb-5"
            style={{ color: "rgba(201,168,76,0.5)" }}
          >
            RSVP
          </p>
          <h2
            className="font-serif font-light mb-4"
            style={{ fontSize: "clamp(28px, 5vw, 44px)", color: "#EDE9E2" }}
          >
            Konfirmasi Kehadiran
          </h2>
          <p className="font-sans text-sm italic" style={{ color: "rgba(237,233,226,0.35)" }}>
            Berikan doa restu dan konfirmasi kehadiran Anda
          </p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "0.5px solid rgba(201,168,76,0.12)",
          }}
          className="p-8 md:p-12"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Name field */}
            <div>
              <label
                className="block font-sans text-[9px] uppercase tracking-[0.4em] mb-3"
                style={{ color: "rgba(201,168,76,0.5)" }}
              >
                Nama Lengkap
              </label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 font-sans text-sm transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(201,168,76,0.15)",
                  color: "#EDE9E2",
                  outline: "none",
                }}
                placeholder="Nama Anda..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Attendance toggle — visual split */}
            <div>
              <label
                className="block font-sans text-[9px] uppercase tracking-[0.4em] mb-3"
                style={{ color: "rgba(201,168,76,0.5)" }}
              >
                Konfirmasi Kehadiran
              </label>
              <div className="grid grid-cols-2 gap-0" style={{ border: "0.5px solid rgba(201,168,76,0.15)" }}>
                {[
                  { value: true, label: "Hadir", sub: "Saya akan hadir" },
                  { value: false, label: "Tidak Hadir", sub: "Mohon maaf berhalangan" },
                ].map((opt) => (
                  <button
                    key={String(opt.value)}
                    type="button"
                    onClick={() => setFormData({ ...formData, is_attending: opt.value })}
                    className="relative py-5 px-4 text-left transition-all duration-400 group"
                    style={{
                      background:
                        formData.is_attending === opt.value
                          ? "rgba(201,168,76,0.08)"
                          : "transparent",
                      borderRight: opt.value === true ? "0.5px solid rgba(201,168,76,0.1)" : "none",
                    }}
                  >
                    {/* Active indicator */}
                    {formData.is_attending === opt.value && (
                      <motion.div
                        layoutId="attendance-indicator"
                        className="absolute top-0 left-0 right-0 h-[1.5px]"
                        style={{ background: "#C9A84C" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span
                      className="block font-sans text-[10px] uppercase tracking-[0.25em] mb-1 transition-colors duration-300"
                      style={{
                        color:
                          formData.is_attending === opt.value
                            ? "#C9A84C"
                            : "rgba(237,233,226,0.3)",
                      }}
                    >
                      {opt.label}
                    </span>
                    <span
                      className="block font-sans text-[10px] transition-colors duration-300"
                      style={{
                        color:
                          formData.is_attending === opt.value
                            ? "rgba(237,233,226,0.5)"
                            : "rgba(237,233,226,0.2)",
                      }}
                    >
                      {opt.sub}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Guest count — visual stepper */}
            <AnimatePresence>
              {formData.is_attending && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <label
                    className="block font-sans text-[9px] uppercase tracking-[0.4em] mb-3"
                    style={{ color: "rgba(201,168,76,0.5)" }}
                  >
                    Jumlah Tamu
                  </label>
                  <div className="flex items-center gap-0" style={{ border: "0.5px solid rgba(201,168,76,0.15)", width: "fit-content" }}>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          total_guests: Math.max(1, formData.total_guests - 1),
                        })
                      }
                      className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                      style={{ borderRight: "0.5px solid rgba(201,168,76,0.1)", color: "rgba(201,168,76,0.6)" }}
                    >
                      <Minus size={12} />
                    </button>
                    <span
                      className="w-14 text-center font-serif font-light"
                      style={{ fontSize: "20px", color: "#EDE9E2" }}
                    >
                      {formData.total_guests}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setFormData({
                          ...formData,
                          total_guests: Math.min(5, formData.total_guests + 1),
                        })
                      }
                      className="w-11 h-11 flex items-center justify-center transition-all duration-300 hover:bg-white/5"
                      style={{ borderLeft: "0.5px solid rgba(201,168,76,0.1)", color: "rgba(201,168,76,0.6)" }}
                    >
                      <Plus size={12} />
                    </button>
                  </div>
                  <p className="font-sans text-[10px] mt-2" style={{ color: "rgba(201,168,76,0.3)" }}>
                    Maks. 5 orang
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Message */}
            <div>
              <label
                className="block font-sans text-[9px] uppercase tracking-[0.4em] mb-3"
                style={{ color: "rgba(201,168,76,0.5)" }}
              >
                Ucapan &amp; Doa
              </label>
              <textarea
                rows={4}
                required
                placeholder="Tuliskan ucapan dan doa restu Anda..."
                className="w-full px-4 py-3 font-sans text-sm resize-none transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "0.5px solid rgba(201,168,76,0.15)",
                  color: "#EDE9E2",
                  outline: "none",
                }}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="relative w-full py-4 font-sans text-[10px] uppercase tracking-[0.4em] overflow-hidden group transition-all duration-500 disabled:opacity-40"
              style={{ background: "#C9A84C", color: "#080808" }}
            >
              <span
                className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500"
                style={{ background: "rgba(0,0,0,0.1)" }}
              />
              <span className="relative font-semibold">
                {status === "submitting" ? "Mengirim..." : "Kirim Konfirmasi"}
              </span>
            </button>

            {status === "error" && (
              <p className="text-center font-sans text-xs" style={{ color: "rgba(200,80,80,0.8)" }}>
                Terjadi kesalahan. Silakan coba lagi.
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}