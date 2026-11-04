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
    const context = await browser.newContext({ viewport: { width, height: width === 1440 ? 900 : 844 }, deviceScaleFactor: 1, reducedMotion: 'reduce' });
    for (const route of ['plugin', 'campus', 'campus-secure']) {
      const page = await context.newPage();
      let payload;
      // Revisión visual segura incluso con credenciales locales: no llegar a la API real.
      await page.route('**/api/leads', r => { payload = r.request().postDataJSON(); return r.fulfill({ status: 503, contentType: 'application/json', body: JSON.stringify({ ok: false, code: 'NOT_CONFIGURED', message: 'Prueba simulada: falta completar la configuración.' }) }); });
      const errors = [];
      const cssResponses = [];
      const consoleErrors = [];
      page.on('pageerror', e => errors.push(e.message));
      page.on('console', message => { if (message.type() === 'error') consoleErrors.push(message.text()); });
      page.on('response', response => {
        if (response.request().resourceType() === 'stylesheet') cssResponses.push({ url: new URL(response.url()).pathname, status: response.status(), type: response.headers()['content-type'] });
      });
      const response = await page.goto(`${baseUrl}/${route}?utm_source=ig&utm_medium=paid_social&ad_id=123`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts.ready);
      // Load below-the-fold images too before the full-page capture (footer logo).
      for (const image of await page.locator('img').all()) {
        await image.scrollIntoViewIfNeeded();
        await image.evaluate(element => element.decode());
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
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
        typography: Object.fromEntries(['h1', '.hero-description', '.benefit-card p', '.feature-item p', 'summary', 'label', 'input'].map(selector => [selector, parseFloat(getComputedStyle(document.querySelector(selector)).fontSize)])),
        bands: [...document.querySelectorAll('.feature-section')].map(section => ({ id: section.id, width: section.getBoundingClientRect().width, background: getComputedStyle(section).backgroundColor })),
      }));
      assert.equal(metrics.scrollWidth, width, 'Horizontal overflow');
      assert.ok(cssResponses.length > 0, 'Expected generated CSS to be requested');
      assert.ok(cssResponses.every(response => response.status === 200 && response.type.includes('text/css')), 'CSS must load without HTTP errors');
      assert.equal(metrics.typography.h1, width === 1440 ? 64 : 40);
      for (const selector of ['.hero-description', '.benefit-card p', '.feature-item p']) assert.ok(metrics.typography[selector] >= 17, `${selector} should be readable without zoom`);
      assert.ok(metrics.bands.every(band => band.width === width), 'Chapter backgrounds should span the viewport');
      const captures = page.locator('.product-capture');
      assert.equal(await captures.count(), route === 'campus-secure' ? 1 : route === 'campus' ? 3 : 2);
      assert.equal(await page.locator('.illustration-label, .product-body').count(), 0, 'No invented interface remains');
      for (const capture of await captures.all()) {
        const picture = capture.locator('img');
        assert.ok(await picture.evaluate(img => img.complete && img.naturalWidth > 0 && !!img.alt));
        const dimensions = await picture.evaluate(img => ({ actual: img.clientWidth / img.clientHeight, expected: Number(img.getAttribute('width')) / Number(img.getAttribute('height')) }));
        assert.ok(Math.abs(dimensions.actual - dimensions.expected) < .01, 'Screenshot proportions must be preserved');
        const link = capture.locator('a');
        if (route === 'campus') {
          assert.equal(await link.count(), 0, 'Campus screenshots are integrated without enlargement controls');
          assert.equal(await capture.locator('.capture-open').count(), 0);
          continue;
        }
        assert.equal(await link.getAttribute('target'), '_blank');
        const imageUrl = await link.getAttribute('href');
        assert.ok(imageUrl.startsWith('/product/') && imageUrl !== '/product/campus-gestion.png');
        const [imageTab] = await Promise.all([context.waitForEvent('page'), link.click()]);
        await imageTab.waitForLoadState('load');
        assert.equal(new URL(imageTab.url()).pathname, imageUrl, 'Full-size image should open in a separate tab');
        assert.equal((await imageTab.request.get(imageTab.url())).status(), 200);
        await imageTab.close();
      }
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
      if (route === 'campus') {
        assert.equal(await page.locator('.campus-capture[data-screen="campus-gestion-saneada.png"] img').count(), 1);
        assert.equal((await context.request.get(`${baseUrl}/product/campus-gestion.png`)).status(), 404, 'Original management screenshot must not be publicly served');
      }
      assert.ok(metrics.price.includes(route === 'plugin' ? '0,99 €' : '3,99 €'));
      if (width === 390) assert.ok(metrics.heroCta.bottom <= 844, 'Primary CTA should fit in the first mobile viewport');
      assert.deepEqual(consoleErrors, [], 'No console errors expected before form simulation');
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
        assert.ok(top >= 0 && top < (width >= 1100 ? 180 : 100), 'Demo CTA should reach the visible form');
        assert.equal(await page.locator('input[name="name"]').evaluate(input => input === document.activeElement), true, 'Demo CTA should focus the first field');
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
      assert.ok(consoleErrors.every(error => /Failed to load resource.*503/.test(error)), 'Only the deliberately mocked form error is expected');
      results.push({ route, ...metrics, screenshot: filename, faq: 'ok', formWithoutSubmission: 'ok', css: cssResponses, pageErrors: errors, console: 'Only the intercepted 503 form response; no errors on initial load.' });
      await page.close();
    }
    await context.close();
  }
  await writeFile('docs/capturas/revision.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }
