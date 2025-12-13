# Story 3.3: Quiz Assessment and Feedback

Status: ready-for-dev

## Story

As a user,
I want to get immediate feedback on my answers and see a final score,
so that I know how I performed.

## Acceptance Criteria

1.  Given I answer a question, when I submit my answer, then I am immediately shown if it was correct or incorrect. (Covers FR15)
2.  Given I complete the quiz, when it is over, then a summary score (e.g., "You got 8/10 correct") is displayed. (Covers FR14, FR16)
3.  The backend correctly assesses the submitted answers against the correct answers for the quiz.

## Tasks / Subtasks

- [ ] **Task 1: Create Backend Assessment Logic (AC: #3)**
    - [ ] In `fastapi-backend/app/services/quiz_service.py`, implement a method to assess a `QuizSubmission`.
    - [ ] This method will need to retrieve the correct answers for the given `quiz_id` (note: this implies a need for temporary caching or storage of quiz data on the backend).
    - [ ] It will compare the user's answers and generate a `QuizResult` object.
- [ ] **Task 2: Create Assessment API Endpoint (AC: #3)**
    - [ ] In `fastapi-backend/app/api/quiz_router.py`, implement the `POST /api/quiz/{quiz_id}/submit` endpoint.
    - [ ] This endpoint will take a `QuizSubmission` and return a `QuizResult`.
- [ ] **Task 3: Create Quiz Results Component (AC: #1, #2)**
    - [ ] Develop the `nextjs-frontend/src/components/QuizResults.jsx` component.
    - [ ] This component will take a `QuizResult` object as props and display the final score and a breakdown of correct/incorrect answers.
- [ ] **Task 4: Integrate Submission and Results Display (AC: #1, #2)**
    - [ ] In `nextjs-frontend/src/app/quiz/[quizId]/page.jsx`, add a "Submit" button that becomes active after all questions are answered.
    - [ ] Implement the logic to call the `POST /api/quiz/{quiz_id}/submit` endpoint and display the `QuizResults` component with the response.
- [ ] **Task 5: Write Tests (AC: #1, #2, #3)**
    - [ ] Write unit tests for the backend assessment logic in `quiz_service.py`.
    - [ ] Write integration tests for the `POST /api/quiz/{quiz_id}/submit` endpoint.
    - [ ] Write component tests for the `QuizResults.jsx` component.
    - [ ] Update the E2E test to include submitting the quiz and verifying the results page.

## Dev Notes

This story implements the feedback loop for the user, which is critical for the "playable" learning experience. It involves both backend logic for assessment and frontend UI for displaying the results. A key technical consideration is how the backend will temporarily store or cache the correct answers for a generated quiz to be able to assess the user's submission.

### Project Structure Notes

-   **New Files:**
    -   `nextjs-frontend/src/components/QuizResults.jsx`
    -   `nextjs-frontend/src/components/__tests__/QuizResults.test.jsx`
-   **Modified Files:**
    -   `fastapi-backend/app/services/quiz_service.py`
    -   `fastapi-backend/app/api/quiz_router.py`
    -   `nextjs-frontend/src/app/quiz/[quizId]/page.jsx`
    -   `nextjs-frontend/src/lib/api.js`

### Learnings from Previous Story (3.2: Quiz Taking UI)

*   **From Story 3.2 (Status: ready-for-dev)**
    - **Frontend Structure**: The previous story established the `QuizView` component and the `quiz/[quizId]` page. This story will build directly on that structure, adding the submission logic and rendering the `QuizResults` component upon completion.
    - **State Management**: The state management for user answers implemented in `QuizView` will be the source for the submission payload.

### References

-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]
-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Acceptance Criteria (Authoritative)]
-   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 3: Adaptive Quizzing]
-   [Source: docs/sprint-artifacts/3-2-quiz-taking-ui.md]

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-3-quiz-assessment-feedback.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
