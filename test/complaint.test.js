import test from "node:test";
import assert from "node:assert/strict";
import { validateComplaint } from "../lib/complaint.js";

test("validates and cleans a public complaint", () => {
  const result = validateComplaint({
    name: "  Maria Runtuwene  ",
    whatsapp: "0812-3456-7890",
    environment: "Lingkungan 2",
    category: "Jalan",
    location: "Jalan utama dekat kantor kelurahan",
    description: "Terdapat lubang besar yang mengganggu kendaraan warga.",
  });

  assert.equal(result.success, true);
  assert.equal(result.value.name, "Maria Runtuwene");
  assert.equal(result.value.whatsapp, "081234567890");
});

test("rejects unknown categories and short descriptions", () => {
  const result = validateComplaint({
    name: "Maria",
    whatsapp: "081234567890",
    environment: "Lingkungan 2",
    category: "Tidak dikenal",
    location: "Jalan utama",
    description: "Pendek",
  });

  assert.equal(result.success, false);
  assert.equal(Boolean(result.errors.category), true);
  assert.equal(Boolean(result.errors.description), true);
});
