# Story 2.2: Summarization UI

Status: review

## Story

As a user,
I want to see the generated summary displayed clearly,
so that I can read and understand it.

## Acceptance Criteria

1.  Given a summary is generated, when it is returned to the frontend, then the summary text is displayed in a designated output area.
2.  (NFR1) While the summary is being generated, a progress indicator (e.g., a spinner) is displayed to the user.
3.  Given the summary is displayed, when the content is long, then a scrollbar is available.

## Tasks / Subtasks

- [x] Task: Create a new Next.js page at `nextjs-frontend/src/app/summaries/[contentId]/page.jsx` to display summaries. (AC: 1)
- [x] Task: Develop `nextjs-frontend/src/components/SummaryDisplay.jsx` component to render summary text, including scrollbar for long content. (AC: 1, 3)
- [x] Task: Implement client-side logic in `SummaryDisplay.jsx` to fetch summary data from `backend/api/summarize` using the `contentId`. (AC: 1)
- [x] Task: Integrate a progress indicator (spinner or skeleton loader) in `SummaryDisplay.jsx` while summary is being fetched. (AC: 2)
- [x] Task: Update `nextjs-frontend/src/lib/api.js` to include a function for calling the `POST /api/summarize` endpoint. (AC: 1)
- [x] Task: Implement basic error display in `SummaryDisplay.jsx` if backend API call fails. (AC: 1)
- [x] Task: Write Unit/Component tests for `SummaryDisplay.jsx` using `Jest` and `React Testing Library`, covering rendering, loading states, and content display. (AC: 1, 2, 3)
- [x] Task: Write E2E test using `Playwright` to verify navigation to summary page and display of summary text (mocking backend response). (AC: 1)

## Dev Notes

### Project Context Summary

This story focuses on implementing the frontend user interface for displaying generated summaries. It builds upon the content ingestion from Epic 1 and will consume the backend summarization service from Story 2.1. This is a critical step in Epic 2: "Multi-level Summarization" to provide users with readable and understandable summaries.

### Project Structure Alignment

This story primarily involves frontend development within `nextjs-frontend/src/app/summaries` for the new page and `nextjs-frontend/src/components` for reusable display components. It aligns with the component-based architecture and modular structure.

### Technical Mandates and Constraints

*   **Frontend Framework:** Next.js (JavaScript).
*   **Styling:** Tailwind CSS.
*   **API Communication:** RESTful API calls to the FastAPI backend.
*   **Responsiveness:** UI should be fully responsive across screen sizes.
*   **Testing:** Unit/Component tests for React components, E2E tests for user flows.
*   **NFR1 (Responsive Feedback):** Implement loading indicators while fetching summaries.

### Learnings from Previous Story (2.1: Summarization Backend Logic)

*   **Backend Summarization Service:** Story 2.1 will deliver the functional backend `POST /api/summarize` endpoint. This story depends on that service being available and returning summary data in the defined format.
*   **Pydantic Schemas:** Frontend should align with the `Summary` Pydantic schema (`summarize_text: str`) from the backend.
*   **Error Handling:** The backend provides standardized error responses; frontend should be prepared to parse and display these.

### References

*   [Source: docs/prd-QuizZum-2025-12-05.md#Summarization & Content Presentation]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 2: Multi-level Summarization]
*   [Source: docs/architecture.md#API Communication]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-2.md#Detailed Design]
*   [Source: docs/sprint-artifacts/2-1-summarization-backend-logic.md#Dev Notes]

## Dev Agent Record

### Context Reference
*   [Source: docs/sprint-artifacts/2-2-summarization-ui.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- Implemented new Next.js page at `nextjs-frontend/src/app/summaries/[contentId]/page.jsx` for displaying summaries.
- Developed `nextjs-frontend/src/components/SummaryDisplay.jsx` component for rendering summaries.
- Implemented client-side logic to fetch summary data using `fetchSummary` utility.
- Integrated a progress indicator in `SummaryDisplay.jsx` for fetching summaries.
- Created `nextjs-frontend/src/lib/api.js` with `fetchSummary` function.
- Implemented basic error display in `SummaryDisplay.jsx` if backend API call fails.
- Wrote Unit/Component tests for `SummaryDisplay.jsx` covering rendering, loading, and error states.
- Wrote E2E tests for the summary page using Playwright, covering success and error scenarios.

### File List
- Added:
    - `nextjs-frontend/src/lib/api.js`
    - `nextjs-frontend/src/components/__tests__/SummaryDisplay.test.jsx`
    - `nextjs-frontend/tests/summaries.spec.js`
- Modified:
    - `nextjs-frontend/src/app/summaries/[contentId]/page.jsx`
    - `nextjs-frontend/src/components/SummaryDisplay.jsx`

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
| 2025-12-13 | 1.1 | Implemented summary UI components, API integration, and all unit/E2E tests. Status updated to 'review'. |