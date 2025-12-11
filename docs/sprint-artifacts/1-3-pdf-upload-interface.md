# Story 1.3: PDF Upload Interface

Status: review

## Story

As a user,
I want to upload a PDF file containing my notes,
so that I can provide content for summarization without manual copying.

## Acceptance Criteria

1.  Given the application is loaded, when I navigate to the input screen, then a clearly labeled "Upload PDF" button or drag-and-drop zone is visible.
2.  Given the upload component is visible, when I select a PDF file, then the file name is displayed.
3.  Given a PDF file is uploaded, when I click "Generate", then the PDF content is prepared for processing.

## Tasks / Subtasks

- [x] Task: Develop or enhance input screen UI (`nextjs-frontend/src/app/(input)/page.jsx`) to include a "Upload PDF" button or drag-and-drop zone. (AC: 1)
- [x] Task: Implement client-side logic in the frontend to handle file selection and display the selected PDF file name. (AC: 2)
- [x] Task: Ensure the "Generate" button is integrated with the PDF upload functionality to prepare the PDF content for backend processing. (AC: 3)
- [x] Task: Implement client-side validation for PDF file types and initial size checks.
- [x] Task: Write Unit/Component tests for the PDF upload interface using `Jest` and `React Testing Library`. (AC: 1, 2, 3)

## Dev Notes

### Project Context Summary

This story focuses on implementing the user interface for PDF file upload, complementing the text input functionality for providing content to QuizZum. It continues to build on the foundational setup from Story 1.1 and the input UI from Story 1.2, directly supporting Epic 1: "Foundation & Core Content Input". The UI will adhere to responsive design principles.

### Project Structure Alignment

This story primarily involves frontend development within `nextjs-frontend/src/app/(input)` for the input page and `nextjs-frontend/src/components` for the reusable input form component. It aligns with the component-based architecture and modular structure.

### Technical Mandates and Constraints

*   **Frontend Framework:** Next.js (JavaScript).
*   **Styling:** Tailwind CSS.
*   **Accessible Components:** Headless UI (consider for upload component if applicable).
*   **Responsiveness:** UI should be fully responsive across screen sizes.
*   **PDF Handling (Frontend):** Client-side validation for file type.
*   **Testing:** Unit/Component tests for the PDF upload interface.

### Learnings from Previous Story (1.2: Text Input Interface)

*   **InputForm Component:** Story 1.2 created/enhanced the `InputForm.jsx` component. This story should leverage and extend that component to include PDF upload elements.
*   **API Client Integration:** The frontend `lib/api.js` client is being used for backend communication. Ensure PDF upload uses the appropriate methods (e.g., `multipart/form-data`).
*   **Client-side Validation:** Story 1.2 introduced basic client-side validation. This should be extended for PDF file types.

### References

*   [Source: docs/architecture.md#Project-Initialization]
*   [Source: docs/architecture.md#Project-Structure]
*   [Source: docs/architecture.md#Identified-Architectural-Decisions]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#Detailed-Design]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic-1-Foundation--Core-Content-Input]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Story-1.3:-%28MVP%29-PDF-Upload-Interface]
*   [Source: docs/sprint-artifacts/1-2-text-input-interface.md#Dev-Notes]

## Dev Agent Record

### Context Reference

*   [Source: docs/sprint-artifacts/1-3-pdf-upload-interface.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- ✅ Enhanced the `InputForm.jsx` component to include a PDF upload zone.
- ✅ Added client-side logic to handle file selection, display the file name, and validate for PDF file type.
- ✅ Updated the `InputForm.jsx` component to handle either text or file input, disabling the other when one is provided.
- ✅ Updated the Jest tests for the `InputForm.jsx` component to cover the new file upload functionality.

### File List
- modified: `docs/sprint-artifacts/1-3-pdf-upload-interface.md`
- modified: `nextjs-frontend/src/components/InputForm.jsx`
- modified: `nextjs-frontend/src/components/__tests__/InputForm.test.jsx`

## Story Quality Validation Report

Story: `1-3-pdf-upload-interface` - PDF Upload Interface
Outcome: PASS (Critical: 0, Major: 0, Minor: 0)

## Critical Issues (Blockers)

N/A

## Major Issues (Should Fix)

N/A

## Minor Issues (Nice to Have)

N/A

## Successes

*   Story content is well-aligned with PRD, Epics, Architecture, and Epic Tech Spec.
*   "Learnings from Previous Story" are correctly incorporated.
*   Acceptance Criteria are atomic, testable, and directly traceable to sources.
*   Tasks are clearly mapped to acceptance criteria, including specific testing subtasks.
*   Dev Notes provide specific architectural and technical guidance with relevant citations.
*   The story structure adheres to the defined format.

## Senior Developer Review (AI)
- **Reviewer:** Eline&Sindre
- **Date:** 2025-12-11
- **Outcome:** Approve

### Summary
The implementation for the PDF upload interface is excellent. All acceptance criteria have been met and verified. The UI is clean, responsive, and follows the design guidelines. The codebase is well-structured, and the component tests have been updated to cover the new functionality.

### Key Findings
None.

### Acceptance Criteria Coverage
| AC# | Description | Status | Evidence |
| :-- | :--- | :--- | :--- |
| 1 | A clearly labeled "Upload PDF" button or drag-and-drop zone is visible. | IMPLEMENTED | Verified by running the application and inspecting the UI. |
| 2 | When I select a PDF file, then the file name is displayed. | IMPLEMENTED | Verified with component tests. |
| 3 | When I click "Generate", then the PDF content is prepared for processing. | IMPLEMENTED | Verified with component tests. |

### Task Completion Validation
All tasks have been successfully completed and verified.

### Test Coverage and Gaps
- Unit tests for the `InputForm.jsx` component have been updated to cover the new file upload functionality and are passing. This is sufficient for this story.

### Architectural Alignment
- The implementation aligns perfectly with the `architecture.md` and `tech-spec-epic-epic-1.md` documents.

### Security Notes
- No security issues were identified.

### Action Items
None.