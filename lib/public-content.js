import { createClient } from "@supabase/supabase-js";

async function query(build) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  try {
    const supabase = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data, error } = await build(supabase);
    if (error) throw error;
    return data;
  } catch (error) {
    console.warn("Public content unavailable, using sample data", error?.code || error?.message);
    return null;
  }
}

// Returns null for a section when Supabase is unreachable so the page can keep its sample content.
export async function getPublicContent() {
  const [announcements, services, businesses] = await Promise.all([
    query((db) => db.from("announcements").select("id, title, category, summary, event_date, published_at").eq("status", "Terbit").order("published_at", { ascending: false }).limit(3)),
    query((db) => db.from("services").select("id, name, description, requirements, steps, duration, fee").eq("active", true).order("sort_order").order("name")),
    query((db) => db.from("businesses").select("id, name, category, product, description, whatsapp").eq("active", true).order("created_at", { ascending: false }).limit(6)),
  ]);

  return { announcements, services, businesses };
}

export async function getActiveBusinesses() {
  return (await query((db) => db.from("businesses").select("id, name, category, product, description, whatsapp").eq("active", true).order("created_at", { ascending: false }).limit(100))) || [];
}
