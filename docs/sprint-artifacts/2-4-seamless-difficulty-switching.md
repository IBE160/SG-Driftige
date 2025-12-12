# Story 2.4: Seamless Difficulty Switching

Status: ready-for-dev

## Story

As a user, after a summary is generated,
I want to switch between difficulty levels without re-uploading the content,
so that I can easily compare the summaries.

## Acceptance Criteria

1.  Given a summary is displayed, when I select a different difficulty level, then a new summary for that level is generated and displayed without leaving the page.

## Tasks / Subtasks

- [ ] Task: Enhance `nextjs-frontend/src/components/SummaryDisplay.jsx` to dynamically update content when a new difficulty is selected from `DifficultyToggle.jsx`. (AC: 1)
- [ ] Task: Ensure the `DifficultyToggle.jsx` component passes the selected difficulty to `SummaryDisplay.jsx` (or a parent component that manages both). (AC: 1)
- [ ] Task: Implement client-side logic to trigger a new `POST /api/summarize` API call with the updated difficulty when the selection changes, and display a loading indicator. (AC: 1)
- [ ] Task: Verify that the `SummaryDisplay.jsx` component updates to show the new summary text seamlessly. (AC: 1)
- [ ] Task: Write Unit/Component tests for the updated `SummaryDisplay.jsx` and related logic to cover dynamic difficulty switching. (AC: 1)
- [ ] Task: Write E2E tests using `Playwright` to simulate selecting different difficulty levels and verifying the UI updates correctly (mocking backend responses). (AC: 1)

## Dev Notes

### Project Context Summary

This story implements the crucial user experience of seamlessly switching between different summary difficulty levels after initial generation. It integrates the display component (Story 2.2) with the difficulty selection component (Story 2.3) and the backend summarization service (Story 2.1), thereby enhancing the core usability of Epic 2: "Multi-level Summarization".

### Project Structure Alignment

This story primarily involves frontend development within `nextjs-frontend/src/components` (`SummaryDisplay.jsx`, `DifficultyToggle.jsx`) and potentially parent components or pages that orchestrate their interaction. It aligns with the component-based architecture and modular structure.

### Technical Mandates and Constraints

*   **Frontend Framework:** Next.js (JavaScript).
*   **Styling:** Tailwind CSS.
*   **API Communication:** RESTful API calls to the FastAPI backend (`POST /api/summarize`).
*   **Responsiveness:** UI should be fully responsive across screen sizes.
*   **Testing:** Unit/Component tests for the interaction logic, E2E tests for the seamless switching flow.
*   **NFR1 (Responsive Feedback):** Maintain loading indicators during subsequent summary fetches.

### Learnings from Previous Story (2.3: Difficulty Selection UI)

*   **DifficultyToggle Component:** Story 2.3 developed `DifficultyToggle.jsx`. This story will integrate that component into the summary display flow.
*   **Summarization API:** The `POST /api/summarize` endpoint developed in Story 2.1 is critical here, as multiple calls will be made with different difficulty parameters.
*   **Loading States:** The learnings from Story 2.2 about displaying loading indicators for summaries will be directly applicable to subsequent fetches.

### References

*   [Source: docs/prd-QuizZum-2025-12-05.md#Summarization & Content Presentation]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 2: Multi-level Summarization]
*   [Source: docs/architecture.md#API Communication]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-2.md#Detailed Design]
*   [Source: docs/sprint-artifacts/2-3-difficulty-selection-ui.md#Dev Notes]

## Dev Agent Record

### Context Reference
*   [Source: docs/sprint-artifacts/2-4-seamless-difficulty-switching.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Story Quality Validation Report

## Critical Issues (Blockers)

## Major Issues (Should Fix)

## Minor Issues (Nice to Have)

## Successes

---

## Change Log

| Date | Version | Description |
|---|---|---|
| {{date}} | 1.0 | Drafted story based on Epic 2 Technical Specification. |
