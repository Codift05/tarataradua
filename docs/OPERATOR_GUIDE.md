# Panduan Operator Portal Taratara II

## Akses

Dashboard tersedia di `/operator/login`. Setiap operator memakai akun Supabase Auth pribadi dan harus memiliki profil aktif pada `public.operator_profiles`.

## Menyiapkan Operator Pertama

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

## Alur Harian

1. Masuk melalui `/operator/login`.
2. Buka menu **Aspirasi**.
3. Gunakan filter `Baru`, `Diproses`, atau `Selesai`.
4. Buka tiket untuk melihat lokasi, deskripsi, dan kontak pelapor.
5. Hubungi pelapor jika verifikasi diperlukan.
6. Ubah status dan tekan **Simpan status**.
7. Keluar setelah selesai memakai perangkat bersama.

Setiap perubahan status dicatat otomatis di `complaint_events`. Riwayat ini tidak dapat diubah melalui dashboard.

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
