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

  test('should successfully submit text and navigate to summary page', async ({ page }) => {
    await page.goto('/');

    // Mock the API call for text submission
    await page.route('**/api/v1/upload/text', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', data: { content_id: 'test-text-content-id' } }),
      });
    });

    const textArea = page.locator('textarea[placeholder="Paste your notes or text here..."]');
    await textArea.fill('This is a test text that will be summarized.');

    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    // Wait for navigation and assert the URL
    await page.waitForURL('/summaries/test-text-content-id');
    await expect(page).toHaveURL('/summaries/test-text-content-id');
  });

  test('should successfully upload a PDF file and navigate to summary page', async ({ page }) => {
    await page.goto('/');

    // Mock the API call for PDF file upload
    await page.route('**/api/v1/upload/pdf', async (route) => {
      await route.fulfill({
        status: 201,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'success', data: { content_id: 'test-pdf-content-id' } }),
      });
    });

    // Provide a dummy file for upload
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('./tests/dummy.pdf'); // Assuming a dummy.pdf exists for testing

    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    // Wait for navigation and assert the URL
    await page.waitForURL('/summaries/test-pdf-content-id');
    await expect(page).toHaveURL('/summaries/test-pdf-content-id');
  });

  test('should display error message on text submission failure', async ({ page }) => {
    await page.goto('/');

    // Mock the API call for text submission to fail
    await page.route('**/api/v1/upload/text', async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Internal Server Error during text processing' }),
      });
    });

    // Mock the alert function
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Error: Internal Server Error during text processing');
      await dialog.dismiss();
    });

    const textArea = page.locator('textarea[placeholder="Paste your notes or text here..."]');
    await textArea.fill('This text will cause an error.');

    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    // Ensure the loading state is reset and the button is enabled again
    await expect(generateButton).toBeEnabled();
    await expect(page).toHaveURL('/'); // Should stay on the same page
  });

  test('should display error message on PDF upload failure', async ({ page }) => {
    await page.goto('/');

    // Mock the API call for PDF upload to fail
    await page.route('**/api/v1/upload/pdf', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ detail: 'Only PDF files are allowed.' }),
      });
    });

    // Mock the alert function
    page.on('dialog', async dialog => {
      expect(dialog.message()).toContain('Error: Only PDF files are allowed.');
      await dialog.dismiss();
    });

    // Provide a dummy file for upload
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles('./tests/dummy.pdf');

    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    // Ensure the loading state is reset and the button is enabled again
    await expect(generateButton).toBeEnabled();
    await expect(page).toHaveURL('/'); // Should stay on the same page
  });
});
