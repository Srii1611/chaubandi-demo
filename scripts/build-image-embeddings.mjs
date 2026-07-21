/**
 * Build the visual-search index.
 *
 *   npm run build:embeddings
 *
 * Reads the live catalog from Medusa, runs each product photo through CLIP,
 * and writes public/catalog-embeddings.json. The storefront picks that file up
 * automatically (see src/lib/imageSearch.js) and switches image search from
 * colour matching to real visual similarity — no code change needed.
 *
 * Run this once after real product photography is uploaded, and again whenever
 * photos change. The output is a build artifact, not source.
 *
 * ── Requires @xenova/transformers ──
 * It is an optional dependency, because it is large and only this script and
 * the client-side matcher need it:
 *
 *     npm install --save-dev @xenova/transformers
 *
 * If npm hangs on this machine (it has before), fetch the tarball from
 * registry.npmjs.org and extract it into node_modules by hand — see the
 * backend notes on the @types/multer install for the exact steps.
 *
 * The first run downloads the CLIP weights (~150 MB) into node_modules/.cache;
 * later runs are offline.
 */

import fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const BACKEND = (process.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000").replace(/\/$/, "");
const KEY = process.env.VITE_MEDUSA_PUBLISHABLE_KEY || "";
const MODEL = "Xenova/clip-vit-base-patch32";
const OUT = path.join(process.cwd(), "public", "catalog-embeddings.json");

// Placeholder art is one shared SVG per category, so embedding it would make
// every product in a category look identical to the matcher. Skip those:
// a smaller, honest index beats a large meaningless one.
const isRealPhoto = (url) => !!url && !/\.svg(\?|$)/i.test(url) && !/\/static\/placeholders\//.test(url);

async function loadEnvFile() {
  // Vite only injects env vars into the browser bundle, so read .env directly.
  try {
    const raw = await fs.readFile(path.join(process.cwd(), ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim();
    }
  } catch {
    // No .env — rely on the real environment.
  }
}

async function fetchProducts() {
  const key = process.env.VITE_MEDUSA_PUBLISHABLE_KEY || KEY;
  const url = `${process.env.VITE_MEDUSA_BACKEND_URL || BACKEND}/store/products?limit=500&fields=id,handle,title,*images,+metadata`;
  const res = await fetch(url, { headers: { "x-publishable-api-key": key } });
  if (!res.ok) {
    throw new Error(`Could not read the catalog (${res.status}). Is the backend running, and is VITE_MEDUSA_PUBLISHABLE_KEY set?`);
  }
  const { products } = await res.json();
  return products || [];
}

async function main() {
  await loadEnvFile();

  let pipeline;
  try {
    ({ pipeline } = await import("@xenova/transformers"));
  } catch {
    console.error(
      "\n@xenova/transformers is not installed.\n" +
      "  npm install --save-dev @xenova/transformers\n" +
      "Image search keeps working on colour matching until then.\n"
    );
    process.exit(1);
  }

  const products = await fetchProducts();
  const targets = products
    .map((p) => ({ id: p.id, handle: p.handle, title: p.title, url: (p.images || []).map((i) => i.url).find(isRealPhoto) }))
    .filter((p) => p.url);

  const skipped = products.length - targets.length;
  console.log(`Catalog: ${products.length} products · ${targets.length} with real photography · ${skipped} skipped (placeholders)`);

  if (targets.length === 0) {
    console.error(
      "\nNo real product photography found, so there is nothing to index.\n" +
      "Upload real photos first — until then image search correctly falls back\n" +
      "to colour matching.\n"
    );
    process.exit(1);
  }

  console.log(`Loading ${MODEL} (first run downloads ~150 MB)…`);
  const extractor = await pipeline("image-feature-extraction", MODEL);

  const items = [];
  for (const [i, t] of targets.entries()) {
    process.stdout.write(`  [${i + 1}/${targets.length}] ${t.title.slice(0, 44).padEnd(44)}\r`);
    try {
      const out = await extractor(t.url, { pooling: "mean", normalize: true });
      // Round hard: 4dp is well inside CLIP's useful precision and keeps the
      // file small enough to ship to every visitor.
      items.push({
        id: t.id,
        handle: t.handle,
        vector: Array.from(out.data, (v) => Math.round(v * 10000) / 10000),
      });
    } catch (e) {
      console.warn(`\n  ! skipped ${t.handle}: ${e.message}`);
    }
  }

  const payload = {
    model: MODEL,
    dim: items[0]?.vector.length ?? 0,
    generated_at: new Date().toISOString(),
    items,
  };

  await fs.mkdir(path.dirname(OUT), { recursive: true });
  await fs.writeFile(OUT, JSON.stringify(payload));

  const kb = Math.round((await fs.stat(OUT)).size / 1024);
  console.log(`\n\nWrote public/catalog-embeddings.json — ${items.length} vectors, ${payload.dim}d, ${kb} KB`);
  console.log("Image search will now rank by visual similarity.");
}

main().catch((e) => {
  console.error(`\n${e.message}`);
  process.exit(1);
});
