import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { requireOperator } from "@/lib/operator";

const statuses = ["Baru", "Diproses", "Selesai"] as const;
type Status = typeof statuses[number];

function formatDate(value: string) {
  return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short", timeZone: "Asia/Makassar" }).format(new Date(value));
}

export const metadata = { title: "Aspirasi Warga" };

export default async function ComplaintsPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  await requireOperator();
  const params = await searchParams;
  const activeStatus = statuses.includes(params.status as Status) ? params.status as Status : null;
  const supabase = await createClient();

  let query = supabase
    .from("complaints")
    .select("id, ticket_number, name, environment, category, location, status, created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  if (activeStatus) query = query.eq("status", activeStatus);

  const [listResult, ...countResults] = await Promise.all([
    query,
    ...statuses.map((status) => supabase.from("complaints").select("id", { count: "exact", head: true }).eq("status", status)),
  ]);

  const counts = Object.fromEntries(statuses.map((status, index) => [status, countResults[index].count || 0]));

  return (
    <>
      <div className="operator-title-row">
        <div><h1>Aspirasi masuk</h1><p className="operator-muted">Kelola laporan warga dan perbarui progres penanganannya.</p></div>
        <span className="operator-total">{Object.values(counts).reduce((sum, count) => sum + count, 0)} laporan</span>
      </div>

      <section className="operator-stats" aria-label="Ringkasan aspirasi">
        {statuses.map((status) => <article key={status}><span>{status}</span><strong>{counts[status]}</strong></article>)}
      </section>

      <nav className="operator-filters" aria-label="Filter status">
        <Link className={!activeStatus ? "active" : ""} href="/operator/aspirasi">Semua</Link>
        {statuses.map((status) => <Link className={activeStatus === status ? "active" : ""} key={status} href={`/operator/aspirasi?status=${encodeURIComponent(status)}`}>{status}</Link>)}
      </nav>

      <section className="operator-panel">
        {listResult.error ? (
          <p className="operator-error" role="alert">Data aspirasi belum dapat dimuat.</p>
        ) : !listResult.data?.length ? (
          <div className="operator-empty"><h2>Belum ada laporan</h2><p>Daftar akan terisi setelah warga mengirim aspirasi.</p></div>
        ) : (
          <div className="operator-table-wrap">
            <table>
              <thead><tr><th>Tiket</th><th>Pelapor</th><th>Kategori</th><th>Lokasi</th><th>Waktu</th><th>Status</th><th><span className="sr-only">Aksi</span></th></tr></thead>
              <tbody>{listResult.data.map((item) => (
                <tr key={item.id}>
                  <td data-label="Tiket"><strong>{item.ticket_number}</strong></td>
                  <td data-label="Pelapor">{item.name}<small>{item.environment}</small></td>
                  <td data-label="Kategori">{item.category}</td><td data-label="Lokasi">{item.location}</td><td data-label="Waktu">{formatDate(item.created_at)}</td>
                  <td data-label="Status"><span className={`operator-badge status-${item.status.toLowerCase()}`}>{item.status}</span></td>
                  <td className="operator-row-action"><Link className="operator-detail-link" href={`/operator/aspirasi/${item.id}`}>Buka</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
    </>
  );
}
