import test from "node:test";
import assert from "node:assert/strict";
import { getPotential, matchesPotential, potentials } from "../lib/potentials.js";

test("potential slugs are unique and resolvable", () => {
  const slugs = potentials.map((potential) => potential.slug);
  assert.equal(new Set(slugs).size, slugs.length);
  assert.equal(getPotential("perikanan").title, "Budidaya ikan");
  assert.equal(getPotential("tidak-ada"), null);
});

test("matches related businesses by keyword", () => {
  const fish = getPotential("perikanan");
  assert.equal(matchesPotential(fish, { name: "Mujair Segar Bu Rina", category: "Perikanan", product: null, description: "Ikan segar hasil kolam." }), true);
  assert.equal(matchesPotential(fish, { name: "Keripik Pisang", category: "Olahan", product: null, description: "Camilan renyah." }), false);
});
