import Image from "next/image";
import Link from "next/link";
import { requireOperator } from "@/lib/operator";
import { logout } from "./actions";

export default async function OperatorLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const operator = await requireOperator();

  return (
    <div className="operator-app">
      <header className="operator-header">
        <Link className="operator-brand" href="/operator/aspirasi">
          <Image src="/logo-kkt-taratara-ii.png" alt="" width={48} height={48} />
          <span><strong>Operator Taratara II</strong><small>{operator.name}</small></span>
        </Link>
        <nav aria-label="Navigasi operator">
          <Link href="/operator/aspirasi">Aspirasi</Link>
          <Link href="/" target="_blank">Portal publik</Link>
          <form action={logout}><button type="submit">Keluar</button></form>
        </nav>
      </header>
      <main className="operator-main">{children}</main>
    </div>
  );
}
