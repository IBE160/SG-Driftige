# Story 1.4: Core Backend Setup for Content Reception

Status: ready-for-dev

## Story

As a developer,
I want a functional backend endpoint to receive text and PDF inputs,
so that the frontend can send user content for processing.

## Acceptance Criteria

1.  Given the backend server is running, when a `POST` request with text content is sent to `/api/upload/text`, then the backend successfully receives and acknowledges the text.
2.  Given the backend server is running, when a `POST` request with a PDF file is sent to `/api/upload/pdf`, then the backend successfully receives and extracts text from the PDF.
3.  Given the backend is set up, when the frontend sends content, then appropriate HTTP responses (e.g., 201 Created) are returned along with a `content_id`.
4.  The backend endpoints incorporate general security best practices (e.g., input sanitization).
5.  The backend architecture is designed with future scalability in mind.

## Tasks / Subtasks

- [ ] Task: Implement FastAPI endpoint `POST /api/upload/text` in `fastapi-backend/app/api/v1/upload.py` to receive text content. (AC: 1)
- [ ] Task: Implement FastAPI endpoint `POST /api/upload/pdf` in `fastapi-backend/app/api/v1/upload.py` to receive PDF files, including text extraction using `pdfminer.six`. (AC: 2)
- [ ] Task: Integrate Prisma ORM to save content metadata (`rawText`, `uploadedAt`, `fileName`) to PostgreSQL, returning a unique `content_id`. (AC: 3)
- [ ] Task: Implement basic input validation and sanitization for received text and PDF content. (AC: 4)
- [ ] Task: Ensure backend code structure adheres to modular design (`services/content_service.py`, `llm_integrations/pdf_parser.py`) for future scalability. (AC: 5)
- [ ] Task: Write Integration tests for `/api/upload/text` and `/api/upload/pdf` endpoints using `pytest` and FastAPI's `TestClient`, ensuring correct data reception, text extraction, and database storage. (AC: 1, 2, 3)

## Dev Notes

### Project Context Summary

This story focuses on implementing the core backend functionality for receiving and processing user-provided content (text and PDF). It builds upon the foundational project setup established in Story 1.1 and provides the necessary backend support for the frontend UIs from Stories 1.2 and 1.3. This is a critical step in Epic 1: "Foundation & Core Content Input".

### Project Structure Alignment

This story primarily involves backend development within `fastapi-backend/app/api/v1` for endpoints, `fastapi-backend/app/services` for business logic, and `fastapi-backend/app/db` for database interaction. It aligns with the defined project structure and modularity.

### Technical Mandates and Constraints

*   **Backend Framework:** FastAPI (Python).
*   **Database:** PostgreSQL with Prisma ORM (for `Content` model).
*   **PDF Parsing:** `pdfminer.six` for text extraction.
*   **File Storage:** Temporary/ephemeral storage for PDFs during processing.
*   **API Response:** Standardized JSON envelope.
*   **Error Handling:** FastAPI `HTTPException` for standardized error responses.
*   **Testing:** Integration tests for API endpoints using `pytest`.

### Learnings from Previous Story (1.3: PDF Upload Interface)

*   **Frontend UI:** Story 1.3 implemented the frontend UI for PDF upload. This story needs to ensure the backend can correctly receive the `multipart/form-data` sent from that frontend component.
*   **Client-side Validation:** Story 1.3 included client-side validation. This story must ensure backend validation complements it, preventing malicious or malformed uploads.
*   **`content_id` generation:** The frontend expects a `content_id` in response. The backend should generate this (e.g., UUID) upon successful processing and storage of content metadata.

### References

*   [Source: docs/architecture.md#Project-Initialization]
*   [Source: docs/architecture.md#Project-Structure]
*   [Source: docs/architecture.md#Identified-Architectural-Decisions]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md#Detailed-Design]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic-1-Foundation--Core-Content-Input]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Story-1.4:-%28MVP%29-Core-Backend-Setup-for-Content-Reception]
*   [Source: docs/sprint-artifacts/1-3-pdf-upload-interface.md#Dev-Notes]

## Dev Agent Record

### Context Reference

*   [Source: docs/sprint-artifacts/1-4-core-backend-setup-for-content-reception.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List

## Story Quality Validation Report

Story: `1-4-core-backend-setup-for-content-reception` - Core Backend Setup for Content Reception
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