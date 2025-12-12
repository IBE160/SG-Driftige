// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Input Page', () => {
  test('should display main elements and be responsive on desktop', async ({ page }) => {
    await page.goto('/');

    // Check main title
    await expect(page.locator('h1')).toHaveText('QuizZum');

    // Check subtitle
    await expect(page.locator('p:has-text("Don\'t feel dumb, use QuizZum")')).toBeVisible();

    // Check text input area
    const textArea = page.locator('textarea[placeholder="Paste your notes or text here..."]');
    await expect(textArea).toBeVisible();
    await expect(textArea).toBeEditable();

    // Check file upload section
    await expect(page.locator('label:has-text("Upload a file or drag and drop")')).toBeVisible();
    await expect(page.locator('input[type="file"]')).toHaveClass(/sr-only/); // The actual input is sr-only

    // Check Generate button
    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeVisible();
    await expect(generateButton).toBeDisabled(); // Should be disabled initially as no input

    // Check basic layout on desktop - using a simple check that the main content div is visible
    await expect(page.locator('main')).toBeVisible();
  });

  test('should display main elements and be responsive on mobile', async ({ page }) => {
    // Set viewport to a common mobile size
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/');

    // Check main title (responsive size)
    await expect(page.locator('h1')).toHaveCSS('font-size', '36px'); // text-4xl = 2.25rem = 36px

    // Check text input area
    await expect(page.locator('textarea[placeholder="Paste your notes or text here..."]')).toBeVisible();

    // Check file upload section
    await expect(page.locator('label:has-text("Upload a file or drag and drop")')).toBeVisible();

    // Check Generate button
    await expect(page.locator('button:has-text("Generate")')).toBeVisible();

    // Check that elements are vertically stacked as expected in a responsive layout
    // This is a simple check, more complex layout assertions might be needed for full validation
    const mainContentDiv = page.locator('main > div');
    const mainContentBox = await mainContentDiv.boundingBox();
    const textAreaBox = await page.locator('textarea').boundingBox();
    const fileUploadBox = await page.locator('label[for="file-upload"]').boundingBox();

    // Expect elements to generally be within the main content flow and not overlap horizontally too much
    expect(mainContentBox.width).toBeGreaterThan(textAreaBox.width * 0.8); // Should take up most of the width
    expect(mainContentBox.width).toBeGreaterThan(fileUploadBox.width * 0.8); // Should take up most of the width
    expect(textAreaBox.x).toBeCloseTo(fileUploadBox.x, -1); // Should be roughly horizontally aligned
  });
});
