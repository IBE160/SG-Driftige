import { test, expect } from "@playwright/test";
import { v4 as uuidv4 } from "uuid";

test.describe("Quiz Page E2E", () => {
  const contentId = "test-content-id";

  // ----------------------------
  // Mock data
  // ----------------------------
  const mockQuiz = {
    quiz_id: uuidv4(),
    questions: [
      {
        question_text: "What is the capital of Playwright?",
        options: ["London", "Paris", "Berlin", "Tokyo"],
        correct_answer_index: 3,
      },
      {
        question_text: "What is the main purpose of Playwright?",
        options: [
          "E2E Testing",
          "Unit Testing",
          "API Testing",
          "Styling",
        ],
        correct_answer_index: 0,
      },
    ],
  };

  const mockAdaptiveQuiz = {
    quiz_id: uuidv4(),
    questions: [
      {
        question_text: "What is the capital of Japan?",
        options: ["Kyoto", "Tokyo", "Osaka", "Sapporo"],
        correct_answer_index: 1,
      },
    ],
  };

  const mockQuizResult = {
    score: 50,
    correct_answers: 1,
    total_questions: 2,
    results: {
      0: false,
      1: true,
    },
  };

  // ----------------------------
  // Helpers
  // ----------------------------
  const waitForQuizToLoad = async (page) => {
    await expect(
      page.getByText("Loading Quiz...")
    ).not.toBeVisible();
  };

  const answerQuestion = async (page, answerText) => {
    await page.getByText(answerText).click();
  };

  // ----------------------------
  // Mocks
  // ----------------------------
  test.beforeEach(async ({ page }) => {
    // Initial quiz
    await page.route("**/api/v1/quiz", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "success",
          data: mockQuiz,
        }),
      });
    });

    // Quiz submission (ANY quiz_id)
    await page.route("**/api/v1/quiz/*/submit", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockQuizResult),
      });
    });

    // Adaptive quiz (ANY quiz_id)
    await page.route("**/api/v1/quiz/*/follow-up", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify({
          status: "success",
          data: mockAdaptiveQuiz,
        }),
      });
    });
  });

  // ============================================================
  // HAPPY PATH – full adaptive loop
  // ============================================================
  test("runs the full adaptive quiz loop", async ({ page }) => {
    await page.goto(`/quiz/${contentId}`);

    // ----------------------------
    // Initial quiz
    // ----------------------------
    await waitForQuizToLoad(page);

    await expect(
      page.getByText("Question 1 of 2")
    ).toBeVisible();

    await answerQuestion(page, "London");
    await page.getByTestId("next-button").click();

    await expect(
      page.getByText("Question 2 of 2")
    ).toBeVisible();

    await answerQuestion(page, "E2E Testing");

    await page.getByTestId("page-submit-quiz-button").click();

    // ----------------------------
    // Results
    // ----------------------------
    await expect(
      page.getByText("Quiz Results")
    ).toBeVisible();

    await expect(page.getByText("50%")).toBeVisible();
    await expect(
      page.getByText("1 out of 2 correct")
    ).toBeVisible();

    const practiceButton = page.getByText("Practice Weak Spots");
    await expect(practiceButton).toBeVisible();

    // ----------------------------
    // Adaptive quiz
    // ----------------------------
    await practiceButton.click();

    await waitForQuizToLoad(page);

    await expect(
      page.getByText("Quiz Results")
    ).not.toBeVisible();

    await expect(
      page.getByText("Question 1 of 1")
    ).toBeVisible();

    await expect(
      page.getByText("What is the capital of Japan?")
    ).toBeVisible();
  });

  // ============================================================
  // ERROR HANDLING
  // ============================================================
  test("shows error when initial quiz loading fails", async ({ page }) => {
    await page.unroute("**/api/v1/quiz");

    await page.route("**/api/v1/quiz", async (route) => {
      await route.fulfill({
        status: 500,
        contentType: "application/json",
        body: JSON.stringify({
          detail: "Failed to generate quiz",
        }),
      });
    });

    await page.goto(`/quiz/${contentId}`);

    await expect(
      page.getByText(
        "Error: Failed to load quiz: Failed to generate quiz"
      )
    ).toBeVisible();
  });
});