// Public facilities shown on the home page. Photos are KKT field documentation (public/desa/);
// descriptions stay general and names only appear where they are visible on signage.

const maps = (query) => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const facilities = [
  {
    name: "Kantor Kelurahan Taratara II",
    category: "Pemerintahan",
    photo: "/desa/kantor-kelurahan.webp",
    alt: "Kantor Kelurahan Taratara II dengan papan nama di depan bangunan",
    description: "Pusat pelayanan administrasi warga, dari surat keterangan hingga penerimaan aspirasi. Buka Senin sampai Jumat mengikuti jam kerja pemerintah daerah.",
    mapUrl: maps("Kantor Kelurahan Taratara Dua, Tomohon Barat"),
    featured: true,
  },
  {
    name: "Gereja",
    category: "Tempat ibadah",
    photo: "/desa/gereja.webp",
    alt: "Gereja berwarna putih dengan menara runcing dan jendela kaca patri",
    description: "Gereja di jalan utama kelurahan, tempat ibadah dan kegiatan jemaat.",
    mapUrl: maps("Gereja Taratara Dua, Tomohon Barat"),
    position: "50% 35%",
  },
  {
    name: "Sekolah",
    category: "Pendidikan",
    photo: "/desa/sekolah.webp",
    alt: "Deretan ruang kelas sekolah dengan halaman dan tiang bendera",
    description: "Sarana pendidikan di lingkungan kelurahan, dengan halaman untuk upacara dan olahraga.",
    mapUrl: maps("Sekolah Taratara Dua, Tomohon Barat"),
  },
  {
    name: "Pos Satkamling",
    category: "Keamanan",
    photo: "/desa/pos-satkamling.webp",
    alt: "Bangunan Pos Satkamling Kelurahan Tara-Tara Dua berwarna merah",
    description: "Pos keamanan lingkungan untuk ronda dan koordinasi keamanan warga.",
    mapUrl: maps("Pos Satkamling Taratara Dua, Tomohon Barat"),
  },
  {
    name: "Minimarket",
    category: "Kebutuhan sehari-hari",
    photo: "/desa/minimarket-indomaret.webp",
    alt: "Minimarket di tepi jalan dengan pegunungan di latar belakang",
    description: "Alfamidi dan Indomaret di jalan utama melayani kebutuhan harian warga dan pengunjung.",
    mapUrl: maps("Alfamidi Taratara Dua, Tomohon"),
  },
];
