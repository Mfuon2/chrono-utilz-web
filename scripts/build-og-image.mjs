// Renders public/og-image.png, the 1200×630 card LinkedIn, Slack, X and others show for shared links.
// Run after changing the headline or branding: node scripts/build-og-image.mjs
import {chromium} from '@playwright/test';

const html = `<!doctype html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Manrope:wght@700;800&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#f8f9f5;font-family:'DM Sans',sans-serif;color:#14282c;overflow:hidden}
.card{display:grid;grid-template-columns:1fr 470px;gap:56px;align-items:center;height:100%;padding:64px 72px}
.brand{display:flex;align-items:center;gap:14px;font:800 30px Manrope,sans-serif;letter-spacing:-.04em}
.mark{background:#14282c;color:#d0ef8c;width:48px;height:48px;border-radius:13px;display:grid;place-items:center}
h1{font:800 76px/1.02 Manrope,sans-serif;letter-spacing:-.055em;margin:40px 0 22px}
p{font-size:25px;line-height:1.5;color:#58676a;margin:0}
.meta{display:flex;gap:12px;margin-top:34px;font:500 18px monospace}
.meta span{border:1px solid #dce2d8;border-radius:30px;padding:6px 16px;background:#fff}
pre{margin:0;background:#162b30;color:#def0d6;border-radius:18px;padding:34px 32px;font:22px/1.75 'SFMono-Regular',Menlo,monospace;box-shadow:0 30px 60px -30px rgba(20,40,44,.6);white-space:pre}
.k{color:#f92672}.s{color:#e6db74}.f{color:#a6e22e}.c{color:#8fa6a0}.n{color:#ae81ff}
</style></head><body><div class="card"><div>
<div class="brand"><span class="mark">C</span>ChronoUtilz</div>
<h1>Dates you can<br>build on.</h1>
<p>Precise, tree-shakeable date utilities for JavaScript and TypeScript.</p>
<div class="meta"><span>MIT license</span><span>0 dependencies</span><span>136 functions</span></div>
</div><pre><span class="k">import</span> { addBusinessDays }
  <span class="k">from</span> <span class="s">'@mfuon2/chrono-utilz'</span>;

<span class="f">addBusinessDays</span>(
  <span class="s">'2025-01-03'</span>, <span class="n">3</span>
);
<span class="c">// → 2025-01-08</span></pre></div></body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({viewport: {width: 1200, height: 630}});
await page.setContent(html, {waitUntil: 'networkidle'});
await page.evaluate(() => document.fonts.ready);
await page.screenshot({path: 'public/og-image.png'});
await browser.close();
console.log('Wrote public/og-image.png (1200×630).');
