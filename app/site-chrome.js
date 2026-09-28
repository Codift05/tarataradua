import Image from "next/image";

// Absolute anchors keep the navigation working from /potensi/* as well as the home page.
const links = [
  ["/profil", "Profil"],
  ["/#potensi", "Potensi"],
  ["/#peta", "Peta"],
  ["/#umkm", "UMKM"],
  ["/#informasi", "Informasi"],
  ["/#pelayanan", "Layanan"],
  ["/tim-kkt", "Tim KKT"],
  ["/#aspirasi", "Aspirasi"],
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Portal Taratara II, kembali ke beranda">
        <Image className="brand-mark" src="/logo-kota-tomohon.png" alt="" width={48} height={46} priority />
        <span><strong>Kelurahan Taratara II</strong><small>Kota Tomohon</small></span>
      </a>
      <nav className="desktop-nav" aria-label="Navigasi utama">
        {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
      </nav>
      <details className="mobile-nav">
        <summary>Menu</summary>
        <nav aria-label="Navigasi ponsel">
          {links.map(([href, label]) => <a key={href} href={href}>{label}</a>)}
        </nav>
      </details>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer id="kontak">
      <div className="shell footer-grid">
        <div className="footer-brand">
          <Image className="brand-mark" src="/logo-kota-tomohon.png" alt="Lambang Kota Tomohon" width={56} height={54} />
          <div>
            <strong>Kelurahan Taratara II</strong>
            <p>Kecamatan Tomohon Barat, Kota Tomohon, Sulawesi Utara</p>
          </div>
        </div>
        <div>
          <strong>Jam pelayanan</strong>
          <p>Senin-Jumat, mengikuti jam kerja pemerintah daerah</p>
        </div>
        <div>
          <strong>Kontak</strong>
          <p>Nomor resmi akan ditambahkan setelah verifikasi kelurahan.</p>
        </div>
      </div>
      <div className="shell footer-bottom">
        <a className="footer-credit" href="/tim-kkt">
          <Image src="/logo-kkt-taratara-ii.png" alt="" width={28} height={28} />
          Dikembangkan bersama Tim KKT Unsrat Angkatan 149
        </a>
        <a href="#top">Kembali ke atas</a>
      </div>
    </footer>
  );
}
