"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireOperator } from "@/lib/operator";
import { createClient } from "@/lib/supabase/server";

const statuses = new Set(["Baru", "Diproses", "Selesai"]);

export async function updateComplaintStatus(formData: FormData) {
  await requireOperator();
  const id = Number(formData.get("id"));
  const status = String(formData.get("status") || "");

  if (!Number.isInteger(id) || id < 1 || !statuses.has(status)) redirect("/operator/aspirasi?error=invalid");

  const supabase = await createClient();
  const { error } = await supabase.from("complaints").update({ status }).eq("id", id).select("id").single();

  if (error) redirect(`/operator/aspirasi/${id}?error=update`);

  revalidatePath("/operator/aspirasi");
  revalidatePath(`/operator/aspirasi/${id}`);
  redirect(`/operator/aspirasi/${id}?updated=1`);
}
