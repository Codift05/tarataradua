import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { requireOperator } from "@/lib/operator";
import { updateComplaintStatus } from "./actions";

const statuses = ["Baru", "Diproses", "Selesai"];
const date = (value: string) => new Intl.DateTimeFormat("id-ID", { dateStyle: "full", timeStyle: "short", timeZone: "Asia/Makassar" }).format(new Date(value));

export const metadata = { title: "Detail Aspirasi" };

export default async function ComplaintDetailPage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ updated?: string; error?: string }> }) {
  await requireOperator();
  const { id: rawId } = await params;
  const query = await searchParams;
  const id = Number(rawId);
  if (!Number.isInteger(id) || id < 1) notFound();

  const supabase = await createClient();
  const [{ data: complaint }, { data: events }] = await Promise.all([
    supabase.from("complaints").select("*").eq("id", id).maybeSingle(),
    supabase.from("complaint_events").select("id, previous_status, new_status, created_at").eq("complaint_id", id).order("created_at", { ascending: false }),
  ]);

  if (!complaint) notFound();

  return (
    <>
      <Link className="operator-back-link" href="/operator/aspirasi">← Kembali ke daftar</Link>
      <div className="operator-title-row operator-detail-title">
        <div><p className="operator-eyebrow">{complaint.ticket_number}</p><h1>{complaint.category}</h1><p className="operator-muted">Dikirim {date(complaint.created_at)}</p></div>
        <span className={`operator-badge status-${complaint.status.toLowerCase()}`}>{complaint.status}</span>
      </div>
      {query.updated && <p className="operator-success" role="status">Status berhasil diperbarui.</p>}
      {query.error && <p className="operator-error" role="alert">Status belum dapat diperbarui. Coba lagi.</p>}

      <div className="operator-detail-grid">
        <section className="operator-panel operator-report">
          <h2>Isi laporan</h2>
          <dl>
            <div><dt>Pelapor</dt><dd>{complaint.name}</dd></div>
            <div><dt>WhatsApp</dt><dd><a href={`https://wa.me/${complaint.whatsapp.replace(/^0/, "62").replace(/\D/g, "")}`}>{complaint.whatsapp}</a></dd></div>
            <div><dt>Lingkungan</dt><dd>{complaint.environment}</dd></div>
            <div><dt>Lokasi</dt><dd>{complaint.location}</dd></div>
            <div className="full"><dt>Deskripsi</dt><dd>{complaint.description}</dd></div>
          </dl>
        </section>

        <aside className="operator-side-stack">
          <section className="operator-panel">
            <h2>Perbarui status</h2>
            <form action={updateComplaintStatus} className="operator-status-form">
              <input type="hidden" name="id" value={complaint.id} />
              <label htmlFor="status">Status penanganan</label>
              <select id="status" name="status" defaultValue={complaint.status}>{statuses.map((status) => <option key={status}>{status}</option>)}</select>
              <button className="operator-primary-button" type="submit">Simpan status</button>
            </form>
          </section>
          <section className="operator-panel">
            <h2>Riwayat status</h2>
            {!events?.length ? <p className="operator-muted">Belum ada perubahan status.</p> : <ol className="operator-timeline">{events.map((event) => <li key={event.id}><strong>{event.previous_status} → {event.new_status}</strong><span>{date(event.created_at)}</span></li>)}</ol>}
          </section>
        </aside>
      </div>
    </>
  );
}
