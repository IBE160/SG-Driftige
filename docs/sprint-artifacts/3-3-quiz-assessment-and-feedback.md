# Story 3.3: Quiz Assessment and Feedback

Status: ready-for-dev

## Story

As a user,
I want to get immediate feedback on my answers and see a final score,
so that I know how I performed.

## Acceptance Criteria

1.  Given I answer a question, when I submit my answer, then I am immediately shown if it was correct or incorrect.
2.  Given I complete the quiz, when it is over, then a summary score (e.g., "You got 8/10 correct") is displayed.

## Tasks / Subtasks

- [ ] **Task 1: Implement Answer Submission Logic (AC: 1)**
  - [ ] Subtask 1.1: Create a `POST /api/quiz/submit` endpoint in `backend/app/api/`.
  - [ ] Subtask 1.2: The endpoint should accept `quiz_id` and user answers.
  - [ ] Subtask 1.3: Implement logic to compare user answers with correct answers.
- [ ] **Task 2: Implement Immediate Feedback UI (AC: 1)**
  - [ ] Subtask 2.1: On the frontend, display immediate feedback (correct/incorrect) after each answer submission.
  - [ ] Subtask 2.2: Visually indicate correct/incorrect answers (e.g., green/red styling).
- [ ] **Task 3: Implement Final Score Display (AC: 2)**
  - [ ] Subtask 3.1: After the quiz is completed, display the user's summary score.
  - [ ] Subtask 3.2: Display motivational/demotivational feedback based on the score (as per UX design).
- [ ] **Task 4: Write Tests (AC: 1, 2)**
  - [ ] Subtask 4.1: Write unit tests for the backend assessment logic.
  - [ ] Subtask 4.2: Write integration tests for the `POST /api/quiz/submit` endpoint.
  - [ ] Subtask 4.3: Write UI tests for immediate feedback and final score display.

## Dev Notes

- Relevant architecture patterns and constraints
  - Backend is a FastAPI application.
  - Frontend is a Next.js application using Chakra UI.
  - The `POST /api/quiz/submit` endpoint will be crucial.
- Source tree components to touch
  - `backend/app/api/quiz.py` (modification, add submit endpoint)
  - `frontend/src/app/quiz/page.tsx` (modification)
- Testing standards summary
  - Unit tests for backend logic.
  - Integration tests for API endpoint.
  - UI tests for frontend feedback.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story enhances the existing quiz taking functionality.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Take Adaptive Quizzes]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 3.3: (MVP) Quiz Assessment and Feedback]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-3-quiz-assessment-and-feedback.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
