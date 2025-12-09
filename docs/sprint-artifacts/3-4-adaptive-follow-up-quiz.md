# Story 3.4: Adaptive Follow-up Quiz

Status: ready-for-dev

## Story

As a user,
after a quiz, I want to take a follow-up quiz on the questions I got wrong,
so that I can reinforce my weak spots.

## Acceptance Criteria

1.  Given I have completed a quiz with incorrect answers, when the score is displayed, then an option to "Practice weak spots" is available.
2.  Given I choose to practice weak spots, when the new quiz starts, then it contains questions related to the topics I answered incorrectly.

## Tasks / Subtasks

- [ ] **Task 1: Implement "Practice Weak Spots" UI (AC: 1)**
  - [ ] Subtask 1.1: On the quiz results screen, if incorrect answers are present, display a "Practice weak spots" button.
- [ ] **Task 2: Implement Adaptive Quiz Logic (AC: 2)**
  - [ ] Subtask 2.1: When "Practice weak spots" is clicked, the frontend should make a new API call to `POST /api/quiz` with an adaptive context (e.g., `previous_incorrect_questions`).
  - [ ] Subtask 2.2: The backend `QuizService` should use this context to generate a new quiz focusing on the identified weak spots.
- [ ] **Task 3: Write Tests (AC: 1, 2)**
  - [ ] Subtask 3.1: Write UI tests to verify the "Practice weak spots" button appears conditionally.
  - [ ] Subtask 3.2: Write integration tests to verify the adaptive quiz generation logic on the backend.

## Dev Notes

- Relevant architecture patterns and constraints
  - The backend `QuizService` will need to be enhanced to support adaptive quiz generation based on provided context.
  - The frontend will need to pass information about incorrect answers to the backend.
- Source tree components to touch
  - `frontend/src/app/quiz/page.tsx` (modification)
  - `backend/app/core/quiz_service.py` (modification)
  - `backend/app/api/quiz.py` (modification)
- Testing standards summary
  - UI tests for the conditional display and trigger of the adaptive quiz.
  - Integration tests for the backend adaptive logic.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story extends the existing quiz functionality.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Take Adaptive Quizzes]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 3.4: (MVP) Adaptive Follow-up Quiz]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-4-adaptive-follow-up-quiz.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
