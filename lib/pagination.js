export const PAGE_SIZE = 20;

/** Parse a ?page= value into a safe 1-based page number. @param {unknown} value */
export function parsePage(value) {
  const page = Number(Array.isArray(value) ? value[0] : value);
  return Number.isInteger(page) && page > 0 ? page : 1;
}

/** Inclusive row range for Supabase `.range(from, to)`. @param {number} page @param {number} [size] */
export function pageRange(page, size = PAGE_SIZE) {
  const from = (page - 1) * size;
  return { from, to: from + size - 1 };
}

/** @param {number | null | undefined} total @param {number} [size] */
export const pageCount = (total, size = PAGE_SIZE) => Math.max(1, Math.ceil((total || 0) / size));
