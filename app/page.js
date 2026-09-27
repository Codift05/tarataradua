import Image from "next/image";
import ComplaintForm from "./complaint-form";
import PotentialExplorer from "./potential-explorer";
import { SiteFooter, SiteHeader } from "./site-chrome";
import VillageMap from "./village-map";
import { googleMapsUrl } from "@/lib/map-places";
import { splitLines } from "@/lib/content";
import { getPublicContent } from "@/lib/public-content";

export const revalidate = 300;

const sampleServices = [
  { name: "Surat Keterangan Domisili", description: "Persyaratan identitas dan pengantar lingkungan." },
  { name: "Surat Keterangan Usaha", description: "Informasi dokumen untuk kebutuhan usaha warga." },
  { name: "Surat Keterangan Tidak Mampu", description: "Panduan pengajuan dan verifikasi kelurahan." },
  { name: "Surat Kelahiran dan Kematian", description: "Dokumen pendukung dan alur pelaporan peristiwa." },
];

const sampleAnnouncements = [
  { title: "Jadwal pelayanan kantor kelurahan", category: "Pelayanan" },
  { title: "Kerja bakti kebersihan lingkungan", category: "Kegiatan" },
  { title: "Pendataan UMKM Taratara II", category: "Pengumuman" },
];

const sampleBusinesses = [
  { name: "Produk olahan kelapa", category: "Contoh kategori", description: "Nama usaha akan ditambahkan setelah pendataan warga." },
  { name: "Hasil pertanian", category: "Contoh kategori", description: "Produk dan kontak akan ditambahkan setelah verifikasi." },
  { name: "Kuliner rumahan", category: "Contoh kategori", description: "Direktori akan diisi bersama pelaku UMKM setempat." },
];

