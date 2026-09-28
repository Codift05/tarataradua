import { createClient } from "@supabase/supabase-js";
import { unstable_cache } from "next/cache";

// Public reads are cached per query under one tag. Operator saves call updateTag(PUBLIC_CONTENT_TAG),
// so every public page sees the change on its next render. The Supabase fetch itself is not cached,
// otherwise Next's fetch cache could hand back pre-save rows after the tag was expired.
export const PUBLIC_CONTENT_TAG = "public-content";
const PUBLIC_CACHE_SECONDS = 3600;

const uncachedFetch = (input, init) => fetch(input, { ...init, cache: "no-store" });

function cachedQuery(name, build) {
  const load = unstable_cache(
    async () => {
      const url = process.env.SUPABASE_URL;
      const key = process.env.SUPABASE_ANON_KEY;
      if (!url || !key) return null;

      const supabase = createClient(url, key, {
        auth: { persistSession: false, autoRefreshToken: false },
        global: { fetch: uncachedFetch },
      });
      const { data, error } = await build(supabase);
      // Throwing keeps failures out of the cache, so a brief outage is not remembered for an hour.
      if (error) throw error;
      return data;
    },
    ["public-content", name],
    { tags: [PUBLIC_CONTENT_TAG], revalidate: PUBLIC_CACHE_SECONDS },
  );

  return async () => {
    try {
      return await load();
    } catch (error) {
      console.warn("Public content unavailable, using sample data", error?.code || error?.message);
      return null;
    }
  };
}

const latestAnnouncements = cachedQuery("announcements", (db) =>
  db.from("announcements").select("id, title, category, summary, event_date, published_at").eq("status", "Terbit").order("published_at", { ascending: false }).limit(3));

const activeServices = cachedQuery("services", (db) =>
  db.from("services").select("id, name, description, requirements, steps, duration, fee").eq("active", true).order("sort_order").order("name"));

const latestBusinesses = cachedQuery("businesses-latest", (db) =>
  db.from("businesses").select("id, name, category, product, description, whatsapp").eq("active", true).order("created_at", { ascending: false }).limit(6));

const allBusinesses = cachedQuery("businesses-all", (db) =>
  db.from("businesses").select("id, name, category, product, description, whatsapp").eq("active", true).order("created_at", { ascending: false }).limit(100));

const activeOfficials = cachedQuery("officials", (db) =>
  db.from("officials").select("name, position, lingkungan").eq("active", true).order("sort_order"));

// Returns null for a section when Supabase is unreachable so the page can keep its sample content.
export async function getPublicContent() {
  const [announcements, services, businesses] = await Promise.all([latestAnnouncements(), activeServices(), latestBusinesses()]);
  return { announcements, services, businesses };
}

export const getOfficials = () => activeOfficials();

export async function getActiveBusinesses() {
  return (await allBusinesses()) || [];
}
