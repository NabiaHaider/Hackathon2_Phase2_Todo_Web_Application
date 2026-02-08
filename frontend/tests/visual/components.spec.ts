import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests for Components', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/admin/components-test');
  });

  test('Button component', async ({ page }) => {
    const buttonContainer = page.locator('.flex.gap-2');
    await expect(buttonContainer).toHaveScreenshot();
  });

  test('Card component', async ({ page }) => {
    const card = page.locator('.w-\[350px\]');
    await expect(card).toHaveScreenshot();
  });

  test('Input component', async ({ page }) => {
    const input = page.locator('input[type="text"]');
    await expect(input).toHaveScreenshot();
  });
});
