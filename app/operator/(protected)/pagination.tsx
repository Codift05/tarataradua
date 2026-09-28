import Link from "next/link";

// Keeps existing query params (such as ?status=) when moving between pages.
export default function Pagination({ page, pages, total, basePath, params = {} }: { page: number; pages: number; total: number; basePath: string; params?: Record<string, string | undefined> }) {
  if (pages <= 1) return null;

  const href = (target: number) => {
    const query = new URLSearchParams(Object.entries(params).filter((entry): entry is [string, string] => Boolean(entry[1])));
    if (target > 1) query.set("page", String(target));
    const text = query.toString();
    return text ? `${basePath}?${text}` : basePath;
  };

  return (
    <nav className="operator-pagination" aria-label="Halaman">
      {page > 1 ? <Link href={href(page - 1)} rel="prev">← Sebelumnya</Link> : <span aria-hidden="true" />}
      <span>Halaman {page} dari {pages} · {total} data</span>
      {page < pages ? <Link href={href(page + 1)} rel="next">Berikutnya →</Link> : <span aria-hidden="true" />}
    </nav>
  );
}
