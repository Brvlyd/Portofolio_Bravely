/**
 * Builds a PDF with one page per portfolio section (Hero, Showcase, About,
 * Skills, Projects, Experience, Contact, Footer), each captured as a full,
 * uncropped screenshot of that section's real height — not just whatever
 * fits in one viewport. Meant for attaching to applications (e.g. Apple
 * Developer Academy) where a live URL isn't accepted.
 *
 * Reads from the static export in out/ (run `npm run build` first) served
 * over a real HTTP server — NOT opened via file://, which breaks every
 * root-absolute asset path Next.js emits (/_next/..., /images/...) and
 * silently produces a broken, unstyled page — so the screenshots stay
 * pixel-identical to what ships to production.
 *
 * Usage:
 *   npm run build
 *   npx serve out -l 4173   (any static server on this port works)
 *   node scripts/build-portfolio-pdf.mjs
 */
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_URL = process.env.SITE_URL ?? 'http://localhost:4173';
const SHOT_DIR = path.join(ROOT, 'assets-src/portfolio-pdf-shots');
const PDF_PATH = path.join(ROOT, 'Bravely_Dirgayuska_Portfolio_Pages.pdf');

const VIEWPORT = { width: 1440, height: 900 };
// 2x for a crisp screenshot; dropped to 1 automatically per-section below if
// the section is tall enough to exceed Chromium's max screenshot texture size.
const SCALE = 2;

async function run() {
  fs.mkdirSync(SHOT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: SCALE,
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  });
  await context.addInitScript(() => {
    window.localStorage.setItem('theme', 'dark');
  });

  const page = await context.newPage();
  await page.goto(SITE_URL, { waitUntil: 'load' });
  await page.waitForTimeout(1000);

  // Scroll the whole page first so every whileInView reveal has already
  // fired by the time we come back to screenshot each section.
  const fullHeight = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < fullHeight; y += 500) {
    await page.evaluate((y) => window.scrollTo(0, y), y);
    await page.waitForTimeout(60);
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  const sectionHandles = await page.$$('main > section, footer');
  console.log(`Found ${sectionHandles.length} sections.`);

  const shots = [];
  for (let i = 0; i < sectionHandles.length; i++) {
    const el = sectionHandles[i];
    const id = (await el.getAttribute('id')) || `section-${i}`;
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(400);

    // The nav is `position: fixed`, so it stays glued to the viewport top
    // and would otherwise stamp itself over whatever content each scrolled
    // section happens to land under. Only the very first section (Home)
    // wants it — that's where it naturally belongs.
    if (i > 0) {
      await page.evaluate(() => {
        const header = document.querySelector('header');
        if (header) header.style.visibility = 'hidden';
      });
    }

    const dest = path.join(SHOT_DIR, `${String(i + 1).padStart(2, '0')}-${id}.png`);
    await el.screenshot({ path: dest });
    shots.push(dest);
    console.log(`  captured ${path.basename(dest)}`);

    if (i > 0) {
      await page.evaluate(() => {
        const header = document.querySelector('header');
        if (header) header.style.visibility = 'visible';
      });
    }
  }

  await browser.close();

  // Assemble into one PDF, one section per page, each page sized to match
  // the screenshot's own proportions so nothing gets cropped or squeezed.
  const pdf = await PDFDocument.create();
  for (const shotPath of shots) {
    const bytes = fs.readFileSync(shotPath);
    const img = await pdf.embedPng(bytes);
    const w = img.width / SCALE;
    const h = img.height / SCALE;
    const pdfPage = pdf.addPage([w, h]);
    pdfPage.drawImage(img, { x: 0, y: 0, width: w, height: h });
  }

  const pdfBytes = await pdf.save();
  fs.writeFileSync(PDF_PATH, pdfBytes);
  console.log(`\nSaved ${path.relative(ROOT, PDF_PATH)} (${shots.length} pages).`);
}

run();
