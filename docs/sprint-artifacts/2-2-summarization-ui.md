# Story 2.2: Summarization UI

Status: done

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
| 2025-12-13 | 1.2 | Senior Developer Review notes appended. |

---
# Senior Developer Review (AI)
- **Reviewer**: Eline&Sindre
- **Date**: 2025-12-13
- **Outcome**: Approve
  - **Justification**: All acceptance criteria are fully implemented and validated by a comprehensive set of unit and E2E tests. All development tasks marked as complete were verified. The code is clean, follows documented architectural patterns, and is of high quality.

## Summary
The implementation of the Summarization UI is excellent. The functionality is separated into a data-fetching page component (`SummaryPage`) and a presentational component (`SummaryDisplay`), which is a great pattern. Loading and error states are handled correctly, and the feature is covered by both component and end-to-end tests.

## Key Findings
- **High Severity:** None
- **Medium Severity:** None
- **Low Severity:**
  - `console.log` statements are present in `nextjs-frontend/src/app/summaries/[contentId]/page.jsx`. These should be removed before merging to a production branch.

## Acceptance Criteria Coverage
- **Summary**: 3 of 3 acceptance criteria fully implemented.

| AC# | Description | Status | Evidence |
|---|---|---|---|
| 1 | Summary text is displayed in a designated output area. | IMPLEMENTED | `SummaryDisplay.jsx:19`, `SummaryDisplay.test.jsx:35`, `summaries.spec.js:46` |
| 2 | A progress indicator is displayed while the summary is being generated. | IMPLEMENTED | `SummaryDisplay.jsx:6`, `SummaryDisplay.test.jsx:18` |
| 3 | A scrollbar is available for long content. | IMPLEMENTED | `SummaryDisplay.jsx:18`, `SummaryDisplay.test.jsx:45` |

## Task Completion Validation
- **Summary**: 8 of 8 completed tasks verified. No false completions.

| Task | Marked As | Verified As | Evidence/Notes |
|---|---|---|---|
| Create Next.js page `.../page.jsx` | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/app/summaries/[contentId]/page.jsx` exists and is functional. |
| Develop `SummaryDisplay.jsx` component | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/components/SummaryDisplay.jsx` exists and is functional. |
| Implement client-side logic to fetch summary data | [x] | VERIFIED COMPLETE | Logic correctly implemented in `page.jsx`, which is a suitable location. |
| Integrate a progress indicator | [x] | VERIFIED COMPLETE | Loading state is handled in `SummaryDisplay.jsx`. |
| Create `api.js` with `fetchSummary` | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/lib/api.js` exists and contains the correct logic. |
| Implement basic error display | [x] | VERIFIED COMPLETE | Error state is handled in `SummaryDisplay.jsx`. |
| Write Unit/Component tests for `SummaryDisplay.jsx` | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/components/__tests__/SummaryDisplay.test.jsx` contains thorough tests. |
| Write E2E test using Playwright | [x] | VERIFIED COMPLETE | File `nextjs-frontend/tests/summaries.spec.js` contains relevant E2E tests. |

## Test Coverage and Gaps
- Test coverage is good. The `SummaryDisplay` component is well-tested, and the main user flow is covered by an E2E test that mocks the API.
- No significant gaps were found.

## Architectural Alignment
- The implementation fully aligns with the documented architecture (`architecture.md`).
- It uses the specified tech stack (Next.js, React, Tailwind) and follows the component-based structure.
- **Warning**: The Epic Technical Specification for Epic 2 was not found during the review. The validation was performed against the `architecture.md` and story context files.

## Security Notes
- No security issues were found. The use of React's default text rendering prevents XSS from the summary content.

## Best-Practices and References
- **Frontend:** Next.js 16.0.8, React 19.2.1
- **Backend:** FastAPI 0.124.2
- **Practices:** The code adheres to standard React/Next.js and FastAPI best practices. Components are well-structured, and API calls are handled cleanly.

## Action Items
**Advisory Notes:**
- [ ] [Low] Remove `console.log` statements from `nextjs-frontend/src/app/summaries/[contentId]/page.jsx` before production deployment.
