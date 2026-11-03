import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('docs/capturas', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const route of ['plugin', 'campus', 'campus-secure']) {
      const page = await context.newPage();
      // Revisión visual segura incluso con credenciales locales: no llegar a la API real.
      await page.route('**/api/leads', r => r.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ ok: false, code: 'NOT_CONFIGURED', message: 'Prueba simulada: falta completar la configuración.' }) }));
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const response = await page.goto(`http://localhost:3000/${route}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(response.status(), 200);
      const metrics = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        heading: document.querySelector('h1').textContent,
        headingBottom: document.querySelector('h1').getBoundingClientRect().bottom,
        formTop: document.querySelector('#demo').getBoundingClientRect().top,
        heroCta: (() => { const e = document.querySelector('.mobile-hero-cta'); const r = e.getBoundingClientRect(); return { display: getComputedStyle(e).display, top: r.top, bottom: r.bottom }; })(),
        price: document.querySelector('.price').textContent,
      }));
      assert.equal(metrics.scrollWidth, width, 'Horizontal overflow');
      assert.ok(metrics.price.includes(route === 'plugin' ? '0,99 €' : '3,99 €'));
      const filename = `${route}-${width === 1440 ? 'escritorio' : 'movil'}.png`;
      await page.screenshot({ path: `docs/capturas/${filename}`, fullPage: true, animations: 'disabled' });
      if (width === 390) {
        await page.locator('.mobile-hero-cta').click();
        await page.waitForURL(url => url.hash === '#demo');
        assert.ok(await page.locator('input[name="name"]').isVisible());
      }
      await page.locator('summary').first().click();
      assert.equal(await page.locator('details').first().getAttribute('open'), '');
      const requests = [];
      page.on('request', r => { if (r.method() === 'POST') requests.push(r.url()); });
      await page.locator('[name="name"]').fill('Revisión local');
      await page.locator('[name="academy"]').fill('Academia de prueba');
      await page.locator('[name="email"]').fill('revision@example.com');
      await page.locator('[name="phone"]').fill('600000000');
      await page.locator('[name="students"]').selectOption('51-200');
      await page.getByRole('button', { name: 'Solicitar mi demo' }).click();
      await page.getByRole('status').filter({ hasText: 'Prueba simulada' }).waitFor();
      assert.equal(requests.length, 1, 'Expected exactly one intercepted submission');
      assert.deepEqual(errors, []);
      results.push({ route, ...metrics, screenshot: filename, faq: 'ok', formWithoutSubmission: 'ok', pageErrors: errors });
      await page.close();
    }
    await context.close();
  }
  await writeFile('docs/capturas/revision.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
