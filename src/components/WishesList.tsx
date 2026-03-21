"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import Ornament from "./Ornament";

interface Wish {
  id: number;
  name: string;
  message: string;
  created_at: string;
}

export default function WishesList() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const fetchWishes = async () => {
      const { data } = await supabase
        .from("wishes")
        .select("*")
        .order("created_at", { ascending: false });
      if (data) setWishes(data);
    };

    fetchWishes();

    const channel = supabase
      .channel("schema-db-changes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "wishes" },
        (payload) => {
          setWishes((prev) => [payload.new as Wish, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase]);

  return (
    <div className="py-16 bg-primary px-6">
      <div className="max-w-2xl mx-auto">
        <Ornament light />

        <h3 className="text-center text-xl font-serif text-text-light mb-8 font-light">
          Doa & Ucapan{" "}
          <span className="text-text-muted text-sm">({wishes.length})</span>
        </h3>

        <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 wishes-scroll">
          <AnimatePresence>
            {wishes.map((wish) => (
              <motion.div
                key={wish.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-5 bg-card-dark border border-border-dark"
              >
                <div className="flex items-center gap-3 mb-2">
                  {/* Avatar */}
                  <div className="w-8 h-8 bg-gold/10 flex items-center justify-center text-gold text-xs font-serif">
                    {wish.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-sans font-semibold text-text-light text-sm">
                      {wish.name}
                    </h4>
                    <p className="text-[10px] text-text-muted/50 font-sans">
                      {new Date(wish.created_at).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
                <p className="text-text-muted text-sm font-sans leading-relaxed ml-11">
                  {wish.message}
                </p>
              </motion.div>
            ))}
          </AnimatePresence>

          {wishes.length === 0 && (
            <p className="text-center text-text-muted/40 text-sm font-sans py-8 italic">
              Belum ada ucapan. Jadilah yang pertama!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}