"use client";

import { ChatCircleText, CheckCircle, HourglassMedium, PaperPlaneTilt, Ticket, Tray } from "@phosphor-icons/react";
import { motion, useReducedMotion } from "motion/react";
import { useLayoutEffect, useRef, useState } from "react";

const dashboardSteps = [
  { icon: PaperPlaneTilt, title: "Kirim aspirasi", text: "Isi formulir di samping, tanpa perlu membuat akun." },
  { icon: Ticket, title: "Terima nomor tiket", text: "Simpan nomor tiket untuk menanyakan tindak lanjut." },
  { icon: Tray, title: "Baru", text: "Laporan masuk ke dashboard operator kelurahan." },
  { icon: HourglassMedium, title: "Diproses", text: "Operator memverifikasi dan menindaklanjuti laporan." },
  { icon: CheckCircle, title: "Selesai", text: "Penanganan tuntas dan tercatat di riwayat status." },
];

const whatsAppSteps = [
  { icon: PaperPlaneTilt, title: "Isi formulir", text: "Ceritakan kondisinya di formulir samping, tanpa perlu membuat akun." },
  { icon: Ticket, title: "Kirim lewat WhatsApp", text: "Pesan laporan beserta nomor tiket sudah tersusun, tinggal tekan Kirim." },
  { icon: ChatCircleText, title: "Diterima petugas", text: "Petugas kelurahan membaca laporan dan bisa membalas di chat yang sama." },
  { icon: HourglassMedium, title: "Ditindaklanjuti", text: "Petugas memverifikasi dan menangani kondisi yang dilaporkan." },
  { icon: CheckCircle, title: "Selesai", text: "Penanganan tuntas dan dikabarkan kepada pelapor." },
];

const ease = [0.16, 1, 0.3, 1];

// Explains the complaint lifecycle: the connector draws in once when the list scrolls into view,
// steps enter in order, and a small marker travels the line to show reports moving forward.
export default function ComplaintFlow({ viaWhatsApp = false }) {
  const steps = viaWhatsApp ? whatsAppSteps : dashboardSteps;
  const reduce = useReducedMotion();
  const inView = { once: true, amount: 0.4 };
  const list = useRef(null);
  const [span, setSpan] = useState(null);

  // Run the connector exactly from the first node's centre to the last, whatever the text wraps to.
  useLayoutEffect(() => {
    const measure = () => {
      const nodes = list.current?.querySelectorAll(".flow-node");
      if (!nodes?.length) return;
      // Bounding boxes, not offsetTop: the animated <li> transforms change each node's offsetParent.
      const origin = list.current.parentElement.getBoundingClientRect().top;
      const centre = (node) => {
        const box = node.getBoundingClientRect();
        return box.top + box.height / 2 - origin;
      };
      const first = centre(nodes[0]);
      setSpan({ top: first, height: centre(nodes[nodes.length - 1]) - first });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(list.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="flow">
      {span && (
        // Drawn at its real pixel height so pathLength dashes are not distorted by stretching.
        <svg className="flow-line" style={span} viewBox={`0 0 2 ${span.height}`} aria-hidden="true">
          <path d={`M1 0 V${span.height}`} className="flow-track" />
          <motion.path
            d={`M1 0 V${span.height}`}
            className="flow-progress"
            initial={reduce ? false : { pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={inView}
            transition={{ duration: 1.6, ease }}
          />
        </svg>
      )}
      {!reduce && (
        <motion.span
          className="flow-pulse"
          style={span ? { "--flow-top": `${span.top}px` } : undefined}
          aria-hidden="true"
          initial={{ y: 0, opacity: 0 }}
          whileInView={{ y: [0, span?.height || 0], opacity: [0, 1, 1, 0] }}
          viewport={{ amount: 0.4 }}
          transition={{ duration: 3.2, delay: 1.6, repeat: Infinity, repeatDelay: 1.2, ease: "easeInOut" }}
        />
      )}

      <ol ref={list} aria-label="Alur penanganan aspirasi">
        {steps.map(({ icon: Icon, title, text }, index) => (
          <motion.li
            key={title}
            initial={reduce ? false : { opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.6, delay: 0.15 + index * 0.22, ease }}
          >
            <span className={index === steps.length - 1 ? "flow-node done" : "flow-node"}>
              <Icon size={18} weight={index === steps.length - 1 ? "fill" : "regular"} aria-hidden="true" />
            </span>
            <div>
              <strong>{title}</strong>
              <p>{text}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
