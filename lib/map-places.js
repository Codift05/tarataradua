// Coordinates come from OpenStreetMap (© OpenStreetMap contributors, ODbL).
// Add surveyed potential locations (sawah, kolam ikan, kebun kelapa) to `places`
// with a category from `mapCategories` once the KKT field survey confirms them.

export const mapCenter = [1.3183, 124.7785];

export const mapCategories = {
  wilayah: { label: "Taratara II", color: "#244c2a" },
  pendidikan: { label: "Sekolah", color: "#4e7c39" },
  ibadah: { label: "Rumah ibadah", color: "#8a6d1f" },
  sekitar: { label: "Kelurahan sekitar", color: "#8a948a" },
  potensi: { label: "Lokasi potensi", color: "#b7cc3a" },
};

export const places = [
  { name: "Taratara Dua", category: "wilayah", lat: 1.3175209, lng: 124.7789731, note: "Pusat permukiman Kelurahan Taratara II." },
  { name: "SD Inpres Taratara Dua", category: "pendidikan", lat: 1.3197536, lng: 124.780069 },
  { name: "SMP Kristen Taratara", category: "pendidikan", lat: 1.3193424, lng: 124.7802661 },
  { name: "SMA Negeri 2 Tomohon", category: "pendidikan", lat: 1.3168965, lng: 124.7823829 },
  { name: "SD GMIM 1 Taratara", category: "pendidikan", lat: 1.31897, lng: 124.7762992 },
  { name: "Gereja Santo Antonius Padua", category: "ibadah", lat: 1.3203141, lng: 124.7746035 },
  { name: "Taratara Satu", category: "sekitar", lat: 1.3196152, lng: 124.77488 },
  { name: "Taratara Tiga", category: "sekitar", lat: 1.3158503, lng: 124.7814139 },
];

export const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=Taratara%20Dua%2C%20Tomohon%20Barat";
