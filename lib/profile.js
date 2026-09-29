// Village profile content. Every figure cites a public source (see `sources`);
// anything not yet confirmed by the kelurahan is phrased as pending, never estimated.

export const sources = {
  papan: {
    label: "Papan Susunan Organisasi Kelurahan Taratara Dua, Kantor Kelurahan (difoto September 2026)",
  },
  bps2024: {
    label: "BPS Kota Tomohon, Kecamatan Tomohon Barat Dalam Angka 2024 (data 2023)",
    href: "https://tomohonkota.bps.go.id/id/publication/2024/09/26/ab5678fd3ef27bc3a2415331/kecamatan-tomohon-barat-dalam-angka-2024.html",
  },
  bps: {
    label: "BPS Kota Tomohon, Statistik Daerah Kecamatan Tomohon Barat 2016 (data 2015)",
    href: "https://tomohonkota.bps.go.id/",
  },
  kecamatan: {
    label: "Situs resmi Kecamatan Tomohon Barat",
    href: "https://tomohonbarat.tomohon.go.id/profil-kecamatan/",
  },
  kojongian: {
    label: "Adrianus Kojongian, \"Taratara Bekas Negeri Tombariri\", Jelajah Sejarah Tomohon (2019)",
    href: "https://jelajahsejarahtomohon.blogspot.com/2019/10/taratara-bekas-negeri-tombariri.html",
  },
  gagalang: {
    label: "Prity V. Gagalang, \"Sejarah Perkembangan Kelurahan Taratara Dua 1978-2014\", Jurnal Fakultas Sastra Unsrat (2015)",
    href: "https://ejournal.unsrat.ac.id/index.php/jefs/article/view/8817",
  },
  osm: {
    label: "OpenStreetMap",
    href: "https://www.openstreetmap.org/#map=16/1.3183/124.7785",
  },
};

export const summary = [
  "Taratara II, dalam administrasi resmi disebut Kelurahan Taratara Dua, adalah satu dari delapan kelurahan di Kecamatan Tomohon Barat, Kota Tomohon, Sulawesi Utara. Wilayahnya berada di lembah sisi barat kota, bertetangga dengan Taratara I dan Taratara III.",
  "Warga Taratara termasuk rumpun Tombulu dan menuturkan bahasa Tombulu dialek Taratara. Sawah beririgasi, kolam ikan, dan kebun kelapa menjadi sumber penghidupan utama, dengan semangat mapalus atau gotong royong yang masih terjaga.",
];

export const highlights = [
  { value: "1.863", label: "Penduduk (2023)", source: "bps2024" },
  { value: "5,26 km²", label: "Luas wilayah", source: "bps2024" },
  { value: "75 ha", label: "Sawah beririgasi (2015)", source: "bps" },
  { value: "1701", label: "Awal permukiman Taratara menurut tradisi", source: "kojongian" },
];

export const nameOrigin =
  "Nama Taratara berasal dari sejenis rumput yang dahulu tumbuh lebat di wilayah ini, disebut taza-taza atau tar-tar. Zendeling Nicolaas Graafland mencatat asal-usul ini. Ada pula pendapat bahwa taza-taza adalah tanaman rawa yang tumbuh subur di sepanjang saluran Kemer, aliran air yang melintasi tengah Taratara.";

export const timeline = [
  { year: "1701", text: "Keluarga perintis dari Sarongsong membuka Taratara sebagai negeri baru atas izin Kepala Walak Tombariri. Dotu Tulong menjadi tonaas um wanua sekaligus walian pertama, lalu digantikan Kalangi sekitar tahun 1720-an.", source: "kojongian" },
  { year: "1789", text: "Pada masa kepemimpinan Lontoh, batas wilayah Taratara ditetapkan hingga lereng selatan Gunung Lokon.", source: "kojongian" },
  { year: "1819", text: "Pemerintah kolonial mewajibkan warga menanam kopi. Hasilnya dikumpulkan di gudang Tanawangko, dan pada akhir abad ke-19 Taratara memiliki gudang kopi sendiri.", source: "kojongian" },
  { year: "1909", text: "Sebuah waruga, makam batu khas Minahasa, dari Taratara dibawa ke Belanda dan menjadi koleksi museum etnografi di Leiden.", source: "kojongian" },
  { year: "1955", text: "Taratara memisahkan diri dari Tombariri dan bergabung dengan Tomohon.", source: "kojongian" },
  { year: "2004", text: "Kecamatan Tomohon Barat diresmikan pada 25 Agustus 2004 melalui Perda Nomor 1 Tahun 2004. Taratara Dua menjadi satu dari lima kelurahan pertamanya.", source: "kecamatan" },
  { year: "2010", text: "Pemekaran menambah Kelurahan Taratara dan Taratara Tiga, sehingga Tomohon Barat kini terdiri dari delapan kelurahan dan 65 lingkungan.", source: "bps" },
];

export const government = [
  { label: "Wilayah administrasi", value: "8 lingkungan", source: "papan" },
  { label: "Kecamatan", value: "Tomohon Barat, Kota Tomohon", source: "kecamatan" },
  { label: "Kode pos", value: "95424", source: "kecamatan" },
];

export const landscape = [
  { title: "Iklim", text: "Tropis basah tipe B. Musim hujan berlangsung sekitar September sampai Januari, musim kemarau sekitar Februari sampai Agustus.", source: "kecamatan" },
  { title: "Lahan", text: "Sekitar 70 persen wilayah Kecamatan Tomohon Barat adalah lahan pertanian. Taratara Dua memiliki 75 hektare sawah dengan irigasi sederhana.", source: "bps" },
  { title: "Air", text: "Saluran Kemer mengalir di tengah Taratara dan menjadi sumber air bagi sawah serta kolam ikan warga.", source: "kojongian" },
];

export const society = [
  { title: "Mata pencaharian", text: "Pada 2015 tercatat 206 petani, 121 buruh tani, dan 90 pegawai negeri sipil di Taratara Dua.", source: "bps" },
  { title: "Kesehatan", text: "Layanan kesehatan warga didukung 5 perawat dan 1 bidan (data 2015).", source: "bps" },
  { title: "Kehidupan jemaat", text: "Gereja GMIM Imanuel berdiri di lokasi permukiman para perintis, tepat di perbatasan Taratara I dan Taratara II.", source: "kojongian" },
  { title: "Budaya", text: "Warga menuturkan bahasa Tombulu dialek Taratara dan menjaga tradisi mapalus, kerja bersama dalam bertani maupun acara keluarga.", source: "kojongian" },
];

export const pending = ["Jumlah kepala keluarga dan data kependudukan 2024 atau lebih baru","Nama Kepala Seksi Pemerintahan, Ketenteraman dan Ketertiban serta Kepala Seksi Kesejahteraan Rakyat", "Visi dan misi kelurahan"];
