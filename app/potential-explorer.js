"use client";

import Link from "next/link";
import { Cow, Drop, Fish, Grains, TreePalm } from "@phosphor-icons/react";
import { useRef, useState } from "react";
import { cycle, potentials } from "@/lib/potentials";
import { potentialData } from "@/lib/potential-data";
import CycleFlow from "./cycle-flow";
import PotentialChart from "./potential-chart";

const icons = { padi: Grains, perikanan: Fish, kelapa: TreePalm, peternakan: Cow, irigasi: Drop };

function Icon({ id }) {
  const Glyph = icons[id];
  return <Glyph size={18} weight="regular" aria-hidden="true" />;
}

export default function PotentialExplorer() {
  const [active, setActive] = useState(0);
  const tabs = useRef([]);
  const item = potentials[active];
  const data = potentialData[item.slug];

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
        <div className="potential-visual" key={`chart-${item.slug}`}>
          <PotentialChart chart={data.chart} />
          <dl className="potential-stats">
            {data.stats.map((stat) => (
              <div key={stat.label}><dt>{stat.label}</dt><dd>{stat.value}</dd></div>
            ))}
          </dl>
        </div>

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
          {data.journals.length > 0 && (
            <div className="potential-journals">
              <h4>Bacaan ilmiah</h4>
              <ol>
                {data.journals.map((paper) => (
                  <li key={paper.href}>
                    <a href={paper.href} target="_blank" rel="noreferrer">{paper.title}</a>
                    <span>{paper.authors} ({paper.year}). {paper.journal}.</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
          <div className="potential-links">
            <Link href={`/potensi/${item.slug}`}>Selengkapnya tentang {item.title.toLowerCase()} →</Link>
            {item.cta && <a href={item.cta.href}>{item.cta.label} →</a>}
          </div>
          <p className="potential-note">
            {data.note && <>{data.note} </>}
            Data tingkat kecamatan: <a href={data.source.href} target="_blank" rel="noreferrer">{data.source.label}</a>, tabel {data.source.tables}. Data per kelurahan menunggu pendataan bersama kelurahan.
          </p>
        </div>
      </div>

      <CycleFlow steps={cycle} />
    </div>
  );
}
