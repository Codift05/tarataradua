import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const anonKey = process.env.SUPABASE_ANON_KEY;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

assert(url && anonKey && serviceKey, "Supabase environment belum lengkap.");

const options = { auth: { autoRefreshToken: false, persistSession: false } };
const admin = createClient(url, serviceKey, options);
const anonymous = createClient(url, anonKey, options);
const suffix = randomUUID();
const password = `Check-${randomUUID()}-Aa1!`;
const operatorEmail = `operator-check-${suffix}@example.com`;
const outsiderEmail = `outsider-check-${suffix}@example.com`;

let operatorId;
let outsiderId;
let complaintId;
let announcementId;

try {
  const { data: operatorUser, error: operatorCreateError } = await admin.auth.admin.createUser({
    email: operatorEmail,
    password,
    email_confirm: true,
  });
  assert.ifError(operatorCreateError);
  operatorId = operatorUser.user.id;

  const { error: profileError } = await admin.from("operator_profiles").insert({
    id: operatorId,
    name: "Operator Pemeriksaan",
    role: "operator",
  });
  assert.ifError(profileError);

  const { data: complaint, error: complaintError } = await admin
    .from("complaints")
    .insert({
      ticket_number: `CHECK-${suffix.slice(0, 8).toUpperCase()}`,
      name: "Pelapor Pemeriksaan",
      whatsapp: "081234567890",
      environment: "Lingkungan Uji",
      category: "Lainnya",
      location: "Lokasi uji sementara",
      description: "Data sementara untuk pemeriksaan backend operator.",
      status: "Baru",
    })
    .select("id")
    .single();
  assert.ifError(complaintError);
  complaintId = complaint.id;

  const { data: anonymousRows } = await anonymous.from("complaints").select("id");
  assert.equal(anonymousRows?.length || 0, 0, "Anon tidak boleh membaca aspirasi.");

  const operator = createClient(url, anonKey, options);
  const { error: loginError } = await operator.auth.signInWithPassword({ email: operatorEmail, password });
  assert.ifError(loginError);

  const { data: profile, error: profileReadError } = await operator
    .from("operator_profiles")
    .select("role, active")
    .single();
  assert.ifError(profileReadError);
  assert.deepEqual(profile, { role: "operator", active: true });

  const { data: visibleComplaint, error: readError } = await operator
    .from("complaints")
    .select("id, status")
    .eq("id", complaintId)
    .single();
  assert.ifError(readError);
  assert.equal(visibleComplaint.status, "Baru");

  const { data: updatedComplaint, error: updateError } = await operator
    .from("complaints")
    .update({ status: "Diproses" })
    .eq("id", complaintId)
    .select("status")
    .single();
  assert.ifError(updateError);
  assert.equal(updatedComplaint.status, "Diproses");

  const { data: events, error: eventsError } = await operator
    .from("complaint_events")
    .select("previous_status, new_status")
    .eq("complaint_id", complaintId);
  assert.ifError(eventsError);
  assert.deepEqual(events, [{ previous_status: "Baru", new_status: "Diproses" }]);

  const { error: invalidStatusError } = await operator
    .from("complaints")
    .update({ status: "Invalid" })
    .eq("id", complaintId);
  assert(invalidStatusError, "Database harus menolak status di luar daftar.");

  const { error: privateFieldError } = await operator
    .from("complaints")
    .update({ description: "Perubahan yang tidak diizinkan." })
    .eq("id", complaintId);
  assert(privateFieldError, "Operator hanya boleh memperbarui kolom status.");

  const { data: draft, error: draftError } = await operator
    .from("announcements")
    .insert({ title: "Pengumuman uji", category: "Pengumuman", summary: "Data sementara untuk pemeriksaan konten.", status: "Draft" })
    .select("id, published_at")
    .single();
  assert.ifError(draftError);
  announcementId = draft.id;
  assert.equal(draft.published_at, null);

  const { data: hiddenDraft } = await anonymous.from("announcements").select("id").eq("id", announcementId);
  assert.equal(hiddenDraft?.length || 0, 0, "Anon tidak boleh membaca draft pengumuman.");

  const { error: publishError } = await operator.from("announcements").update({ status: "Terbit" }).eq("id", announcementId);
  assert.ifError(publishError);

  const { data: published, error: publishedError } = await anonymous
    .from("announcements")
    .select("id, published_at")
    .eq("id", announcementId)
    .single();
  assert.ifError(publishedError);
  assert(published.published_at, "Pengumuman terbit harus memiliki published_at.");

  const { error: anonymousWriteError } = await anonymous
    .from("announcements")
    .insert({ title: "Tidak sah", category: "Pengumuman", summary: "Anon tidak boleh menulis konten.", status: "Terbit" });
  assert(anonymousWriteError, "Anon tidak boleh menambah konten.");

  const { data: outsiderUser, error: outsiderCreateError } = await admin.auth.admin.createUser({
    email: outsiderEmail,
    password,
    email_confirm: true,
  });
  assert.ifError(outsiderCreateError);
  outsiderId = outsiderUser.user.id;

  const outsider = createClient(url, anonKey, options);
  const { error: outsiderLoginError } = await outsider.auth.signInWithPassword({ email: outsiderEmail, password });
  assert.ifError(outsiderLoginError);
  const { data: outsiderRows, error: outsiderReadError } = await outsider.from("complaints").select("id");
  assert.ifError(outsiderReadError);
  assert.equal(outsiderRows.length, 0, "Akun tanpa profil operator tidak boleh membaca aspirasi.");
  const { error: outsiderWriteError } = await outsider
    .from("services")
    .insert({ name: "Layanan tidak sah", description: "Akun non-operator tidak boleh menulis." });
  assert(outsiderWriteError, "Akun tanpa profil operator tidak boleh menambah konten.");

  console.log("Operator integration: login, RLS, status update, audit log, and content publishing passed.");
} finally {
  if (announcementId) await admin.from("announcements").delete().eq("id", announcementId);
  if (complaintId) await admin.from("complaints").delete().eq("id", complaintId);
  if (operatorId) await admin.auth.admin.deleteUser(operatorId);
  if (outsiderId) await admin.auth.admin.deleteUser(outsiderId);
}
