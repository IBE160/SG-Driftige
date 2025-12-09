# Story 1.3: PDF Upload Interface

Status: ready-for-dev

## Story

As a user,
I want to upload a PDF file containing my notes,
so that I can provide content for summarization without manual copying.

## Acceptance Criteria

1.  Given the application is loaded, when I navigate to the input screen, then a clearly labeled "Upload PDF" button or drag-and-drop zone is visible.
2.  Given the upload component is visible, when I select a PDF file, then the file name is displayed.
3.  Given a PDF file is uploaded, when I click "Generate", then the PDF content is prepared for processing.

## Tasks / Subtasks

- [ ] **Task 1: Implement PDF Upload UI (AC: 1)**
  - [ ] Subtask 1.1: Create a React component for PDF upload within `frontend/src/app/input-screen/`.
  - [ ] Subtask 1.2: Ensure a clearly labeled "Upload PDF" button or drag-and-drop zone is visible, leveraging Chakra UI.
- [ ] **Task 2: Handle PDF File Selection and Display (AC: 2)**
  - [ ] Subtask 2.1: Implement logic to capture selected PDF file.
  - [ ] Subtask 2.2: Display the selected PDF file's name in the UI.
- [ ] **Task 3: Implement "Generate" Button and PDF Preparation (AC: 3)**
  - [ ] Subtask 3.1: Ensure a "Generate" button is present on the input screen (reusing from Story 1.2 or similar).
  - [ ] Subtask 3.2: On button click, capture the selected PDF file.
  - [ ] Subtask 3.3: Implement client-side logic to prepare the PDF for `POST /api/upload/pdf` (e.g., `multipart/form-data`).
- [ ] **Task 4: Write UI and Unit Tests (AC: 1, 2, 3)**
  - [ ] Subtask 4.1: Write UI tests to verify the presence and functionality of the upload component.
  - [ ] Subtask 4.2: Write UI tests to confirm file name display upon selection.
  - [ ] Subtask 4.3: Write unit tests for the client-side PDF preparation logic and API call mock.

## Dev Notes

- Relevant architecture patterns and constraints
  - The project follows a split-repository structure with `frontend` (Next.js) and `backend` (FastAPI).
  - Use Next.js App Router for frontend development.
  - UI components should be built using Chakra UI.
  - Frontend to Backend communication for PDF upload will use `POST /api/upload/pdf` endpoint.
- Source tree components to touch
  - `frontend/src/app/input-screen/` for the main PDF upload component.
  - `frontend/src/components/` for any reusable UI elements (e.g., button).
  - `frontend/src/lib/` for client-side API interaction logic.
- Testing standards summary
  - Layered testing approach will be adopted: Unit, Integration, E2E.
  - UI tests for component functionality.
  - Unit tests for logic related to file preparation and API calls.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the UI component for PDF upload.
  - Frontend: `frontend/src/app/input-screen/` will contain the PDF upload UI.
  - Overall structure adheres to the split-repository approach defined in `architecture.md`.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- Cite all technical details with source paths and sections, eg. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-3-pdf-upload-interface.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

### Learnings from Previous Story

**From Story 1.2: Text Input Interface (Status: drafted)**

- **New Capabilities**: Frontend text input UI is implemented, including state management and editing functionality.
- **Architectural Context**: Client-side logic for preparing text for `POST /api/upload/text` is established.
- **Testing Setup**: UI and unit tests for text input are defined.

[Source: docs/sprint-artifacts/1-2-text-input-interface.md]

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
