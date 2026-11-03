import { chromium } from '@playwright/test';
import assert from 'node:assert/strict';

// Solo navegador -> respuestas interceptadas. Nunca llama a la API real.
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const scenario of ['success', 'configuration', 'uncertain']) {
    const context = await browser.newContext();
    let posts = 0;
    await context.route('**/*', async route => {
      const request = route.request();
      const url = new URL(request.url());
      if (url.origin !== 'http://localhost:3100') return route.abort();
      if (url.pathname !== '/api/leads') return route.continue();
      posts++;
      const payload = request.postDataJSON();
      assert.ok(payload.requestId);
      assert.equal(payload.landing, 'plugin');
      assert.equal(payload.website, '');
      assert.equal(payload.attribution.utm_source, 'prueba_local');
      // Retraso simulado para comprobar el bloqueo durante un envío en curso.
      await new Promise(resolve => setTimeout(resolve, 250));
      const body = scenario === 'success'
        ? { ok: true, leadId: payload.requestId, message: 'Recepción simulada en prueba automatizada.' }
        : { ok: false, code: scenario === 'configuration' ? 'NOT_CONFIGURED' : 'SHEETS_UNCERTAIN', message: scenario === 'configuration' ? 'Configuración simulada pendiente.' : 'Recepción simulada incierta.' };
      return route.fulfill({ status: scenario === 'success' ? 200 : scenario === 'configuration' ? 503 : 502, contentType: 'application/json', body: JSON.stringify(body) });
    });
    const page = await context.newPage();
    await page.goto('http://localhost:3100/plugin?utm_source=prueba_local');
    await page.locator('[name="name"]').fill('Persona ficticia');
    await page.locator('[name="academy"]').fill('Academia ficticia');
    await page.locator('[name="email"]').fill('prueba@example.com');
    await page.locator('[name="phone"]').fill('600000000');
    await page.locator('[name="students"]').selectOption('51-200');
    await page.getByRole('button', { name: 'Solicitar mi demo' }).click();
    assert.equal(await page.locator('button[type="submit"]').isDisabled(), true);
    await page.getByRole('status').filter({ hasText: 'simulada' }).waitFor();
    assert.equal(posts, 1);
    assert.equal(await page.locator('button[type="submit"]').isDisabled(), scenario !== 'configuration');
    assert.equal(await page.locator('[name="name"]').inputValue(), 'Persona ficticia');
    console.log(`${scenario}: un POST interceptado, bloqueo y estado correctos`);
    await context.close();
  }
} finally { await browser.close(); }
