import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getActiveBusinesses } from "@/lib/public-content";
import { getPotential, matchesPotential, potentials } from "@/lib/potentials";
import { SiteFooter, SiteHeader } from "../../site-chrome";

// Operator saves revalidate on demand; the hourly refresh only catches edits made outside the dashboard.
export const revalidate = 3600;

export function generateStaticParams() {
  return potentials.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const potential = getPotential((await params).slug);
  if (!potential) return {};
  return {
    title: `${potential.title} di Taratara II`,
    description: potential.description,
    openGraph: { title: `${potential.title} di Taratara II`, description: potential.description, images: [potential.image] },
  };
}

const waLink = (number, text) => `https://wa.me/${number.replace(/^0/, "62").replace(/\D/g, "")}?text=${encodeURIComponent(text)}`;

export default async function PotentialPage({ params }) {
  const potential = getPotential((await params).slug);
  if (!potential) notFound();

  const businesses = potential.keywords.length
    ? (await getActiveBusinesses()).filter((business) => matchesPotential(potential, business)).slice(0, 6)
    : [];
  const others = potentials.filter((item) => item.slug !== potential.slug);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="section shell potential-page">
          <Link className="back-link" href="/#potensi">← Semua potensi</Link>
          <h1>{potential.title}</h1>
          <p className="potential-page-lead">{potential.description}</p>

          <figure className="potential-page-media">
            <div>
              <Image src={potential.image} alt={potential.alt} fill preload sizes="(max-width: 800px) 100vw, 1200px" style={{ objectPosition: potential.position }} />
            </div>
            <figcaption>Foto ilustrasi. Dokumentasi asli akan ditambahkan setelah kunjungan lapangan.</figcaption>
          </figure>

          <div className="potential-page-body">
            <div className="potential-page-story">
              {potential.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {potential.cta && <a className="potential-page-cta" href={potential.cta.href}>{potential.cta.label} →</a>}
            </div>
            <dl className="potential-page-facts">
              <div><dt>Hasil dan manfaat</dt><dd><ul>{potential.outputs.map((output) => <li key={output}>{output}</li>)}</ul></dd></div>
              <div><dt>Kegiatan utama</dt><dd><ol>{potential.activities.map((activity) => <li key={activity}>{activity}</li>)}</ol></dd></div>
              <div><dt>Data wilayah</dt><dd>Luas lahan, kelompok, dan jumlah pelaku menunggu pendataan bersama kelurahan.</dd></div>
            </dl>
          </div>

          {potential.keywords.length > 0 && (
            <section className="potential-page-section" aria-labelledby="umkm-terkait">
              <h2 id="umkm-terkait">Produk warga terkait</h2>
              {businesses.length ? (
                <div className="business-list">
                  {businesses.map((business) => (
                    <article key={business.id}>
                      <span>{business.category}</span>
                      <h3>{business.name}</h3>
                      <p>{business.product ? `${business.product}. ` : ""}{business.description}</p>
                      {business.whatsapp && <a href={waLink(business.whatsapp, `Halo, saya melihat ${business.name} di portal Taratara II.`)}>Hubungi via WhatsApp</a>}
                    </article>
                  ))}
                </div>
              ) : (
                <p className="potential-page-empty">Belum ada usaha terkait yang terdaftar. Pelaku usaha dapat menghubungi kelurahan untuk dimasukkan ke direktori.</p>
              )}
            </section>
          )}

          <nav className="potential-page-section" aria-labelledby="potensi-lain">
            <h2 id="potensi-lain">Potensi lainnya</h2>
            <ul className="potential-page-others">
              {others.map((item) => <li key={item.slug}><Link href={`/potensi/${item.slug}`}>{item.title} →</Link></li>)}
            </ul>
          </nav>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
