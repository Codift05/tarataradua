"use client";

import { motion, useReducedMotion } from "motion/react";
import { HOME_DISTRICT } from "@/lib/potential-data";

const ease = [0.16, 1, 0.3, 1];
const number = (value) => new Intl.NumberFormat("id-ID", { maximumFractionDigits: 1 }).format(value);

// SVG charts for the potential tabs. Bars grow and the trend line draws each time a tab opens;
// hovering or focusing a row dims the others. Reduced motion renders the final state directly.
export default function PotentialChart({ chart }) {
  const reduce = useReducedMotion();
  const grow = (delay) => ({
    initial: reduce ? false : { width: "0%" },
    transition: { duration: 0.9, delay, ease },
  });

  if (chart.type === "trend") return <Trend chart={chart} reduce={reduce} />;

  const totals = chart.rows.map((row) => (row.parts ? row.parts.reduce((a, b) => a + b, 0) : row.value));
  const max = Math.max(...totals) || 1;

  return (
    <figure className="chart">
      <figcaption className="chart-title">{chart.title}</figcaption>
      {chart.legend && (
        <ul className="chart-legend">
          {chart.legend.map((item, index) => <li key={item}><span className={`chart-swatch s${index}`} />{item}</li>)}
        </ul>
      )}
      <ul className="chart-rows">
        {chart.rows.map((row, index) => {
          const home = row.label === HOME_DISTRICT;
          const parts = row.parts || [row.value];
          let offset = 0;
          return (
            <li key={row.label} className={home ? "home" : undefined} tabIndex={0}>
              <span className="chart-label">{row.label}</span>
              <svg className="chart-bar" preserveAspectRatio="none" aria-hidden="true">
                <rect className="chart-track" width="100%" height="100%" rx="6" />
                {parts.map((part, partIndex) => {
                  const x = `${(offset / max) * 100}%`;
                  const width = `${(part / max) * 100}%`;
                  offset += part;
                  return part > 0 ? (
                    <motion.rect
                      key={partIndex}
                      className={`chart-fill s${partIndex}`}
                      x={x}
                      height="100%"
                      rx="6"
                      animate={{ width }}
                      {...grow(0.08 * index + 0.1 * partIndex)}
                    />
                  ) : null;
                })}
              </svg>
              <span className="chart-value">
                {number(totals[index])} <small>{chart.unit}</small>
              </span>
            </li>
          );
        })}
      </ul>
    </figure>
  );
}

function Trend({ chart, reduce }) {
  const W = 600;
  const H = 260;
  const pad = { top: 36, right: 24, bottom: 40, left: 24 };
  const max = Math.max(...chart.rows.map((row) => row.value)) * 1.1;
  const step = (W - pad.left - pad.right) / (chart.rows.length - 1);
  const points = chart.rows.map((row, index) => [pad.left + index * step, pad.top + (1 - row.value / max) * (H - pad.top - pad.bottom)]);
  const line = points.map(([x, y], index) => `${index ? "L" : "M"}${x} ${y}`).join(" ");
  const area = `${line} L${points.at(-1)[0]} ${H - pad.bottom} L${points[0][0]} ${H - pad.bottom} Z`;

  return (
    <figure className="chart">
      <figcaption className="chart-title">{chart.title}</figcaption>
      <svg className="chart-trend" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={chart.rows.map((row) => `${row.label}: ${number(row.value)} ${chart.unit}`).join(", ")}>
        <line x1={pad.left} x2={W - pad.right} y1={H - pad.bottom} y2={H - pad.bottom} className="chart-axis" />
        <motion.path
          d={area}
          className="chart-area"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        />
        <motion.path
          d={line}
          className="chart-line"
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease }}
        />
        {points.map(([x, y], index) => (
          <g key={chart.rows[index].label} className="chart-point">
            <motion.circle
              cx={x}
              cy={y}
              r="7"
              initial={reduce ? false : { scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.2 + index * 0.18 }}
            />
            <text x={x} y={y - 16} textAnchor="middle" className="chart-point-value">{number(chart.rows[index].value)}</text>
            <text x={x} y={H - 12} textAnchor="middle" className="chart-point-label">{chart.rows[index].label}</text>
          </g>
        ))}
      </svg>
      <p className="chart-unit">Dalam {chart.unit}</p>
    </figure>
  );
}
