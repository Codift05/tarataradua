import { redirect } from "next/navigation";
import { cache } from "react";
import { createClient } from "@/lib/supabase/server";

export type Operator = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator";
};

// Wrapped in cache() so the layout and the page share one lookup per request.
// getClaims() verifies the ES256 session JWT locally against cached signing keys, avoiding an
// Auth server round trip (about 350 ms from Indonesia) on every operator page.
export const getOperator = cache(async (): Promise<Operator | null> => {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;
  const user = claims?.sub && typeof claims.email === "string" ? { id: claims.sub, email: claims.email } : null;

  if (!user) return null;

  const { data: profile } = await supabase
    .from("operator_profiles")
    .select("id, name, role, active")
    .eq("id", user.id)
    .eq("active", true)
    .maybeSingle();

  if (!profile || (profile.role !== "admin" && profile.role !== "operator")) return null;

  return {
    id: user.id,
    email: user.email,
    name: profile.name,
    role: profile.role,
  };
});

export async function requireOperator() {
  const operator = await getOperator();
  if (!operator) redirect("/operator/login");
  return operator;
}
