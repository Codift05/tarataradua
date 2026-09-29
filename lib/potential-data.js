// Supporting data for each potential tab. BPS publishes these figures per kecamatan, not per kelurahan,
// so charts compare Kecamatan Tomohon Barat (which contains Taratara II) with the rest of Kota Tomohon.
// Every number carries its BPS table; journal entries were checked against their publisher pages.

const TDA2023 = {
  label: "BPS Kota Tomohon, Kota Tomohon Dalam Angka 2023 (data 2022)",
  href: "https://tomohonkota.bps.go.id/id/publication/2023/02/28/5b0f98cfc5543e1868083ce0/kota-tomohon-dalam-angka-2023.html",
};

const TDA2026 = {
  label: "BPS Kota Tomohon, Kota Tomohon Dalam Angka 2026 (data 2025, angka sementara)",
  href: "https://tomohonkota.bps.go.id/id/publication/2026/02/27/8193e4d6ac03ae56f3b6218d/kota-tomohon-dalam-angka-2026.html",
};

const HOME = "Tomohon Barat";

export const potentialData = {
  padi: {
    chart: {
      type: "bars",
      title: "Produksi padi sawah per kecamatan, 2022",
      unit: "ton",
      rows: [
        { label: "Tomohon Barat", value: 5838 },
        { label: "Tomohon Utara", value: 1620 },
        { label: "Tomohon Selatan", value: 516 },
        { label: "Tomohon Tengah", value: 430.8 },
        { label: "Tomohon Timur", value: 0 },
      ],
    },
    stats: [
      { value: "69%", label: "produksi padi Kota Tomohon berasal dari Tomohon Barat" },
      { value: "973 ha", label: "luas panen padi sawah di Tomohon Barat" },
      { value: "6 ton/ha", label: "produktivitas rata-rata" },
    ],
    source: { ...TDA2023, tables: "5.3.2" },
    journals: [
      {
        authors: "Bulanta, O., Manginsela, E. P., & Wangke, W. M.",
        year: 2019,
        title: "Kontribusi usahatani padi sawah terhadap pendapatan keluarga di Kelurahan Taratara Satu, Kecamatan Tomohon Barat, Kota Tomohon",
        journal: "Agri-SosioEkonomi 15(2)",
        href: "https://ejournal.unsrat.ac.id/v3/index.php/jisep/article/view/24248",
      },
      {
        authors: "Welang, F. R., Dumais, J. N. K., & Sendow, M. M.",
        year: 2016,
        title: "Analisis pendapatan usahatani padi sawah berdasarkan musim panen di Kelurahan Taratara Satu, Kecamatan Tomohon Barat, Kota Tomohon",
        journal: "Agri-SosioEkonomi 12(2A)",
        href: "https://ejournal.unsrat.ac.id/v3/index.php/jisep/article/view/12725",
      },
    ],
  },
  perikanan: {
    chart: {
      type: "trend",
      title: "Produksi ikan budidaya air tawar Tomohon Barat",
      unit: "ton",
      rows: [
        { label: "2018", value: 447.33 },
        { label: "2019", value: 391.13 },
        { label: "2020", value: 311.31 },
        { label: "2021", value: 203.24 },
        { label: "2022", value: 213.24 },
      ],
    },
    stats: [
      { value: "63%", label: "produksi ikan budidaya Kota Tomohon berasal dari Tomohon Barat (2022)" },
      { value: "326", label: "rumah tangga pembudidaya ikan, terbanyak di Kota Tomohon" },
      { value: "79 ton", label: "ikan dari sawah (mina padi), di samping 134 ton dari kolam" },
    ],
    source: { ...TDA2023, tables: "5.5.1, 5.5.2, 5.5.4" },
    note: "BPS mencatat jenis ikan sebagai nila (142 ton) dan mas (70 ton); mujair termasuk kelompok ikan nila.",
    journals: [],
  },
  kelapa: {
    chart: {
      type: "bars",
      title: "Produksi kelapa per kecamatan, 2025",
      unit: "ton",
      rows: [
        { label: "Tomohon Barat", value: 205.66 },
        { label: "Tomohon Utara", value: 193.15 },
        { label: "Tomohon Selatan", value: 47.11 },
        { label: "Tomohon Timur", value: 13.33 },
        { label: "Tomohon Tengah", value: 0.39 },
      ],
    },
    stats: [
      { value: "422 ha", label: "kebun kelapa rakyat di Tomohon Barat" },
      { value: "+45%", label: "kenaikan produksi dari 142 ton (2024) ke 206 ton (2025)" },
      { value: "45%", label: "produksi kelapa Kota Tomohon berasal dari Tomohon Barat" },
    ],
    source: { ...TDA2026, tables: "5.2.1, 5.2.2" },
    journals: [
      {
        authors: "Lumintang, I. M., Lolowang, T. F., & Pangemanan, L. R. J.",
        year: 2015,
        title: "Analisis daya saing kopra di Minahasa Selatan",
        journal: "COCOS 6(14)",
        href: "https://ejournal.unsrat.ac.id/v3/index.php/cocos/article/view/8785",
      },
    ],
  },
  peternakan: {
    chart: {
      type: "bars",
      title: "Populasi babi per kecamatan, 2022",
      unit: "ekor",
      rows: [
        { label: "Tomohon Barat", value: 7437 },
        { label: "Tomohon Selatan", value: 4474 },
        { label: "Tomohon Utara", value: 1629 },
        { label: "Tomohon Timur", value: 541 },
        { label: "Tomohon Tengah", value: 398 },
      ],
    },
    stats: [
      { value: "45%", label: "populasi babi Kota Tomohon ada di Tomohon Barat" },
      { value: "277 ribu", label: "ayam pedaging, 90% dari populasi kota" },
      { value: "423", label: "ekor sapi potong" },
    ],
    source: { ...TDA2023, tables: "5.4.1, 5.4.2" },
    journals: [
      {
        authors: "Anes, C. A. A., Massie, M. T., Lumy, T. F. D., Sajow, A. A., & Oroh, F. N. S.",
        year: 2020,
        title: "Analisis keuntungan usaha ternak babi di Kecamatan Tomohon Barat, Kota Tomohon",
        journal: "Zootec 40(1)",
        href: "https://ejournal.unsrat.ac.id/v3/index.php/zootek/article/view/26761",
      },
    ],
  },
  irigasi: {
    chart: {
      type: "stacked",
      title: "Luas sawah menurut pengairan, 2022",
      unit: "ha",
      legend: ["Irigasi", "Non irigasi"],
      rows: [
        { label: "Tomohon Barat", parts: [417, 29.8] },
        { label: "Tomohon Utara", parts: [80, 18] },
        { label: "Tomohon Selatan", parts: [0, 44] },
        { label: "Tomohon Tengah", parts: [30, 1] },
        { label: "Tomohon Timur", parts: [0, 0] },
      ],
    },
    stats: [
      { value: "79%", label: "sawah beririgasi Kota Tomohon ada di Tomohon Barat" },
      { value: "417 ha", label: "sawah beririgasi di Tomohon Barat" },
      { value: "93%", label: "sawah Tomohon Barat sudah beririgasi" },
    ],
    source: { ...TDA2023, tables: "5.3.1" },
    journals: [],
  },
};

export const HOME_DISTRICT = HOME;
