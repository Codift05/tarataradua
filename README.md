# Portal Kelurahan Taratara II

Portal informasi dan layanan publik berbasis Next.js, Supabase, dan Vercel. Halaman publik tetap dapat dibaca tanpa akun, sedangkan aspirasi warga disimpan melalui Route Handler server dan dikelola oleh operator terautentikasi.

Dokumentasi utama:

- [PRD](./PRD.md)
- [Rencana Implementasi M1](./docs/M1_IMPLEMENTATION_PLAN.md)
- [Panduan Operator](./docs/OPERATOR_GUIDE.md)
- [Audit Desain](./DESIGN_AUDIT.md)

## Stack

- Next.js 16 App Router dan React 19;
- JavaScript untuk halaman publik yang stabil;
- TypeScript untuk area backend/operator baru;
- Supabase PostgreSQL, Auth, dan Row Level Security;
- Vercel untuk hosting produksi.

## Menjalankan Lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`. Dashboard operator tersedia di `http://localhost:3000/operator/login`.

## Environment

```text
SUPABASE_URL=
SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

`SUPABASE_SERVICE_ROLE_KEY` hanya dipakai oleh Route Handler server. Jangan menambahkan awalan `NEXT_PUBLIC_` dan jangan memasukkannya ke Git.

## Database

Jalankan skema dasar lalu migration operator:

```bash
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/2026092601_operator_backend.sql
```

Migration menambahkan profil operator, policy RLS, izin update kolom status, dan audit log perubahan status. Cara membuat operator pertama dijelaskan dalam [Panduan Operator](./docs/OPERATOR_GUIDE.md).

## Pemeriksaan

```bash
npm test
npm run test:integration
npm run build
```

`test:integration` memakai Supabase yang dikonfigurasi di `.env.local`. Tes membuat akun dan data sementara lalu membersihkannya otomatis.

## Route Utama

- `/` — portal publik;
- `/api/aspirasi` — penerimaan aspirasi tervalidasi;
- `/operator/login` — autentikasi operator;
- `/operator/aspirasi` — daftar dan filter laporan;
- `/operator/aspirasi/[id]` — detail, status, dan audit log.

## Deploy ke Vercel

Hubungkan repository ke Vercel, tambahkan environment yang sama, lalu deploy. Simpan service-role sebagai Secret Production server-only. Gunakan akun organisasi atau akun kelurahan agar serah terima tidak bergantung pada akun pribadi mahasiswa.

## Data yang Masih Contoh

Tanggal pengumuman, layanan, UMKM, alamat, jam pelayanan, nomor WhatsApp, dan foto harus diverifikasi bersama pihak kelurahan sebelum portal diumumkan sebagai layanan resmi. Gambar yang tersedia saat ini merupakan ilustrasi, bukan dokumentasi resmi Taratara II.
