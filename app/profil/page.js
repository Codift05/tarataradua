import Image from "next/image";
import Link from "next/link";
import { government, highlights, landscape, nameOrigin, pending, society, sources, summary, timeline } from "@/lib/profile";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata = {
  title: "Profil Taratara II",
  description: "Sejarah, pemerintahan, bentang alam, dan kehidupan warga Kelurahan Taratara II, Tomohon Barat, Kota Tomohon.",
  openGraph: { title: "Profil Taratara II", images: ["/taratara-hero-v3.webp"] },
};

function Cite({ id }) {
  const index = Object.keys(sources).indexOf(id) + 1;
  return <a className="cite" href={`#sumber-${id}`} aria-label={`Sumber ${index}`}>{index}</a>;
}

export default function ProfilePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <article className="section shell profile-page">
          <Link className="back-link" href="/">← Beranda</Link>
          <h1>Profil Taratara&nbsp;II</h1>
          <div className="profile-page-intro">
            {summary.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>

          <dl className="profile-stats">
            {highlights.map((item) => (
              <div key={item.label}>
                <dt>{item.label}<Cite id={item.source} /></dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>

          <figure className="profile-page-media">
            <div><Image src="/taratara-hero-v3.webp" alt="Ilustrasi lembah sawah, pohon kelapa, dan aliran sungai di kaki pegunungan" fill sizes="(max-width: 800px) 100vw, 1200px" /></div>
            <figcaption>Foto ilustrasi. Dokumentasi asli Taratara II akan ditambahkan.</figcaption>
          </figure>

          <section className="profile-block" aria-labelledby="sejarah">
            <h2 id="sejarah">Sejarah</h2>
            <p className="profile-block-lead">{nameOrigin}<Cite id="kojongian" /></p>
            <ol className="timeline">
              {timeline.map((item) => (
                <li key={item.year}>
                  <span>{item.year}</span>
                  <p>{item.text}<Cite id={item.source} /></p>
                </li>
              ))}
            </ol>
          </section>

          <section className="profile-block profile-split" aria-labelledby="pemerintahan">
            <div>
              <h2 id="pemerintahan">Pemerintahan</h2>
              <p className="profile-block-lead">Kelurahan dipimpin oleh seorang lurah dan dibagi ke dalam lingkungan yang masing-masing dikoordinasi kepala lingkungan.</p>
            </div>
            <dl className="profile-facts">
              {government.map((item) => (
                <div key={item.label}><dt>{item.label}</dt><dd>{item.value}<Cite id={item.source} /></dd></div>
              ))}
            </dl>
          </section>

          <section className="profile-block" aria-labelledby="alam">
            <h2 id="alam">Bentang alam</h2>
            <div className="profile-columns">
              {landscape.map((item) => (
                <div key={item.title}><h3>{item.title}</h3><p>{item.text}<Cite id={item.source} /></p></div>
              ))}
            </div>
          </section>

          <section className="profile-block" aria-labelledby="warga">
            <h2 id="warga">Kehidupan warga</h2>
            <div className="profile-grid">
              {society.map((item) => (
                <div key={item.title}><h3>{item.title}</h3><p>{item.text}<Cite id={item.source} /></p></div>
              ))}
            </div>
            <p className="profile-more">
              Lihat juga <Link href="/#potensi">potensi wilayah</Link> dan <Link href="/#peta">peta lokasi</Link>.
            </p>
          </section>

          <section className="profile-block profile-pending" aria-labelledby="menunggu">
            <h2 id="menunggu">Menunggu data kelurahan</h2>
            <p>Informasi berikut akan dilengkapi bersama Kantor Kelurahan Taratara II:</p>
            <ul>{pending.map((item) => <li key={item}>{item}</li>)}</ul>
          </section>

          <section className="profile-block" aria-labelledby="sumber">
            <h2 id="sumber">Sumber</h2>
            <ol className="sources">
              {Object.entries(sources).map(([id, source]) => (
                <li key={id} id={`sumber-${id}`}><a href={source.href} target="_blank" rel="noreferrer">{source.label}</a></li>
              ))}
            </ol>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
