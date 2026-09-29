"use client";

import { cloneElement, useState } from "react";
import { buildReportMessage, toWhatsAppNumber, whatsAppLink } from "@/lib/whatsapp-report";

const initialState = { status: "idle", message: "", ticketNumber: "", errors: {}, forward: "" };

// When the kelurahan WhatsApp number is set, every report ends with a button that opens WhatsApp
// with the report prefilled, so staff receive it in the chat app they already use.
export default function ComplaintForm({ whatsapp }) {
  const target = toWhatsAppNumber(whatsapp);
  const forwardLink = (report, ticket) => (target ? whatsAppLink(target, buildReportMessage(report, ticket)) : "");
  const [state, setState] = useState(initialState);

  async function submit(event) {
    event.preventDefault();
    setState({ ...initialState, status: "loading" });

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("/api/aspirasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (!response.ok) {
        // Validation errors must be fixed first; for server-side failures the report can still go by WhatsApp.
        const serverFailed = response.status >= 500 || response.status === 429;
        setState({
          status: "error",
          message: result.message || "Aspirasi belum dapat dikirim.",
          ticketNumber: "",
          errors: result.errors || {},
          forward: serverFailed ? forwardLink(data) : "",
        });
        return;
      }

      form.reset();
      setState({
        status: "success",
        message: "Aspirasi sudah diterima. Simpan nomor tiket untuk tindak lanjut.",
        ticketNumber: result.ticketNumber,
        errors: {},
        forward: forwardLink(data, result.ticketNumber),
      });
    } catch {
      setState({
        status: "error",
        message: "Koneksi bermasalah. Coba lagi beberapa saat.",
        ticketNumber: "",
        errors: {},
        forward: forwardLink(data),
      });
    }
  }

  return (
    <form className="complaint-form" onSubmit={submit} noValidate aria-busy={state.status === "loading"}>
      <div className="form-grid">
        <Field label="Nama" name="name" error={state.errors.name}>
          <input id="name" name="name" autoComplete="name" maxLength="80" required />
        </Field>
        <Field label="Nomor WhatsApp" name="whatsapp" error={state.errors.whatsapp}>
          <input
            id="whatsapp"
            name="whatsapp"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            placeholder="Contoh: 081234567890"
            required
          />
        </Field>
        <Field label="Lingkungan" name="environment" error={state.errors.environment}>
          <input id="environment" name="environment" maxLength="60" required />
        </Field>
        <Field label="Kategori" name="category" error={state.errors.category}>
          <select id="category" name="category" defaultValue="" required>
            <option value="" disabled>Pilih kategori</option>
            <option>Jalan</option>
            <option>Sampah</option>
            <option>Drainase</option>
            <option>Air</option>
            <option>Lampu jalan</option>
            <option>Fasilitas publik</option>
            <option>Keamanan</option>
            <option>Lainnya</option>
          </select>
        </Field>
      </div>

      <Field label="Lokasi kejadian" name="location" error={state.errors.location}>
        <input id="location" name="location" maxLength="160" required />
      </Field>

      <Field label="Ceritakan kondisi yang dilaporkan" name="description" error={state.errors.description}>
        <textarea id="description" name="description" rows="5" minLength="10" maxLength="1500" required />
      </Field>

      <div className="trap" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex="-1" autoComplete="off" />
      </div>

      <p className="privacy-note">
        Data yang diberikan hanya digunakan untuk tindak lanjut laporan.
      </p>

      {state.status === "error" && (
        <div className="form-message error" role="alert">
          <span>{state.message}</span>
          {state.forward && (
            <>
              <span>Laporan tetap bisa dikirim langsung ke WhatsApp kelurahan.</span>
              <a className="button whatsapp-button" href={state.forward} target="_blank" rel="noreferrer">Kirim ke WhatsApp Kelurahan</a>
            </>
          )}
        </div>
      )}
      {state.status === "success" && (
        <div className="form-message success" role="status">
          <strong>{state.forward ? "Satu langkah lagi." : "Aspirasi terkirim."}</strong>
          <span>Nomor tiket Anda:</span>
          <span className="ticket-number">{state.ticketNumber}</span>
          {state.forward ? (
            <>
              <span>Tekan tombol di bawah, lalu tekan Kirim di WhatsApp agar laporan sampai ke petugas kelurahan.</span>
              <a className="button whatsapp-button" href={state.forward} target="_blank" rel="noreferrer">Kirim ke WhatsApp Kelurahan</a>
            </>
          ) : (
            <span>Simpan nomor ini untuk menanyakan tindak lanjut ke kelurahan.</span>
          )}
        </div>
      )}

      <button className="button primary submit" type="submit" disabled={state.status === "loading"}>
        {state.status === "loading" ? "Mengirim..." : state.status === "success" ? "Kirim laporan baru" : "Kirim aspirasi"}
      </button>
    </form>
  );
}

function Field({ label, name, error, children }) {
  const errorId = name + "-error";

  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {cloneElement(children, {
        "aria-invalid": error ? true : undefined,
        "aria-describedby": error ? errorId : undefined,
      })}
      {error && <span className="field-error" id={errorId}>{error}</span>}
    </div>
  );
}
