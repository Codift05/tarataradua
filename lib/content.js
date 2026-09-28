// Shared definitions for operator-managed public content.
// Each field maps 1:1 to a database column; constraints mirror the migration.

import { positions } from "./officials.js";

/**
 * @typedef {{ name: string; label: string; type: "text" | "textarea" | "select" | "date" | "number" | "tel" | "url" | "checkbox"; required?: boolean; min?: number; max?: number; rows?: number; options?: string[]; hint?: string }} ContentField
 * @typedef {{ table: string; label: string; singular: string; description: string; order: { column: string; ascending: boolean }; listColumns: string[]; fields: ContentField[] }} ContentType
 */

/** @type {Record<"pengumuman" | "layanan" | "perangkat" | "umkm", ContentType>} */
export const contentTypes = {
  pengumuman: {
    table: "announcements",
    label: "Pengumuman",
    singular: "pengumuman",
    description: "Buat draft, terbitkan, dan arsipkan kabar untuk warga.",
    order: { column: "created_at", ascending: false },
    listColumns: ["title", "category", "event_date", "status"],
    fields: [
      { name: "title", label: "Judul", type: "text", required: true, min: 3, max: 140 },
      { name: "category", label: "Jenis", type: "select", required: true, options: ["Pengumuman", "Agenda", "Pelayanan", "Kegiatan"] },
      { name: "summary", label: "Ringkasan", type: "textarea", required: true, min: 10, max: 300, rows: 3 },
      { name: "body", label: "Isi lengkap", type: "textarea", max: 5000, rows: 8 },
      { name: "event_date", label: "Tanggal kegiatan", type: "date", hint: "Kosongkan jika bukan agenda." },
      { name: "status", label: "Status", type: "select", required: true, options: ["Draft", "Terbit", "Arsip"], hint: "Hanya status Terbit yang tampil di portal." },
    ],
  },
  layanan: {
    table: "services",
    label: "Layanan",
    singular: "layanan",
    description: "Perbarui persyaratan, alur, waktu, dan biaya pelayanan administrasi.",
    order: { column: "sort_order", ascending: true },
    listColumns: ["name", "duration", "fee", "active"],
    fields: [
      { name: "name", label: "Nama layanan", type: "text", required: true, min: 3, max: 100 },
      { name: "description", label: "Deskripsi singkat", type: "textarea", required: true, min: 10, max: 300, rows: 3 },
      { name: "requirements", label: "Persyaratan", type: "textarea", max: 2000, rows: 6, hint: "Satu persyaratan per baris." },
      { name: "steps", label: "Alur pengurusan", type: "textarea", max: 2000, rows: 6, hint: "Satu langkah per baris." },
      { name: "duration", label: "Estimasi waktu", type: "text", max: 60 },
      { name: "fee", label: "Biaya", type: "text", max: 60, hint: "Contoh: Gratis." },
      { name: "sort_order", label: "Urutan tampil", type: "number", min: 0, max: 999 },
      { name: "active", label: "Tampilkan di portal", type: "checkbox" },
    ],
  },
  perangkat: {
    table: "officials",
    label: "Perangkat",
    singular: "perangkat",
    description: "Perbarui lurah, sekretaris, kepala seksi, serta kepala dan wakil kepala lingkungan saat ada pergantian.",
    order: { column: "sort_order", ascending: true },
    listColumns: ["name", "position", "lingkungan", "active"],
    fields: [
      { name: "name", label: "Nama lengkap dan gelar", type: "text", required: true, min: 2, max: 100 },
      { name: "position", label: "Jabatan", type: "select", required: true, options: positions },
      { name: "lingkungan", label: "Lingkungan", type: "number", min: 0, max: 20, hint: "Isi nomor lingkungan untuk kepala atau wakil kepala lingkungan, 0 untuk perangkat kantor." },
      { name: "sort_order", label: "Urutan tampil", type: "number", min: 0, max: 999 },
      { name: "active", label: "Tampilkan di portal", type: "checkbox", hint: "Hapus centang saat masa jabatan berakhir agar riwayat tetap tersimpan." },
    ],
  },
  umkm: {
    table: "businesses",
    label: "UMKM",
    singular: "UMKM",
    description: "Tambah, perbarui, atau sembunyikan usaha warga dari direktori.",
    order: { column: "created_at", ascending: false },
    listColumns: ["name", "category", "product", "active"],
    fields: [
      { name: "name", label: "Nama usaha", type: "text", required: true, min: 2, max: 100 },
      { name: "category", label: "Kategori", type: "text", required: true, min: 2, max: 60 },
      { name: "product", label: "Produk utama", type: "text", max: 100 },
      { name: "description", label: "Deskripsi singkat", type: "textarea", required: true, min: 10, max: 400, rows: 4 },
      { name: "whatsapp", label: "Nomor WhatsApp", type: "tel", hint: "Hanya jika pemilik usaha setuju ditampilkan." },
      { name: "address", label: "Alamat umum", type: "text", max: 160 },
      { name: "map_url", label: "Tautan peta", type: "url" },
      { name: "social_url", label: "Instagram atau Facebook", type: "url" },
      { name: "active", label: "Tampilkan di portal", type: "checkbox" },
    ],
  },
};

/** @type {Record<string, string>} */
export const columnLabels = {
  active: "Tampil",
  event_date: "Tanggal",
};

/** @param {string} kind @returns {ContentType | null} */
export function getContentType(kind) {
  return Object.hasOwn(contentTypes, kind) ? contentTypes[kind] : null;
}

const read = (input, name) => {
  const value = typeof input?.get === "function" ? input.get(name) : input?.[name];
  return typeof value === "string" ? value.trim() : value;
};

function validateField(field, raw) {
  if (field.type === "checkbox") return { value: raw === true || raw === "on" || raw === "true" };

  const text = typeof raw === "string" ? raw.replace(/\r\n/g, "\n") : "";
  if (!text) return field.required ? { error: `${field.label} wajib diisi.` } : { value: field.type === "number" ? 0 : null };

  switch (field.type) {
    case "select":
      return field.options.includes(text) ? { value: text } : { error: `Pilih ${field.label.toLowerCase()} yang tersedia.` };
    case "date":
      return /^\d{4}-\d{2}-\d{2}$/.test(text) && !Number.isNaN(Date.parse(text)) ? { value: text } : { error: "Tanggal tidak valid." };
    case "number": {
      const number = Number(text);
      return Number.isInteger(number) && number >= field.min && number <= field.max
        ? { value: number }
        : { error: `${field.label} harus angka ${field.min}-${field.max}.` };
    }
    case "tel": {
      const phone = text.replace(/[^0-9+]/g, "");
      return /^\+?\d{9,15}$/.test(phone) ? { value: phone } : { error: "Masukkan nomor WhatsApp yang valid." };
    }
    case "url":
      try {
        const url = new URL(text);
        return url.protocol === "https:" && text.length <= 300 ? { value: url.href } : { error: "Gunakan tautan https:// yang valid." };
      } catch {
        return { error: "Gunakan tautan https:// yang valid." };
      }
    default: {
      const min = field.min || 0;
      if (text.length < min || text.length > field.max) {
        return { error: min ? `${field.label} harus ${min}-${field.max} karakter.` : `${field.label} maksimal ${field.max} karakter.` };
      }
      return { value: text };
    }
  }
}

export function validateContent(type, input) {
  const value = {};
  const errors = {};

  for (const field of type.fields) {
    const result = validateField(field, read(input, field.name));
    if (result.error) errors[field.name] = result.error;
    else value[field.name] = result.value;
  }

  return { success: Object.keys(errors).length === 0, errors, value };
}

export const splitLines = (value) => (value || "").split("\n").map((line) => line.trim()).filter(Boolean);
