import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getOperator } from "@/lib/operator";
import LoginForm from "./login-form";

export const metadata = { title: "Login Operator" };

export default async function OperatorLoginPage() {
  if (await getOperator()) redirect("/operator/aspirasi");

  return (
    <main className="operator-login-page">
      <section className="operator-login-card">
        <Image src="/logo-kkt-taratara-ii.png" alt="Logo KKT Taratara II" width={72} height={72} priority />
        <p className="operator-eyebrow">Portal internal kelurahan</p>
        <h1>Login operator</h1>
        <p className="operator-muted">Gunakan akun pribadi yang telah diaktifkan oleh administrator.</p>
        <LoginForm />
        <Link className="operator-back-link" href="/">← Kembali ke portal publik</Link>
      </section>
    </main>
  );
}
