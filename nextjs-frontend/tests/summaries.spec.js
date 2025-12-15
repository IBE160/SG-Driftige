import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4

test.describe('Summary Page E2E', () => {
  const contentId = 'test-content-id-123';
  const mockSummaries = {
    easy: 'This is an easy summary.',
    medium: 'This is a medium summary, more detailed.',
    hard: 'This is a hard summary, with complex details and terminology.',
  };

  // Mock quiz data for the new test case
  const mockQuiz = {
    quiz_id: uuidv4(),
    questions: [
      {
        question_text: "What is the capital of Playwright?",
        options: ["London", "Paris", "Berlin", "Tokyo"],
        correct_answer_index: 3,
      },
    ],
  };

  const summarizeUrlPattern = '**/api/v1/summarize';
  const quizUrlPattern = '**/api/v1/quiz'; // New pattern for quiz API

  test.beforeEach(async ({ page }) => {
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.error(`BROWSER ERROR: ${msg.text()}`);
      } else {
        console.log(`BROWSER CONSOLE: ${msg.text()}`);
      }
    });

    // Mock the summarize API call for all tests in this describe block
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

    // Mock the quiz API call for the new test case
    await page.route(quizUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: "success",
          data: mockQuiz,
        }),
      });
    });
  });

  test('should display summary content when API succeeds', async ({ page }) => {
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

  test('should generate quiz with a single API call and navigate', async ({ page }) => {
    await page.goto(`/summaries/${contentId}`);

    // Wait for the summary to be visible to ensure the page is loaded
    await expect(page.getByText(mockSummaries.medium)).toBeVisible();

    let quizRequestCount = 0;
    page.on('request', request => {
      if (request.url().includes('/api/v1/quiz') && request.method() === 'POST') {
        quizRequestCount++;
      }
    });

    await page.getByRole('button', { name: /Generate Quiz/i }).click();

    // Wait for navigation to the quiz page
    await page.waitForURL(`/quiz/${mockQuiz.quiz_id}`);

    // Assert that only one quiz API call was made
    expect(quizRequestCount).toBe(1);

    // Assert that the page has navigated to the quiz page
    await expect(page).toHaveURL(`/quiz/${mockQuiz.quiz_id}`);
    await expect(page.getByText(mockQuiz.questions[0].question_text)).toBeVisible();
  });
});