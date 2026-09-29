import test from "node:test";
import assert from "node:assert/strict";
import { reportTemplate, toWhatsAppNumber, whatsAppLink } from "../lib/whatsapp-report.js";

test("normalises Indonesian WhatsApp numbers for wa.me", () => {
  assert.equal(toWhatsAppNumber("0812-3456-7890"), "6281234567890");
  assert.equal(toWhatsAppNumber("+62 812 3456 7890"), "6281234567890");
  assert.equal(toWhatsAppNumber(""), null);
  assert.equal(toWhatsAppNumber("12345"), null);
});

test("links to the kelurahan chat with the report template", () => {
  const link = whatsAppLink("6281234567890", reportTemplate);
  assert.match(link, /^https:\/\/wa\.me\/6281234567890\?text=/);
  assert.match(decodeURIComponent(link), /Lokasi: /);
});
