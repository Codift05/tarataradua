import Image from "next/image";
import Link from "next/link";
import { divisions, leaders, memberCount, supervisors } from "@/lib/kkt-team";
import { SiteFooter, SiteHeader } from "../site-chrome";

export const metadata = {
  title: "Tim KKT Unsrat Angkatan 149",
  description: "Mahasiswa KKT Universitas Sam Ratulangi Angkatan 149 Posko Taratara 2, Kecamatan Tomohon Barat, yang membangun portal ini bersama Kelurahan Taratara II.",
  openGraph: { title: "Tim KKT Unsrat Angkatan 149, Posko Taratara 2", images: ["/tim-kkt/cutout/sultan.webp"] },
};

function Member({ member, size = "sm", priority = false }) {
  return (
    <figure className={`team-card team-card-${size}`}>
      <div className="team-photo">
        <Image
          src={`/tim-kkt/cutout/${member.photo}.webp`}
          alt={`Foto ${member.name}`}
          fill
          preload={priority}
          sizes="(max-width: 900px) 50vw, 240px"
        />
      </div>
      <figcaption>
        <strong>{member.name}</strong>
        <span className={member.role === "Koordinator" ? "team-role-lead" : undefined}>{member.role}</span>
      </figcaption>
    </figure>
  );
}

export default function TeamPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <article className="section shell team-page">
          <Link className="back-link" href="/">← Beranda</Link>
          <h1>Tim KKT Unsrat Angkatan&nbsp;149</h1>
          <p className="team-lead">
            Mahasiswa Universitas Sam Ratulangi yang menjalankan Kuliah Kerja Terpadu di Posko Taratara 2, Kecamatan Tomohon Barat, Kota Tomohon, dan membangun portal ini bersama Kelurahan Taratara II.
          </p>

          <dl className="team-stats">
            <div><dt>Mahasiswa</dt><dd>{memberCount}</dd></div>
            <div><dt>Bidang kerja</dt><dd>{divisions.length}</dd></div>
            <div><dt>Angkatan KKT</dt><dd>149</dd></div>
          </dl>

          <section className="team-block" aria-labelledby="pembimbing">
            <h2 id="pembimbing">Dosen pembimbing</h2>
            <ul className="team-supervisors">
              {supervisors.map((person) => (
                <li key={person.role}>
                  <span>{person.role}</span>
                  <strong>{person.name}</strong>
                </li>
              ))}
            </ul>
          </section>

          <section className="team-block" aria-labelledby="pengurus">
            <h2 id="pengurus">Pengurus posko</h2>
            <div className="team-grid team-grid-leaders">
              {leaders.map((member) => <Member key={member.name} member={member} size="lg" priority />)}
            </div>
          </section>

          {divisions.map((division) => (
            <section className="team-block" key={division.name} aria-labelledby={division.name}>
              <h2 id={division.name}>{division.name}</h2>
              <div className="team-grid">
                {division.members.map((member) => <Member key={member.name} member={member} />)}
              </div>
            </section>
          ))}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
