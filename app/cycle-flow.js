"use client";

import { Cow, Drop, Fish, Grains, Leaf, Recycle, TreePalm } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const icons = { "Air irigasi": Drop, "Kolam ikan": Fish, "Sawah padi": Grains, "Dedak & jerami": Leaf, Ternak: Cow, "Pupuk kandang": Recycle, "Kebun kelapa": TreePalm };

const ease = [0.16, 1, 0.3, 1];

// Only the node circles scale (around their own centre), so measured centres stay valid while animating.
// Shows how water, ponds, fields, livestock and gardens feed one another. An SVG path is drawn
// through the node centres (a row on desktop, a column on phones), then a marker follows it.
export default function CycleFlow({ steps }) {
  const reduce = useReducedMotion();
  const wrap = useRef(null);
  const [geometry, setGeometry] = useState(null);

  useLayoutEffect(() => {
    const measure = () => {
      const box = wrap.current.getBoundingClientRect();
      const points = [...wrap.current.querySelectorAll(".cycle-node")].map((node) => {
        const rect = node.getBoundingClientRect();
        return [rect.left + rect.width / 2 - box.left, rect.top + rect.height / 2 - box.top];
      });
      const d = points.map(([x, y], index) => `${index ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
      setGeometry({ width: box.width, height: box.height, d });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(wrap.current);
    return () => observer.disconnect();
  }, []);

  const inView = { once: true, amount: 0.5 };

  return (
    <div className="cycle">
      <div className="cycle-head">
        <h3>Saling terhubung</h3>
        <p>Air irigasi menghidupi kolam dan sawah, sisa panen menjadi pakan ternak, dan pupuknya kembali menyuburkan kebun.</p>
      </div>

      <div className="cycle-track" ref={wrap}>
        {geometry && (
          <svg className="cycle-line" viewBox={`0 0 ${geometry.width} ${geometry.height}`} aria-hidden="true">
            <path d={geometry.d} className="cycle-base" />
            <motion.path
              d={geometry.d}
              className="cycle-progress"
              initial={reduce ? false : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={inView}
              transition={{ duration: 2, ease }}
            />
          </svg>
        )}
        {geometry && !reduce && (
          <motion.span
            className="cycle-marker"
            aria-hidden="true"
            style={{ offsetPath: `path("${geometry.d}")` }}
            initial={{ offsetDistance: "0%", opacity: 0 }}
            whileInView={{ offsetDistance: ["0%", "100%"], opacity: [0, 1, 1, 0] }}
            viewport={{ amount: 0.5 }}
            transition={{ duration: 5, delay: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
          />
        )}

        <ol aria-label="Siklus potensi Taratara II">
          {steps.map((step, index) => {
            const Icon = icons[step] || Leaf;
            return (
              <motion.li
                key={step}
                initial={reduce ? false : { opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={inView}
                transition={{ duration: 0.55, delay: 0.1 + index * 0.24, ease }}
              >
                <motion.span
                  className="cycle-node"
                  initial={reduce ? false : { scale: 0.6 }}
                  whileInView={{ scale: 1 }}
                  viewport={inView}
                  transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 + index * 0.24 }}
                >
                  <Icon size={20} aria-hidden="true" />
                </motion.span>
                <span className="cycle-label">{step}</span>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
