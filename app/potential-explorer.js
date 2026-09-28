"use client";

import Image from "next/image";
import Link from "next/link";
import { Cow, Drop, Fish, Grains, TreePalm } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { cycle, potentials } from "@/lib/potentials";

const icons = { padi: Grains, perikanan: Fish, kelapa: TreePalm, peternakan: Cow, irigasi: Drop };

function Icon({ id }) {
  const Glyph = icons[id];
  return <Glyph size={18} weight="regular" aria-hidden="true" />;
}

export default function PotentialExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const item = potentials[active];

  const onKeyDown = (event) => {
    const keys = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 };
    let next = null;
    if (event.key in keys) next = (active + keys[event.key] + potentials.length) % potentials.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = potentials.length - 1;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="potential">
      <div className="potential-tabs" role="tablist" aria-label="Pilih potensi wilayah" onKeyDown={onKeyDown}>
        {potentials.map((potential, index) => (
          <button
            key={potential.slug}
            ref={(node) => { tabs.current[index] = node; }}
            id={`potensi-tab-${potential.slug}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="potensi-panel"
            tabIndex={index === active ? 0 : -1}
            onClick={() => setActive(index)}
          >
            <Icon id={potential.slug} />
            {potential.title}
          </button>
        ))}
      </div>

      <div className="potential-stage" id="potensi-panel" role="tabpanel" aria-labelledby={`potensi-tab-${item.slug}`}>
        <figure className="potential-media">
          <div>
            {potentials.map((potential, index) => (
              <Image
                key={potential.slug}
                className={index === active ? "active" : ""}
                src={potential.image}
                alt={index === active ? potential.alt : ""}
                fill
                sizes="(max-width: 800px) 100vw, 52vw"
                style={{ objectPosition: potential.position }}
              />
            ))}
          </div>
          <figcaption>{item.photo ? "Dokumentasi Tim KKT Unsrat 149" : "Foto ilustrasi"}</figcaption>
        </figure>

        <div className="potential-detail" key={item.slug}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <dl>
            <div>
              <dt>Hasil dan manfaat</dt>
              <dd>{item.outputs.map((output, index) => (index ? output[0].toLowerCase() + output.slice(1) : output)).join(", ")}</dd>
            </div>
            <div>
              <dt>Kegiatan utama</dt>
              <dd>{item.activities.join(" → ")}</dd>
            </div>
          </dl>
          <div className="potential-links">
            <Link href={`/potensi/${item.slug}`}>Selengkapnya tentang {item.title.toLowerCase()} →</Link>
            {item.cta && <a href={item.cta.href}>{item.cta.label} →</a>}
          </div>
          <p className="potential-note">Luas lahan, kelompok, dan jumlah pelaku menunggu pendataan bersama kelurahan.</p>
        </div>
      </div>

      <p className="potential-cycle">
        <strong>Saling terhubung.</strong> {cycle.join(" → ")}
      </p>
    </div>
  );
}
