// Create (or reactivate) an operator account.
// Usage: node --env-file=.env.local scripts/create-operator.mjs <username|email> "<Nama>" [admin|operator]
// The password is read from OPERATOR_PASSWORD or generated and printed once.
import { randomBytes } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { toLoginEmail } from "../lib/login-id.js";

const [identifier, name, role = "admin"] = process.argv.slice(2);
const email = toLoginEmail(identifier);
if (!email || !name || !["admin", "operator"].includes(role)) {
  console.error('Pemakaian: node --env-file=.env.local scripts/create-operator.mjs <username|email> "<Nama>" [admin|operator]');
  process.exit(1);
}

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("SUPABASE_URL dan SUPABASE_SERVICE_ROLE_KEY wajib ada.");

const admin = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } });
const password = process.env.OPERATOR_PASSWORD || `${randomBytes(9).toString("base64url")}-Tt2`;
if (password.length < 8) throw new Error("Password minimal 8 karakter.");

const { data: list, error: listError } = await admin.auth.admin.listUsers({ perPage: 1000 });
if (listError) throw listError;
let user = list.users.find((item) => item.email?.toLowerCase() === email.toLowerCase());

if (user) {
  const { error } = await admin.auth.admin.updateUserById(user.id, { password, email_confirm: true });
  if (error) throw error;
} else {
  const { data, error } = await admin.auth.admin.createUser({ email, password, email_confirm: true });
  if (error) throw error;
  user = data.user;
}

const { error: profileError } = await admin
  .from("operator_profiles")
  .upsert({ id: user.id, name, role, active: true, updated_at: new Date().toISOString() });
if (profileError) throw profileError;

console.log(`Akun ${role} siap. Masuk dengan: ${identifier.includes("@") ? email : identifier.trim().toLowerCase()}`);
if (!process.env.OPERATOR_PASSWORD) console.log(`Password sementara: ${password}\nSimpan sekarang; password ini tidak ditampilkan lagi.`);
