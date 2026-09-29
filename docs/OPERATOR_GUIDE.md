# Panduan Operator Portal Taratara II

## Akses

Dashboard tersedia di `/operator/login`. Setiap operator memakai akun Supabase Auth pribadi dan harus memiliki profil aktif pada `public.operator_profiles`.

Alamat login sengaja tidak ditautkan dari portal publik dan ditandai `noindex` agar tidak muncul di mesin pencari. Bagikan alamatnya hanya kepada operator. Tidak ada pendaftaran mandiri; akun yang tidak memiliki profil operator aktif akan ditolak, dan setelah 5 percobaan gagal dalam 15 menit dari alamat IP yang sama, login dikunci sementara.

## Menyiapkan Operator Pertama

Cara tercepat dari komputer yang memiliki `.env.local`:

```bash
npm run operator:create -- operator@example.com "Nama Operator" admin
npm run operator:create -- namapengguna "Nama Operator" operator
```

Argumen pertama boleh berupa email atau username (3-32 huruf kecil, angka, titik, garis bawah, atau tanda hubung). Username disimpan sebagai email internal `namapengguna@operator.taratara2.local` yang tidak menerima surat, sehingga operator cukup mengetik username di halaman login. Akun berbasis username tidak dapat memakai fitur lupa password; reset dilakukan admin dengan menjalankan ulang script.

Script membuat akun Supabase Auth yang sudah terkonfirmasi, mengaktifkan profil operator, lalu menampilkan password sementara satu kali. Isi `OPERATOR_PASSWORD` jika ingin menentukan password sendiri. Menjalankan ulang untuk email yang sama akan mengganti password dan mengaktifkan kembali profilnya.

Cara manual melalui Supabase Dashboard:

1. Buka Supabase Dashboard → Authentication → Users.
2. Tambahkan pengguna menggunakan email pribadi operator dan password sementara yang kuat.
3. Aktifkan konfirmasi email ketika akun dibuat langsung oleh administrator.
4. Jalankan query berikut melalui SQL Editor atau `psql`:

```sql
insert into public.operator_profiles (id, name, role, active)
select id, 'Nama Operator', 'admin', true
from auth.users
where email = 'operator@example.com'
on conflict (id) do update
set name = excluded.name,
    role = excluded.role,
    active = true,
    updated_at = now();
```

Ganti nama dan email sebelum menjalankan query. Gunakan role `operator` untuk petugas biasa dan `admin` untuk penanggung jawab utama.

## Aspirasi Lewat WhatsApp

Aspirasi warga dikirim langsung ke WhatsApp kelurahan. Tombol **Laporkan lewat WhatsApp** di beranda membuka chat ke nomor `NEXT_PUBLIC_WHATSAPP_NUMBER` dengan format laporan (nama, lingkungan, kategori, lokasi, kondisi) yang sudah terisi; warga melengkapinya, dapat melampirkan foto, lalu menekan Kirim. Petugas membalas di chat yang sama. Tidak ada formulir di portal, sehingga menu **Aspirasi** di dashboard tidak lagi menerima laporan baru dan hanya menyimpan laporan lama.

Isi nomor dengan WhatsApp resmi yang dipegang petugas kelurahan (format 08…, 62…, atau +62…), lalu build ulang (di Vercel: Redeploy). Selama nomor kosong, beranda menampilkan keterangan bahwa nomor akan ditambahkan. Nomor yang sama dipakai tombol "Tanya petugas" di bagian Layanan.

## Alur Harian

1. Masuk melalui `/operator/login`.
2. Buka menu **Aspirasi**.
3. Gunakan filter `Baru`, `Diproses`, atau `Selesai`.
4. Buka tiket untuk melihat lokasi, deskripsi, dan kontak pelapor.
5. Hubungi pelapor jika verifikasi diperlukan.
6. Ubah status dan tekan **Simpan status**.
7. Keluar setelah selesai memakai perangkat bersama.

Setiap perubahan status dicatat otomatis di `complaint_events`. Riwayat ini tidak dapat diubah melalui dashboard.

## Mengelola Konten Portal

Menu **Pengumuman**, **Layanan**, dan **UMKM** memakai alur yang sama: buka menu, tekan **Tambah**, isi form, lalu **Simpan**. Pilih **Ubah** pada daftar untuk memperbarui data. Beranda diperbarui otomatis setelah penyimpanan.

- **Pengumuman**: simpan sebagai `Draft` untuk menyiapkan teks, ubah ke `Terbit` agar tampil, dan `Arsip` untuk menurunkannya tanpa menghapus. Beranda menampilkan tiga pengumuman terbit terbaru.
- **Layanan**: tulis satu persyaratan atau satu langkah per baris. Angka **Urutan tampil** yang lebih kecil muncul lebih dulu.
- **UMKM**: cantumkan nomor WhatsApp hanya dengan persetujuan pemilik usaha. Hapus centang **Tampilkan di portal** untuk menyembunyikan usaha tanpa menghapusnya. Beranda menampilkan enam UMKM aktif terbaru.

- **Perangkat**: saat ada pergantian lurah, sekretaris, kepala seksi, atau kepala/wakil kepala lingkungan, tambahkan nama baru dengan jabatan dan nomor lingkungan yang sesuai (0 untuk perangkat kantor), lalu hapus centang **Tampilkan di portal** pada nama lama. Bagan di halaman Profil dan nama lurah di beranda ikut berubah. NIP tidak dicantumkan di portal.

Gunakan **Hapus** hanya untuk data yang salah input; penghapusan tidak dapat dibatalkan.

## Menonaktifkan Akses

Jangan menghapus akun ketika operator hanya berhenti bertugas. Nonaktifkan profil agar riwayat tetap utuh:

```sql
update public.operator_profiles
set active = false, updated_at = now()
where id = (
  select id from auth.users where email = 'operator@example.com'
);
```

## Environment Produksi

Vercel memerlukan:

- `SUPABASE_URL`;
- `SUPABASE_ANON_KEY` untuk sesi operator;
- `SUPABASE_SERVICE_ROLE_KEY` sebagai Secret server-only untuk penerimaan aspirasi;
- `NEXT_PUBLIC_WHATSAPP_NUMBER` setelah nomor resmi tersedia.

`SUPABASE_SERVICE_ROLE_KEY` tidak boleh memakai awalan `NEXT_PUBLIC_`, tidak boleh disalin ke browser, dan tidak boleh masuk Git.

## Migration

Untuk database baru, jalankan berurutan:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/2026092601_operator_backend.sql
```

Kedua file idempotent dan aman dijalankan ulang.

## Pemeriksaan

```bash
npm test
npm run test:integration
npm run build
```

Tes integrasi membuat dua akun dan satu laporan sementara, memeriksa RLS serta audit log, lalu menghapus seluruh data uji secara otomatis.
