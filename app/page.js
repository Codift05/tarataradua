import Image from "next/image";
import ComplaintForm from "./complaint-form";

const services = [
  { name: "Surat Keterangan Domisili", detail: "Persyaratan identitas dan pengantar lingkungan." },
  { name: "Surat Keterangan Usaha", detail: "Informasi dokumen untuk kebutuhan usaha warga." },
  { name: "Surat Keterangan Tidak Mampu", detail: "Panduan pengajuan dan verifikasi kelurahan." },
  { name: "Surat Kelahiran dan Kematian", detail: "Dokumen pendukung dan alur pelaporan peristiwa." },
];

const announcements = [
  { date: "Menunggu verifikasi", title: "Jadwal pelayanan kantor kelurahan", type: "Pelayanan" },
  { date: "Menunggu verifikasi", title: "Kerja bakti kebersihan lingkungan", type: "Kegiatan" },
  { date: "Menunggu verifikasi", title: "Pendataan UMKM Taratara II", type: "Pengumuman" },
];

const businesses = [
  { name: "Produk olahan kelapa", category: "Contoh kategori", description: "Nama usaha akan ditambahkan setelah pendataan warga." },
  { name: "Hasil pertanian", category: "Contoh kategori", description: "Produk dan kontak akan ditambahkan setelah verifikasi." },
  { name: "Kuliner rumahan", category: "Contoh kategori", description: "Direktori akan diisi bersama pelaku UMKM setempat." },
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const contactHref = whatsapp
  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Halo, saya ingin menanyakan pelayanan Kelurahan Taratara II.")}`
  : "#kontak";

export default function Home() {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="#beranda" aria-label="Portal Taratara II, kembali ke beranda">
          <Image className="brand-mark" src="/logo-kkt-taratara-ii.png" alt="" width={48} height={48} priority />
          <span><strong>Kelurahan Taratara II</strong><small>Kecamatan Tomohon Barat</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Navigasi utama">
          <a href="#pelayanan">Pelayanan</a>
          <a href="#potensi">Potensi</a>
          <a href="#umkm">UMKM</a>
          <a href="#informasi">Informasi</a>
          <a href="#aspirasi">Aspirasi</a>
        </nav>
        <details className="mobile-nav">
          <summary>Menu</summary>
          <nav aria-label="Navigasi ponsel">
            <a href="#pelayanan">Pelayanan</a>
            <a href="#potensi">Potensi</a>
            <a href="#umkm">UMKM</a>
            <a href="#informasi">Informasi</a>
            <a href="#aspirasi">Aspirasi</a>
          </nav>
        </details>
      </header>

      <aside className="prototype-notice">
        <div className="shell">
          <strong>Pratinjau KKT.</strong> Informasi layanan, pengumuman, UMKM, dan kontak masih menunggu verifikasi kelurahan.
        </div>
      </aside>

      <main>
        <section className="hero shell" id="beranda">
          <div className="hero-copy">
            <p className="eyebrow">Portal resmi kelurahan</p>
            <h1>Informasi dan layanan <span>Taratara II</span></h1>
            <p className="hero-lead">Persyaratan layanan, pengumuman, UMKM, dan aspirasi dalam satu portal.</p>
            <div className="actions">
              <a className="button primary" href="#pelayanan">Lihat pelayanan</a>
              <a className="button secondary" href={contactHref}>Hubungi kelurahan</a>
            </div>
          </div>
          <div className="hero-image">
            <Image
              src="/taratara-hero-v3.webp"
              alt="Ilustrasi lanskap sawah, pohon kelapa, dan saluran irigasi di kawasan pegunungan"
              fill
              preload
              quality={65}
              sizes="(max-width: 800px) 100vw, 55vw"
            />
          </div>
        </section>

        <section className="quick-access shell" aria-label="Akses cepat">
          <a href="#pelayanan"><span>Persyaratan dan alur</span><strong>Pelayanan</strong></a>
          <a href="#informasi"><span>Kabar kelurahan</span><strong>Pengumuman</strong></a>
          <a href="#umkm"><span>Produk warga</span><strong>UMKM lokal</strong></a>
          <a href="#aspirasi"><span>Sampaikan laporan</span><strong>Aspirasi</strong></a>
        </section>

        <section className="section shell" id="pelayanan">
          <div className="section-heading">
            <h2>Pelayanan yang mudah dipahami</h2>
            <p>Pilih layanan untuk melihat dokumen yang perlu disiapkan sebelum datang ke kantor kelurahan.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article key={service.name}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.detail}</p>
                </div>
                <a href={contactHref} aria-label={`Tanyakan ${service.name}`}>Tanya petugas</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section potential shell" id="potensi">
          <div className="potential-photo">
            <Image
              src="/padi-irigasi.webp"
              alt="Ilustrasi tanaman padi yang tumbuh di samping saluran irigasi"
              fill
              sizes="(max-width: 800px) 100vw, 50vw"
            />
          </div>
          <div className="potential-copy">
            <h2>Potensi utama Taratara II</h2>
            <p>Pertanian padi, perkebunan kelapa, peternakan, dan irigasi menjadi bagian penting kehidupan warga.</p>
            <div className="potential-items">
              <span>Pertanian padi</span>
              <span>Perkebunan kelapa</span>
              <span>Peternakan</span>
              <span>Jalur irigasi</span>
            </div>
          </div>
        </section>

        <section className="section shell" id="informasi">
          <div className="section-heading compact">
            <h2>Informasi terbaru</h2>
            <p>Pengumuman penting untuk pelayanan dan kegiatan masyarakat.</p>
          </div>
          <div className="announcement-grid">
            {announcements.map((item, index) => (
              <article className={index === 0 ? "featured" : ""} key={item.title}>
                <span>{item.type}</span>
                <h3>{item.title}</h3>
                <p className="announcement-status">{item.date}</p>
                <span className="verification-note">Detail setelah verifikasi</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section business shell" id="umkm">
          <div className="business-image">
            <Image
              src="/produk-umkm.webp"
              alt="Ilustrasi produk lokal berupa kelapa, minyak kelapa, beras, dan keripik pisang"
              fill
              sizes="(max-width: 800px) 100vw, 44vw"
            />
          </div>
          <div className="business-content">
            <h2>Temukan produk usaha warga</h2>
            <p>Kenali produk dan usaha warga Taratara II.</p>
            <div className="business-list">
              {businesses.map((business) => (
                <article key={business.name}>
                  <span>{business.category}</span>
                  <h3>{business.name}</h3>
                  <p>{business.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section complaint shell" id="aspirasi">
          <div className="complaint-intro">
            <h2>Sampaikan aspirasi dengan jelas</h2>
            <p>Laporkan kondisi fasilitas publik atau lingkungan. Operator kelurahan akan menerima laporan untuk ditindaklanjuti.</p>
            <div className="status-flow" aria-label="Alur status aspirasi">
              <span>Baru</span><span>Diproses</span><span>Selesai</span>
            </div>
          </div>
          <ComplaintForm />
        </section>
      </main>

      <footer id="kontak">
        <div className="shell footer-grid">
          <div className="footer-brand">
            <Image className="brand-mark" src="/logo-kkt-taratara-ii.png" alt="" width={56} height={56} />
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
          <span>Portal Informasi Kelurahan Taratara II</span>
          <a href="#beranda">Kembali ke atas</a>
        </div>
      </footer>
    </>
  );
}
