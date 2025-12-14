// nextjs-frontend/tests/quiz.spec.js
import { test, expect } from '@playwright/test';
import { v4 as uuidv4 } from 'uuid'; // Import uuid to generate UUIDs

test.describe('Quiz Page E2E', () => {
  const contentId = 'test-content-id'; // Use contentId for generating quiz
  const quizId = uuidv4(); // Generate a UUID for the quiz_id

  const mockQuiz = {
    quiz_id: quizId,
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

  const mockAdaptiveQuiz = {
    quiz_id: uuidv4(),
    questions: [
      {
        question_text: 'What is the capital of Japan?',
        options: ['Kyoto', 'Tokyo', 'Osaka', 'Sapporo'],
        correct_answer_index: 1,
      },
    ],
  };

  const mockQuizResult = {
    score: 50.0,
    correct_answers: 1,
    total_questions: 2,
    results: {
      0: false, // Assuming first answer was incorrect
      1: true,  // Assuming second answer was correct
    },
  };

  const generateQuizUrlPattern = '**/api/v1/quiz';
  const submitQuizUrlPattern = `**/api/v1/quiz/${quizId}/submit`;
  const adaptiveQuizUrlPattern = `**/api/v1/quiz/${quizId}/follow-up`;

  test.beforeEach(async ({ page }) => {
    // Mock initial quiz generation
    await page.route(generateQuizUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: "success", data: mockQuiz }),
      });
    });

    // Mock quiz submission
    await page.route(submitQuizUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockQuizResult),
      });
    });
    
    // Mock adaptive quiz generation
    await page.route(adaptiveQuizUrlPattern, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({ status: "success", data: mockAdaptiveQuiz }),
        });
    });
  });

  test('should run the full adaptive quiz loop', async ({ page }) => {
    await page.goto(`/quiz/${contentId}`);

    // --- Initial Quiz ---
    await expect(page.getByText('Question 1 of 2')).toBeVisible();
    await expect(page.getByText('What is the capital of Playwright?')).toBeVisible();
    await page.getByText('London').click(); // Select incorrect answer

    await page.getByTestId('next-button').click();

    await expect(page.getByText('Question 2 of 2')).toBeVisible();
    await expect(page.getByText('What is the main purpose of Playwright?')).toBeVisible();
    await page.getByText('E2E Testing').click(); // Select correct answer
    
    await page.getByTestId('page-submit-quiz-button').click();

    // --- Quiz Results ---
    await expect(page.getByText('Quiz Results')).toBeVisible();
    await expect(page.getByText('50%')).toBeVisible();
    await expect(page.getByText('1 out of 2 correct')).toBeVisible();
    
    const practiceButton = page.getByText('Practice Weak Spots');
    await expect(practiceButton).toBeVisible();

    // --- Adaptive Follow-up ---
    await practiceButton.click();

    // Verify the new quiz is loaded
    await expect(page.getByText('Quiz Results')).not.toBeVisible();
    await expect(page.getByText('Question 1 of 1')).toBeVisible();
    await expect(page.getByText('What is the capital of Japan?')).toBeVisible();
  });

  test('should handle initial quiz loading failure', async ({ page }) => {
    // Override the route for this test
    await page.unroute(generateQuizUrlPattern);
    await page.route(generateQuizUrlPattern, async (route) => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({
          detail: 'Failed to generate quiz'
        }),
      });
    });

    await page.goto(`/quiz/${contentId}`);
    
    await expect(page.getByText('Error: Failed to load quiz: Failed to generate quiz')).toBeVisible();
  });
});
