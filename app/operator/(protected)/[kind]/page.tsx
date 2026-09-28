import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { columnLabels, getContentType } from "@/lib/content";
import { requireOperator } from "@/lib/operator";
import { createClient } from "@/lib/supabase/server";
import { pageCount, pageRange, parsePage } from "@/lib/pagination";
import Pagination from "../pagination";

type Row = Record<string, string | number | boolean | null> & { id: number };

function display(column: string, value: Row[string]) {
  if (column === "active") return <span className={`operator-badge ${value ? "status-selesai" : "status-baru"}`}>{value ? "Tampil" : "Disembunyikan"}</span>;
  if (column === "status") return <span className={`operator-badge status-${String(value).toLowerCase()}`}>{value}</span>;
  if (column === "event_date" && value) return new Intl.DateTimeFormat("id-ID", { dateStyle: "medium" }).format(new Date(String(value)));
  return value || "-";
}

export default async function ContentListPage({ params, searchParams }: { params: Promise<{ kind: string }>; searchParams: Promise<{ saved?: string; deleted?: string; page?: string }> }) {
  // Start the operator check now and await it alongside the data queries; RLS already hides data from non-operators.
  const access = requireOperator();
  const { kind } = await params;
  const type = getContentType(kind);
  if (!type) notFound();
  const query = await searchParams;

  const page = parsePage(query.page);
  const { from, to } = pageRange(page);
  const supabase = await createClient();
  const [, { data, error, count }] = await Promise.all([access, supabase
    .from(type.table)
    .select(["id", ...type.listColumns].join(", "), { count: "exact" })
    .order(type.order.column, { ascending: type.order.ascending })
    .range(from, to)
    .returns<Row[]>()]);

  if (error?.code === "PGRST103") redirect(`/operator/${kind}`);
  const labels = Object.fromEntries(type.fields.map((field) => [field.name, field.label]));
  const [primary, ...rest] = type.listColumns;

  return (
    <>
      <div className="operator-title-row">
        <div><h1>{type.label}</h1><p className="operator-muted">{type.description}</p></div>
        <Link className="operator-primary-button operator-link-button" href={`/operator/${kind}/baru`}>Tambah {type.singular}</Link>
      </div>
      {query.saved && <p className="operator-success" role="status">Perubahan berhasil disimpan.</p>}
      {query.deleted && <p className="operator-success" role="status">Data berhasil dihapus.</p>}

      <section className="operator-panel">
        {error ? (
          <p className="operator-error" role="alert">Data {type.singular} belum dapat dimuat.</p>
        ) : !data?.length ? (
          <div className="operator-empty"><h2>Belum ada {type.singular}</h2><p>Tambahkan data pertama agar tampil di portal publik.</p></div>
        ) : (
          <div className="operator-table-wrap">
            <table>
              <thead><tr>{type.listColumns.map((column) => <th key={column}>{columnLabels[column] || labels[column]}</th>)}<th><span className="sr-only">Aksi</span></th></tr></thead>
              <tbody>{data.map((row) => (
                <tr key={row.id}>
                  <td data-label={labels[primary]}><strong>{row[primary]}</strong></td>
                  {rest.map((column) => <td key={column} data-label={columnLabels[column] || labels[column]}>{display(column, row[column])}</td>)}
                  <td className="operator-row-action"><Link className="operator-detail-link" href={`/operator/${kind}/${row.id}`}>Ubah</Link></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </section>
      <Pagination page={page} pages={pageCount(count)} total={count || 0} basePath={`/operator/${kind}`} />
    </>
  );
}
