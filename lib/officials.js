// Kelurahan officials. The board list below is transcribed from the
// "Susunan Organisasi Kelurahan Taratara Dua" board at the kelurahan office (photographed September 2026).
// It seeds the `officials` table and is the fallback when the table is empty or unreachable.
// NIP numbers on the board are intentionally not published.

export const officePositions = [
  "Lurah",
  "Sekretaris",
  "Kepala Seksi Pemerintahan, Ketenteraman dan Ketertiban",
  "Kepala Seksi Pembangunan dan Keuangan",
  "Kepala Seksi Kesejahteraan Rakyat",
];

export const neighbourhoodPositions = ["Kepala Lingkungan", "Wakil Kepala Lingkungan"];

export const positions = [...officePositions, ...neighbourhoodPositions];

export const LINGKUNGAN_COUNT = 8;

export const boardOfficials = [
  { name: "Ebenhaezer A. R. Rares, SE", position: "Lurah", lingkungan: 0 },
  { name: "Roy S. Onibala, SE", position: "Sekretaris", lingkungan: 0 },
  { name: "Hanny Loho, S.Sos", position: "Kepala Seksi Pembangunan dan Keuangan", lingkungan: 0 },
  { name: "Anita Salung", position: "Kepala Lingkungan", lingkungan: 1 },
  { name: "Marthen Pongoh", position: "Wakil Kepala Lingkungan", lingkungan: 1 },
  { name: "Debby Rawung", position: "Kepala Lingkungan", lingkungan: 2 },
  { name: "Daniel Sambeka", position: "Wakil Kepala Lingkungan", lingkungan: 2 },
  { name: "Rolly Rares", position: "Kepala Lingkungan", lingkungan: 3 },
  { name: "Lexi Wewengkang", position: "Wakil Kepala Lingkungan", lingkungan: 3 },
  { name: "Rocky Rumagit", position: "Kepala Lingkungan", lingkungan: 4 },
  { name: "Yulce Salea", position: "Wakil Kepala Lingkungan", lingkungan: 4 },
  { name: "Victor Mende", position: "Kepala Lingkungan", lingkungan: 5 },
  { name: "Lucky Pandey", position: "Wakil Kepala Lingkungan", lingkungan: 5 },
  { name: "Verry Poluan", position: "Kepala Lingkungan", lingkungan: 6 },
  { name: "Marce Lapong", position: "Wakil Kepala Lingkungan", lingkungan: 6 },
  { name: "Adri David", position: "Kepala Lingkungan", lingkungan: 7 },
  { name: "Areyne Kandow", position: "Wakil Kepala Lingkungan", lingkungan: 7 },
  { name: "Jeanet Wewengkang", position: "Kepala Lingkungan", lingkungan: 8 },
  { name: "Djoni Sambow", position: "Wakil Kepala Lingkungan", lingkungan: 8 },
];

const roman = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
export const toRoman = (value) => roman[value] || String(value);

// Shape a flat list into the org chart: fixed office seats (empty when vacant) and one entry per lingkungan.
export function groupOfficials(rows) {
  const holder = (position, lingkungan = 0) =>
    rows.find((row) => row.position === position && Number(row.lingkungan || 0) === lingkungan)?.name || null;

  const highest = Math.max(LINGKUNGAN_COUNT, ...rows.map((row) => Number(row.lingkungan || 0)));

  return {
    lurah: holder("Lurah"),
    sekretaris: holder("Sekretaris"),
    seksi: officePositions.slice(2).map((position) => ({ position, name: holder(position) })),
    lingkungan: Array.from({ length: highest }, (_, index) => ({
      number: index + 1,
      kepala: holder("Kepala Lingkungan", index + 1),
      wakil: holder("Wakil Kepala Lingkungan", index + 1),
    })),
  };
}
