"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Plus, Trash2, X, Copy, Check } from "lucide-react";

const SITE_URL = "https://wedding-invitation-app-nine.vercel.app";

interface Guest {
  id: string;
  name: string;
  slug: string;
  created_at: string;
}

interface RSVP {
  id: number;
  name: string;
  is_attending: boolean;
  total_guests: number;
  guest_id: string | null;
  created_at: string;
}

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

type Tab = "guests" | "rsvp" | "wishes";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<Tab>("rsvp");
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(false);

  // --- Guest form state ---
  const [showAddGuest, setShowAddGuest] = useState(false);
  const [newGuest, setNewGuest] = useState({ name: "", slug: "" });
  const [addingGuest, setAddingGuest] = useState(false);
  const [guestError, setGuestError] = useState("");
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const copyGuestUrl = (slug: string) => {
    navigator.clipboard.writeText(`${SITE_URL}/?to=${slug}`);
    setCopiedSlug(slug);
    setTimeout(() => setCopiedSlug(null), 2000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin123") {
      setIsAuthenticated(true);
    } else {
      alert("Password salah!");
    }
  };

  const fetchData = async () => {
    setLoading(true);
    const supabase = createClient();

    const [guestRes, rsvpRes, wishRes] = await Promise.all([
      supabase.from("guests").select("*").order("created_at", { ascending: false }),
      supabase.from("rsvp").select("*").order("created_at", { ascending: false }),
      supabase.from("wishes").select("*").order("created_at", { ascending: false }),
    ]);

    if (guestRes.data) setGuests(guestRes.data);
    if (rsvpRes.data) setRsvps(rsvpRes.data);
    if (wishRes.data) setWishes(wishRes.data);
    setLoading(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;
    fetchData();
  }, [isAuthenticated]);

  // --- Auto-generate slug from name ---
  const handleNameChange = (name: string) => {
    setNewGuest({
      name,
      slug: name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
    });
  };

  // --- Add Guest ---
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newGuest.name.trim() || !newGuest.slug.trim()) return;

    setAddingGuest(true);
    setGuestError("");
    const supabase = createClient();

    const { error } = await supabase
      .from("guests")
      .insert([{ name: newGuest.name, slug: newGuest.slug }]);

    if (error) {
      setGuestError(
        error.message.includes("duplicate")
          ? "Slug sudah digunakan! Gunakan slug yang berbeda."
          : error.message
      );
      setAddingGuest(false);
      return;
    }

    setNewGuest({ name: "", slug: "" });
    setShowAddGuest(false);
    setAddingGuest(false);
    await fetchData();
  };

  // --- Delete Guest ---
  const handleDeleteGuest = async (id: string) => {
    if (!confirm("Yakin ingin menghapus tamu ini?")) return;
    const supabase = createClient();
    await supabase.from("guests").delete().eq("id", id);
    await fetchData();
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center px-6">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm bg-card-dark border border-border-dark p-10"
        >
          <h1 className="text-2xl font-serif text-text-light mb-2 font-light text-center">
            Admin
          </h1>
          <p className="text-text-muted text-xs text-center mb-8 font-sans">
            Masukkan password untuk melanjutkan
          </p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors mb-4"
          />
          <button
            type="submit"
            className="w-full py-3 bg-gold text-primary font-sans font-semibold uppercase tracking-[0.3em] text-[10px] hover:bg-gold-dark transition-all"
          >
            Masuk
          </button>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD ---
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "rsvp", label: "RSVP", count: rsvps.length },
    { key: "guests", label: "Tamu", count: guests.length },
    { key: "wishes", label: "Ucapan", count: wishes.length },
  ];

  const attending = rsvps.filter((r) => r.is_attending).length;
  const totalGuests = rsvps
    .filter((r) => r.is_attending)
    .reduce((sum, r) => sum + r.total_guests, 0);

  return (
    <div className="min-h-screen bg-primary text-text-light">
      {/* Header */}
      <header className="border-b border-border-dark px-6 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-serif font-light">Admin Dashboard</h1>
            <p className="text-text-muted text-xs font-sans mt-1">
              Romeo & Juliet — 31 Des 2026
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="text-xs text-text-muted hover:text-gold transition-colors font-sans uppercase tracking-wider"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <div className="bg-card-dark border border-border-dark p-6 text-center">
            <p className="text-3xl font-serif text-gold">{rsvps.length}</p>
            <p className="text-[10px] text-text-muted font-sans uppercase tracking-wider mt-2">
              Total RSVP
            </p>
          </div>
          <div className="bg-card-dark border border-border-dark p-6 text-center">
            <p className="text-3xl font-serif text-gold">{attending}</p>
            <p className="text-[10px] text-text-muted font-sans uppercase tracking-wider mt-2">
              Hadir
            </p>
          </div>
          <div className="bg-card-dark border border-border-dark p-6 text-center">
            <p className="text-3xl font-serif text-gold">{totalGuests}</p>
            <p className="text-[10px] text-text-muted font-sans uppercase tracking-wider mt-2">
              Total Tamu
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-border-dark mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-6 py-3 text-[10px] font-sans uppercase tracking-[0.2em] font-medium transition-colors border-b-2 ${
                activeTab === tab.key
                  ? "text-gold border-gold"
                  : "text-text-muted border-transparent hover:text-text-light"
              }`}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-text-muted text-sm text-center py-10 font-sans">
            Memuat data...
          </p>
        )}

        {/* ======= RSVP TAB ======= */}
        {activeTab === "rsvp" && !loading && (
          <div className="overflow-x-auto">
            {rsvps.length === 0 ? (
              <p className="text-text-muted/50 text-sm text-center py-12 font-sans italic">
                Belum ada data RSVP.
              </p>
            ) : (
              <table className="w-full text-sm font-sans">
                <thead>
                  <tr className="text-left text-[10px] text-text-muted uppercase tracking-wider border-b border-border-dark">
                    <th className="py-3 pr-4">Nama</th>
                    <th className="py-3 pr-4">Status</th>
                    <th className="py-3 pr-4">Jumlah</th>
                    <th className="py-3">Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {rsvps.map((r) => (
                    <tr
                      key={r.id}
                      className="border-b border-border-dark/50"
                    >
                      <td className="py-3 pr-4 text-text-light">{r.name}</td>
                      <td className="py-3 pr-4">
                        <span
                          className={`text-[10px] px-3 py-1 ${
                            r.is_attending
                              ? "bg-green-900/30 text-green-400"
                              : "bg-red-900/30 text-red-400"
                          }`}
                        >
                          {r.is_attending ? "Hadir" : "Tidak"}
                        </span>
                      </td>
                      <td className="py-3 pr-4 text-text-muted">
                        {r.total_guests}
                      </td>
                      <td className="py-3 text-text-muted text-xs">
                        {new Date(r.created_at).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* ======= GUESTS TAB (with Add Guest) ======= */}
        {activeTab === "guests" && !loading && (
          <div>
            {/* Add Guest Button / Form */}
            {!showAddGuest ? (
              <button
                onClick={() => setShowAddGuest(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-gold text-primary font-sans font-semibold uppercase tracking-[0.2em] text-[10px] hover:bg-gold-dark transition-all mb-6"
              >
                <Plus size={14} />
                Tambah Tamu
              </button>
            ) : (
              <form
                onSubmit={handleAddGuest}
                className="bg-card-dark border border-border-dark p-6 mb-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-sans font-medium text-text-light">
                    Tambah Tamu Baru
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddGuest(false);
                      setGuestError("");
                    }}
                    className="text-text-muted hover:text-text-light"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gold/60 font-sans font-medium mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Romeo Montague"
                      value={newGuest.name}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full p-2.5 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.2em] text-gold/60 font-sans font-medium mb-1.5">
                      Slug (untuk URL)
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="romeo-montague"
                      value={newGuest.slug}
                      onChange={(e) =>
                        setNewGuest({ ...newGuest, slug: e.target.value })
                      }
                      className="w-full p-2.5 bg-primary border border-border-dark text-text-light font-sans text-sm outline-none focus:border-gold/40 transition-colors font-mono"
                    />
                  </div>
                </div>

                {/* Preview URL */}
                <p className="text-[10px] text-text-muted font-sans mb-4">
                  URL undangan:{" "}
                  <span className="text-gold font-mono break-all">
                    {SITE_URL}/?to={newGuest.slug || "..."}
                  </span>
                </p>

                {guestError && (
                  <p className="text-red-400 text-xs mb-3 font-sans">
                    {guestError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={addingGuest}
                  className="px-6 py-2.5 bg-gold text-primary font-sans font-semibold uppercase tracking-[0.2em] text-[10px] hover:bg-gold-dark transition-all disabled:opacity-40"
                >
                  {addingGuest ? "Menyimpan..." : "Simpan Tamu"}
                </button>
              </form>
            )}

            {/* Guest Table */}
            {guests.length === 0 ? (
              <p className="text-text-muted/50 text-sm text-center py-12 font-sans italic">
                Belum ada data tamu. Klik &quot;Tambah Tamu&quot; untuk memulai.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="text-left text-[10px] text-text-muted uppercase tracking-wider border-b border-border-dark">
                      <th className="py-3 pr-4">Nama</th>
                      <th className="py-3 pr-4">Slug</th>
                      <th className="py-3 pr-4">URL</th>
                      <th className="py-3 w-10"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {guests.map((g) => (
                      <tr
                        key={g.id}
                        className="border-b border-border-dark/50 group"
                      >
                        <td className="py-3 pr-4 text-text-light">
                          {g.name}
                        </td>
                        <td className="py-3 pr-4 text-gold font-mono text-xs">
                          {g.slug}
                        </td>
                        <td className="py-3 pr-4">
                          <div className="flex items-start sm:items-center gap-3">
                            <div className="bg-black/20 border border-white/5 px-2.5 py-1.5 rounded min-w-[200px] max-w-[250px] sm:max-w-none">
                              <span className="text-gold/90 text-xs font-mono break-all">
                                {SITE_URL}/?to={g.slug}
                              </span>
                            </div>
                            <button
                              onClick={() => copyGuestUrl(g.slug)}
                              className="text-text-muted/40 hover:text-gold transition-colors flex-shrink-0"
                              title="Copy URL"
                            >
                              {copiedSlug === g.slug ? (
                                <Check size={12} className="text-green-400" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>
                          </div>
                        </td>
                        <td className="py-3">
                          <button
                            onClick={() => handleDeleteGuest(g.id)}
                            className="text-text-muted/30 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
                            title="Hapus tamu"
                          >
                            <Trash2 size={14} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ======= WISHES TAB ======= */}
        {activeTab === "wishes" && !loading && (
          <div className="space-y-3">
            {wishes.length === 0 ? (
              <p className="text-text-muted/50 text-sm text-center py-12 font-sans italic">
                Belum ada ucapan.
              </p>
            ) : (
              wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-5 bg-card-dark border border-border-dark"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-text-light font-medium text-sm">
                      {w.name}
                    </span>
                    <span className="text-text-muted text-[10px]">
                      {new Date(w.created_at).toLocaleDateString("id-ID")}
                    </span>
                  </div>
                  <p className="text-text-muted text-sm leading-relaxed">
                    {w.message}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}
