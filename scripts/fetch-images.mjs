// Downloads the official changelog image for every <figure class="shot" data-img=...> in index.html.
// Usage: node scripts/fetch-images.mjs   (Node 18+, no dependencies)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
const shots = [...html.matchAll(/<figure class="shot"[^>]*\sdata-img="([^"]+)"[^>]*>\s*<img src="(assets\/[^"]+)"/g)]
  .map(m => ({ url: m[1], file: m[2] }));

mkdirSync(new URL('../assets', import.meta.url), { recursive: true });
for (const { url, file } of shots) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    writeFileSync(new URL('../' + file, import.meta.url), Buffer.from(await res.arrayBuffer()));
    console.log('ok  ', file, url);
  } catch (e) {
    console.error('FAIL', file, url, e.message);
  }
}
