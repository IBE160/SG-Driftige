# Story 2.3: Difficulty Selection UI

Status: review

## Story

As a user,
I want to select the desired summary difficulty before generation,
so that I can control the level of detail.

## Acceptance Criteria

1.  Given the input screen, when I am about to generate a summary, then I can select 'easy', 'medium', or 'hard' difficulty.
2.  Given a difficulty is selected, when I click "Generate", then the selected difficulty is sent to the backend.

## Tasks / Subtasks

- [x] Task: Develop `nextjs-frontend/src/components/DifficultyToggle.jsx` component to allow selection of 'easy', 'medium', or 'hard' difficulty. (AC: 1)
- [x] Task: Integrate `DifficultyToggle.jsx` into the input screen (`nextjs-frontend/src/app/(input)/page.jsx` or `InputForm.jsx`) to display difficulty selection. (AC: 1)
- [x] Task: Implement client-side logic to capture selected difficulty and pass it to the "Generate" button's action. (AC: 2)
- [x] Task: Ensure the selected difficulty is correctly included in the API call to `POST /api/summarize`. (AC: 2)
- [x] Task: Write Unit/Component tests for `DifficultyToggle.jsx` using `Jest` and `React Testing Library`, covering rendering, selection changes, and state management. (AC: 1, 2)

## Dev Notes

### Project Context Summary

This story implements the frontend UI for selecting summary difficulty. It builds upon the existing input UI (Story 1.2 & 1.3) and integrates with the backend summarization service (Story 2.1) to control the level of detail of generated summaries. This is a key part of Epic 2: "Multi-level Summarization", enhancing user control over the AI output.

### Project Structure Alignment

This story primarily involves frontend development, focusing on new and existing UI components within `nextjs-frontend/src/components` and modifications to `nextjs-frontend/src/app/(input)`. It aligns with the component-based architecture and modular structure.

### Technical Mandates and Constraints

*   **Frontend Framework:** Next.js (JavaScript).
*   **Styling:** Tailwind CSS.
*   **API Communication:** RESTful API calls to the FastAPI backend (specifically `POST /api/summarize`).
*   **Responsiveness:** UI should be fully responsive across screen sizes.
*   **Testing:** Unit/Component tests for the new `DifficultyToggle.jsx` component.

### Learnings from Previous Story (2.2: Summarization UI)

*   **Frontend Page & Component Structure:** Story 2.2 established the `app/(summaries)/[contentId]/page.jsx` and `SummaryDisplay.jsx`. This story will create a similar UI component (`DifficultyToggle.jsx`) that can be integrated into either the input page or the summaries page.
*   **API Client Integration:** The `nextjs-frontend/src/lib/api.js` is the central place for backend API calls. The summarization API call should be updated here to include difficulty.
*   **NFR1 (Responsive Feedback):** Implement loading indicators in `SummaryDisplay.jsx` based on the status of `POST /api/summarize`.

### References

