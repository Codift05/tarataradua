// Complaints are forwarded to the kelurahan's WhatsApp so staff can handle them without the dashboard.
// The resident's own WhatsApp opens with the report prefilled; they only need to press Send.

/** Normalise an Indonesian number (08…, +62…, 62…) to the digits wa.me expects. @param {string | undefined} value */
export function toWhatsAppNumber(value) {
  const digits = String(value || "").replace(/\D/g, "");
  if (!digits) return null;
  const number = digits.startsWith("0") ? `62${digits.slice(1)}` : digits;
  return /^62\d{8,13}$/.test(number) ? number : null;
}

/** @param {Record<string, string>} report @param {string} [ticketNumber] */
export function buildReportMessage(report, ticketNumber) {
  return [
    "*Laporan Aspirasi Warga Taratara II*",
    ticketNumber ? `Nomor tiket: ${ticketNumber}` : null,
    "",
    `Nama: ${report.name}`,
    `WhatsApp: ${report.whatsapp}`,
    `Lingkungan: ${report.environment}`,
    `Kategori: ${report.category}`,
    `Lokasi: ${report.location}`,
    "",
    "Kondisi yang dilaporkan:",
    report.description,
    "",
    "Dikirim melalui Portal Kelurahan Taratara II",
  ].filter((line) => line !== null).join("\n");
}

/** @param {string} number @param {string} text */
export const whatsAppLink = (number, text) => `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
