// @ts-check
const { test, expect } = require('@playwright/test');

test('should display the default Next.js starter page', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "Create Next App"
  await expect(page).toHaveTitle(/Create Next App/);

  // Expect text content indicating the default page
  await expect(page.getByText('Get started by editing')).toBeVisible();
  await expect(page.getByRole('link', { name: 'By Vercel Logo' })).toBeVisible();
});
