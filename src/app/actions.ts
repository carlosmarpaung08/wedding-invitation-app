"use server";

import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function submitRSVP(formData: {
  name: string;
  is_attending: boolean;
  total_guests: number;
  message: string;
  guest_id?: string | null;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Simpan ucapan ke tabel Wishes
  if (formData.message.trim()) {
    const { error: wishError } = await supabase
      .from("wishes")
      .insert([{ name: formData.name, message: formData.message }]);

    if (wishError) throw new Error(wishError.message);
  }

  // 2. Simpan ke tabel RSVP (dengan guest_id jika tersedia)
  const rsvpPayload: {
    name: string;
    is_attending: boolean;
    total_guests: number;
    guest_id?: string;
  } = {
    name: formData.name,
    is_attending: formData.is_attending,
    total_guests: formData.total_guests,
  };

  if (formData.guest_id) {
    rsvpPayload.guest_id = formData.guest_id;
  }

  const { error: rsvpError } = await supabase
    .from("rsvp")
    .insert([rsvpPayload]);

  if (rsvpError) throw new Error(rsvpError.message);

  return { success: true };
}