/**
 * Rebuilds public/images from the originals in assets-src/images.
 *
 * Originals live outside public/ on purpose — `output: 'export'` copies public/
 * verbatim, so anything left in there ships to the browser at full size. Run
 * `npm run images` after adding a new original.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'assets-src/images'); // originals, not deployed
const OUT = path.join(ROOT, 'public/images'); // optimized, deployed

// Widths chosen at ~2x the largest CSS size each image is ever painted at.
const PLAN = {
  'RetenSYNC.png': 1000,
  'Bravely.png': 900,
  'logo-kresno.png': 800,
  'marvel.png': 800,
  'november_logo.png': 800,
  'bearion-logo2-light.png': 800,
  'Bearions.jpg': 800,
};

fs.mkdirSync(SRC, { recursive: true });

// Move every original out of public/ exactly once.
for (const f of fs.readdirSync(OUT)) {
  if (!/\.(png|jpe?g)$/i.test(f)) continue;
  const dest = path.join(SRC, f);
  if (!fs.existsSync(dest)) fs.renameSync(path.join(OUT, f), dest);
  else fs.unlinkSync(path.join(OUT, f));
}

let before = 0;
let after = 0;

for (const [file, width] of Object.entries(PLAN)) {
  const src = path.join(SRC, file);
  if (!fs.existsSync(src)) {
    console.log(`skip (missing): ${file}`);
    continue;
  }

  const outName = file.replace(/\.(png|jpe?g)$/i, '.webp');
  const outPath = path.join(OUT, outName);

  const meta = await sharp(src).metadata();
  await sharp(src)
    // withoutEnlargement: small logos stay at their native size.
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(outPath);

  const b = fs.statSync(src).size;
  const a = fs.statSync(outPath).size;
  before += b;
  after += a;

  const dims = `${meta.width}x${meta.height} -> ${Math.min(width, meta.width)}w`;
  console.log(
    `${(b / 1024).toFixed(0).padStart(6)} KB -> ${(a / 1024).toFixed(0).padStart(5)} KB  ${dims.padEnd(22)} ${outName}`
  );
}

console.log(
  `\nTOTAL ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024).toFixed(0)} KB`
);
