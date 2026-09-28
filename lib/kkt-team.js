// KKT Unsrat Angkatan 149, Posko Taratara 2 (from the team's organisation chart).
// Student ID numbers on the chart are intentionally not published.
// Photos live in public/tim-kkt/cutout/<photo>.webp as transparent cut-outs. When replacing a photo,
// save it under a new file name or folder: optimized images are cached for 30 days by URL.

export const supervisors = [
  { role: "Koordinator P3KKNT", name: "Prof. Dr. Ir. Rignolda Djamaluddin, M.Si" },
  { role: "Dosen Pengawas Lapangan", name: "Prof. Dr. dr. Josef S. B. Tuda, M.Kes., Sp.ParK(K)" },
  { role: "Dosen Pembimbing Lapangan", name: "Dr. Ir. Heidy J. Manangkot, M.Si" },
];

export const leaders = [
  { role: "Koordinator Posko", name: "Sultan", photo: "sultan" },
  { role: "Sekretaris", name: "Brilliani Potalangi", photo: "brilliani-potalangi" },
  { role: "Bendahara", name: "Leily Runtuwene", photo: "leily-runtuwene" },
];

export const divisions = [
  {
    name: "Bidang Program",
    members: [
      { role: "Koordinator", name: "Ronaldino Kaunang", photo: "ronaldino-kaunang" },
      { role: "Anggota", name: "Mahyuni D.", photo: "mahyuni" },
      { role: "Anggota", name: "Michael H. Sigalingging", photo: "michael-sigalingging" },
      { role: "Anggota", name: "Karin F. Lontoh", photo: "karin-lontoh" },
    ],
  },
  {
    name: "Bidang Pelaporan",
    members: [
      { role: "Koordinator", name: "Miftahuddin S. Arsyad", photo: "miftahuddin-arsyad" },
      { role: "Anggota", name: "Daniel Igir", photo: "daniel-igir" },
      { role: "Anggota", name: "Evangelica Ruru", photo: "evangelica-ruru" },
      { role: "Anggota", name: "Kyria Meytri Lapod", photo: "kyria-lapod" },
    ],
  },
  {
    name: "Bidang PDD",
    members: [
      { role: "Koordinator", name: "Ginal S. Ma'dika", photo: "ginal-madika" },
      { role: "Anggota", name: "Russell Imanuel Ruru", photo: "russell-ruru" },
      { role: "Anggota", name: "Fevia Kawengian", photo: "fevia-kawengian" },
      { role: "Anggota", name: "Cindy Anastasya", photo: "cindy-anastasya" },
    ],
  },
];

export const memberCount = leaders.length + divisions.reduce((sum, division) => sum + division.members.length, 0);
