# Story 3.4: Adaptive Follow-up Quiz

Status: ready-for-dev

## Story

As a user,
after a quiz, I want to take a follow-up quiz on the questions I got wrong,
so that I can reinforce my weak spots.

## Acceptance Criteria

1.  Given I have completed a quiz with incorrect answers, when the score is displayed, then an option to "Practice weak spots" is available. (Covers FR17)
2.  Given I choose to practice weak spots, when the new quiz starts, then it contains new questions that target the topics I answered incorrectly. (Covers FR17)
3.  The backend can identify the topics of incorrectly answered questions and request a new, targeted quiz from the LLM.

## Tasks / Subtasks

- [ ] **Task 1: Create Backend Adaptive Logic (AC: #3)**
    - [ ] In `fastapi-backend/app/services/quiz_service.py`, implement a method that takes a `QuizResult` and identifies the topics of the incorrectly answered questions.
    - [ ] In `fastapi-backend/app/llm_integrations/quiz_generator.py`, create a new prompt template for generating a follow-up quiz that focuses on a given list of topics (the "weak spots").
- [ ] **Task 2: Create Adaptive Follow-up API Endpoint (AC: #3)**
    - [ ] In `fastapi-backend/app/api/quiz_router.py`, implement the `POST /api/quiz/follow-up` endpoint.
    - [ ] This endpoint will take a `content_id` and `QuizResult`, and return a new `QuizData` object.
- [ ] **Task 3: Implement Frontend "Practice Weak Spots" Feature (AC: #1, #2)**
    - [ ] In the `nextjs-frontend/src/components/QuizResults.jsx` component, add a "Practice weak spots" button that is only visible if the user scored less than 100%.
    - [ ] Implement the logic for this button to call the `POST /api/quiz/follow-up` endpoint.
    - [ ] Upon receiving the new `QuizData`, the `QuizView` component should be re-rendered with the new set of questions.
- [ ] **Task 4: Write Tests (AC: #1, #2, #3)**
    - [ ] Write unit tests for the backend logic that identifies weak spots and constructs the new prompts.
    - [ ] Write integration tests for the `POST /api/quiz/follow-up` endpoint.
    - [ ] Update the component tests for `QuizResults.jsx` to assert that the "Practice weak spots" button appears correctly.
    - [ ] Update the E2E test to cover the full adaptive loop: take a quiz, get a non-perfect score, click the button, and verify a new quiz loads.

## Dev Notes

This story completes the core "adaptive learning" loop for Epic 3. The main technical challenge is on the backend: how to effectively communicate the user's "weak spots" to the LLM to get a relevant and useful follow-up quiz. For the MVP, we will pass the text of the incorrectly answered questions as the "topics" for the new prompt.

### Project Structure Notes

-   **Modified Files:**
    -   `fastapi-backend/app/services/quiz_service.py`
    -   `fastapi-backend/app/llm_integrations/quiz_generator.py`
    -   `fastapi-backend/app/api/quiz_router.py`
    -   `nextjs-frontend/src/components/QuizResults.jsx`
    -   `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (or the parent component managing state)
    -   `nextjs-frontend/src/lib/api.js`

### Learnings from Previous Story (3.3: Quiz Assessment and Feedback)

*   **From Story 3.3 (Status: ready-for-dev)**
    - **API Contract**: The `QuizResult` object, which is the output of the previous story, is the primary *input* for this story's backend logic. Adherence to this data contract is critical.
    - **Component Structure**: This story will modify the `QuizResults.jsx` component created in the previous story to add the adaptive follow-up functionality.

### References

-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]
-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Acceptance Criteria (Authoritative)]
-   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 3: Adaptive Quizzing]
-   [Source: docs/sprint-artifacts/3-3-quiz-assessment-feedback.md]

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-4-adaptive-follow-up-quiz.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
