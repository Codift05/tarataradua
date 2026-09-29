// Residents report straight to the kelurahan WhatsApp: the button opens a chat with this template
// prefilled, so they fill in the blanks, attach a photo if they have one, and press Send.

/** Normalise an Indonesian number (08…, +62…, 62…) to the digits wa.me expects. @param {string | undefined} value */
export function toWhatsAppNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return null;
  const number = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return /^62\d{8,13}$/.test(number) ? number : null;
}

export const reportTemplate = [
  "Halo Kelurahan Taratara II, saya ingin menyampaikan aspirasi.",
  "",
  "Nama: ",
  "Lingkungan: ",
  "Kategori (jalan/sampah/drainase/air/lampu jalan/keamanan/lainnya): ",
  "Lokasi: ",
  "Kondisi yang dilaporkan: ",
].join("\n");

/** @param {string} number @param {string} text */
export const whatsAppLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
