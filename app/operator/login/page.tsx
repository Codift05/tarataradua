import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOperator } from "@/lib/operator";
import LoginForm from "./login-form";

export const metadata = { title: "Masuk Operator" };

export default async function OperatorLoginPage() {
  if (await getOperator()) redirect("/operator/aspirasi");

  return (
    <main className="operator-login-page">
      <div className="operator-login-visual" aria-hidden="true">
        <Image src="/taratara-hero-v3.webp" alt="" fill priority sizes="(max-width: 900px) 0px, 50vw" />
        <p>Kelurahan Taratara II<span>Kecamatan Tomohon Barat</span></p>
      </div>
      <section className="operator-login-card">
        <Image src="/logo-kkt-taratara-ii.png" alt="Logo Kelurahan Taratara II" width={56} height={56} priority />
        <h1>Masuk ke dashboard</h1>
        <p className="operator-muted">Khusus operator kelurahan. Akun dibuat oleh administrator.</p>
        <LoginForm />
        <Link className="operator-back-link" href="/">← Kembali ke portal</Link>
      </section>
    </main>
  );
}
