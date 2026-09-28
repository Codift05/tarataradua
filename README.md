# Portal Kelurahan Taratara II

Portal informasi dan layanan publik berbasis Next.js, Supabase, dan Vercel. Halaman publik tetap dapat dibaca tanpa akun, sedangkan aspirasi warga disimpan melalui Route Handler server dan dikelola oleh operator terautentikasi.

Dokumentasi utama:

- [PRD](./PRD.md)
- [Rencana Implementasi M1](./docs/M1_IMPLEMENTATION_PLAN.md)
- [Panduan Operator](./docs/OPERATOR_GUIDE.md)
- [Audit Desain](./DESIGN_AUDIT.md)

## Tech Stack

<p align="left">
  <img src="docs/tech-stack/nextdotjs.png" alt="Next.js" width="40" height="40"> <img src="docs/tech-stack/react.png" alt="React" width="40" height="40"> <img src="docs/tech-stack/typescript.png" alt="TypeScript" width="40" height="40"> <img src="docs/tech-stack/javascript.png" alt="JavaScript" width="40" height="40"> <img src="docs/tech-stack/nodedotjs.png" alt="Node.js" width="40" height="40"> <img src="docs/tech-stack/supabase.png" alt="Supabase" width="40" height="40"> <img src="docs/tech-stack/postgresql.png" alt="PostgreSQL" width="40" height="40"> <img src="docs/tech-stack/jsonwebtokens.png" alt="JWT" width="40" height="40"> <img src="docs/tech-stack/leaflet.png" alt="Leaflet" width="40" height="40"> <img src="docs/tech-stack/openstreetmap.png" alt="OpenStreetMap" width="40" height="40"> <img src="docs/tech-stack/phosphoricons.png" alt="Phosphor Icons" width="40" height="40"> <img src="docs/tech-stack/css.png" alt="CSS" width="40" height="40"> <img src="docs/tech-stack/googlefonts.png" alt="Google Fonts" width="40" height="40"> <img src="docs/tech-stack/vercel.png" alt="Vercel" width="40" height="40"> <img src="docs/tech-stack/git.png" alt="Git" width="40" height="40"> <img src="docs/tech-stack/github.png" alt="GitHub" width="40" height="40">
</p>

### Frontend

| Teknologi | Versi | Peran di proyek |
|---|---|---|
| <img src="docs/tech-stack/nextdotjs.png" alt="Next.js" width="28" height="28" align="absmiddle">&nbsp;**Next.js** | 16.3 (Turbopack) | App Router, Server Components, Server Actions, ISR dengan revalidasi on-demand, `next/image` (AVIF/WebP), `next/font`, dan Proxy untuk sesi operator |
| <img src="docs/tech-stack/react.png" alt="React" width="28" height="28" align="absmiddle">&nbsp;**React** | 19.3 | UI publik dan dashboard; `useActionState` untuk form operator, `cache()` untuk deduplikasi cek sesi per request |
| <img src="docs/tech-stack/typescript.png" alt="TypeScript" width="28" height="28" align="absmiddle">&nbsp;**TypeScript** | 7.0 | Area operator: halaman, Server Actions, helper sesi, pagination |
| <img src="docs/tech-stack/javascript.png" alt="JavaScript (ES2022+)" width="28" height="28" align="absmiddle">&nbsp;**JavaScript (ES2022+)** | - | Halaman publik, validasi konten, data profil dengan JSDoc types |
| <img src="docs/tech-stack/css.png" alt="CSS modern" width="28" height="28" align="absmiddle">&nbsp;**CSS modern** | - | Design token (custom properties), CSS Grid, `color-mix()`, scroll-driven animation (`animation-timeline: view()`), dukungan `prefers-reduced-motion`; tanpa framework CSS |
| <img src="docs/tech-stack/googlefonts.png" alt="Manrope via next/font" width="28" height="28" align="absmiddle">&nbsp;**Manrope via next/font** | - | Tipografi di-self-host saat build, tanpa request ke Google di browser |
| <img src="docs/tech-stack/phosphoricons.png" alt="Phosphor Icons" width="28" height="28" align="absmiddle">&nbsp;**Phosphor Icons** | 2.1 | Ikon potensi wilayah |

### Backend dan Data

| Teknologi | Versi | Peran di proyek |
|---|---|---|
| <img src="docs/tech-stack/supabase.png" alt="Supabase" width="28" height="28" align="absmiddle">&nbsp;**Supabase** | supabase-js 2.117, ssr 0.12 | Auth operator, REST API PostgREST, dan cookie sesi HTTP-only lewat `@supabase/ssr` |
| <img src="docs/tech-stack/postgresql.png" alt="PostgreSQL" width="28" height="28" align="absmiddle">&nbsp;**PostgreSQL** | Supabase | Tabel aspirasi, konten, dan perangkat; Row Level Security; trigger audit log dan `published_at`; constraint yang meniru validasi form |
| <img src="docs/tech-stack/jsonwebtokens.png" alt="JWT ES256" width="28" height="28" align="absmiddle">&nbsp;**JWT ES256** | - | Sesi diverifikasi lokal dengan `getClaims()` terhadap signing key asimetris, tanpa round trip ke server Auth |
| <img src="docs/tech-stack/nodedotjs.png" alt="Node.js" width="28" height="28" align="absmiddle">&nbsp;**Node.js** | 22 | Runtime server, script `operator:create`, dan test runner bawaan `node:test` |

### Peta dan Konten

