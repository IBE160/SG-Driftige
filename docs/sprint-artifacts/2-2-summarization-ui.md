# Story 2.2: Summarization UI

Status: ready-for-dev

## Story

As a user,
I want to see the generated summary displayed clearly,
so that I can read and understand it.

## Acceptance Criteria

1.  Given a summary is generated, when it is returned to the frontend, then the summary text is displayed in a designated output area.
2.  (NFR1) While the summary is being generated, a progress indicator (e.g., a spinner) is displayed to the user.
3.  Given the summary is displayed, when the content is long, then a scrollbar is available.

## Tasks / Subtasks

- [ ] **Task 1: Implement Summary Display (AC: 1, 3)**
  - [ ] Subtask 1.1: Create a `SummaryDisplay` React component in `frontend/src/app/summaries/`.
  - [ ] Subtask 1.2: The component should take the summary text as a prop and display it.
  - [ ] Subtask 1.3: Ensure the component has a scrollbar for long summaries.
- [ ] **Task 2: Implement Loading State (AC: 2)**
  - [ ] Subtask 2.1: The UI should display a loading indicator (e.g., a Chakra UI spinner) while the summary is being generated.
- [ ] **Task 3: Integrate with API (AC: 1, 2)**
  - [ ] Subtask 3.1: The frontend should call the `POST /api/summarize` endpoint.
  - [ ] Subtask 3.2: The frontend should handle the response and pass the summary text to the `SummaryDisplay` component.
- [ ] **Task 4: Write UI Tests (AC: 1, 2, 3)**
  - [ ] Subtask 4.1: Write UI tests for the `SummaryDisplay` component.
  - [ ] Subtask 4.2: Write UI tests for the loading state.

## Dev Notes

- Relevant architecture patterns and constraints
  - The frontend is a Next.js application using Chakra UI.
  - The UI should be simple and intuitive.
- Source tree components to touch
  - `frontend/src/app/summaries/` (new)
  - `frontend/src/components/SummaryDisplay.tsx` (new)
- Testing standards summary
  - UI tests for the new components.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the frontend UI for displaying summaries.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/ux-design-specification.md#User Journey: Generate Multi-level Summaries]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 2.2: (MVP) Summarization UI]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-2-summarization-ui.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
