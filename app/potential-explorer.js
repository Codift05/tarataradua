"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { cycle, potentials } from "@/lib/potentials";

const icons = {
  padi: (
    <path d="M12 21V9m0 0c0-3 1.5-5 4-6-.3 3-1.6 5-4 6Zm0 0c0-3-1.5-5-4-6 .3 3 1.6 5 4 6Zm0 5c0-2.4 1.3-4 3.5-4.8-.2 2.4-1.4 4-3.5 4.8Zm0 0c0-2.4-1.3-4-3.5-4.8.2 2.4 1.4 4 3.5 4.8Z" />
  ),
  kelapa: (
    <path d="M12 21c.6-4 .6-8 0-11m0 0C9 7 5.5 6.8 3 8.5 6 8 8.8 8.6 12 10Zm0 0c3-3 6.5-3.2 9-1.5C18 8 15.2 8.6 12 10Zm0 0c-1.5-3.3-4-5-7-5 2.6 1 4.9 2.7 7 5Zm0 0c1.5-3.3 4-5 7-5-2.6 1-4.9 2.7-7 5Z" />
  ),
  perikanan: (
    <path d="M3 12c2.5-3.5 6-5 9.5-5 3.2 0 5.6 1.8 7.5 5-1.9 3.2-4.3 5-7.5 5-3.5 0-7-1.5-9.5-5Zm0 0-1-3m1 3-1 3m14.5-3h.01" />
  ),
  peternakan: (
    <path d="M5 8 3 5m16 3 2-3M7 7h10a2 2 0 0 1 2 2v3a7 7 0 0 1-14 0V9a2 2 0 0 1 2-2Zm2 9h6M9.5 11h.01M14.5 11h.01" />
  ),
  irigasi: (
    <path d="M12 3s5 5.6 5 9.5a5 5 0 0 1-10 0C7 8.6 12 3 12 3Zm-7 17c1.5 0 1.5-1 3-1s1.5 1 3 1 1.5-1 3-1 1.5 1 3 1 1.5-1 3-1" />
  ),
};

function Icon({ id }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      {icons[id]}
    </svg>
  );
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
          <figcaption>Foto ilustrasi</figcaption>
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
