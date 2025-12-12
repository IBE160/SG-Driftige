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

- [ ] Task: Develop `nextjs-frontend/src/components/DifficultyToggle.jsx` component to allow selection of 'easy', 'medium', or 'hard' difficulty. (AC: 1)
- [ ] Task: Integrate `DifficultyToggle.jsx` into the input screen (`nextjs-frontend/src/app/(input)/page.jsx` or `InputForm.jsx`) to display difficulty selection. (AC: 1)
- [ ] Task: Implement client-side logic to capture selected difficulty and pass it to the "Generate" button's action. (AC: 2)
- [ ] Task: Ensure the selected difficulty is correctly included in the API call to `POST /api/summarize`. (AC: 2)
- [ ] Task: Write Unit/Component tests for `DifficultyToggle.jsx` using `Jest` and `React Testing Library`, covering rendering, selection changes, and state management. (AC: 1, 2)

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
