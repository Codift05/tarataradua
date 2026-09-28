import test from "node:test";
import assert from "node:assert/strict";
import { PAGE_SIZE, pageCount, pageRange, parsePage } from "../lib/pagination.js";

test("parses page numbers defensively", () => {
  assert.equal(parsePage("3"), 3);
  assert.equal(parsePage(["2", "9"]), 2);
  for (const bad of [undefined, "0", "-1", "1.5", "abc"]) assert.equal(parsePage(bad), 1);
});

test("computes inclusive ranges and page counts", () => {
  assert.deepEqual(pageRange(1), { from: 0, to: PAGE_SIZE - 1 });
  assert.deepEqual(pageRange(3, 10), { from: 20, to: 29 });
  assert.equal(pageCount(0), 1);
  assert.equal(pageCount(41, 20), 3);
});
