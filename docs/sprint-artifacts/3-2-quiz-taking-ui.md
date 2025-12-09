# Story 3.2: Quiz Taking UI

Status: ready-for-dev

## Story

As a user,
I want to see and answer quiz questions,
so that I can test my understanding.

## Acceptance Criteria

1.  Given a quiz is generated, when it is displayed, then questions are shown one at a time.
2.  Given a question is shown, when I select an answer, then my choice is recorded.

## Tasks / Subtasks

- [ ] **Task 1: Implement Quiz Question Display (AC: 1)**
  - [ ] Subtask 1.1: Create a `QuizQuestion` React component in `frontend/src/app/quiz/`.
  - [ ] Subtask 1.2: The component should display a single quiz question and its answer options.
- [ ] **Task 2: Implement Answer Selection (AC: 2)**
  - [ ] Subtask 2.1: Implement logic to allow the user to select one answer option.
  - [ ] Subtask 2.2: Record the user's selected answer.
- [ ] **Task 3: Integrate with API (AC: 1, 2)**
  - [ ] Subtask 3.1: The frontend should call the `POST /api/quiz` endpoint to retrieve quiz questions.
  - [ ] Subtask 3.2: The frontend should send user answers to `POST /api/quiz/submit` (to be implemented in a future story).
- [ ] **Task 4: Write UI Tests (AC: 1, 2)**
  - [ ] Subtask 4.1: Write UI tests for the `QuizQuestion` component.
  - [ ] Subtask 4.2: Write UI tests to verify answer selection.

## Dev Notes

- Relevant architecture patterns and constraints
  - The frontend is a Next.js application using Chakra UI.
  - The UI should be simple and intuitive, supporting an "active and playable" learning experience.
- Source tree components to touch
  - `frontend/src/app/quiz/` (new directory and page)
  - `frontend/src/components/QuizQuestion.tsx` (new)
- Testing standards summary
  - UI tests for the new components.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the frontend UI for quiz taking.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Take Adaptive Quizzes]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 3.2: (MVP) Quiz Taking UI]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-2-quiz-taking-ui.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
