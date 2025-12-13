import { test, expect } from '@playwright/test';

test.describe('Summary Page E2E', () => {
  const contentId = 'test-content-id-123';
  const mockSummaries = {
    easy: 'This is an easy summary.',
    medium: 'This is a medium summary, more detailed.',
    hard: 'This is a hard summary, with complex details and terminology.',
  };

  const summarizeUrlPattern = '**/api/v1/summarize';

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
      const requestBody = route.request().postDataJSON();
      const difficulty = requestBody.difficulty || 'medium'; // Default to medium if not specified
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: { summary_text: mockSummaries[difficulty] },
        }),
      });
    });

    await page.goto(`/summaries/${contentId}`);

    // Expect the medium summary to be displayed by default
    await expect(page.getByText(mockSummaries.medium)).toBeVisible();
    await expect(page.getByRole('heading', { name: new RegExp(`${contentId}`, 'i') })).toBeVisible();
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

    // Adjusted assertion to match "Error: " prefix from frontend
    await expect(page.getByText(`Error: Internal Server Error from LLM`)).toBeVisible();
  });

  test('should allow seamless difficulty switching', async ({ page }) => {
    await page.route(summarizeUrlPattern, async (route) => {
      const requestBody = route.request().postDataJSON();
      const difficulty = requestBody.difficulty;
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: { summary_text: mockSummaries[difficulty] },
        }),
      });
    });

    await page.goto(`/summaries/${contentId}`);

    // Verify initial medium summary
    await expect(page.getByText(mockSummaries.medium)).toBeVisible();

    // Click "Hard" button
    await page.getByRole('button', { name: 'Hard' }).click();
    await expect(page.getByText(mockSummaries.hard)).toBeVisible();
    await expect(page.getByText(mockSummaries.medium)).not.toBeVisible(); // Ensure old summary is gone

    // Click "Easy" button
    await page.getByRole('button', { name: 'Easy' }).click();
    await expect(page.getByText(mockSummaries.easy)).toBeVisible();
    await expect(page.getByText(mockSummaries.hard)).not.toBeVisible(); // Ensure old summary is gone
  });
});