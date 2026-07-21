/**
 * Image search for the Chaubandi storefront.
 *
 * Two rankers share one interface:
 *
 *   1. COLOUR + CATEGORY (active today) — reads the dominant colour out of the
 *      uploaded photo in a canvas, snaps it to the seeded palette, and scores
 *      catalog items on colour and garment type. No model, no network, instant.
 *
 *   2. CLIP EMBEDDINGS (activates automatically) — if
 *      /catalog-embeddings.json is present, visual similarity is used instead.
 *      Generate it with `npm run build:embeddings` once real product
 *      photography exists (see scripts/build-image-embeddings.mjs).
 *
 * Ranker 2 is deliberately gated on that file rather than a flag: with the
 * current placeholder catalog every product in a category shares one image, so
 * visual similarity would return arbitrary results. Colour matching over real
 * metadata is the honest answer until photos land.
 *
 * Everything here runs on the shopper's device — the uploaded photo is never
 * sent anywhere.
 */

/* The 12 colours the backend seeder rotates through, with representative RGB
   values. metadata.color on every seeded product is one of these names. */
export const NAMED_COLORS = [
  { name: "Emerald", rgb: [0, 110, 78] },
  { name: "Ruby Red", rgb: [155, 17, 30] },
  { name: "Royal Blue", rgb: [30, 55, 153] },
  { name: "Blush Pink", rgb: [222, 160, 168] },
  { name: "Ivory", rgb: [240, 234, 214] },
  { name: "Gold", rgb: [197, 162, 85] },
  { name: "Deep Maroon", rgb: [92, 20, 34] },
  { name: "Teal", rgb: [20, 108, 112] },
  { name: "Lavender", rgb: [170, 152, 205] },
  { name: "Mustard", rgb: [204, 158, 40] },
  { name: "Peach", rgb: [240, 174, 140] },
  { name: "Black", rgb: [24, 22, 20] },
];

/* ─── Colour extraction ─── */

function rgbToHsl([r, g, b]) {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  if (max === min) return [0, 0, l];
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6;
  else if (max === gn) h = ((bn - rn) / d + 2) / 6;
  else h = ((rn - gn) / d + 4) / 6;
  return [h, s, l];
}

/**
 * Perceptual-ish distance. Weighting hue above lightness keeps "a dark emerald
 * lehenga" close to "emerald" rather than collapsing everything dark to Black.
 */
function colorDistance(a, b) {
  const [h1, s1, l1] = rgbToHsl(a);
  const [h2, s2, l2] = rgbToHsl(b);
  // Hue is circular: 0.95 and 0.02 are neighbours, not opposites.
  let dh = Math.abs(h1 - h2);
  if (dh > 0.5) dh = 1 - dh;
  const achromatic = Math.min(s1, s2) < 0.12;
  if (achromatic) {
    // For near-greys, hue is meaningless — compare lightness and saturation.
    return Math.abs(l1 - l2) * 1.4 + Math.abs(s1 - s2);
  }
  return dh * 2.2 + Math.abs(s1 - s2) * 0.7 + Math.abs(l1 - l2) * 0.9;
}

export function nearestNamedColor(rgb) {
  let best = NAMED_COLORS[0], bestD = Infinity;
  for (const c of NAMED_COLORS) {
    const d = colorDistance(rgb, c.rgb);
    if (d < bestD) { bestD = d; best = c; }
  }
  return best;
}

/**
 * Dominant *garment* colour from an image file.
 *
 * Studio shots are mostly backdrop and skin, so we bias towards saturated
 * pixels in the middle of the frame — where the outfit is — and bucket by hue
 * so a single bright accent can't outvote the main fabric.
 */
export function extractDominantColor(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      try {
        const S = 64;
        const canvas = document.createElement("canvas");
        canvas.width = S;
        canvas.height = S;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0, S, S);
        const { data } = ctx.getImageData(0, 0, S, S);

        // 12 hue buckets, plus one for near-greys.
        const buckets = Array.from({ length: 13 }, () => ({ n: 0, r: 0, g: 0, b: 0 }));

        for (let y = 0; y < S; y++) {
          for (let x = 0; x < S; x++) {
            const i = (y * S + x) * 4;
            if (data[i + 3] < 128) continue; // transparent
            const rgb = [data[i], data[i + 1], data[i + 2]];
            const [h, s, l] = rgbToHsl(rgb);
            if (l > 0.95 || l < 0.04) continue; // blown-out or pure black

            // Centre pixels count more; edges are usually backdrop.
            const cx = (x - S / 2) / (S / 2);
            const cy = (y - S / 2) / (S / 2);
            const centreWeight = 1.6 - Math.min(1, Math.hypot(cx, cy));
            // Saturated pixels count more; fabric is more colourful than skin.
            const weight = Math.max(0, centreWeight) * (0.35 + s);

            const idx = s < 0.12 ? 12 : Math.min(11, Math.floor(h * 12));
            const bkt = buckets[idx];
            bkt.n += weight;
            bkt.r += rgb[0] * weight;
            bkt.g += rgb[1] * weight;
            bkt.b += rgb[2] * weight;
          }
        }

        // Prefer the strongest chromatic bucket; fall back to greys only if the
        // photo really has no colour in it.
        let best = null;
        for (let i = 0; i < 12; i++) {
          if (!best || buckets[i].n > best.n) best = buckets[i];
        }
        if (!best || best.n < buckets[12].n * 0.25) best = buckets[12];
        if (!best || best.n === 0) { resolve([128, 128, 128]); return; }

        resolve([
          Math.round(best.r / best.n),
          Math.round(best.g / best.n),
          Math.round(best.b / best.n),
        ]);
      } catch (e) {
        reject(e);
      } finally {
        URL.revokeObjectURL(url);
      }
    };
    img.onerror = () => { URL.revokeObjectURL(url); reject(new Error("Could not read that image.")); };
    img.src = url;
  });
}

