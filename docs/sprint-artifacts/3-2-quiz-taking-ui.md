# Story 3.2: Quiz Taking UI

Status: done

## Story

As a user,
I want to see and answer quiz questions,
so that I can test my understanding.

## Acceptance Criteria

1.  Given a quiz is generated, when it is displayed, then questions are shown one at a time. (Covers FR13, FR22)
2.  Given a question is shown, when I select an answer, then my choice is recorded. (Covers FR13)
3.  The UI is responsive and functions correctly on desktop and mobile browsers.

## Tasks / Subtasks

- [x] **Task 1: Create Quiz Page (AC: #1)**
    - [x] Create a new Next.js page at `nextjs-frontend/src/app/quiz/[quizId]/page.jsx`.
    - [x] This page will be responsible for fetching the quiz data from the backend using the `quizId`.
- [x] **Task 2: Create Quiz View Component (AC: #1, #2)**
    - [x] Develop the `nextjs-frontend/src/components/QuizView.jsx` component.
    - [x] The component should accept quiz data as props and display one question at a time with its multiple-choice options.
    - [x] Implement state management to track the current question number and the user's selected answers.
    - [x] Include "Next" and "Previous" buttons to navigate between questions.
- [x] **Task 3: Update API Library (AC: #1)**
    - [x] Update `nextjs-frontend/src/lib/api.js` to include a `getQuiz(quizId)` function that fetches the quiz data from the backend.
- [x] **Task 4: Write Tests (AC: #1, #2, #3)**
    - [x] Write unit tests for the `QuizView.jsx` component to verify question rendering, answer selection, and navigation.
    - [x] Write an E2E test using Playwright to simulate a user navigating to the quiz page and answering a few questions.

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

## Change Log
- **{{date}}**: Senior Developer Review notes appended. Status changed to 'done'.

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-2-quiz-taking-ui.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
- M nextjs-frontend/src/lib/api.js
- A nextjs-frontend/src/components/__tests__/QuizView.test.jsx
- A nextjs-frontend/tests/quiz.spec.js
- M nextjs-frontend/src/app/quiz/[quizId]/page.jsx
- M nextjs-frontend/src/components/QuizView.jsx

---
## Senior Developer Review (AI)
- **Reviewer**: Eline&Sindre
- **Date**: 2025-12-14
- **Outcome**: Approve

### Summary
The implementation for the Quiz Taking UI is excellent. All acceptance criteria have been met, and the associated tasks are fully verified. The code is of high quality, follows the established architectural patterns, and includes a solid suite of unit and E2E tests.

### Key Findings
- **No findings.** The implementation is solid.

### Acceptance Criteria Coverage
- **Summary**: 3 of 3 acceptance criteria fully implemented.

| AC# | Description | Status | Evidence |
|---|---|---|---|
| 1 | Questions are shown one at a time. | IMPLEMENTED | `QuizView.jsx` uses `currentQuestionIndex` state to display one question. |
| 2 | Selected answer is recorded. | IMPLEMENTED | `QuizView.jsx` uses `userAnswers` state, updated by `handleOptionSelect`. |
| 3 | UI is responsive. | IMPLEMENTED | Tailwind CSS responsive classes are used. E2E tests pass. |

### Task Completion Validation
- **Summary**: 4 of 4 completed tasks verified. No discrepancies.

| Task | Marked As | Verified As |
|---|---|---|
| 1: Create Quiz Page | [x] | VERIFIED COMPLETE |
| 2: Create Quiz View Component | [x] | VERIFIED COMPLETE |
| 3: Update API Library | [x] | VERIFIED COMPLETE |
| 4: Write Tests | [x] | VERIFIED COMPLETE |

### Architectural Alignment
- **[Warning]** No Tech Spec was found for Epic 3, so a detailed cross-check could not be performed. However, the implementation aligns perfectly with the overall project `architecture.md` and `ux-design-specification.md`.

### Action Items
- **No action items.**
