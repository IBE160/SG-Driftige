// @ts-check
import { test, expect } from '@playwright/test';

test('basic page displays', async ({ page }) => {
  await page.goto('/');

  // Expect a specific title from the default Next.js page.
  await expect(page).toHaveTitle('Create Next App');
  // Expect a specific text from the default Next.js page.
  await expect(page.locator('h1')).toContainText('To get started, edit the page.js file.');
});
