const categories = new Set([
  "Jalan",
  "Sampah",
  "Drainase",
  "Air",
  "Lampu jalan",
  "Fasilitas publik",
  "Keamanan",
  "Lainnya",
]);

const clean = (value) => (typeof value === "string" ? value.trim() : "");

export function validateComplaint(input) {
  const value = {
    name: clean(input?.name),
    whatsapp: clean(input?.whatsapp).replace(/[^0-9+]/g, ""),
    environment: clean(input?.environment),
    category: clean(input?.category),
    location: clean(input?.location),
    description: clean(input?.description),
  };

  const errors = {};

  if (value.name.length < 2 || value.name.length > 80) errors.name = "Nama harus 2-80 karakter.";
  if (!/^\+?\d{9,15}$/.test(value.whatsapp)) errors.whatsapp = "Masukkan nomor WhatsApp yang valid.";
  if (!value.environment || value.environment.length > 60) errors.environment = "Lingkungan wajib diisi.";
  if (!categories.has(value.category)) errors.category = "Pilih kategori yang tersedia.";
  if (!value.location || value.location.length > 160) errors.location = "Lokasi wajib diisi.";
  if (value.description.length < 10 || value.description.length > 1500) {
    errors.description = "Deskripsi harus 10-1500 karakter.";
  }

  return { success: Object.keys(errors).length === 0, errors, value };
}
