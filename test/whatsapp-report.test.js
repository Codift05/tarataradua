import test from "node:test";
import assert from "node:assert/strict";
import { buildReportMessage, toWhatsAppNumber, whatsAppLink } from "../lib/whatsapp-report.js";

test("normalises Indonesian WhatsApp numbers for wa.me", () => {
  assert.equal(toWhatsAppNumber("0812-3456-7890"), "6281234567890");
  assert.equal(toWhatsAppNumber("+62 812 3456 7890"), "6281234567890");
  assert.equal(toWhatsAppNumber(""), null);
  assert.equal(toWhatsAppNumber("12345"), null);
});

test("builds a readable report message with the ticket", () => {
  const report = { name: "Warga", whatsapp: "081234567890", environment: "Lingkungan 3", category: "Drainase", location: "Saluran dekat sawah", description: "Saluran tersumbat sampah." };
  const message = buildReportMessage(report, "TRT-ABC123");
  assert.match(message, /Nomor tiket: TRT-ABC123/);
  assert.match(message, /Kategori: Drainase/);
  assert.doesNotMatch(buildReportMessage(report), /Nomor tiket/);
  assert.equal(whatsAppLink("628", "a b"), "https://wa.me/628?text=a%20b");
});
