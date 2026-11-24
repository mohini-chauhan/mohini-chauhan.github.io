import { expect, test } from '@playwright/test';
import { ui } from '../../src/content/portfolio';
import { collectConsoleErrors } from './helpers';

test('shows the 3D canvas', async ({ page }) => {
  const errors = collectConsoleErrors(page);
  await page.goto('/');
  await expect(page.getByRole('img', { name: ui.canvasLabel })).toBeVisible();
  await expect(page.locator('canvas')).toBeVisible();
  expect(errors).toEqual([]);
});

test('sends browsers without WebGL2 to the classic view', async ({ page }) => {
  // Pretend this browser has no WebGL2. Every other context type works as normal.
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement, type: string, ...rest: unknown[]) {
      if (type === 'webgl2') return null;
      return (original as (...args: unknown[]) => RenderingContext | null).call(this, type, ...rest);
    } as typeof original;
  });
  await page.goto('/');
  await expect(page).toHaveURL(/\/classic\/\?reason=no-webgl$/);
});

test('fills a phone screen without scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  // R3F sizes the canvas after its first measurement, so wait for that.
  await expect
    .poll(() => page.locator('canvas').boundingBox())
    .toMatchObject({ width: 390, height: 844 });
  const size = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
  }));
  expect(size.width).toBeLessThanOrEqual(390);
  expect(size.height).toBeLessThanOrEqual(844);
});
