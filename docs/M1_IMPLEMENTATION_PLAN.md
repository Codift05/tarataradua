# M1 Backend Implementation Plan

> Status: rencana disetujui untuk dieksekusi pada 26 September 2026.

## 1. Tujuan

Mengubah prototipe publik M0 menjadi fondasi portal operasional M1. Hasil tahap ini harus memungkinkan operator resmi masuk, melihat aspirasi warga, membuka detail laporan, dan mengubah status tanpa membuka data pribadi ke publik.

## 2. Kondisi Awal

- Next.js 16 App Router dan halaman publik sudah berjalan.
- Form aspirasi memiliki validasi server, honeypot, rate limit dasar, nomor tiket, dan penyimpanan Supabase.
- Database baru memiliki tabel `complaints`.
- Belum ada autentikasi operator, otorisasi per peran, dashboard, atau pengelolaan status.
- Kode publik masih JavaScript. TypeScript akan dipakai secara bertahap pada area backend/operator baru agar perubahan tetap kecil dan dapat ditinjau.

## 3. Sasaran Iterasi Ini

### Fungsional

- login dan logout melalui Supabase Auth;
- hanya akun aktif pada `operator_profiles` yang dapat masuk;
- dashboard operator menampilkan ringkasan dan daftar aspirasi;
- filter berdasarkan status;
- halaman detail menjaga data pribadi tetap di area operator;
- operator dapat mengubah status menjadi `Baru`, `Diproses`, atau `Selesai`;
- aktivitas perubahan status dicatat pada audit log.

### Teknis

- TypeScript dipakai pada modul operator baru;
- Supabase SSR menangani sesi menggunakan cookie HTTP-only;
- Row Level Security menjadi batas akses utama;
- service-role tetap hanya digunakan oleh Route Handler server untuk penerimaan aspirasi publik;
- tidak ada ORM, state manager, atau microservice tambahan;
- halaman publik tetap dapat dibuka ketika data operator tidak tersedia.

## 4. Arsitektur Target

```text
Warga
  -> Next.js public page
  -> POST /api/aspirasi
  -> Supabase complaints

Operator
  -> /operator/login
  -> Supabase Auth
  -> operator_profiles authorization
  -> /operator/aspirasi
  -> RLS-protected complaints + complaint_events
```

## 5. Model Data

### operator_profiles

- `id`: UUID yang sama dengan `auth.users.id`;
- `name`: nama operator;
- `role`: `admin` atau `operator`;
- `active`: akses dapat dicabut tanpa menghapus akun;
- timestamp pembuatan dan perubahan.

### complaint_events

- `id`;
- `complaint_id`;
- `operator_id`;
- `previous_status`;
- `new_status`;
- `created_at`.

Tabel aspirasi tetap tertutup untuk publik. Operator terautentikasi hanya mendapat `select` dan perubahan kolom status melalui fungsi database yang memvalidasi nilai serta mencatat audit log dalam satu transaksi.

## 6. Tahapan Eksekusi

### Fase A — Fondasi

- [ ] Tambahkan TypeScript dan library resmi Supabase.
- [ ] Buat klien browser/server dan pembaruan sesi.
- [ ] Tambahkan konfigurasi environment yang diperlukan.

### Fase B — Database dan Keamanan

- [ ] Tambahkan `operator_profiles` dan `complaint_events`.
- [ ] Aktifkan RLS dan policy berbasis operator aktif.
- [ ] Tambahkan fungsi perubahan status yang atomik.
- [ ] Terapkan migrasi ke Supabase dan verifikasi policy.

### Fase C — Akses Operator

- [ ] Buat halaman login.
- [ ] Tolak akun Supabase yang tidak terdaftar sebagai operator aktif.
- [ ] Buat logout dan proteksi seluruh route `/operator`.

### Fase D — Pengelolaan Aspirasi

- [ ] Buat shell dashboard responsif.
- [ ] Tampilkan jumlah laporan per status.
- [ ] Tampilkan daftar dan filter status.
- [ ] Buat halaman detail.
- [ ] Tambahkan perubahan status dan feedback hasil.

### Fase E — Verifikasi dan Pengiriman

- [ ] Jalankan test dan production build.
- [ ] Uji login, daftar, detail, perubahan status, dan logout dengan akun sementara.
- [ ] Hapus data serta akun uji.
- [ ] Perbarui dokumentasi operasional.
- [ ] Commit dan push perubahan secara terstruktur.

## 7. Acceptance Criteria

- pengguna tanpa sesi dialihkan ke login;
- akun Auth tanpa profil operator aktif ditolak;
- operator aktif dapat melihat seluruh aspirasi;
- perubahan status invalid ditolak oleh aplikasi dan database;
- setiap perubahan status menghasilkan satu audit event;
- data aspirasi tidak dapat dibaca menggunakan anon key;
- UI operator dapat dipakai pada desktop dan ponsel;
- test dan `next build` lulus;
- tidak ada secret yang masuk Git.

## 8. Lanjutan Setelah Iterasi Ini

Urutan berikutnya adalah CRUD pengumuman, layanan, dan UMKM; pembacaan konten nyata pada halaman publik; Storage untuk media; lalu deployment produksi, analytics, backup, dan panduan serah terima.

