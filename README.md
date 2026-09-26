# Portal Kelurahan Taratara II

MVP portal informasi kelurahan berbasis Next.js. Konten publik tetap dapat dipakai tanpa database. Form aspirasi tersambung ke Supabase jika environment variable sudah diisi.

Ruang lingkup dan acceptance criteria ada di [PRD.md](./PRD.md). Hasil audit antarmuka ada di [DESIGN_AUDIT.md](./DESIGN_AUDIT.md).

## Menjalankan lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`.

## Menyambungkan Supabase

1. Buat project Supabase.
2. Jalankan isi `supabase.sql` melalui SQL Editor.
3. Isi `SUPABASE_URL` dan `SUPABASE_SERVICE_ROLE_KEY` di `.env.local`.
4. Isi `NEXT_PUBLIC_WHATSAPP_NUMBER` dengan format `628...` tanpa tanda baca.

`SUPABASE_SERVICE_ROLE_KEY` hanya dipakai di Route Handler pada server. Jangan ubah namanya menjadi environment variable publik.

## Deploy ke Vercel

Import repository ke Vercel, tambahkan tiga environment variable yang sama, lalu deploy. Gunakan akun organisasi atau akun kelurahan agar serah terima tidak bergantung pada akun pribadi mahasiswa.

## Data yang masih contoh

Tanggal pengumuman, layanan, UMKM, alamat, jam pelayanan, nomor WhatsApp, dan foto perlu diverifikasi bersama pihak kelurahan sebelum situs dipublikasikan. Tiga gambar saat ini merupakan ilustrasi buatan AI, bukan dokumentasi resmi Taratara II.
