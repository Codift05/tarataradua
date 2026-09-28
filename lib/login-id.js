// Operators may sign in with a plain username instead of an email.
// Supabase Auth still needs an email, so usernames map to a non-deliverable internal address.
export const USERNAME_DOMAIN = "operator.taratara2.local";

/** @param {string} identifier @returns {string | null} */
export function toLoginEmail(identifier) {
  const value = String(identifier || "").trim().toLowerCase();
  if (value.includes("@")) return /^\S+@\S+\.\S+$/.test(value) ? value : null;
  return /^[a-z0-9._-]{3,32}$/.test(value) ? `${value}@${USERNAME_DOMAIN}` : null;
}