| Teknologi | Versi | Peran di proyek |
|---|---|---|
| <img src="docs/tech-stack/leaflet.png" alt="Leaflet" width="28" height="28" align="absmiddle">&nbsp;**Leaflet** | 1.9 | Peta interaktif yang dimuat hanya di browser (lazy import) |
| <img src="docs/tech-stack/openstreetmap.png" alt="OpenStreetMap" width="28" height="28" align="absmiddle">&nbsp;**OpenStreetMap** | - | Tile peta dan koordinat fasilitas (lisensi ODbL), tanpa API key |

### Infrastruktur dan Tooling

| Teknologi | Versi | Peran di proyek |
|---|---|---|
| <img src="docs/tech-stack/vercel.png" alt="Vercel" width="28" height="28" align="absmiddle">&nbsp;**Vercel** | - | Hosting, CDN edge, auto-scaling, dan optimasi gambar |
| <img src="docs/tech-stack/git.png" alt="Git" width="28" height="28" align="absmiddle">&nbsp;**Git** | - | Riwayat per fitur dengan Conventional Commits |
| <img src="docs/tech-stack/github.png" alt="GitHub" width="28" height="28" align="absmiddle">&nbsp;**GitHub** | - | Repository dan kolaborasi tim KKT |

### Arsitektur Singkat

- **Rendering:** halaman publik dirender statis dan di-cache (ISR 1 jam); setiap simpan dari dashboard memanggil `updateTag` dan `revalidatePath` sehingga perubahan tampil pada request berikutnya. Halaman publik yang sudah di-cache dilayani dalam hitungan milidetik.
- **Keamanan:** Row Level Security di database sebagai batas akses utama; service-role hanya di Route Handler server; login dibatasi 5 percobaan per 15 menit per IP; halaman operator `noindex`; security headers (`X-Frame-Options`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`).
- **Performa:** query publik di-cache per query dengan tag bersama, kegagalan query diberi jeda 60 detik, cek sesi operator tanpa round trip, pagination 20 baris, gambar WebP dan cache gambar 30 hari.
- **Kualitas:** unit test (`node:test`), integration test terhadap Supabase asli (login, RLS, audit log, publikasi konten), dan audit dependensi tanpa kerentanan.

Logo dari [Simple Icons](https://simpleicons.org) (CC0); setiap merek tetap milik pemiliknya masing-masing.

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
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/2026092602_content_management.sql
psql "$DATABASE_URL" -v ON_ERROR_STOP=1 -f supabase/migrations/2026092801_officials.sql
```

Migration pertama menambahkan profil operator, policy RLS, izin update kolom status, dan audit log perubahan status. Migration kedua menambahkan tabel `announcements`, `services`, dan `businesses`: publik hanya membaca pengumuman berstatus `Terbit` serta layanan/UMKM yang aktif, sedangkan operator aktif dapat mengelola semuanya. Selama tabel konten kosong atau belum tersedia, beranda menampilkan data contoh beserta label pratinjau. Cara membuat operator pertama dijelaskan dalam [Panduan Operator](./docs/OPERATOR_GUIDE.md).

## Peta

Peta beranda memakai Leaflet dan tile OpenStreetMap tanpa API key. Titik lokasi ada di `lib/map-places.js` dan berasal dari data OpenStreetMap. Tambahkan koordinat sawah, kolam ikan, dan kebun kelapa dengan kategori `potensi` setelah survei lapangan (koordinat dapat diambil dari Google Maps: tekan lama pada lokasi, lalu salin angka lintang dan bujurnya).

## Pemeriksaan

```bash
npm test
npm run test:integration
npm run build
```

`test:integration` memakai Supabase yang dikonfigurasi di `.env.local`. Tes membuat akun dan data sementara lalu membersihkannya otomatis.

## Route Utama

- `/` — portal publik;
- `/profil` — profil lengkap: sejarah, pemerintahan, bentang alam, kehidupan warga, dan sumber data;
- `/potensi/[slug]` — detail potensi (padi, perikanan, kelapa, peternakan, irigasi);
- `/api/aspirasi` — penerimaan aspirasi tervalidasi;
- `/operator/login` — autentikasi operator;
- `/operator/aspirasi` — daftar dan filter laporan;
- `/operator/aspirasi/[id]` — detail, status, dan audit log;
- `/operator/pengumuman`, `/operator/layanan`, `/operator/umkm`, `/operator/perangkat` — kelola konten portal dan struktur perangkat.

## Deploy ke Vercel

Hubungkan repository ke Vercel, tambahkan environment yang sama, lalu deploy. Simpan service-role sebagai Secret Production server-only. Gunakan akun organisasi atau akun kelurahan agar serah terima tidak bergantung pada akun pribadi mahasiswa.

## Sumber Data Profil

Isi `lib/profile.js` dikutip dari BPS Kota Tomohon (Statistik Daerah Kecamatan Tomohon Barat 2016, data 2015), situs resmi Kecamatan Tomohon Barat, dan tulisan sejarah Adrianus Kojongian. Setiap fakta menyimpan kunci sumbernya dan ditampilkan sebagai catatan kaki. Perbarui angka ketika kelurahan memberikan data yang lebih baru, dan pindahkan butir dari daftar `pending` setelah datanya tersedia.

## Data yang Masih Contoh

Tanggal pengumuman, layanan, UMKM, alamat, jam pelayanan, nomor WhatsApp, dan foto harus diverifikasi bersama pihak kelurahan sebelum portal diumumkan sebagai layanan resmi. Gambar yang tersedia saat ini merupakan ilustrasi, bukan dokumentasi resmi Taratara II.
