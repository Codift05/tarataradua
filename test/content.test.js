import test from "node:test";
import assert from "node:assert/strict";
import { contentTypes, getContentType, splitLines, validateContent } from "../lib/content.js";

test("validates a published announcement", () => {
  const result = validateContent(contentTypes.pengumuman, {
    title: "  Kerja bakti lingkungan  ",
    category: "Kegiatan",
    summary: "Warga diundang mengikuti kerja bakti hari Sabtu.",
    event_date: "2026-10-03",
    status: "Terbit",
  });

  assert.equal(result.success, true);
  assert.equal(result.value.title, "Kerja bakti lingkungan");
  assert.equal(result.value.body, null);
});

test("rejects unknown options and invalid dates", () => {
  const result = validateContent(contentTypes.pengumuman, {
    title: "Judul",
    category: "Gosip",
    summary: "Ringkasan cukup panjang.",
    event_date: "03/10/2026",
    status: "Terbit",
  });

  assert.equal(result.success, false);
  assert.ok(result.errors.category);
  assert.ok(result.errors.event_date);
});

test("reads FormData, checkboxes, and numbers for services", () => {
  const form = new FormData();
  form.set("name", "Surat Domisili");
  form.set("description", "Surat keterangan tempat tinggal warga.");
  form.set("requirements", "KTP\r\nKartu Keluarga");
  form.set("sort_order", "2");

  const result = validateContent(contentTypes.layanan, form);
  assert.equal(result.success, true);
  assert.equal(result.value.active, false);
  assert.equal(result.value.sort_order, 2);
  assert.deepEqual(splitLines(result.value.requirements), ["KTP", "Kartu Keluarga"]);
});

test("normalizes WhatsApp and requires https links for businesses", () => {
  const result = validateContent(contentTypes.umkm, {
    name: "Kopra Maju",
    category: "Olahan kelapa",
    description: "Minyak kelapa dan kopra dari kebun warga.",
    whatsapp: "0812-3456-7890",
    map_url: "http://maps.example.com",
    active: "on",
  });

  assert.equal(result.success, false);
  assert.ok(result.errors.map_url);
  assert.equal(result.value.whatsapp, "081234567890");
  assert.equal(result.value.active, true);
});

test("only exposes known content kinds", () => {
  assert.equal(getContentType("constructor"), null);
  assert.equal(getContentType("umkm").table, "businesses");
});

test("maps operator usernames to internal login emails", async () => {
  const { toLoginEmail } = await import("../lib/login-id.js");
  assert.equal(toLoginEmail(" Admin "), "admin@operator.taratara2.local");
  assert.equal(toLoginEmail("Operator@Example.com"), "operator@example.com");
  assert.equal(toLoginEmail("ab"), null);
  assert.equal(toLoginEmail("bad name"), null);
});
