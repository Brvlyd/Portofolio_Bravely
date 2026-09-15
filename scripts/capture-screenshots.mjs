/**
 * Captures screenshots of the public-facing pages of live projects so the
 * landing page can show real UI instead of just text. Login-gated dashboards
 * (POS backoffice, admin panels) aren't reachable here — only what a visitor
 * without credentials can see gets captured automatically. Run manually with
 * `node scripts/capture-screenshots.mjs`; originals land in
 * assets-src/screenshots, then `npm run images` optimizes them into
 * public/images/screenshots.
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets-src/screenshots');
fs.mkdirSync(OUT, { recursive: true });

const TARGETS = [
  {
    name: 'bearion-home',
    url: 'https://bearions.store',
    fullPage: true,
    // Dismisses the "Welcome to Bearion" intro modal before shooting.
    beforeShot: async (page) => {
      const startShopping = page.getByText('Start Shopping', { exact: false });
      if (await startShopping.isVisible().catch(() => false)) {
        await startShopping.click();
        await page.waitForTimeout(800);
      }
    },
  },
  {
    name: 'retensync-login',
    url: 'https://retensync.vercel.app/auth/login',
    fullPage: false,
  },
  {
    name: 'november-coffee-login',
    url: 'https://november-coffee.vercel.app',
    fullPage: false,
    // Splash cover has a "Login" button that reveals the real sign-in form.
    beforeShot: async (page) => {
      const login = page.getByText('Login', { exact: false }).first();
      if (await login.isVisible().catch(() => false)) {
        await login.click();
        await page.waitForTimeout(800);
      }
    },
  },
  {
    name: 'sitomas-kresno-login',
    url: 'https://sitomaskresno.vercel.app',
    fullPage: false,
  },
];

const VIEWPORT = { width: 1440, height: 900 };

async function run() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: VIEWPORT,
    deviceScaleFactor: 2,
  });

  for (const target of TARGETS) {
    const page = await context.newPage();
    try {
      console.log(`-> ${target.name} (${target.url})`);
      await page.goto(target.url, { waitUntil: 'networkidle', timeout: 45000 });
      await page.waitForTimeout(1200); // settle animations/fonts
      if (target.beforeShot) await target.beforeShot(page);
      const dest = path.join(OUT, `${target.name}.png`);
      await page.screenshot({ path: dest, fullPage: target.fullPage });
      console.log(`   saved ${path.relative(ROOT, dest)}`);
    } catch (err) {
      console.log(`   skip (${err.message.split('\n')[0]})`);
    } finally {
      await page.close();
    }
  }

  await browser.close();
}

run();