/* ─── CLIP embeddings (optional, auto-detected) ─── */

let _embeddingIndex; // undefined = not looked yet, null = unavailable

/**
 * Load the pre-computed catalog vectors, if they have been generated.
 * Shape: { model, dim, items: [{ id, handle, vector: number[] }] }
 */
export async function loadCatalogEmbeddings() {
  if (_embeddingIndex !== undefined) return _embeddingIndex;
  try {
    const res = await fetch("/catalog-embeddings.json", { cache: "force-cache" });
    if (!res.ok) throw new Error("not generated");
    const data = await res.json();
    _embeddingIndex = Array.isArray(data?.items) && data.items.length ? data : null;
  } catch {
    _embeddingIndex = null;
  }
  return _embeddingIndex;
}

function cosine(a, b) {
  let dot = 0, na = 0, nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / (Math.sqrt(na) * Math.sqrt(nb) || 1);
}

/**
 * Embed the uploaded image with CLIP, matching the model used to build the
 * index. Returns null when Transformers.js isn't installed — the caller then
 * falls back to colour matching.
 */
async function embedImage(file) {
  let transformers;
  try {
    // Optional dependency: absent from a default install. The specifier is
    // assembled at runtime so the bundler can't try to resolve it — a literal
    // string here fails the build (and the dev server) when the package isn't
    // installed, even inside a try/catch.
    const pkg = ["@xenova", "transformers"].join("/");
    transformers = await import(/* @vite-ignore */ pkg);
  } catch {
    return null;
  }
  const { pipeline } = transformers;
  const extractor = await pipeline("image-feature-extraction", "Xenova/clip-vit-base-patch32");
  const url = URL.createObjectURL(file);
  try {
    const out = await extractor(url, { pooling: "mean", normalize: true });
    return Array.from(out.data);
  } finally {
    URL.revokeObjectURL(url);
  }
}

/* ─── Ranking ─── */

/** Canonical category handle for a product, matching App.jsx's categoryOf. */
function categoryOf(p) {
  return p.category || null;
}

/**
 * Rank the catalog against an uploaded image.
 *
 * Returns { method, colorName, colorRgb, results } where `method` is
 * "visual" (CLIP) or "color", so the UI can describe honestly what it did.
 */
export async function searchByImage(file, products, { limit = 12, category = null } = {}) {
  const pool = category ? products.filter((p) => categoryOf(p) === category) : products;

  // Preferred path: real visual similarity, once embeddings exist.
  const index = await loadCatalogEmbeddings();
  if (index) {
    const queryVector = await embedImage(file);
    if (queryVector) {
      const byId = new Map(index.items.map((it) => [it.id, it.vector]));
      const scored = pool
        .map((p) => {
          const v = byId.get(p.productId || p.id);
          return v ? { product: p, score: cosine(queryVector, v) } : null;
        })
        .filter(Boolean)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit);
      if (scored.length) {
        return { method: "visual", colorName: null, colorRgb: null, results: scored };
      }
    }
  }

  // Fallback: colour + category match over the seeded metadata.
  const rgb = await extractDominantColor(file);
  const named = nearestNamedColor(rgb);

  const scored = pool
    .map((p) => {
      let score = 0;
      if (p.color && p.color === named.name) {
        score += 10; // exact palette match
      } else if (p.color) {
        const entry = NAMED_COLORS.find((c) => c.name === p.color);
        // Partial credit for neighbouring shades, so results aren't empty when
        // nothing matches exactly.
        if (entry) score += Math.max(0, 6 - colorDistance(rgb, entry.rgb) * 4);
      }
      // Nudge photographed pieces up: a real photo is more useful than a
      // placeholder when the shopper is matching a look.
      if (!p.isPlaceholder && p.images?.length) score += 1.5;
      return { product: p, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  return { method: "color", colorName: named.name, colorRgb: rgb, results: scored };
}
