# Story 2.4: Seamless Difficulty Switching

Status: ready-for-dev

## Story

As a user,
after a summary is generated, I want to switch between difficulty levels without re-uploading the content,
so that I can easily compare the summaries.

## Acceptance Criteria

1.  Given a summary is displayed, when I select a different difficulty level, then a new summary for that level is generated and displayed without leaving the page.

## Tasks / Subtasks

- [ ] **Task 1: Implement Difficulty Switching UI (AC: 1)**
  - [ ] Subtask 1.1: On the summary display screen, provide UI elements (e.g., tabs, buttons) to select a different difficulty level.
- [ ] **Task 2: Implement Client-side Logic (AC: 1)**
  - [ ] Subtask 2.1: When a new difficulty is selected, the frontend should make a new API call to `POST /api/summarize` with the same `content_id` and the new `difficulty`.
  - [ ] Subtask 2.2: The UI should display a loading indicator while the new summary is being generated.
  - [ ] Subtask 2.3: The new summary should replace the old one in the `SummaryDisplay` component.
- [ ] **Task 3: Write UI Tests (AC: 1)**
  - [ ] Subtask 3.1: Write UI tests to verify that selecting a new difficulty triggers a new summary to be displayed.

## Dev Notes

- Relevant architecture patterns and constraints
  - The frontend is a Next.js application using Chakra UI.
  - The UI should be simple and intuitive.
- Source tree components to touch
  - `frontend/src/app/summaries/page.tsx` (modification)
  - `frontend/src/components/SummaryDisplay.tsx` (modification)
- Testing standards summary
  - UI tests for the difficulty switching functionality.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story enhances the existing summarization UI.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Generate Multi-level Summaries]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 2.4: (MVP) Seamless Difficulty Switching]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-4-seamless-difficulty-switching.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
