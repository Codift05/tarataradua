// Village potentials shown on the home page and /potensi/[slug].
// Text stays general until the kelurahan verifies figures (area, groups, harvest months).

export const potentials = [
  {
    slug: "padi",
    title: "Pertanian padi",
    image: "/desa/sawah-irigasi-v2.webp",
    photo: true,
    enhanced: true,
    position: "50% 60%",
    alt: "Sawah hijau di Taratara II dengan deretan pohon kelapa saat senja",
    description:
      "Hamparan sawah di lembah Taratara II mendapat air dari saluran irigasi sepanjang tahun. Padi menjadi tumpuan pangan rumah tangga sekaligus sumber penghasilan petani setempat.",
    story: [
      "Sawah menjadi pemandangan paling akrab di Taratara II. Petak-petaknya mengikuti kontur lembah dan dialiri air dari saluran irigasi, sehingga petani dapat menanam lebih dari sekali dalam setahun.",
      "Hasil panen dipakai untuk kebutuhan keluarga dan dijual dalam bentuk gabah maupun beras. Sisa panen seperti dedak dan jerami tidak terbuang, melainkan menjadi pakan ternak dan bahan kompos.",
    ],
    outputs: ["Beras dan gabah", "Dedak untuk pakan ternak", "Jerami untuk kompos"],
    activities: ["Olah lahan", "Tanam", "Pemeliharaan", "Panen"],
    keywords: ["beras", "padi", "gabah"],
  },
  {
    slug: "perikanan",
    title: "Budidaya ikan",
    image: "/desa/kolam-sawah.webp",
    photo: true,
    position: "50% 68%",
    alt: "Kolam ikan di tepi sawah Taratara II, memantulkan pohon kelapa dan pegunungan",
    description:
      "Warga membudidayakan ikan mujair di kolam yang dialiri air dari sungai dan saluran irigasi. Air yang terus mengalir menjaga kolam tetap segar dan ikan tumbuh sehat.",
    story: [
      "Selain sawah, aliran air di Taratara II dimanfaatkan warga untuk memelihara ikan mujair. Kolam dibuat di dekat sungai atau saluran sehingga airnya terus berganti, menyerupai aliran sungai kecil.",
      "Ikan dipanen untuk lauk keluarga dan dijual ke tetangga maupun pasar sekitar. Budidaya ini melengkapi pertanian karena memakai sumber air yang sama dan dapat dikerjakan di sela musim tanam.",
    ],
    outputs: ["Ikan mujair konsumsi", "Lauk untuk keluarga", "Tambahan penghasilan warga"],
    activities: ["Tebar benih", "Pemberian pakan", "Menjaga aliran air", "Panen"],
    keywords: ["ikan", "mujair", "nila"],
  },
  {
    slug: "kelapa",
    title: "Perkebunan kelapa",
    image: "/desa/kolam-sawah.webp",
    photo: true,
    position: "50% 38%",
    alt: "Rimbun pohon kelapa di tepi sawah Taratara II dengan pegunungan di belakangnya",
    description:
      "Kelapa tumbuh di kebun warga dan di sepanjang pematang sawah. Hampir seluruh bagiannya dapat dimanfaatkan, dari buah hingga batang, sehingga menopang banyak usaha rumahan.",
    story: [
      "Pohon kelapa tumbuh di kebun, pekarangan, dan sepanjang pematang sawah Taratara II. Kelapa sudah lama menjadi bagian dari ekonomi keluarga di Minahasa.",
      "Buahnya diolah menjadi kopra, minyak kelapa, dan berbagai olahan pangan. Kelapa muda dijual segar, sementara sabut, tempurung, dan batangnya dapat dimanfaatkan untuk kebutuhan rumah tangga.",
    ],
    outputs: ["Kopra dan minyak kelapa", "Kelapa muda", "Olahan pangan UMKM"],
    activities: ["Perawatan kebun", "Panen buah", "Pengolahan kopra", "Pemasaran"],
    keywords: ["kelapa", "kopra", "minyak"],
  },
  {
    slug: "peternakan",
    title: "Peternakan",
    image: "/taratara-hero-v3.webp",
    position: "88% 70%",
    alt: "Ilustrasi lahan terbuka dan kebun di sisi aliran sungai",
    description:
      "Warga memelihara ternak sebagai tabungan keluarga dan pemenuhan kebutuhan acara adat. Limbah pertanian menjadi pakan, sedangkan kotoran ternak kembali ke lahan sebagai pupuk.",
    story: [
      "Ternak dipelihara di pekarangan dan kandang sederhana milik warga. Bagi banyak keluarga, ternak berfungsi sebagai tabungan yang dapat dijual ketika ada kebutuhan besar.",
      "Peternakan terhubung erat dengan pertanian: dedak dan jerami menjadi pakan, sedangkan kotoran ternak diolah menjadi pupuk kandang untuk sawah dan kebun.",
    ],
    outputs: ["Ternak potong dan unggas", "Pupuk kandang", "Tabungan keluarga"],
    activities: ["Pemberian pakan", "Kesehatan ternak", "Pengolahan pupuk", "Penjualan"],
    keywords: ["ternak", "daging", "telur", "ayam", "babi", "sapi"],
  },
  {
    slug: "irigasi",
    title: "Jalur irigasi",
    image: "/desa/sawah-irigasi-v2.webp",
    photo: true,
    enhanced: true,
    position: "85% 90%",
    alt: "Pematang dan saluran air di antara petak sawah Taratara II",
    description:
      "Air dari kawasan pegunungan dialirkan melalui saluran irigasi ke petak-petak sawah dan kolam. Saluran ini dirawat bersama sehingga kerusakan kecil perlu cepat dilaporkan.",
    story: [
      "Saluran irigasi adalah urat nadi Taratara II. Air dari kawasan pegunungan mengalir melalui saluran utama, lalu dibagi ke petak sawah dan kolam ikan warga.",
      "Perawatan saluran dilakukan bersama melalui gotong royong. Sampah, longsoran tanah, atau dinding saluran yang retak perlu segera dilaporkan agar aliran air tidak terganggu.",
    ],
    outputs: ["Pengairan sawah", "Air untuk kolam dan kebun", "Penyangga musim kemarau"],
    activities: ["Gotong royong", "Pembersihan saluran", "Pembagian air", "Pelaporan kerusakan"],
    keywords: [],
    cta: { href: "/#aspirasi", label: "Laporkan saluran rusak" },
  },
];

export const cycle = ["Air irigasi", "Kolam ikan", "Sawah padi", "Dedak & jerami", "Ternak", "Pupuk kandang", "Kebun kelapa"];

export const getPotential = (slug) => potentials.find((potential) => potential.slug === slug) || null;

export function matchesPotential(potential, business) {
  const text = [business.name, business.category, business.product, business.description].join(" ").toLowerCase();
  return potential.keywords.some((keyword) => text.includes(keyword));
}
