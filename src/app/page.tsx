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

/**
 * Fetch guest data from Supabase based on URL slug
 */
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

    if (error) {
      console.warn("Slug tidak terdaftar:", slug);
      return null;
    }
    return data;
  } catch (err) {
    console.error("Database error:", err);
    return null;
  }
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const sParams = await searchParams;
  const slug = sParams.to;
  const guestData = await getGuestData(slug);

  // Jika slug diberikan tapi TIDAK ditemukan di database → tolak
  if (slug && !guestData) {
    return (
      <main className="min-h-screen bg-primary flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-sm">
          <div className="w-14 h-14 border border-gold/20 flex items-center justify-center mx-auto mb-8 rotate-45">
            <span className="text-gold text-lg -rotate-45 font-serif">?</span>
          </div>
          <h1 className="text-3xl font-serif text-text-light mb-4 font-light">
            Undangan Tidak Ditemukan
          </h1>
          <p className="text-text-muted text-sm font-sans leading-relaxed">
            Maaf, undangan untuk{" "}
            <span className="text-gold italic">&ldquo;{slug}&rdquo;</span>{" "}
            tidak terdaftar. Pastikan Anda menggunakan link undangan yang benar.
          </p>
          <div className="mt-10 w-12 h-[0.5px] bg-gold/20 mx-auto" />
          <p className="mt-6 text-text-muted/40 text-[10px] font-sans tracking-[0.3em] uppercase">
            Romeo & Juliet — 31.12.2026
          </p>
        </div>
      </main>
    );
  }

  const displayName = guestData?.name || "Tamu Undangan";

  return (
    <InvitationWrapper guestName={displayName}>
      <main className="bg-surface overflow-x-hidden">
        {/* === SECTION 1: GREETING + QUOTE (DARK) === */}
        <Hero />

        {/* === SECTION 2: COUNTDOWN (DARK) === */}
        <Countdown targetDate="2026-12-31T09:00:00" />

        {/* === SECTION 3: COUPLE PROFILE (LIGHT) === */}
        <section id="couple">
          <Couple />
        </section>

        {/* === SECTION 4: LOVE STORY TIMELINE (DARK) === */}
        <section id="story">
          <LoveStory />
        </section>

        {/* === SECTION 5: EVENT DETAILS (LIGHT) === */}
        <section id="event">
          <EventSection />
        </section>

        {/* === SECTION 6: GALLERY (DARK) === */}
        <section id="gallery">
          <Gallery />
        </section>

        {/* === SECTION 7: WEDDING GIFT (LIGHT) === */}
        <section id="gift">
          <WeddingGift />
        </section>

        {/* === SECTION 8: RSVP + WISHES (DARK) === */}
        <section id="rsvp">
          <RSVPForm
            defaultName={displayName === "Tamu Undangan" ? "" : displayName}
            guestId={guestData?.id || null}
          />
          <WishesList />
        </section>

        {/* === FOOTER (DARK) === */}
        <footer className="py-20 bg-primary text-center border-t border-border-dark">
          <div className="max-w-xs mx-auto px-4">
            {/* Couple Names */}
            <h4 className="font-serif text-text-light text-4xl mb-2 font-light">
              Romeo{" "}
              <span className="text-gold italic text-2xl">&</span>{" "}
              Juliet
            </h4>
            <p className="text-[9px] text-text-muted/40 tracking-[0.4em] uppercase mb-10 font-sans">
              Mengarungi Bahtera Bersama
            </p>

            {/* Date */}
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="h-[0.5px] w-12 bg-gold/20" />
              <span className="text-gold/50 text-[10px] font-sans font-medium tracking-[0.3em]">
                31 . 12 . 2026
              </span>
              <div className="h-[0.5px] w-12 bg-gold/20" />
            </div>

            {/* Thank You */}
            <p className="text-text-muted/30 text-sm font-serif italic mb-10">
              Segala kemuliaan bagi Tuhan atas berkat dan kasih-Nya.
              <br />
              Merupakan sukacita bagi kami apabila Anda berkenan hadir.
            </p>

            {/* Credit */}
            <div className="pt-8 border-t border-border-dark">
              <p className="text-[8px] text-text-muted/20 uppercase tracking-[0.2em] font-sans">
                Made with ♡ by
              </p>
              <p className="text-[9px] text-text-muted/30 font-sans font-medium tracking-wider mt-1">
                Carlos Michael Marpaung
              </p>
            </div>
          </div>
        </footer>
      </main>
    </InvitationWrapper>
  );
}