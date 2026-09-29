// MapLibre v6 runs map decoding (including 3D terrain) in a module worker that imports
// maplibre-gl-shared.mjs next to it. Next's bundler does not emit those files, so copy both
// into public/maplibre/ before dev and build; app/village-map.js points setWorkerUrl there.
import { copyFileSync, mkdirSync } from "node:fs";

const from = "node_modules/maplibre-gl/dist";
const to = "public/maplibre";
mkdirSync(to, { recursive: true });
for (const file of ["maplibre-gl-worker.mjs", "maplibre-gl-shared.mjs"]) copyFileSync(`${from}/${file}`, `${to}/${file}`);
