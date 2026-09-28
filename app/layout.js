import { Manrope } from "next/font/google";
import "./globals.css";
import "./reference-theme.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  || (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
  || "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(siteUrl),
  openGraph: {
    siteName: "Portal Kelurahan Taratara II",
    locale: "id_ID",
    type: "website",
    images: ["/desa/sawah-senja.webp"],
  },
  title: {
    default: "Portal Kelurahan Taratara II",
    template: "%s | Taratara II",
  },
  description:
    "Profil, potensi, peta, UMKM, dan layanan warga Kelurahan Taratara II, Tomohon Barat, Sulawesi Utara.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" data-scroll-behavior="smooth">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
