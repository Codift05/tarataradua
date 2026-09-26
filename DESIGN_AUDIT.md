# Design Audit

## Portal Digital Kelurahan Taratara II

Mode audit: redesign-preserve. Struktur informasi, anchor, field form, dan alur utama dipertahankan.

Parameter desain:

- Design variance: 3/10
- Motion intensity: 2/10
- Visual density: 5/10
- Sistem visual: native CSS dengan token semantik

## Arah Referensi Visual

Referensi pengguna diterjemahkan menjadi panel putih besar di atas latar hijau pucat, hero fotografi penuh dengan area tenang untuk copy, hijau tua sebagai warna dasar, aksen lime untuk tindakan utama, kartu bergambar tinggi, dan ruang antarseksi yang lapang. Elemen donasi, newsletter, statistik dampak, logo wall, dan kartu lingkungan dari referensi tidak disalin karena tidak mendukung kebutuhan portal kelurahan.

## Yang Dipertahankan

- hero split dengan foto nyata;
- akses cepat setelah hero;
- empat pola section yang berbeda;
- satu aksen hijau;
- radius 14 px;
- tema terang dikunci sesuai arahan visual;
- form aspirasi sebagai satu-satunya Client Component;
- navigasi desktop dan mobile berbasis elemen native.

## Temuan dan Tindakan

| Prioritas | Temuan | Tindakan |
| --- | --- | --- |
| Tinggi | Palet awal berubah gelap mengikuti perangkat | Kunci tema terang dan gunakan hijau sebagai aksen |
| Tinggi | Prototipe dapat disalahartikan sebagai portal resmi | Tambahkan pemberitahuan bahwa konten masih menunggu verifikasi |
| Tinggi | Error field belum terhubung ke input untuk pembaca layar | Tambahkan `aria-invalid` dan `aria-describedby` |
| Sedang | Tautan pengumuman menuju kontak, bukan detail pengumuman | Ganti dengan status noninteraktif sampai detail tersedia |
| Sedang | Beberapa headline terlalu promosi untuk layanan publik | Gunakan copy yang lebih langsung dan fungsional |
| Sedang | Tiga PNG berukuran total sekitar 7,6 MB | Konversi ke WebP dan hapus salinan PNG setelah verifikasi |
| Rendah | Anchor dapat tertutup header sticky | Tambahkan `scroll-margin-top` |

## Hasil Verifikasi

- Production build: lulus
- Test validasi aspirasi: 2 dari 2 lulus
- Lighthouse performance: 97
- Lighthouse accessibility: 100
- Lighthouse best practices: 100
- Lighthouse SEO: 100
- CLS: 0
- Total Blocking Time: 30 ms
- LCP simulasi mobile: 2,6 detik
- LCP teramati pada audit lokal: 103 ms
- Screenshot desktop dan mobile telah diperiksa; tema gelap dinonaktifkan sesuai arahan pengguna

LCP simulasi lokal masih 0,1 detik di atas target PRD. Nilai ini perlu diuji ulang pada deployment Vercel dengan cache produksi sebelum acceptance M1.

## Batas Audit

Audit ini mencakup halaman publik dan form aspirasi M0. Dashboard operator belum ada dan tidak dinilai. Pemeriksaan visual memakai source audit, build produksi, dan aturan responsif; pengujian perangkat nyata tetap diperlukan sebelum M1 dirilis.
