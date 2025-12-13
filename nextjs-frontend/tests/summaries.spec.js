import { test, expect } from '@playwright/test';

test.describe('Summary Page E2E', () => {
  const contentId = 'test-content-id-123';
  const mockSummaryText =
    'This is a mocked summary for the E2E test.';

  const summarizeUrlPattern = '**/api/v1/summarize**';

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`BROWSER ERROR: ${msg.text()}`);
      } else {
        console.log(`BROWSER CONSOLE: ${msg.text()}`);
      }
    });
  });

  test('should display summary content when API succeeds', async ({ page }) => {
    await page.route(summarizeUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: { summary_text: mockSummaryText },
        }),
      });
    });

    await page.goto(`/summaries/${contentId}`);

    // If the page requires a click to generate summary
    const maybeButton = page.getByRole('button', {
      name: /generate|summary|summarize|create/i, // Added 'create'
    });

    if (await maybeButton.count()) {
      await maybeButton.first().click();
    }

    await expect(page.getByText(mockSummaryText)).toBeVisible();
    await expect(page.getByRole('heading', { name: new RegExp(`${contentId}`, 'i') })).toBeVisible(); // Added back for completeness
  });

  test('should display error message on API failure', async ({ page }) => {
    await page.route(summarizeUrlPattern, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Internal Server Error from LLM',
        }),
      });
    });

    await page.goto(`/summaries/${contentId}`);

    const maybeButton = page.getByRole('button', {
      name: /generate|summary|summarize|create/i, // Added 'create'
    });

    if (await maybeButton.count()) {
      await maybeButton.first().click();
    }

    // Adjusted assertion to match "Error: " prefix from frontend
    await expect(page.getByText(`Error: Internal Server Error from LLM`)).toBeVisible();
  });
});