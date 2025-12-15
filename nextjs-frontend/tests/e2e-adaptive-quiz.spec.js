import { test, expect } from '@playwright/test';

test.describe('Full E2E Adaptive Quiz Flow', () => {

  test('should complete the full user journey from text input to adaptive quiz', async ({ page }) => {
    // 1. Go to the homepage and submit text
    await page.goto('/');
    const textArea = page.locator('textarea[placeholder="Paste your notes or text here..."]');
    // Use a simple, factual text that is easy to generate questions from.
    // Using a broader topic to ensure different questions can be generated.
    await textArea.fill(`
      The solar system has eight planets. Mercury is the closest to the Sun. 
      Venus is the second planet. Earth is the third planet, and it is the only one known to host life. 
      Mars is the fourth planet and is known as the Red Planet. Jupiter is the fifth planet and is the largest. 
      Saturn is the sixth planet, famous for its rings. Uranus is the seventh, and Neptune is the eighth and farthest from the Sun.
    `);
    
    const generateButton = page.locator('button:has-text("Generate")');
    await expect(generateButton).toBeEnabled();
    await generateButton.click();

    // 2. Wait for navigation to the summary page and get the contentId
    await page.waitForURL(/\/summaries\/.*/, { timeout: 60000 });
    const summaryUrl = page.url();
    const contentId = summaryUrl.split('/').pop();
    console.log(`Navigated to summary page with contentId: ${contentId}`);
    
    // 3. Generate the first quiz
    const generateQuizButton = page.locator('button:has-text("Generate Quiz")');
    await expect(generateQuizButton).toBeVisible({ timeout: 30000 });
    await generateQuizButton.click();

    // 4. Wait for navigation to the quiz page
    await page.waitForURL(/\/quiz\/.*/, { timeout: 60000 });
    const initialQuizUrl = page.url();
    const initialQuizId = initialQuizUrl.split('/').pop();
    console.log(`Navigated to initial quiz page with quizId: ${initialQuizId}`);
    await expect(page.getByText('Loading Quiz...')).not.toBeVisible({ timeout: 30000 });

    // 5. Answer the first quiz - deliberately get some wrong
    // This part is less deterministic because question text can vary.
    // We will select the first option for every question to ensure some are likely wrong.
    const questions = await page.locator('[data-testid^="question-"]').all();
    console.log(`Found ${questions.length} questions in the initial quiz.`);
    expect(questions.length).toBeGreaterThan(0);

    for (let i = 0; i < questions.length; i++) {
      const question = questions[i];
      // Select the first radio button option
      await question.locator('input[type="radio"]').first().click();
      if (i < questions.length - 1) {
        await page.getByTestId("next-button").click();
      }
    }

    // 6. Submit the quiz
    const submitButton = page.getByTestId("page-submit-quiz-button");
    await expect(submitButton).toBeVisible();
    await submitButton.click();

    // 7. On the results page, check the score and click "Practice weak spots"
    await expect(page.getByText('Quiz Results')).toBeVisible({ timeout: 30000 });
    const scoreElement = page.locator('[data-testid="quiz-score"]');
    const scoreText = await scoreElement.textContent();
    console.log(`Quiz score: ${scoreText}`);
    // We expect the score not to be 100%, but we won't fail the test if it is.
    
    const practiceButton = page.getByText("Practice Weak Spots");
    await expect(practiceButton).toBeVisible();
    await practiceButton.click();
    
    // 8. Wait for the new, adaptive quiz to load
    await expect(page.getByText('Loading Quiz...')).toBeVisible();
    await page.waitForURL(/\/quiz\/.*/, { timeout: 60000 });
    const adaptiveQuizUrl = page.url();
    const adaptiveQuizId = adaptiveQuizUrl.split('/').pop();
    console.log(`Navigated to adaptive quiz page with quizId: ${adaptiveQuizId}`);
    
    // 9. Assert that a new quiz has been loaded
    expect(adaptiveQuizId).not.toEqual(initialQuizId);
    
    await expect(page.getByText('Loading Quiz...')).not.toBeVisible({ timeout: 30000 });
    
    const adaptiveQuestions = await page.locator('[data-testid^="question-"]').all();
    console.log(`Found ${adaptiveQuestions.length} questions in the adaptive quiz.`);
    expect(adaptiveQuestions.length).toBeGreaterThan(0);

    // Optional: A more robust check would be that the number of questions is less than the original.
    // This is a good indicator of an adaptive quiz focusing on weak spots.
    if (scoreText !== '100%') {
      expect(adaptiveQuestions.length).toBeLessThanOrEqual(questions.length);
    }
  });

});
