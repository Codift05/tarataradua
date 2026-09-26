import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type Operator = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "operator";
};

export async function getOperator(): Promise<Operator | null> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user?.email) return null;

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
}

export async function requireOperator() {
  const operator = await getOperator();
  if (!operator) redirect("/operator/login");
  return operator;
}
