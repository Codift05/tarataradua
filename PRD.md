# Product Requirements Document

## Portal Digital Kelurahan Taratara II

| Informasi | Nilai |
| --- | --- |
| Status | Draft 1.0 untuk validasi kelurahan |
| Pemilik produk | Kelurahan Taratara II |
| Pelaksana awal | Tim KKT |
| Lokasi | Kecamatan Tomohon Barat, Kota Tomohon |
| Platform | Website responsif |
| Stack | Next.js, Supabase, Vercel |

## 1. Ringkasan

Portal Digital Kelurahan Taratara II adalah website informasi dan layanan publik sederhana. Portal membantu warga menemukan informasi pelayanan, pengumuman, potensi wilayah, UMKM, kontak kelurahan, serta mengirim aspirasi tanpa membuat akun.

Produk harus tetap berguna ketika operator jarang memperbarui konten, pengelola berganti, dan tim KKT sudah tidak aktif. Karena itu, informasi yang jarang berubah menjadi fondasi produk, sedangkan fitur operasional dibuat sesingkat mungkin.

## 2. Masalah yang Diselesaikan

Warga saat ini berpotensi mengalami beberapa hambatan:

- persyaratan layanan tidak tersedia dalam satu tempat;
- pertanyaan yang sama harus disampaikan berulang melalui chat atau datang langsung;
- pengumuman mudah tersebar di banyak kanal;
- potensi wilayah dan UMKM belum memiliki direktori yang mudah dibagikan;
- aspirasi tidak memiliki format dan nomor referensi yang konsisten.

Perangkat kelurahan juga memiliki keterbatasan waktu dan kemampuan teknis. Produk tidak boleh menambah proses kerja panjang atau membutuhkan developer untuk kegiatan rutin.

## 3. Tujuan Produk

1. Menyediakan sumber informasi resmi yang mudah diakses melalui ponsel.
2. Membantu warga memahami persyaratan layanan sebelum datang ke kantor.
3. Mengurangi pertanyaan berulang melalui informasi yang jelas dan tombol WhatsApp.
4. Memperkenalkan potensi wilayah dan usaha warga.
5. Menyediakan kanal aspirasi dengan data minimum dan nomor tiket.
6. Memungkinkan operator memperbarui konten setelah pelatihan singkat.

## 4. Ukuran Keberhasilan

- Informasi persyaratan layanan ditemukan maksimal dalam 3 interaksi.
- Seluruh informasi publik dapat dibuka tanpa login.
- Tombol kontak membuka WhatsApp dengan pesan yang sesuai.
- Operator dapat menerbitkan pengumuman maksimal dalam 2 menit.
- Operator dapat menambahkan UMKM tanpa bantuan developer.
- Aspirasi valid tersimpan dan menghasilkan nomor tiket.
- Halaman utama dapat digunakan dengan baik pada lebar layar 360 px.
- Halaman utama tampil dalam kurang dari 3 detik pada koneksi seluler normal.
- Tidak ada NIK, scan KTP, scan KK, atau dokumen sensitif yang disimpan.

## 5. Pengguna

### Warga

Kebutuhan utama:

- melihat persyaratan dan alur layanan;
- membaca pengumuman;
- menemukan kontak dan lokasi kantor;
- mengenali potensi wilayah dan UMKM;
- mengirim aspirasi atau laporan fasilitas publik.

Warga tidak perlu membuat akun.

### Operator Kelurahan

Kebutuhan utama:

- menerbitkan dan mengarsipkan pengumuman;
- memperbarui informasi layanan;
- menambah atau menonaktifkan entri UMKM;
- membaca dan mengubah status aspirasi;
- melakukan pekerjaan rutin tanpa mengubah kode.

### Administrator

Kebutuhan utama:

- mengelola akun operator;
- mengatur kontak dan identitas portal;
- memeriksa konfigurasi serta backup.

Peran ini tidak digunakan untuk pekerjaan harian.

## 6. Prinsip Produk

### Berguna meski jarang diperbarui

Profil, layanan, kontak, potensi wilayah, dan direktori UMKM harus tetap bermanfaat tanpa berita baru.

