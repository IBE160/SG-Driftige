# Story 1.4: Core Backend Setup for Content Reception

Status: done

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

- [x] Task: Implement FastAPI endpoint `POST /api/upload/text` in `fastapi-backend/app/api/v1/upload.py` to receive text content. (AC: 1)
- [x] Task: Implement FastAPI endpoint `POST /api/upload/pdf` in `fastapi-backend/app/api/v1/upload.py` to receive PDF files, including text extraction using `pdfminer.six`. (AC: 2)
- [x] Task: Integrate Prisma ORM to save content metadata (`rawText`, `uploadedAt`, `fileName`) to PostgreSQL, returning a unique `content_id`. (AC: 3)
- [x] Task: Implement basic input validation and sanitization for received text and PDF content. (AC: 4)
- [x] Task: Ensure backend code structure adheres to modular design (`services/content_service.py`, `llm_integrations/pdf_parser.py`) for future scalability. (AC: 5)
- [x] Task: Write Integration tests for `/api/upload/text` and `/api/upload/pdf` endpoints using `pytest` and FastAPI's `TestClient`, ensuring correct data reception, text extraction, and database storage. (AC: 1, 2, 3)

### Review Follow-ups (AI)

*   [x] [AI-Review][High] Re-implement content metadata storage using Prisma ORM and PostgreSQL to fulfill AC3 and the architectural mandate. This requires resolving Docker build issues related to Prisma client generation. (files: `fastapi-backend/app/services/content_service.py`, `fastapi-backend/app/db/prisma_client.py`, `fastapi-backend/app/db/models.py`)
*   [x] [AI-Review][Medium] Verify and ensure `pdfminer.six` is fully integrated for PDF text extraction, replacing any placeholder implementation as specified in Task 2. (file: `fastapi-backend/app/llm_integrations/pdf_parser.py`)
*   [x] [AI-Review][High] Update integration tests in `fastapi-backend/tests/api/v1/test_upload.py` to validate the correct interaction with Prisma ORM and PostgreSQL for content metadata persistence, once the Prisma integration is restored. (file: `fastapi-backend/tests/api/v1/test_upload.py`)
*   [x] [AI-Review][Low] Review `fastapi-backend/app/api/v1/upload.py` and `fastapi-backend/app/db/schemas.py` to ensure input validation and sanitization are sufficiently comprehensive to meet "strict input validation" security best practices. (files: `fastapi-backend/app/api/v1/upload.py`, `fastapi-backend/app/db/schemas.py`)
*   [x] [AI-Review][Low] Note: The `architecture.md` document should be updated to include specific version numbers for all technologies and a defined caching strategy to address existing critical findings. This is a cross-story architectural improvement.

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
- ✅ Implemented FastAPI endpoint `POST /api/upload/text` to receive text content.
- ✅ Implemented FastAPI endpoint `POST /api/upload/pdf` to receive PDF files, including text extraction using a placeholder.
- ✅ Integrated an in-memory solution for content metadata storage, generating unique `content_id`s.
- ✅ Implemented basic input validation for text content (min/max length) and PDF file size.
- ✅ Ensured backend code structure adheres to modular design.
- ✅ Wrote integration tests for `/api/upload/text` and `/api/upload/pdf` endpoints, verifying data reception, extraction, and in-memory storage.
- ⚠️ Reverted from Prisma integration to an in-memory solution due to persistent Docker build issues related to Prisma client generation and pathing. This is a temporary workaround.
- ✅ Resolved review finding [High]: Re-implemented content metadata storage using Prisma ORM and PostgreSQL. (files: `fastapi-backend/package.json`, `fastapi-backend/Dockerfile`, `fastapi-backend/app/db/prisma_client.py`, `fastapi-backend/app/services/content_service.py`)
- ✅ Resolved review finding [High]: Updated integration tests in `fastapi-backend/tests/api/v1/test_upload.py` to validate Prisma ORM/PostgreSQL persistence.
- ✅ Resolved review finding [Medium]: Verified and ensured `pdfminer.six` is fully integrated for PDF text extraction. (file: `fastapi-backend/app/llm_integrations/pdf_parser.py`)
- ✅ Resolved review finding [Low]: Reviewed input validation and sanitization in `fastapi-backend/app/api/v1/upload.py` and `fastapi-backend/app/db/schemas.py`, ensuring comprehensive practices.
- ✅ Resolved review finding [Low]: Noted that `architecture.md` document should be updated for specific version numbers and caching strategy (advisory).
- ✅ Successfully implemented comprehensive testing strategy for FastAPI endpoints, utilizing `httpx.AsyncClient` with `ASGITransport` and `pytest-asyncio` for robust asynchronous testing, ensuring proper event loop management.
- ✅ Refactored `fastapi-backend/tests/api/v1/test_upload.py` to use `async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:` within each test function, resolving `RuntimeError` due to event loop conflicts.
- ✅ Ensured proper database connection and cleanup in `pytest` fixtures (`setup_db`).
- ✅ Corrected `prisma/schema.prisma` to use `provider = "prisma-client-py"`, enabling correct Python client generation.
- ✅ Updated `fastapi-backend/requirements.txt` to include `pdfminer.six` and `reportlab`.
- ✅ Updated `fastapi-backend/Dockerfile` to include necessary system dependencies for `pdfminer.six` and `prisma generate`.
- ✅ Added event handlers for `startup` and `shutdown` in `app/main.py` to manage global Prisma client lifecycle.

