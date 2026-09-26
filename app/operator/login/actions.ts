"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string } | null;

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const email = String(formData.get("email") || "").trim().toLowerCase();
  const password = String(formData.get("password") || "");

  if (!/^\S+@\S+\.\S+$/.test(email) || password.length < 8) {
    return { error: "Masukkan email dan password yang valid." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) return { error: "Email atau password tidak sesuai." };

  const { data: profile } = await supabase
    .from("operator_profiles")
    .select("active")
    .eq("id", data.user.id)
    .eq("active", true)
    .maybeSingle();

  if (!profile) {
    await supabase.auth.signOut();
    return { error: "Akun ini tidak memiliki akses operator aktif." };
  }

  redirect("/operator/aspirasi");
}