// Figures not yet confirmed by the kelurahan stay marked as pending.
const profileFacts = [
  ["Wilayah", "Kecamatan Tomohon Barat, Kota Tomohon"],
  ["Provinsi", "Sulawesi Utara"],
  ["Kode pos", "95423"],
  ["Bertetangga dengan", "Taratara I dan Taratara III"],
  ["Mata pencaharian utama", "Pertanian padi, budidaya ikan, perkebunan kelapa, peternakan"],
  ["Luas wilayah dan penduduk", "Menunggu data kelurahan"],
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const contactHref = whatsapp
  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Halo, saya ingin menanyakan pelayanan Kelurahan Taratara II.")}`
  : "#kontak";

const formatDate = (value) => new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Makassar" }).format(new Date(value));
const waLink = (number, text) => `https://wa.me/${number.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export default async function Home() {
  const content = await getPublicContent();
  const services = content.services?.length ? content.services : sampleServices;
  const announcements = content.announcements?.length ? content.announcements : null;
  const businesses = content.businesses?.length ? content.businesses : sampleBusinesses;
  const usesSamples = services === sampleServices || !announcements || businesses === sampleBusinesses;

  return (
    <>
      <SiteHeader />

      {usesSamples && (
        <aside className="prototype-notice">
          <div className="shell">
            <strong>Pratinjau KKT.</strong> Sebagian informasi layanan, pengumuman, UMKM, dan kontak masih berupa contoh yang menunggu verifikasi kelurahan.
          </div>
        </aside>
      )}

      <main>
        <section className="hero shell" id="beranda">
          <div className="hero-copy">
            <h1>Lembah hijau <span>Taratara II</span></h1>
            <p className="hero-lead">Kelurahan di Tomohon Barat yang hidup dari sawah, kolam ikan, dan kebun kelapa, dialiri air dari pegunungan.</p>
            <div className="actions">
              <a className="button primary" href="#potensi">Jelajahi potensi</a>
              <a className="button secondary" href="#profil">Kenali Taratara II</a>
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
          <a href="#profil"><span>Wilayah dan warga</span><strong>Profil</strong></a>
          <a href="#potensi"><span>Sawah, kolam, kebun</span><strong>Potensi</strong></a>
          <a href="#umkm"><span>Produk warga</span><strong>UMKM lokal</strong></a>
          <a href="#pelayanan"><span>Surat dan aspirasi</span><strong>Layanan warga</strong></a>
        </section>

        <section className="section shell reveal profile" id="profil">
          <div className="profile-copy">
            <h2>Mengenal Taratara&nbsp;II</h2>
            <p>Taratara II adalah kelurahan di Kecamatan Tomohon Barat, Kota Tomohon, Sulawesi Utara. Permukimannya berada di lembah sisi barat kota, bertetangga dengan Taratara I dan Taratara III, dikelilingi sawah, kolam ikan, dan kebun kelapa.</p>
            <p>Kehidupan warga bertumpu pada tanah dan air. Saluran irigasi dari kawasan pegunungan mengairi sawah dan kolam, sementara kebun kelapa dan ternak melengkapi penghasilan keluarga. Seperti daerah Minahasa lainnya, semangat mapalus atau gotong royong masih terasa dalam keseharian warga.</p>
            <a className="profile-link" href="#peta">Lihat lokasi di peta →</a>
          </div>
          <dl className="profile-facts">
            {profileFacts.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </section>

        <section className="section shell reveal" id="potensi">
          <div className="section-heading">
            <h2>Potensi utama Taratara&nbsp;II</h2>
            <p>Pertanian padi, perkebunan kelapa, peternakan, dan irigasi menjadi bagian penting kehidupan warga. Pilih salah satu untuk melihat detailnya.</p>
          </div>
          <PotentialExplorer />
        </section>

        <section className="section shell reveal" id="peta">
          <div className="section-heading">
            <h2>Lokasi Taratara&nbsp;II</h2>
            <p>Taratara II berada di lembah sisi barat Kota Tomohon, berdampingan dengan Taratara I dan Taratara III. Titik sawah, kolam ikan, dan kebun kelapa akan ditambahkan setelah survei lapangan.</p>
          </div>
          <VillageMap />
          <a className="map-link" href={googleMapsUrl} target="_blank" rel="noreferrer">Buka di Google Maps →</a>
        </section>

        <section className="section business shell reveal" id="umkm">
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
                <article key={business.id || business.name}>
                  <span>{business.category}</span>
                  <h3>{business.name}</h3>
                  <p>{business.product ? `${business.product}. ` : ""}{business.description}</p>
                  {business.whatsapp && (
                    <a href={waLink(business.whatsapp, `Halo, saya melihat ${business.name} di portal Taratara II.`)}>Hubungi via WhatsApp</a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section shell reveal" id="informasi">
          <div className="section-heading compact">
            <h2>Informasi terbaru</h2>
            <p>Pengumuman penting untuk pelayanan dan kegiatan masyarakat.</p>
          </div>
          <div className="announcement-grid">
            {announcements ? announcements.map((item, index) => (
              <article className={index === 0 ? "featured" : ""} key={item.id}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p className="announcement-status">{item.summary}</p>
                <span className="verification-note">
                  {item.event_date ? `Tanggal kegiatan ${formatDate(item.event_date)}` : `Diterbitkan ${formatDate(item.published_at)}`}
                </span>
              </article>
            )) : sampleAnnouncements.map((item, index) => (
              <article className={index === 0 ? "featured" : ""} key={item.title}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p className="announcement-status">Menunggu verifikasi</p>
                <span className="verification-note">Detail setelah verifikasi</span>
              </article>
            ))}
          </div>
        </section>

        <section className="section shell reveal" id="pelayanan">
          <div className="section-heading">
            <h2>Pelayanan yang mudah dipahami</h2>
            <p>Pilih layanan untuk melihat dokumen yang perlu disiapkan sebelum datang ke kantor kelurahan.</p>
          </div>
          <div className="service-list">
            {services.map((service) => (
              <article key={service.id || service.name}>
                <div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  {(service.requirements || service.steps || service.duration || service.fee) && (
                    <details className="service-detail">
                      <summary>Lihat persyaratan dan alur</summary>
                      {service.requirements && <><h4>Persyaratan</h4><ul>{splitLines(service.requirements).map((line) => <li key={line}>{line}</li>)}</ul></>}
                      {service.steps && <><h4>Alur</h4><ol>{splitLines(service.steps).map((line) => <li key={line}>{line}</li>)}</ol></>}
                      {(service.duration || service.fee) && (
                        <p className="service-meta">
                          {service.duration && <span>Estimasi: {service.duration}</span>}
                          {service.fee && <span>Biaya: {service.fee}</span>}
                        </p>
                      )}
                    </details>
                  )}
                </div>
                <a href={contactHref} aria-label={`Tanyakan ${service.name}`}>Tanya petugas</a>
              </article>
            ))}
          </div>
        </section>

        <section className="section complaint shell reveal" id="aspirasi">
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

      <SiteFooter />
    </>
  );
}
