import Link from "next/link";
import { notFound } from "next/navigation";
import { getContentType } from "@/lib/content";
import { requireOperator } from "@/lib/operator";
import { createClient } from "@/lib/supabase/server";
import ContentForm from "../content-form";

const defaults = { active: true, sort_order: 0 };

export default async function ContentEditPage({ params, searchParams }: { params: Promise<{ kind: string; id: string }>; searchParams: Promise<{ error?: string }> }) {
  const { kind, id: rawId } = await params;
  const type = getContentType(kind);
  if (!type) notFound();
  const query = await searchParams;

  const isNew = rawId === "baru";
  const id = Number(rawId);
  if (!isNew && (!Number.isInteger(id) || id < 1)) notFound();

  let values: Record<string, string | number | boolean | null> = defaults;
  if (isNew) {
    await requireOperator();
  } else {
    const supabase = await createClient();
    // The operator check runs alongside the query; RLS already hides drafts and hidden rows from non-operators.
    const [, { data }] = await Promise.all([
      requireOperator(),
      supabase.from(type.table).select(type.fields.map((field) => field.name).join(", ")).eq("id", id).maybeSingle(),
    ]);
    if (!data) notFound();
    values = data as unknown as typeof values;
  }

  return (
    <>
      <Link className="operator-back-link" href={`/operator/${kind}`}>← Kembali ke daftar</Link>
      <div className="operator-title-row operator-detail-title">
        <div><p className="operator-kicker">{type.label}</p><h1>{isNew ? `Tambah ${type.singular}` : `Ubah ${type.singular}`}</h1></div>
      </div>
      {query.error && <p className="operator-error" role="alert">Data belum dapat dihapus. Coba lagi.</p>}
      <ContentForm kind={kind} id={isNew ? undefined : id} values={values} />
    </>
  );
}
