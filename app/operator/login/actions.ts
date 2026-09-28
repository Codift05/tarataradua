"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { toLoginEmail } from "@/lib/login-id";
import { createClient } from "@/lib/supabase/server";

export type LoginState = { error: string } | null;

const WINDOW_MS = 15 * 60 * 1000;
const MAX_FAILURES = 5;
const globalStore = globalThis as typeof globalThis & { loginFailures?: Map<string, { count: number; resetAt: number }> };
const failures = globalStore.loginFailures ?? new Map<string, { count: number; resetAt: number }>();
globalStore.loginFailures = failures;

// Per-instance throttle on top of Supabase Auth's own limits; enough to slow casual guessing.
function isBlocked(ip: string) {
  const entry = failures.get(ip);
  if (!entry || entry.resetAt < Date.now()) return false;
  return entry.count >= MAX_FAILURES;
}

function recordFailure(ip: string) {
  const now = Date.now();
  const entry = failures.get(ip);
  if (!entry || entry.resetAt < now) failures.set(ip, { count: 1, resetAt: now + WINDOW_MS });
  else entry.count += 1;
}

export async function login(_: LoginState, formData: FormData): Promise<LoginState> {
  const ip = (await headers()).get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isBlocked(ip)) return { error: "Terlalu banyak percobaan. Coba lagi dalam 15 menit." };

  const email = toLoginEmail(String(formData.get("email") || ""));
  const password = String(formData.get("password") || "");

  if (!email || password.length < 8) {
    return { error: "Masukkan username atau email dan password yang valid." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    recordFailure(ip);
    return { error: "Username atau password tidak sesuai." };
  }

  const { data: profile } = await supabase
    .from("operator_profiles")
    .select("active")
    .eq("id", data.user.id)
    .eq("active", true)
    .maybeSingle();

  if (!profile) {
    recordFailure(ip);
    await supabase.auth.signOut();
    return { error: "Akun ini tidak memiliki akses operator aktif." };
  }

  failures.delete(ip);
  redirect("/operator/aspirasi");
}
