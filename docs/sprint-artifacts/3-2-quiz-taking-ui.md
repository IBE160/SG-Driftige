# Story 3.2: Quiz Taking UI

Status: ready-for-dev

## Story

As a user,
I want to see and answer quiz questions,
so that I can test my understanding.

## Acceptance Criteria

1.  Given a quiz is generated, when it is displayed, then questions are shown one at a time. (Covers FR13, FR22)
2.  Given a question is shown, when I select an answer, then my choice is recorded. (Covers FR13)
3.  The UI is responsive and functions correctly on desktop and mobile browsers.

## Tasks / Subtasks

- [ ] **Task 1: Create Quiz Page (AC: #1)**
    - [ ] Create a new Next.js page at `nextjs-frontend/src/app/quiz/[quizId]/page.jsx`.
    - [ ] This page will be responsible for fetching the quiz data from the backend using the `quizId`.
- [ ] **Task 2: Create Quiz View Component (AC: #1, #2)**
    - [ ] Develop the `nextjs-frontend/src/components/QuizView.jsx` component.
    - [ ] The component should accept quiz data as props and display one question at a time with its multiple-choice options.
    - [ ] Implement state management to track the current question number and the user's selected answers.
    - [ ] Include "Next" and "Previous" buttons to navigate between questions.
- [ ] **Task 3: Update API Library (AC: #1)**
    - [ ] Update `nextjs-frontend/src/lib/api.js` to include a `getQuiz(quizId)` function that fetches the quiz data from the backend.
- [ ] **Task 4: Write Tests (AC: #1, #2, #3)**
    - [ ] Write unit tests for the `QuizView.jsx` component to verify question rendering, answer selection, and navigation.
    - [ ] Write an E2E test using Playwright to simulate a user navigating to the quiz page and answering a few questions.

## Dev Notes

This story focuses on the frontend implementation for the quiz-taking experience. It will consume the API created in the previous story (3.1). The main challenge is to create an intuitive and "playable" UI that presents questions clearly and records user input effectively.

### Project Structure Notes

-   **New Files:**
    -   `nextjs-frontend/src/app/quiz/[quizId]/page.jsx`
    -   `nextjs-frontend/src/components/QuizView.jsx`
    -   `nextjs-frontend/src/components/__tests__/QuizView.test.jsx`
-   **Modified Files:**
    -   `nextjs-frontend/src/lib/api.js`

### Learnings from Previous Story (3.1: Quiz Generation Backend)

*   **From Story 3.1 (Status: ready-for-dev)**
    - **API Contract Defined**: The previous story established the backend API and data schemas (`QuizData`, `QuizQuestion`). The frontend implementation must adhere strictly to these contracts. The key endpoint to consume is `POST /api/quiz` to get the quiz data.
    - **Backend is Ready**: The backend service for generating quizzes is now specified and ready for implementation. This story can proceed with the assumption that the API will be available.

### References

-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]
-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Acceptance Criteria (Authoritative)]
-   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 3: Adaptive Quizzing]
-   [Source: docs/sprint-artifacts/3-1-quiz-generation-backend.md]

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-2-quiz-taking-ui.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
