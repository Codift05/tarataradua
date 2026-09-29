// Official statistics for Kelurahan Taratara Dua (written "Tara-tara Dua" in BPS tables).
// Source: BPS Kota Tomohon, "Kecamatan Tomohon Barat Dalam Angka 2024" (data year 2023).
// Each figure keeps its table number so it can be re-checked against the PDF.

export const statisticsSource = {
  label: "BPS Kota Tomohon, Kecamatan Tomohon Barat Dalam Angka 2024",
  href: "https://tomohonkota.bps.go.id/id/publication/2024/09/26/ab5678fd3ef27bc3a2415331/kecamatan-tomohon-barat-dalam-angka-2024.html",
  year: 2023,
};

export const population = {
  total: 1863,
  male: 943,
  female: 920,
  shareOfDistrict: "11,03",
  density: "354",
  sexRatio: "102,5",
  table: "3.1",
};

export const keyFigures = [
  { value: "1.863", unit: "jiwa", label: "Penduduk", table: "3.1" },
  { value: "5,26", unit: "km²", label: "Luas wilayah", table: "1.1" },
  { value: "354", unit: "jiwa/km²", label: "Kepadatan penduduk", table: "3.1" },
  { value: "543", unit: "keluarga", label: "Pelanggan listrik PLN", table: "4.3.2" },
];

export const groups = [
  {
    title: "Wilayah dan akses",
    items: [
      { label: "Porsi luas Kecamatan Tomohon Barat", value: "15,03%", table: "1.1" },
      { label: "Jarak ke kantor kecamatan", value: "3,5 km", table: "1.2" },
      { label: "Jarak ke pusat Kota Tomohon", value: "7,5 km", table: "1.2" },
      { label: "Jalan antarkelurahan", value: "Aspal/beton, dilalui sepanjang tahun", table: "6.2.1" },
      { label: "Angkutan umum", value: "Ada, dengan trayek tetap", table: "6.2.1" },
    ],
  },
  {
    title: "Layanan dasar",
    items: [
      { label: "Keluarga yang teraliri listrik", value: "543 keluarga, seluruhnya PLN", table: "4.3.2" },
      { label: "Sinyal telepon seluler", value: "Sangat kuat, internet 4G/LTE", table: "6.3.2" },
      { label: "Menara telepon seluler", value: "1 menara, 4 operator", table: "6.3.1" },
      { label: "Warga dengan kekurangan gizi", value: "Tidak ada kasus tercatat", table: "4.2.2" },
    ],
  },
  {
    title: "Sosial dan ekonomi",
    items: [
      { label: "Porsi penduduk Kecamatan Tomohon Barat", value: "11,03%", table: "3.1" },
      { label: "Rasio jenis kelamin", value: "102,5 laki-laki per 100 perempuan", table: "3.1" },
      { label: "Gereja Protestan", value: "3 gereja", table: "4.4.1" },
      { label: "Koperasi aktif", value: "1 koperasi", table: "7.2" },
      { label: "Kejadian bencana alam", value: "Tidak ada kejadian tercatat", table: "4.4.2" },
    ],
  },
];