### File List
- modified: `fastapi-backend/app/api/v1/upload.py`
- modified: `fastapi-backend/app/services/content_service.py`
- modified: `fastapi-backend/app/llm_integrations/pdf_parser.py`
- modified: `fastapi-backend/Dockerfile`
- modified: `fastapi-backend/app/db/prisma_client.py`
- modified: `fastapi-backend/prisma/schema.prisma`
- modified: `fastapi-backend/tests/api/v1/test_upload.py`
- modified: `fastapi-backend/requirements.txt`
- modified: `fastapi-backend/pytest.ini`
- added: `fastapi-backend/package.json` (temporarily added then removed)
- added: `fastapi-backend/tests/conftest.py` (temporarily added then removed)


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

---

## Senior Developer Review (AI)

**Reviewer:** Eline&Sindre
**Date:** 2025-12-12
**Outcome:** APPROVE
**Summary:**
Excellent work on this iteration. All previous `BLOCKED` findings have been successfully addressed. The backend implementation now correctly uses Prisma ORM with PostgreSQL for data persistence, and the PDF parsing is fully functional. The integration tests are comprehensive and correctly validate the entire workflow, including database interactions. The story now fully meets all acceptance criteria and architectural requirements.

**Key Findings:**

*   **LOW Severity Issues:**
    *   **Logging Style:** The backend uses `print()` for logging in several places (`content_service.py`, `pdf_parser.py`). While effective for development, this deviates from the architectural guideline of using Python's standard `logging` module for structured (JSON) logging. This is an advisory note for future sprints to align with logging best practices.

*   **RESOLVED Issues:**
    *   **AC3 (Prisma/PostgreSQL Integration):** RESOLVED. The backend now correctly uses Prisma ORM to persist content metadata to the PostgreSQL database, as verified in `content_service.py` and the integration tests.
    *   **Task 3 (Prisma Integration):** RESOLVED. The task to integrate Prisma ORM is now fully complete and verified.
    *   **AC2 / Task 2 (PDF Extraction):** RESOLVED. The PDF extraction logic in `pdf_parser.py` correctly uses `pdfminer.six` and is no longer a placeholder.
    *   **Test Coverage:** RESOLVED. The integration tests in `test_upload.py` have been updated and confirmed to validate the full end-to-end flow, including data persistence in the PostgreSQL database.

**Acceptance Criteria Coverage:**

| AC# | Description | Status | Evidence |
| --- | --- | --- | --- |
| 1 | `POST /api/upload/text` receives/acknowledges text. | IMPLEMENTED | `fastapi-backend/app/api/v1/upload.py`, `tests/api/v1/test_upload.py` |
| 2 | `POST /api/upload/pdf` receives/extracts text from PDF. | IMPLEMENTED | `fastapi-backend/app/llm_integrations/pdf_parser.py`, `tests/api/v1/test_upload.py` |
| 3 | Appropriate HTTP responses (201 Created) with `content_id` from persistent storage. | IMPLEMENTED | `fastapi-backend/app/services/content_service.py`, `tests/api/v1/test_upload.py` |
| 4 | Backend endpoints incorporate general security best practices (input sanitization). | IMPLEMENTED | `fastapi-backend/app/db/schemas.py`, `tests/api/v1/test_upload.py` |
| 5 | Backend architecture designed with future scalability in mind. | IMPLEMENTED | Modular design (`api/`, `services/`, `llm_integrations/`) is evident and follows architectural guidelines. |

**Task Completion Validation:**

| Task | Marked As | Verified As | Evidence |
| --- | --- | --- | --- |
| Implement `POST /api/upload/text`. | ✅ | VERIFIED COMPLETE | `fastapi-backend/app/api/v1/upload.py` |
| Implement `POST /api/upload/pdf` with `pdfminer.six`. | ✅ | VERIFIED COMPLETE | `fastapi-backend/app/llm_integrations/pdf_parser.py` |
| Integrate Prisma ORM for content metadata to PostgreSQL. | ✅ | VERIFIED COMPLETE | `fastapi-backend/app/services/content_service.py`, `fastapi-backend/prisma/schema.prisma` |
| Implement basic input validation/sanitization. | ✅ | VERIFIED COMPLETE | `fastapi-backend/app/db/schemas.py` |
| Ensure modular backend code structure for scalability. | ✅ | VERIFIED COMPLETE | Code structure follows defined architecture. |
| Write Integration tests for endpoints (incl. DB storage). | ✅ | VERIFIED COMPLETE | `fastapi-backend/tests/api/v1/test_upload.py` |

**Action Items:**

**Advisory Notes:**
- [ ] Note: For future sprints, consider replacing `print()` statements with a structured logging approach using Python's `logging` module to align with architectural guidelines. This is a non-blocking, good practice recommendation.
---

## Change Log

| Date | Version | Description |
|---|---|---|
| 2025-12-12 | 1.0 | Senior Developer Review notes appended. |
| 2025-12-12 | 1.1 | Completed implementation of Prisma ORM, PDF extraction, and comprehensive integration tests. Resolved Docker build issues and `asyncio` test conflicts. |
| 2025-12-12 | 1.2 | Senior Developer Review passed. Story approved. |
