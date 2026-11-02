// Captures screenshots for every <figure class="shot" data-url=...> in index.html.
// Usage: npm i playwright && npx playwright install chromium && node scripts/capture.mjs
import { chromium } from 'playwright';
import { readFileSync, mkdirSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const shots = [...html.matchAll(/<figure class="shot" data-url="([^"]+)">\s*<img src="(assets\/[^"]+)"/g)]
  .map(m => ({ url: m[1], file: m[2] }));

mkdirSync(new URL('../assets', import.meta.url), { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 2 });
for (const { url, file } of shots) {
  try {
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.screenshot({ path: new URL('../' + file, import.meta.url).pathname });
    console.log('ok  ', file, url);
  } catch (e) {
    console.error('FAIL', file, url, e.message);
  }
}
await browser.close();
