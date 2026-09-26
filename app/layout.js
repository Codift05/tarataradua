import { Manrope } from "next/font/google";
import "./globals.css";
import "./reference-theme.css";

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

export const metadata = {
  title: {
    default: "Portal Kelurahan Taratara II",
    template: "%s | Taratara II",
  },
  description:
    "Informasi pelayanan, pengumuman, potensi wilayah, dan UMKM Kelurahan Taratara II.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className={manrope.variable}>{children}</body>
    </html>
  );
}
