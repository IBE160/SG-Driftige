# Story 2.3: Difficulty Selection UI

Status: ready-for-dev

## Story

As a user,
I want to select the desired summary difficulty before generation,
so that I can control the level of detail.

## Acceptance Criteria

1.  Given the input screen, when I am about to generate a summary, then I can select 'easy', 'medium', or 'hard' difficulty.
2.  Given a difficulty is selected, when I click "Generate", then the selected difficulty is sent to the backend.

## Tasks / Subtasks

- [ ] **Task 1: Implement Difficulty Selection UI (AC: 1)**
  - [ ] Subtask 1.1: Create a `DifficultySelector` React component in `frontend/src/components/`.
  - [ ] Subtask 1.2: The component should allow the user to select one of 'easy', 'medium', or 'hard'.
  - [ ] Subtask 1.3: Use Chakra UI components (e.g., `RadioGroup` or `ButtonGroup`) for the selector.
- [ ] **Task 2: Integrate with Input Screen (AC: 1, 2)**
  - [ ] Subtask 2.1: Add the `DifficultySelector` component to the input screen.
  - [ ] Subtask 2.2: The selected difficulty should be stored in the component's state.
  - [ ] Subtask 2.3: When the "Generate" button is clicked, the selected difficulty should be included in the API request to `POST /api/summarize`.
- [ ] **Task 3: Write UI Tests (AC: 1, 2)**
  - [ ] Subtask 3.1: Write UI tests for the `DifficultySelector` component.
  - [ ] Subtask 3.2: Write UI tests to verify that the selected difficulty is sent to the backend.

## Dev Notes

- Relevant architecture patterns and constraints
  - The frontend is a Next.js application using Chakra UI.
  - The UI should be simple and intuitive.
- Source tree components to touch
  - `frontend/src/components/DifficultySelector.tsx` (new)
  - `frontend/src/app/input-screen/page.tsx` (modification)
- Testing standards summary
  - UI tests for the new component.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the frontend UI for difficulty selection.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Generate Multi-level Summaries]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 2.3: (MVP) Difficulty Selection UI]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-3-difficulty-selection-ui.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
