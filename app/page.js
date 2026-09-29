import Image from "next/image";
import ComplaintForm from "./complaint-form";
import PotentialExplorer from "./potential-explorer";
import { SiteFooter, SiteHeader } from "./site-chrome";
import VillageMap from "./village-map";
import { googleMapsUrl } from "@/lib/map-places";
import { splitLines } from "@/lib/content";
import { facilities } from "@/lib/facilities";
import { groups, keyFigures, population, statisticsSource } from "@/lib/statistics";
import { boardOfficials, groupOfficials } from "@/lib/officials";
import { getOfficials, getPublicContent } from "@/lib/public-content";

// Operator saves revalidate on demand; the hourly refresh only catches edits made outside the dashboard.
export const revalidate = 3600;

const sampleServices = [
  { name: "Surat Keterangan Domisili", description: "Persyaratan identitas dan pengantar lingkungan." },
  { name: "Surat Keterangan Usaha", description: "Informasi dokumen untuk kebutuhan usaha warga." },
  { name: "Surat Keterangan Tidak Mampu", description: "Panduan pengajuan dan verifikasi kelurahan." },
  { name: "Surat Kelahiran dan Kematian", description: "Dokumen pendukung dan alur pelaporan peristiwa." },
];

// Figures not yet confirmed by the kelurahan stay marked as pending.
const profileFacts = [
  ["Kecamatan", "Tomohon Barat"],
  ["Kota", "Tomohon, Sulawesi Utara"],
  ["Wilayah", "8 lingkungan"],
  ["Sawah beririgasi", "75 hektare"],
  ["Kode pos", "95424"],
];

const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const contactHref = whatsapp
  ? `https://wa.me/${whatsapp}?text=${encodeURIComponent("Halo, saya ingin menanyakan pelayanan Kelurahan Taratara II.")}`
  : "#kontak";

