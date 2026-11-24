import { expect, test } from '@playwright/test';
import { collectConsoleErrors } from './helpers';

test('room page loads without console errors', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('classic page loads without console errors', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/classic/');
  await page.waitForLoadState('networkidle');
  expect(errors).toEqual([]);
});

test('classic page loads no three.js', async ({ page }) => {
  const scripts: Promise<{ url: string; body: string }>[] = [];
  page.on('response', (res) => {
    if (res.request().resourceType() === 'script') {
      scripts.push(res.text().then((body) => ({ url: res.url(), body })));
    }
  });
  await page.goto('/classic/');
  await page.waitForLoadState('networkidle');
  const loaded = await Promise.all(scripts);
  expect(loaded.length).toBeGreaterThan(0);
  const withThree = loaded.filter((s) => s.body.includes('WebGLRenderer')).map((s) => s.url);
  expect(withThree).toEqual([]);
});