### Mobile first

Alur utama dirancang untuk ponsel, tombol sentuh berukuran cukup, dan teks tidak bergantung pada hover.

### Data minimum

Portal hanya meminta data yang diperlukan untuk tindak lanjut. Dokumen identitas tidak masuk ruang lingkup MVP.

### Kanal yang sudah dikenal

Pertanyaan layanan diarahkan ke WhatsApp. Portal tidak membuat sistem chat baru.

### Satu codebase

Website publik, API, dan dashboard operator menggunakan satu proyek Next.js. Tidak ada microservice pada MVP.

### Konten terverifikasi

Data contoh dan ilustrasi tidak boleh ditampilkan sebagai fakta resmi. Konten produksi wajib disetujui pihak kelurahan.

## 7. Tahapan Rilis

### M0: Prototipe teruji

Status saat ini:

- halaman utama responsif;
- navigasi dan akses cepat;
- contoh struktur layanan, pengumuman, potensi, dan UMKM;
- form aspirasi dengan validasi;
- API aspirasi dan skema Supabase;
- tema terang dikunci agar identitas visual konsisten di semua perangkat;
- konfigurasi build untuk Vercel;
- gambar ilustrasi sementara.

M0 digunakan untuk validasi tampilan dan alur bersama kelurahan. M0 belum boleh dianggap sebagai portal resmi.

### M1: MVP operasional

Wajib selesai sebelum serah terima:

- profil, alamat, jam layanan, peta, dan kontak resmi;
- detail persyaratan serta alur untuk setiap layanan;
- pengumuman dari sumber data nyata;
- direktori UMKM dari hasil pendataan;
- login operator;
- pengelolaan pengumuman, layanan, dan UMKM;
- daftar aspirasi dan perubahan status;
- foto dokumentasi resmi atau ilustrasi yang diberi label;
- domain, analytics minimum, backup, dan akun milik kelurahan;
- panduan operator serta simulasi serah terima.

### M2: Pengembangan setelah kebutuhan terbukti

- unggah foto aspirasi;
- pencarian dan filter lanjutan;
- notifikasi otomatis ke operator;
- riwayat status yang dapat dilihat warga;
- ekspor laporan berkala.

M2 hanya dikerjakan jika penggunaan M1 menunjukkan kebutuhan nyata.

## 8. Ruang Lingkup Fitur M1

### 8.1 Beranda

Beranda menampilkan:

- identitas portal;
- tombol menuju pelayanan dan kontak;
- akses cepat ke pelayanan, pengumuman, UMKM, dan aspirasi;
- ringkasan potensi wilayah;
- maksimal tiga pengumuman terbaru;
- maksimal enam UMKM pilihan;
- alamat, jam pelayanan, dan kontak.

### 8.2 Profil Kelurahan

Konten:

- tentang Taratara II;
- sejarah singkat;
- visi dan misi;
- struktur pemerintahan;
- informasi lingkungan;
- alamat, peta, jam pelayanan, dan kontak.

### 8.3 Pelayanan Administrasi

Setiap layanan memiliki:

- nama;
- deskripsi;
- persyaratan;
- alur;
- estimasi waktu;
- biaya atau keterangan gratis;
- jam pelayanan;
- kontak petugas;
- tombol WhatsApp dengan template pesan.

Layanan awal harus diverifikasi melalui wawancara dan SOP kelurahan.

### 8.4 Potensi Wilayah

Kategori awal:

- pertanian padi;
- perkebunan kelapa;
- peternakan;
- jalur air atau irigasi.

Setiap kategori dapat memiliki deskripsi, foto, lokasi umum, kelompok terkait, dan produk. Data individu tidak ditampilkan tanpa persetujuan.

### 8.5 Direktori UMKM

Setiap entri dapat memiliki:

- nama usaha;
- kategori;
- produk utama;
- deskripsi singkat;
- foto;
- nomor WhatsApp;
- alamat umum;
- tautan peta;
- Instagram atau Facebook;
- status tampil.

Portal hanya menjadi direktori. Tidak ada transaksi atau pembayaran.

### 8.6 Pengumuman

Jenis konten:

