import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import InvitationWrapper from "@/components/InvitationWrapper";
import Hero from "@/components/Hero";
import Countdown from "@/components/Countdown";
import Couple from "@/components/Couple";
import LoveStory from "@/components/LoveStory";
import EventSection from "@/components/EventSection";
import Gallery from "@/components/Gallery";
import WeddingGift from "@/components/WeddingGift";
import RSVPForm from "@/components/RSVPForm";
import WishesList from "@/components/WishesList";

async function getGuestData(slug: string | string[] | undefined) {
  if (!slug || typeof slug !== "string") return null;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  try {
    const { data, error } = await supabase
      .from("guests")
      .select("id, name")
      .eq("slug", slug)
      .single();
    if (error) return null;
    return data;
  } catch {
    return null;
  }
}

/* ============================================================
   SECTION DIVIDER — subtle animated connector between sections
   ============================================================ */
function SectionDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      className="relative flex flex-col items-center py-0 overflow-hidden"
      style={{ height: "60px", background: light ? "#F8F5F0" : "#080808" }}
    >
      <div
        className="absolute top-0 left-0 right-0 bottom-0"
        style={{
          background: light
            ? "linear-gradient(to bottom, #080808, #F8F5F0)"
            : "linear-gradient(to bottom, #F8F5F0, #080808)",
        }}
      />
      <div
        className="relative z-10 w-[0.5px] h-full mx-auto"
        style={{
          background: light
            ? "linear-gradient(to bottom, rgba(201,168,76,0.25), rgba(201,168,76,0.08))"
            : "linear-gradient(to bottom, rgba(201,168,76,0.08), rgba(201,168,76,0.25))",
        }}
      />
    </div>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;
  const slug = sParams.to;
  const guestData = await getGuestData(slug);

  if (slug && !guestData) {
    return (
      <main
        className="min-h-screen flex flex-col items-center justify-center text-center px-6"
        style={{ background: "#080808" }}
      >
        <div className="max-w-sm">
          <div
            className="w-14 h-14 flex items-center justify-center mx-auto mb-8 rotate-45"
            style={{ border: "0.5px solid rgba(201,168,76,0.2)" }}
          >
            <span
              className="text-lg -rotate-45 font-serif"
              style={{ color: "rgba(201,168,76,0.6)" }}
            >
              ?
            </span>
          </div>
          <h1
            className="font-serif font-light mb-4"
            style={{ fontSize: "28px", color: "#EDE9E2" }}
          >
            Undangan Tidak Ditemukan
          </h1>
          <p className="font-sans text-sm leading-relaxed" style={{ color: "rgba(237,233,226,0.4)" }}>
            Maaf, undangan untuk{" "}
            <span className="italic" style={{ color: "rgba(201,168,76,0.7)" }}>
              &ldquo;{slug}&rdquo;
            </span>{" "}
            tidak terdaftar.
          </p>
          <div className="mt-10 w-12 h-[0.5px] mx-auto" style={{ background: "rgba(201,168,76,0.15)" }} />
          <p
            className="mt-6 font-sans text-[9px] uppercase tracking-[0.4em]"
            style={{ color: "rgba(201,168,76,0.25)" }}
          >
            Romeo &amp; Juliet — 31.12.2026
          </p>
        </div>
      </main>
    );
  }

  const displayName = guestData?.name || "Tamu Undangan";

  return (
    <InvitationWrapper guestName={displayName}>
      <main style={{ background: "#080808" }} className="overflow-x-hidden">

        {/* SECTION 1 — Hero (dark) */}
        <Hero />

        {/* SECTION 2 — Countdown (dark) */}
        <Countdown targetDate="2026-12-31T09:00:00" />

        {/* TRANSITION: dark → light */}
        <SectionDivider light />

        {/* SECTION 3 — Couple (light) */}
        <section id="couple">
          <Couple />
        </section>

        {/* TRANSITION: light → dark */}
        <SectionDivider />

        {/* SECTION 4 — Love Story (dark) */}
        <section id="story">
          <LoveStory />
        </section>

        {/* TRANSITION: dark → light */}
        <SectionDivider light />

        {/* SECTION 5 — Event (light) */}
        <section id="event">
          <EventSection />
        </section>

        {/* TRANSITION: light → dark */}
        <SectionDivider />

        {/* SECTION 6 — Gallery (dark) */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* TRANSITION: dark → light */}
        <SectionDivider light />

        {/* SECTION 7 — Gift (light) */}
        <section id="gift">
          <WeddingGift />
        </section>

        {/* TRANSITION: light → dark */}
        <SectionDivider />

        {/* SECTION 8 — RSVP + Wishes (dark) */}
        <section id="rsvp">
          <RSVPForm
            defaultName={displayName === "Tamu Undangan" ? "" : displayName}
            guestId={guestData?.id || null}
          />
          <WishesList />
        </section>

        {/* ===== PREMIUM FOOTER ===== */}
        <footer
          className="relative overflow-hidden grain"
          style={{ background: "#050505", borderTop: "0.5px solid rgba(201,168,76,0.08)" }}
        >
          {/* Ambient glow */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 80% at 50% 100%, rgba(201,168,76,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-sm mx-auto px-8 py-20 text-center">
            {/* Cross */}
            <div className="flex justify-center mb-8">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                style={{ fill: "rgba(201,168,76,0.3)" }}
              >
                <path d="M9 0h2v8h8v2H11v8H9v-8H1V8h8z" />
              </svg>
            </div>

            {/* Names */}
            <h4
              className="font-serif font-light mb-2 shimmer-gold"
              style={{ fontSize: "clamp(32px, 8vw, 48px)" }}
            >
              Romeo
            </h4>
            <span
              className="font-serif italic block mb-2"
              style={{ color: "rgba(201,168,76,0.5)", fontSize: "20px" }}
            >
              &amp;
            </span>
            <h4
              className="font-serif font-light mb-8 shimmer-gold"
              style={{ fontSize: "clamp(32px, 8vw, 48px)" }}
            >
              Juliet
            </h4>

            {/* Tagline */}
            <p
              className="font-sans uppercase text-[9px] tracking-[0.5em] mb-10"
              style={{ color: "rgba(201,168,76,0.3)" }}
            >
              Mengarungi Bahtera Bersama
            </p>

            {/* Date with ornament */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.15)" }} />
              <span
                className="font-sans text-[10px] tracking-[0.4em]"
                style={{ color: "rgba(201,168,76,0.4)" }}
              >
                31 . 12 . 2026
              </span>
              <div className="h-[0.5px] w-10" style={{ background: "rgba(201,168,76,0.15)" }} />
            </div>

            {/* Quote */}
            <p
              className="font-serif italic text-sm leading-relaxed mb-10"
              style={{ color: "rgba(237,233,226,0.35)" }}
            >
              &ldquo;Segala kemuliaan bagi Tuhan atas berkat dan kasih-Nya.
              <br />
              Merupakan sukacita bagi kami apabila Anda berkenan hadir.&rdquo;
            </p>

            {/* Divider */}
            <div
              className="h-[0.5px] w-full mb-8"
              style={{ background: "rgba(201,168,76,0.08)" }}
            />

            {/* Credit */}
            <p
              className="font-sans text-[8px] uppercase tracking-[0.3em] mb-1"
              style={{ color: "rgba(201,168,76,0.2)" }}
            >
              Made with ♡ by
            </p>
            <p
              className="font-sans text-[9px] tracking-wider"
              style={{ color: "rgba(201,168,76,0.3)" }}
            >
              Carlos Michael Marpaung
            </p>
          </div>
        </footer>
      </main>
    </InvitationWrapper>
  );
}