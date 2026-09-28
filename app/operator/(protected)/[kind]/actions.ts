"use server";

import { revalidatePath, updateTag } from "next/cache";
import { PUBLIC_CONTENT_TAG } from "@/lib/public-content";
import { potentials } from "@/lib/potentials";
import { redirect } from "next/navigation";
import { getContentType, validateContent } from "@/lib/content";
import { requireOperator } from "@/lib/operator";
import { createClient } from "@/lib/supabase/server";

// Every public page that renders operator-managed content. Keep /potensi/[slug] without
// `dynamicParams = false`: with it, Next 16 ignored revalidatePath for those prerendered pages.
const publicPaths = ["/", "/profil", ...potentials.map((potential) => `/potensi/${potential.slug}`)];

function refreshPublicPages() {
  updateTag(PUBLIC_CONTENT_TAG);
  publicPaths.forEach((path) => revalidatePath(path));
}

export type ContentFormState = { errors: Record<string, string>; message?: string } | null;

function parseId(value: FormDataEntryValue | null) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function saveContent(_: ContentFormState, formData: FormData): Promise<ContentFormState> {
  await requireOperator();
  const kind = String(formData.get("kind") || "");
  const type = getContentType(kind);
  if (!type) return { errors: {}, message: "Jenis konten tidak dikenal." };

  const id = parseId(formData.get("id"));
  const result = validateContent(type, formData);
  if (!result.success) return { errors: result.errors, message: "Periksa kembali isian yang ditandai." };

  const supabase = await createClient();
  const { error } = id
    ? await supabase.from(type.table).update(result.value).eq("id", id).select("id").single()
    : await supabase.from(type.table).insert(result.value).select("id").single();

  if (error) {
    console.error("Content save failed", type.table, error.code);
    return { errors: {}, message: "Data belum dapat disimpan. Coba lagi." };
  }

  refreshPublicPages();
  revalidatePath(`/operator/${kind}`);
  redirect(`/operator/${kind}?saved=1`);
}

export async function deleteContent(formData: FormData) {
  await requireOperator();
  const kind = String(formData.get("kind") || "");
  const type = getContentType(kind);
  const id = parseId(formData.get("id"));
  if (!type || !id) redirect("/operator");

  const supabase = await createClient();
  const { error } = await supabase.from(type.table).delete().eq("id", id).select("id").single();
  if (error) redirect(`/operator/${kind}/${id}?error=delete`);

  refreshPublicPages();
  revalidatePath(`/operator/${kind}`);
  redirect(`/operator/${kind}?deleted=1`);
}
