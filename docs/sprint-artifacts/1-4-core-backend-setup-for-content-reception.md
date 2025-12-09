# Story 1.4: Core Backend Setup for Content Reception

Status: ready-for-dev

## Story

As a developer,
I want a functional backend endpoint to receive text and PDF inputs,
so that the frontend can send user content for processing.

## Acceptance Criteria

1.  Given the backend server is running, when a `POST` request with text content is sent to `/api/upload_text`, then the backend successfully receives and acknowledges the text.
2.  Given the backend server is running, when a `POST` request with a PDF file is sent to `/api/upload_pdf`, then the backend successfully receives and stores the PDF file (e.g., temporarily).
3.  Given the backend is set up, when the frontend sends content, then appropriate HTTP responses (e.g., 200 OK) are returned.

## Tasks / Subtasks

- [ ] **Task 1: Implement FastAPI Endpoint for Text Upload (AC: 1)**
  - [ ] Subtask 1.1: Define FastAPI endpoint `POST /api/upload/text` in `backend/app/api/upload/`.
  - [ ] Subtask 1.2: Implement logic to receive and acknowledge text content.
- [ ] **Task 2: Implement FastAPI Endpoint for PDF Upload (AC: 2)**
  - [ ] Subtask 2.1: Define FastAPI endpoint `POST /api/upload/pdf` in `backend/app/api/upload/`.
  - [ ] Subtask 2.2: Implement logic to receive and temporarily store the PDF file.
  - [ ] Subtask 2.3: Integrate `backend/app/core/pdf_parser.py` to extract text from the PDF.
- [ ] **Task 3: Implement HTTP Response Handling (AC: 3)**
  - [ ] Subtask 3.1: Ensure endpoints return appropriate HTTP status codes (e.g., 200 OK for success).
- [ ] **Task 4: Write Backend Integration Tests (AC: 1, 2, 3)**
  - [ ] Subtask 4.1: Write integration tests for `POST /api/upload/text` to verify text reception.
  - [ ] Subtask 4.2: Write integration tests for `POST /api/upload/pdf` to verify PDF reception and temporary storage.
  - [ ] Subtask 4.3: Write unit/integration tests to verify correct HTTP status codes are returned.

## Dev Notes

- Relevant architecture patterns and constraints
  - The project follows a split-repository structure with `frontend` (Next.js) and `backend` (FastAPI).
  - Backend is responsible for API endpoints (`/api/upload/*`) and PDF processing.
  - Frontend to Backend communication for content upload will use `POST /api/upload/text` and `POST /api/upload/pdf` endpoints.
- Source tree components to touch
  - `backend/app/api/upload/` for API endpoints.
  - `backend/app/core/pdf_parser.py` for PDF processing logic.
  - `backend/app/main.py` for FastAPI application entry point.
- Testing standards summary
  - Layered testing approach will be adopted: Unit, Integration, E2E.
  - Backend integration tests for API endpoints (`POST /api/upload_text`, `POST /api/upload_pdf`).

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the backend components for content reception.
  - Backend: `backend/app/api/upload/` and `backend/app/core/pdf_parser.py` will be primary areas.
  - Overall structure adheres to the split-repository approach defined in `architecture.md`.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- Cite all technical details with source paths and sections, e.g. [Source: docs/<file>.md#Section]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-4-core-backend-setup-for-content-reception.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

### Learnings from Previous Story

**From Story 1.3: PDF Upload Interface (Status: drafted)**

- **New Capabilities**: Frontend PDF upload UI implemented, including file selection, display, and client-side preparation for `POST /api/upload/pdf`.
- **Architectural Context**: Client-side logic for preparing PDF for `POST /api/upload/pdf` (`multipart/form-data`) is established.
- **Testing Setup**: UI and unit tests for PDF upload are defined.

[Source: docs/sprint-artifacts/1-3-pdf-upload-interface.md]

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