- pengumuman;
- agenda;
- informasi pelayanan;
- kegiatan masyarakat.

Operator dapat membuat draft, menerbitkan, dan mengarsipkan pengumuman.

### 8.7 Aspirasi

Data yang diminta:

- nama;
- nomor WhatsApp;
- lingkungan;
- kategori;
- lokasi;
- deskripsi;
- foto opsional pada M2.

Kategori awal:

- jalan;
- sampah;
- drainase;
- air;
- lampu jalan;
- fasilitas publik;
- keamanan;
- lainnya.

Status:

- Baru;
- Diproses;
- Selesai.

Setelah pengiriman berhasil, warga menerima nomor tiket. Nomor tiket bukan bukti bahwa laporan sudah diselesaikan.

## 9. Alur Utama

### Mencari persyaratan layanan

Beranda -> Pelayanan -> Pilih layanan -> Lihat persyaratan atau hubungi petugas.

### Menghubungi kelurahan

Beranda -> Hubungi kelurahan -> WhatsApp terbuka dengan pesan awal.

### Mengirim aspirasi

Beranda -> Aspirasi -> Isi form -> Validasi -> Simpan -> Tampilkan nomor tiket.

### Mengelola aspirasi

Login operator -> Aspirasi -> Buka laporan -> Ubah status -> Simpan.

## 10. Struktur Navigasi

```text
Beranda
├── Profil
├── Pelayanan
├── Potensi
├── UMKM
├── Informasi
├── Aspirasi
└── Kontak
```

Pada M0, bagian tersebut dapat berupa section pada satu halaman. Pada M1, konten panjang dapat memiliki halaman detail tanpa mengubah label navigasi utama.

## 11. Persyaratan UX dan Visual

Karakter desain:

- tepercaya dan ramah;
- sederhana, bukan tampilan aplikasi startup;
- memakai identitas pertanian dan alam secara terkendali;
- fokus pada keterbacaan dan tindakan utama;
- tidak memakai animasi dekoratif.

Parameter desain:

| Parameter | Nilai | Alasan |
| --- | ---: | --- |
| Design variance | 3/10 | Portal publik harus mudah diprediksi |
| Motion intensity | 2/10 | Hanya feedback hover, focus, dan submit |
| Visual density | 5/10 | Cukup ringkas tanpa terasa padat |

Aturan UI:

- satu aksen hijau dengan netral yang konsisten;
- sistem radius 14 px;
- tema terang dikunci agar identitas visual konsisten di semua perangkat;
- kontras minimum WCAG AA;
- fokus keyboard selalu terlihat;
- heading singkat dan copy fungsional;
- foto resmi lebih diutamakan daripada ilustrasi buatan AI;
- ilustrasi sementara harus diberi keterangan yang jujur;
- navigasi desktop tetap satu baris;
- layout multikolom berubah menjadi satu kolom pada ponsel.

## 12. Model Data Minimum

### users

`id`, `name`, `email`, `role`, `created_at`, `updated_at`

Autentikasi dan password dikelola oleh Supabase Auth.

### announcements

`id`, `title`, `slug`, `summary`, `content`, `published_at`, `status`, `author_id`

### services

`id`, `name`, `slug`, `description`, `requirements`, `procedure`, `duration`, `fee`, `contact`, `status`

### businesses

`id`, `name`, `category`, `description`, `whatsapp`, `address`, `maps_url`, `social_url`, `image_url`, `status`

### complaints

`id`, `ticket_number`, `name`, `whatsapp`, `environment`, `category`, `location`, `description`, `status`, `created_at`

### village_profiles

`id`, `section`, `title`, `content`, `updated_at`

## 13. Arsitektur

```text
Browser
   |
   v
Next.js di Vercel
   |
   v
Supabase PostgreSQL, Auth, dan Storage
```

Keputusan teknis:

- Server Components untuk konten publik;
- Client Component hanya untuk interaksi form;
- Route Handler untuk data aspirasi;
- service role key hanya tersedia di server;
- media publik disimpan di Supabase Storage pada M1;
- tidak ada dependency UI atau state management tambahan pada M0.

## 14. Keamanan dan Privasi