const formatDate = (value) => new Intl.DateTimeFormat("id-ID", { dateStyle: "long", timeZone: "Asia/Makassar" }).format(new Date(value));
const waLink = (number, text) => `https://wa.me/${number.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export default async function Home() {
  const [content, officials] = await Promise.all([getPublicContent(), getOfficials()]);
  const { lurah } = groupOfficials(officials?.length ? officials : boardOfficials);
  const facts = [...profileFacts.slice(0, 2), ["Lurah", lurah || "Menunggu data kelurahan"], ...profileFacts.slice(2)];
  const services = content.services?.length ? content.services : sampleServices;
  const announcements = content.announcements?.length ? content.announcements : null;
  // The UMKM directory only appears once operators have entered real businesses; no sample rows.
  const businesses = content.businesses?.length ? content.businesses : null;
  // Announcements, like UMKM, only render once operators publish real ones.
  const usesSamples = services === sampleServices;

  return (
    <>
      <SiteHeader />

      {usesSamples && (
        <aside className="prototype-notice">
          <div className="shell">
            <strong>Pratinjau KKT.</strong>{" "}
            <span className="notice-long">Sebagian informasi layanan dan kontak masih berupa contoh yang menunggu verifikasi kelurahan.</span>
            <span className="notice-short">Sebagian konten masih contoh.</span>
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
              src="/desa/drone-desa.webp"
              alt="Foto udara Taratara II: permukiman di lembah dikelilingi sawah, kebun kelapa, dan perbukitan"
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
          <a href="#fasilitas"><span>Kantor, sekolah, ibadah</span><strong>Fasilitas</strong></a>
          <a href="#pelayanan"><span>Surat dan aspirasi</span><strong>Layanan warga</strong></a>
        </section>

        <section className="section shell reveal profile" id="profil">
          <div className="profile-copy">
            <h2>Mengenal Taratara&nbsp;II</h2>
            <p>Taratara II adalah kelurahan di Kecamatan Tomohon Barat, Kota Tomohon, Sulawesi Utara. Permukimannya berada di lembah sisi barat kota, bertetangga dengan Taratara I dan Taratara III, dikelilingi sawah, kolam ikan, dan kebun kelapa.</p>
            <p>Kehidupan warga bertumpu pada tanah dan air. Saluran irigasi dari kawasan pegunungan mengairi sawah dan kolam, sementara kebun kelapa dan ternak melengkapi penghasilan keluarga. Seperti daerah Minahasa lainnya, semangat mapalus atau gotong royong masih terasa dalam keseharian warga.</p>
            <a className="profile-link" href="/profil">Baca profil lengkap →</a>
            <a className="profile-link profile-home-link" href="#peta">Lihat peta →</a>
          </div>
          <dl className="profile-facts">
            {facts.map(([label, value]) => (
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

        <section className="section shell reveal" id="fasilitas">
          <div className="section-heading">
            <h2>Fasilitas di Taratara&nbsp;II</h2>
            <p>Tempat-tempat penting bagi warga dan pengunjung, lengkap dengan arah menuju lokasinya.</p>
          </div>
          <div className="facility-grid">
            {facilities.map((facility) => (
              <article className={facility.featured ? "facility featured" : "facility"} key={facility.name}>
                <div className="facility-photo">
                  <Image
                    src={facility.photo}
                    alt={facility.alt}
                    fill
                    sizes={facility.featured ? "(max-width: 800px) 100vw, 780px" : "(max-width: 800px) 100vw, 380px"}
                    style={facility.position ? { objectPosition: facility.position } : undefined}
                  />
                </div>
                <div className="facility-body">
                  <span>{facility.category}</span>
                  <h3>{facility.name}</h3>
                  <p>{facility.description}</p>
                  <a href={facility.mapUrl} target="_blank" rel="noreferrer">Petunjuk arah →</a>
                </div>
              </article>
            ))}
          </div>
        </section>

        {businesses && (
        <section className="section business shell reveal" id="umkm">
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
        )}

        <section className="section shell reveal" id="statistik">
          <div className="section-heading">
            <h2>Taratara&nbsp;II dalam angka</h2>
            <p>Gambaran kelurahan menurut data resmi Badan Pusat Statistik tahun {statisticsSource.year}.</p>
          </div>

          <dl className="stats-key">
            {keyFigures.map((item) => (
              <div key={item.label}>
                <dt>{item.label}</dt>
                <dd>{item.value}<span>{item.unit}</span></dd>
              </div>
            ))}
          </dl>

          <div className="stats-population" aria-label={`Penduduk: ${population.male} laki-laki dan ${population.female} perempuan`}>
            <div className="stats-split" aria-hidden="true">
              <span style={{ flexGrow: population.male }} />
              <span style={{ flexGrow: population.female }} />
            </div>
            <p>
              <span><i className="stats-dot male" />Laki-laki <strong>{population.male.toLocaleString("id-ID")}</strong></span>
              <span><i className="stats-dot female" />Perempuan <strong>{population.female.toLocaleString("id-ID")}</strong></span>
            </p>
          </div>

          <div className="stats-groups">
            {groups.map((group) => (
              <section key={group.title} aria-labelledby={`stat-${group.title}`}>
                <h3 id={`stat-${group.title}`}>{group.title}</h3>
                <dl>
                  {group.items.map((item) => (
                    <div key={item.label}><dt>{item.label}</dt><dd>{item.value}</dd></div>
                  ))}
                </dl>
              </section>
            ))}
          </div>

          <p className="stats-source">
            Sumber: <a href={statisticsSource.href} target="_blank" rel="noreferrer">{statisticsSource.label}</a>, tabel {[...new Set([...keyFigures, ...groups.flatMap((group) => group.items)].map((item) => item.table))].sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join(", ")}. Data tahun {statisticsSource.year}; di publikasi BPS kelurahan ini ditulis Tara-tara Dua.
          </p>
        </section>

        {announcements && (
        <section className="section shell reveal" id="informasi">
          <div className="section-heading compact">
            <h2>Informasi terbaru</h2>
            <p>Pengumuman penting untuk pelayanan dan kegiatan masyarakat.</p>
          </div>
          <div className="announcement-grid">
            {announcements.map((item, index) => (
              <article className={index === 0 ? "featured" : ""} key={item.id}>
                <span>{item.category}</span>
                <h3>{item.title}</h3>
                <p className="announcement-status">{item.summary}</p>
                <span className="verification-note">
                  {item.event_date ? `Tanggal kegiatan ${formatDate(item.event_date)}` : `Diterbitkan ${formatDate(item.published_at)}`}
                </span>
              </article>
            ))}
          </div>
        </section>
        )}

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
            <ol className="status-flow" aria-label="Alur status aspirasi">
              <li><strong>Baru</strong><span>Laporan diterima</span></li>
              <li><strong>Diproses</strong><span>Sedang ditangani</span></li>
              <li><strong>Selesai</strong><span>Penanganan tuntas</span></li>
            </ol>
          </div>
          <ComplaintForm />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
