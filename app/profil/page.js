import Image from "next/image";
import Link from "next/link";
import { gallery, PHOTO_CREDIT } from "@/lib/gallery";
import { boardOfficials, groupOfficials, toRoman } from "@/lib/officials";
import { government, highlights, landscape, nameOrigin, pending, society, sources, summary, timeline } from "@/lib/profile";
import { getOfficials } from "@/lib/public-content";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata = {
  title: "Profil Taratara II",
  description: "Sejarah, pemerintahan, bentang alam, dan kehidupan warga Kelurahan Taratara II, Tomohon Barat, Kota Tomohon.",
  openGraph: { title: "Profil Taratara II", images: ["/desa/permukiman.webp"] },
};

function Cite({ id }) {
  const index = Object.keys(sources).indexOf(id) + 1;
  return <a className="cite" href={`#sumber-${id}`} aria-label={`Sumber ${index}`}>{index}</a>;
}

// Operator saves revalidate on demand; the hourly refresh only catches edits made outside the dashboard.
export const revalidate = 3600;

const Vacant = () => <span className="org-vacant">Menunggu data</span>;

export default async function ProfilePage() {
  const rows = await getOfficials();
  const org = groupOfficials(rows?.length ? rows : boardOfficials);

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
            <div><Image src="/desa/permukiman.webp" alt="Permukiman Taratara II di lembah, dikelilingi perbukitan hijau" fill preload sizes="(max-width: 800px) 100vw, 1200px" /></div>
            <figcaption>{PHOTO_CREDIT}</figcaption>
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
              <div><dt>Lurah</dt><dd>{org.lurah || "Menunggu data"}<Cite id="papan" /></dd></div>
              {government.map((item) => (
                <div key={item.label}><dt>{item.label}</dt><dd>{item.value}<Cite id={item.source} /></dd></div>
              ))}
            </dl>
          </section>

          <section className="profile-block" aria-labelledby="struktur">
            <h2 id="struktur">Struktur organisasi</h2>
            <p className="profile-block-lead">Susunan perangkat Kelurahan Taratara Dua beserta kepala dan wakil kepala di delapan lingkungan.<Cite id="papan" /></p>

            <div className="org">
              <div className="org-office">
                <div className="org-lead">
                  <span>Lurah</span>
                  <strong>{org.lurah || <Vacant />}</strong>
                </div>
                <div className="org-row">
                  <div>
                    <span>Sekretaris</span>
                    <strong>{org.sekretaris || <Vacant />}</strong>
                  </div>
                  {org.seksi.map((item) => (
                    <div key={item.position}>
                      <span>{item.position}</span>
                      <strong>{item.name || <Vacant />}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="org-subhead">Lingkungan</h3>
              <ol className="org-lingkungan">
                {org.lingkungan.map((item) => (
                  <li key={item.number}>
                    <span className="org-number">{toRoman(item.number)}</span>
                    <dl>
                      <div><dt>Kepala</dt><dd>{item.kepala || <Vacant />}</dd></div>
                      <div><dt>Wakil</dt><dd>{item.wakil || <Vacant />}</dd></div>
                    </dl>
                  </li>
                ))}
              </ol>
            </div>
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

          <section className="profile-block" aria-labelledby="galeri">
            <h2 id="galeri">Galeri</h2>
            <p className="profile-block-lead">Sudut-sudut Taratara II yang didokumentasikan Tim KKT Unsrat Angkatan 149.</p>
            <div className="gallery">
              {gallery.map((photo) => (
                <figure key={photo.src}>
                  <Image src={photo.src} alt={photo.caption} width={photo.width} height={photo.height} sizes="(max-width: 640px) 100vw, (max-width: 900px) 50vw, 380px" />
                  <figcaption>{photo.caption}</figcaption>
                </figure>
              ))}
            </div>
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
                <li key={id} id={`sumber-${id}`}>{source.href ? <a href={source.href} target="_blank" rel="noreferrer">{source.label}</a> : source.label}</li>
              ))}
            </ol>
          </section>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
