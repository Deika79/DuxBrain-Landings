import { chromium } from '@playwright/test';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import ts from 'typescript';
import assert from 'node:assert/strict';

const baseUrl = process.argv[2] ?? 'http://localhost:3000';
assert.ok(['http://localhost:3000', 'http://localhost:3100'].includes(baseUrl));
const loadContent = source => {
  const loadedModule = { exports: {} };
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } });
  new Function('module', 'exports', compiled.outputText)(loadedModule, loadedModule.exports);
  return loadedModule.exports;
};
// A copy-only Secure revision must preserve the other two offers and metadata.
const previous = loadContent(execFileSync('git', ['show', 'f6465cd:src/content/landings.ts'], { encoding: 'utf8' })).landings;
const current = loadContent(await readFile('src/content/landings.ts', 'utf8')).landings;
for (const route of ['plugin', 'campus']) assert.deepEqual(current[route], previous[route]);
await mkdir('docs/capturas/scroll', { recursive: true });
const report = [];
const settle = page => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
for (const zoom of [100, 125]) {
  for (const [width, height] of [[1440, 900], [1280, 720], [768, 1024], [390, 844]]) {
    // Fresh disposable Chrome profiles; actual browser zoom, not CSS scaling.
    const profile = `tmp/demo-rail-${width}-${zoom}-${Date.now()}`;
    await mkdir(`${profile}/Default`, { recursive: true });
    await writeFile(`${profile}/Default/Preferences`, JSON.stringify({ partition: { default_zoom_level: { x: Math.log(zoom / 100) / Math.log(1.2) } } }));
    const context = await chromium.launchPersistentContext(profile, { channel: 'chrome', headless: true, viewport: { width, height }, reducedMotion: 'reduce' });
    try {
      for (const route of ['plugin', 'campus', 'campus-secure']) {
        const page = await context.newPage();
        // Never touch the real lead endpoint, even with local credentials present.
        await page.route('**/api/leads', r => r.fulfill({ status: 503, contentType: 'application/json', body: '{"ok":false,"message":"Simulación local"}' }));
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        await page.goto(`${baseUrl}/${route}?utm_source=ig&utm_medium=paid_social`, { waitUntil: 'networkidle' });
        await page.evaluate(() => document.fonts.ready);
        assert.equal(await page.locator('#demo').count(), 1);
        assert.equal(await page.locator('form').count(), 1);
        const desktop = await page.evaluate(() => matchMedia('(min-width: 1100px)').matches);
        const actualZoom = await page.evaluate(() => devicePixelRatio);
        assert.ok(Math.abs(actualZoom - zoom / 100) < .01, 'Actual Chrome zoom');
        const points = ['.hero-band', '#en-accion', '.faq-band', '.footer-band'];
        for (const point of points) {
          await page.locator(point).evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
          await settle(page);
          const metrics = await page.evaluate(() => {
            const rect = selector => { const r = document.querySelector(selector).getBoundingClientRect(); return { top: r.top, bottom: r.bottom, left: r.left, right: r.right, height: r.height }; };
            return { viewport: innerWidth, height: innerHeight, scrollWidth: document.documentElement.scrollWidth, rail: rect('.lead-sticky'), footer: rect('.footer-band'), barVisible: getComputedStyle(document.querySelector('.mobile-demo-bar')).display !== 'none', form: rect('#demo') };
          });
          assert.equal(metrics.scrollWidth, metrics.viewport, `${route} ${point}: overflow`);
          if (desktop && point !== '.footer-band') {
            assert.ok(metrics.rail.top >= 0 && metrics.rail.bottom <= metrics.height + 1, `${route} ${point}: visible rail`);
            assert.equal(metrics.barVisible, false);
            const overlap = await page.locator('.journey-content .container').evaluateAll(containers => {
              const rail = document.querySelector('.lead-sticky').getBoundingClientRect();
              return containers.some(c => c.getBoundingClientRect().right - parseFloat(getComputedStyle(c).paddingRight) > rail.left);
            });
            assert.equal(overlap, false, 'Reserved side column');
          } else if (!desktop && ['#en-accion', '.faq-band'].includes(point)) {
            assert.equal(metrics.barVisible, true, 'Compact CTA while reading');
          }
          if (point === '.footer-band') {
            assert.equal(metrics.barVisible, false, 'Footer unobstructed');
            if (desktop) assert.ok(metrics.rail.bottom <= metrics.footer.top, 'Rail stops before footer');
          }
          if (point === '#en-accion' && zoom === 100) {
            await page.locator('#en-accion img').evaluate(img => img.decode());
            await page.screenshot({ path: `docs/capturas/scroll/${route}-${width}x${height}.png`, animations: 'disabled' });
          }
        }
        // Keyboard activation and tabbing must reveal every field and the button.
        const cta = page.locator('.final-cta a');
        await cta.focus();
        await page.keyboard.press('Enter');
        await settle(page);
        assert.equal(await page.locator('[name="name"]').evaluate(el => el === document.activeElement), true);
        for (const name of ['name', 'academy', 'email', 'phone', 'students']) {
          const field = page.locator(`[name="${name}"]`);
          assert.equal(await field.evaluate(el => el === document.activeElement), true);
          const visible = await field.evaluate(el => { const r = el.getBoundingClientRect(); const s = el.closest('.lead-sticky').getBoundingClientRect(); return r.top >= Math.max(0, s.top) && r.bottom <= Math.min(innerHeight, s.bottom); });
          assert.ok(visible, `Keyboard exposes ${name}`);
          await page.keyboard.press('Tab');
        }
        await page.keyboard.press('Tab'); // Privacy link -> submit.
        assert.equal(await page.locator('button[type="submit"]').evaluate(el => el === document.activeElement), true);
        assert.ok(await page.locator('button[type="submit"]').evaluate(el => { const r = el.getBoundingClientRect(); return r.top >= 0 && r.bottom <= innerHeight; }));
        assert.equal(new URL(page.url()).searchParams.get('utm_source'), 'ig');
        assert.deepEqual(errors, []);
        if (route === 'campus-secure' && zoom === 100 && [1440, 390].includes(width)) {
          await page.evaluate(() => { document.activeElement.blur(); document.querySelector('.lead-sticky').scrollTop = 0; window.scrollTo({ top: 0, behavior: 'instant' }); });
          await settle(page);
          await page.screenshot({ path: `docs/capturas/campus-secure-superior-${width}.png`, animations: 'disabled' });
          await page.locator('#proteccion-video').evaluate(el => window.scrollTo({ top: el.getBoundingClientRect().top + scrollY, behavior: 'instant' }));
          await settle(page);
          await page.screenshot({ path: `docs/capturas/campus-secure-video-${width}.png`, animations: 'disabled' });
        }
        report.push(`| ${route} | ${width} × ${height} | ${zoom}% | ${desktop ? 'Formulario lateral' : 'CTA compacto'} | Correcto |`);
        await page.close();
      }
    } finally { await context.close(); }
  }
}
await writeFile('docs/capturas/scroll/revision.md', `# Formulario persistente y revisión Secure\n\nChrome instalado, perfiles temporales propios, zoom real del navegador. Inicio, demostración, FAQ y pie comprobados en cada combinación. Un formulario, sin desbordamiento, con foco por CTA y recorrido de teclado hasta el botón. La API se intercepta; no hay envíos reales. Contenido y metadatos de Plugin y Campus idénticos a f6465cd.\n\n| Ruta | Ventana | Zoom | Comportamiento | Resultado |\n| --- | --- | --- | --- | --- |\n${report.join('\n')}\n`);
console.log(`${report.length} Chrome route/viewport/zoom reviews passed; screenshots in docs/capturas/.`);
