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

  test.beforeEach(async ({ page }) => {
    // Mock quiz generation
    await page.route(generateQuizUrlPattern, async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          status: 'success',
          data: mockQuiz, // Wrap mockQuiz in a 'data' object
        }),
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
  });

  test('should display, navigate through, and submit a quiz, then show results', async ({ page }) => {
    await page.goto(`/quiz/${contentId}`); // Use contentId to initiate quiz generation

    // Verify first question is displayed
    await expect(page.getByText('Question 1 of 2')).toBeVisible();
    await expect(page.getByText('What is the capital of Playwright?')).toBeVisible();

    // Select an answer for Q1 (incorrect for mock result)
    await page.getByText('London').click(); // Select incorrect answer
    await expect(page.getByText('London')).toHaveClass(/bg-blue-500/);

    // Navigate to the next question
    await page.getByTestId('next-button').click();

    // Verify second question is displayed
    await expect(page.getByText('Question 2 of 2')).toBeVisible();
    await expect(page.getByText('What is the main purpose of Playwright?')).toBeVisible();

    // Select an answer for Q2 (correct for mock result)
    await page.getByText('E2E Testing').click(); // Select correct answer
    await expect(page.getByText('E2E Testing')).toHaveClass(/bg-blue-500/);

    // Now all questions are answered, the main submit button should be visible
    await expect(page.getByTestId('page-submit-quiz-button')).toBeVisible();
    await page.getByTestId('page-submit-quiz-button').click();

    // Verify results are displayed
    await expect(page.getByText('Quiz Results')).toBeVisible();
    await expect(page.getByText('You scored:')).toBeVisible();
    await expect(page.getByText('50%')).toBeVisible();
    await expect(page.getByText('1 out of 2 correct')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Question 1' }).getByText('Incorrect')).toBeVisible();
    await expect(page.getByRole('listitem').filter({ hasText: 'Question 2' }).getByText('Correct')).toBeVisible();
  });

  test('should handle quiz data loading failure', async ({ page }) => {
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
    
    // Assert that the error message is displayed, matching the format from QuizPage.jsx
    await expect(page.getByText('Error: Failed to load quiz: Failed to generate quiz')).toBeVisible();
    await expect(page.getByText('Loading Quiz...')).not.toBeVisible();
  });
});