- HTTPS melalui hosting produksi;
- validasi input di server;
- batas panjang seluruh input;
- honeypot dan rate limit untuk form publik;
- Row Level Security aktif;
- service role key tidak pernah dikirim ke browser;
- operator memakai akun pribadi, bukan akun bersama jika memungkinkan;
- unggahan dibatasi berdasarkan tipe, ukuran, dan bucket;
- data aspirasi tidak ditampilkan secara publik;
- data tidak digunakan di luar tindak lanjut laporan;
- captcha ditambahkan hanya jika spam tetap terjadi.

Data terlarang pada MVP:

- NIK;
- scan KTP;
- scan KK;
- dokumen administrasi pribadi;
- password yang disimpan sendiri oleh aplikasi.

## 15. Persyaratan Nonfungsional

### Performa

- target LCP kurang dari 2,5 detik;
- target CLS kurang dari 0,1;
- gambar memakai optimasi Next.js;
- halaman publik utama dapat diprerender.

### Aksesibilitas

- struktur heading berurutan;
- label input selalu terlihat;
- error input terhubung secara semantik;
- seluruh fungsi dapat digunakan dengan keyboard;
- target sentuh minimal sekitar 44 px;
- reduced motion dihormati.

### Keandalan

- kegagalan penyimpanan menampilkan pesan yang dapat ditindaklanjuti;
- konten inti tetap tampil jika Supabase tidak tersedia;
- backup database dan prosedur pemulihan didokumentasikan sebelum serah terima.

## 16. Acceptance Criteria M1

- [ ] Seluruh konten produksi telah diverifikasi kelurahan.
- [ ] Tidak ada data contoh yang terlihat sebagai informasi resmi.
- [ ] Persyaratan setiap layanan dapat ditemukan maksimal dalam 3 interaksi.
- [ ] Tombol WhatsApp memakai nomor resmi dan pesan awal yang sesuai.
- [ ] Operator dapat membuat pengumuman dalam maksimal 2 menit.
- [ ] Operator dapat menambah dan menonaktifkan UMKM.
- [ ] Aspirasi valid tersimpan dan menghasilkan nomor tiket.
- [ ] Operator dapat mengubah status aspirasi.
- [ ] Form menolak input tidak valid dan membatasi spam dasar.
- [ ] Website lolos pemeriksaan mobile, keyboard, kontras dan reduced motion.
- [ ] Production build dan test otomatis lulus.
- [ ] Akun Vercel, Supabase, domain, dan repository dapat diserahterimakan.
- [ ] Panduan operator telah diuji melalui simulasi 30-60 menit.

## 17. Di Luar Ruang Lingkup

- database penduduk;
- unggah KTP atau KK;
- penerbitan surat otomatis;
- tanda tangan elektronik;
- pembayaran;
- aplikasi Android atau iOS;
- chatbot AI;
- dashboard statistik kompleks;
- workflow persetujuan bertingkat;
- inventaris dan keuangan kelurahan;
- transaksi UMKM.

## 18. Data yang Harus Diverifikasi

Sebelum M1 dikerjakan, tim perlu memperoleh:

- logo dan identitas resmi;
- alamat lengkap serta tautan peta;
- jam pelayanan;
- nomor WhatsApp resmi;
- daftar layanan dan SOP;
- nama serta jabatan perangkat yang boleh ditampilkan;
- daftar lingkungan;
- mekanisme tindak lanjut aspirasi;
- daftar UMKM dan izin publikasi kontak;
- foto dokumentasi yang boleh digunakan;
- operator utama dan operator cadangan.

## 19. Handover

Kelurahan menerima:

- akses repository;
- akses Vercel;
- akses Supabase;
- akses domain;
- akun administrator dan operator;
- panduan memperbarui konten;
- panduan backup dan pemulihan;
- daftar environment variable tanpa menulis secret di dokumen;
- hasil test dan checklist acceptance;
- kontak penanggung jawab selama masa transisi.

Semua layanan produksi harus memakai akun yang dapat dialihkan ke kelurahan. Credential tidak boleh hanya tersimpan di akun pribadi anggota KKT.
