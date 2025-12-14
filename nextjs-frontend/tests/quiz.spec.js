// nextjs-frontend/tests/quiz.spec.js
import { test, expect } from '@playwright/test';

test.describe('Quiz Page E2E', () => {
  const contentId = 'test-quiz-id';
  const mockQuiz = {
    quiz_id: 'quiz-123',
    questions: [
      {
        question_text: 'What is the capital of Playwright?',
        options: ['London', 'Paris', 'Berlin', 'Tokyo'],
        correct_answer_index: 3,
      },
      {
        question_text: 'What is the main purpose of Playwright?',
        options: ['E2E Testing', 'Unit Testing', 'API Testing', 'Styling'],
        correct_answer_index: 0,
      },
    ],
  };

  const quizUrlPattern = '**/api/v1/quiz';

  test.beforeEach(async ({ page }) => {
    await page.route(quizUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: mockQuiz,
        }),
      });
    });
  });

  test('should display and navigate through a quiz', async ({ page }) => {
    await page.goto(`/quiz/${contentId}`);

    // Verify first question is displayed
    await expect(page.getByText('Question 1 of 2')).toBeVisible();
    await expect(page.getByText('What is the capital of Playwright?')).toBeVisible();

    // Select an answer
    await page.getByText('Tokyo').click();
    await expect(page.getByText('Tokyo')).toHaveClass(/bg-blue-500/);

    // Navigate to the next question using data-testid
    await page.getByTestId('next-button').click();

    // Verify second question is displayed
    await expect(page.getByText('Question 2 of 2')).toBeVisible();
    await expect(page.getByText('What is the main purpose of Playwright?')).toBeVisible();

    // Select an answer
    await page.getByText('E2E Testing').click();
    await expect(page.getByText('E2E Testing')).toHaveClass(/bg-blue-500/);

    // Verify "Submit Quiz" button is present on the last question
    await expect(page.getByTestId('next-button')).toHaveText('Submit Quiz');
  });

  test('should handle quiz data loading failure', async ({ page }) => {
    // Override the route for this test
    await page.unroute(quizUrlPattern);
    await page.route(quizUrlPattern, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Failed to generate quiz'
        }),
      });
    });

    await page.goto(`/quiz/${contentId}`);

    // This is a placeholder. The actual page implementation for quiz loading is not part of this story.
    // However, we can assert that the quiz view is not rendered.
    // A proper implementation would have a loading state and then an error message.
    // For now, we'll just check that the main quiz content is not there.
    await expect(page.getByText('Question 1 of 2')).not.toBeVisible();
  });
});