*   [Source: docs/prd-QuizZum-2025-12-05.md#Summarization & Content Presentation]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 2: Multi-level Summarization]
*   [Source: docs/architecture.md#API Communication]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-2.md#Detailed Design]
*   [Source: docs/sprint-artifacts/2-2-summarization-ui.md#Dev Notes]

## Dev Agent Record

### Context Reference
*   [Source: docs/sprint-artifacts/2-3-difficulty-selection-ui.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- Developed the `DifficultyToggle.jsx` component for selecting summary difficulty.
- Integrated the toggle into `InputForm.jsx`, including state management for the selected difficulty.
- Created a new `submitText` function in `lib/api.js` to handle the submission of text and difficulty to the backend.
- Updated `InputForm.jsx` to use the `submitText` function and redirect to the summary page upon success.
- Added unit tests for the `DifficultyToggle.jsx` component.
- Fixed and refactored the tests for `InputForm.jsx` to mock API calls and the Next.js router, ensuring all frontend tests pass.

### File List
- Added:
  - `nextjs-frontend/src/components/DifficultyToggle.jsx`
  - `nextjs-frontend/src/components/__tests__/DifficultyToggle.test.jsx`
- Modified:
  - `nextjs-frontend/src/components/InputForm.jsx`
  - `nextjs-frontend/src/lib/api.js`
  - `nextjs-frontend/src/components/__tests__/InputForm.test.jsx`

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
| 2025-12-13 | 1.1 | Implemented difficulty selection UI, API logic, and all tests. Status updated to 'review'. |
| 2025-12-13 | 1.2 | Senior Developer Review notes appended. |

---
# Senior Developer Review (AI)
- **Reviewer**: Eline&Sindre
- **Date**: 2025-12-13
- **Outcome**: Approve
  - **Justification**: All acceptance criteria are fully implemented and validated by a comprehensive set of unit tests. All development tasks marked as complete were verified. The code is clean, follows documented architectural patterns, and is of high quality.

## Summary
The implementation of the Difficulty Selection UI is solid. The `DifficultyToggle` component is well-designed and integrated cleanly into the `InputForm`. The selected difficulty is correctly captured and passed to the API. All required tests are in place and passing, ensuring the reliability of the new functionality.

## Key Findings
- **High Severity:** None
- **Medium Severity:** None
- **Low Severity:** None

## Acceptance Criteria Coverage
- **Summary**: 2 of 2 acceptance criteria fully implemented.

| AC# | Description | Status | Evidence |
|---|---|---|---|
| 1 | Select 'easy', 'medium', or 'hard' difficulty on the input screen. | IMPLEMENTED | `DifficultyToggle.jsx:1-25`, `InputForm.jsx:106`, `DifficultyToggle.test.jsx:9,16,28` |
| 2 | Selected difficulty is sent to the backend when "Generate" is clicked. | IMPLEMENTED | `InputForm.jsx:40`, `api.js:31-36`, `InputForm.test.jsx:32` |

## Task Completion Validation
- **Summary**: 5 of 5 completed tasks verified. No false completions.

| Task | Marked As | Verified As | Evidence/Notes |
|---|---|---|---|
| Develop `DifficultyToggle.jsx` component | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/components/DifficultyToggle.jsx` created and functional. |
| Integrate `DifficultyToggle.jsx` into `InputForm.jsx` | [x] | VERIFIED COMPLETE | `InputForm.jsx` now uses `DifficultyToggle`. |
| Implement client-side logic for difficulty capture | [x] | VERIFIED COMPLETE | `InputForm.jsx` state management for `difficulty` is correct. |
| Ensure difficulty included in API call to `/api/summarize` | [x] | VERIFIED COMPLETE | `api.js` `submitText` function sends `difficulty`. |
| Write Unit/Component tests for `DifficultyToggle.jsx` | [x] | VERIFIED COMPLETE | File `nextjs-frontend/src/components/__tests__/DifficultyToggle.test.jsx` created with thorough tests. |

## Test Coverage and Gaps
- Test coverage is excellent. The `DifficultyToggle` component is fully tested, and the integration into `InputForm` is verified through updated `InputForm` tests.
- All frontend tests are passing.

## Architectural Alignment
- The implementation fully aligns with the documented architecture (`architecture.md`) and the Epic Technical Specification (`tech-spec-epic-epic-2.md`).
- It follows the component-based structure, uses Next.js/React with Tailwind, and correctly interacts with the API layer.

## Security Notes
- No security issues were introduced. Difficulty selection is via a controlled enum, preventing injection.

## Best-Practices and References
- **Frontend:** Next.js, React, Tailwind CSS. Components are well-structured, state management is appropriate, and API calls are handled correctly.
- **Testing:** `Jest` and `React Testing Library` used for unit/component tests. `next/navigation` router mocked for testing.

## Action Items
**Advisory Notes:**
- None