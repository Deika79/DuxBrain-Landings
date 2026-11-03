import { chromium } from '@playwright/test';
import { mkdir, writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';

await mkdir('docs/capturas', { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const results = [];
const baseUrl = process.argv[2] ?? 'http://localhost:3000';
assert.ok(['http://localhost:3000', 'http://localhost:3100'].includes(baseUrl), 'Use a local review server');
try {
  for (const width of [1440, 390]) {
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 1000 : 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const route of ['plugin', 'campus', 'campus-secure']) {
      const page = await context.newPage();
      let payload;
      // Revisión visual segura incluso con credenciales locales: no llegar a la API real.
      await page.route('**/api/leads', r => { payload = r.request().postDataJSON(); return r.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ ok: false, code: 'NOT_CONFIGURED', message: 'Prueba simulada: falta completar la configuración.' }) }); });
      const errors = [];
      page.on('pageerror', e => errors.push(e.message));
      const response = await page.goto(`${baseUrl}/${route}?utm_source=ig&utm_medium=paid_social&ad_id=123`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(response.status(), 200);
      const metrics = await page.evaluate(() => ({
        width: innerWidth, scrollWidth: document.documentElement.scrollWidth,
        heading: document.querySelector('h1').textContent,
        headingBottom: document.querySelector('h1').getBoundingClientRect().bottom,
        formTop: document.querySelector('#demo').getBoundingClientRect().top,
        heroCta: (() => { const e = document.querySelector('.mobile-hero-cta'); const r = e.getBoundingClientRect(); return { display: getComputedStyle(e).display, top: r.top, bottom: r.bottom }; })(),
        price: document.querySelector('.price').textContent,
        title: document.title,
        description: document.querySelector('meta[name="description"]').content,
        sections: [...document.querySelectorAll('.feature-section')].map(section => section.id),
      }));
      assert.equal(metrics.scrollWidth, width, 'Horizontal overflow');
      assert.ok(metrics.price.includes(route === 'plugin' ? '0,99 €' : '3,99 €'));
      if (width === 390) assert.ok(metrics.heroCta.bottom <= 844, 'Primary CTA should fit in the first mobile viewport');
      const filename = `${route}-${width === 1440 ? 'escritorio' : 'movil'}.png`;
      await page.screenshot({ path: `docs/capturas/${filename}`, fullPage: true, animations: 'disabled' });
      for (const link of await page.locator('.section-nav a').all()) {
        const href = await link.getAttribute('href');
        await link.click();
        await page.waitForURL(url => url.hash === href);
        const top = await page.locator(href).evaluate(el => el.getBoundingClientRect().top);
        assert.ok(top >= 0 && top < 100, 'Section navigation should reach its heading');
      }
      if (width === 390) {
        await page.locator('.mobile-hero-cta').click();
        await page.waitForURL(url => url.hash === '#demo');
        assert.ok(await page.locator('input[name="name"]').isVisible());
      }
      await page.locator('summary').first().click();
      assert.equal(await page.locator('details').first().getAttribute('open'), '');
      for (const selector of ['.header-link', '.demo-copy a', '.final-cta a']) {
        await page.locator(selector).click();
        await page.waitForURL(url => url.hash === '#demo');
        const top = await page.locator('#demo').evaluate(el => el.getBoundingClientRect().top);
        assert.ok(top >= 0 && top < 100, 'Demo CTA should scroll to the form');
      }
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
      assert.equal(payload.landing, route);
      assert.equal(payload.website, '');
      assert.deepEqual(payload.attribution, { utm_source: 'ig', utm_medium: 'paid_social', ad_id: '123' });
      assert.equal(await page.locator('button[type="submit"]').isEnabled(), true);
      assert.deepEqual(errors, []);
      results.push({ route, ...metrics, screenshot: filename, faq: 'ok', formWithoutSubmission: 'ok', pageErrors: errors });
      await page.close();
    }
    await context.close();
  }
  await writeFile('docs/capturas/revision.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
