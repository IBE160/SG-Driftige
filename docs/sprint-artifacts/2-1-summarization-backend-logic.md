# Story 2.1: Summarization Backend Logic

Status: review

## Story

As a developer,
I want to create a backend service that accepts content and generates summaries at different difficulty levels,
so that the core summarization feature is functional.

## Acceptance Criteria

1.  Given the backend receives content and a difficulty level ('easy', 'medium', 'hard'), when I call the summarization service, then it returns a summary corresponding to that difficulty.
2.  Given the LLM API call fails, when I call the service, then a proper error is returned and the system handles it gracefully.
3.  The service seamlessly integrates with the chosen LLM provider.

## Tasks / Subtasks

- [x] Task: Implement Pydantic schemas `SummarizeRequest` and `Summary` in `fastapi-backend/app/db/schemas.py`. (AC: 1)
- [x] Task: Create `fastapi-backend/app/llm_integrations/summarizer.py` for LLM prompt construction and API interaction. (AC: 3)
- [x] Task: Create `fastapi-backend/app/services/summarization_service.py` to fetch content, call the summarizer, and handle different difficulty levels. (AC: 1, 3)
- [x] Task: Implement FastAPI endpoint `POST /api/summarize` in `fastapi-backend/app/api/v1/summarize.py` that utilizes the summarization service. (AC: 1, 2)
- [x] Task: Implement robust error handling in `summarization_service.py` and `summarizer.py` for LLM API failures. (AC: 2)
- [x] Task: Write Integration tests for `POST /api/summarize` endpoint using `pytest` and `httpx`, ensuring correct summarization logic and error handling (mocking LLM calls). (AC: 1, 2, 3)
- [x] Task: Update `fastapi-backend/app/main.py` to include the new summarization router.

## Dev Notes

### Project Context Summary

This story implements the core backend logic for multi-level summarization. It leverages the content ingestion functionality from Epic 1 and is a foundational step for Epic 2: "Multi-level Summarization". This service will be consumed by the frontend to display summaries.

### Project Structure Alignment

This story primarily involves backend development within `fastapi-backend/app/api/v1` for the new endpoint, `fastapi-backend/app/services` for business logic, and `fastapi-backend/app/llm_integrations` for LLM specific code. It aligns with the modular design defined in the architecture.

### Technical Mandates and Constraints

*   **Backend Framework:** FastAPI (Python).
*   **LLM Integration:** Direct API calls to a chosen LLM provider.
*   **Database:** PostgreSQL with Prisma ORM (for retrieving `Content`'s `rawText`).
*   **API Response:** Standardized JSON envelope as defined in the Epic 2 Tech Spec.
*   **Error Handling:** FastAPI `HTTPException` for standardized error responses, graceful LLM API error handling.
*   **Testing:** Integration tests for the API endpoint, unit tests for services/integrations.

### Learnings from Previous Story (1.5: Basic Browser Compatibility & Responsiveness)

*   **Playwright Test Setup:** Playwright has been successfully integrated for frontend E2E testing. This story is backend-focused, but the experience with test setup is valuable.
*   **Docker/Prisma Setup:** The resolution of Docker build issues related to Prisma client generation in Story 1.4 provides a stable base for database interactions in this story. The action item to document this setup (`docs/guides/backend-setup.md`) will prevent future friction.
*   **Async Testing:** Learning from `pytest-asyncio` event loop conflicts in Story 1.4 will be valuable for setting up backend integration tests for this story.

### References

*   [Source: docs/prd-QuizZum-2025-12-05.md#Summarization & Content Presentation]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 2: Multi-level Summarization]
*   [Source: docs/architecture.md#API Communication]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-2.md#Detailed Design]

## Dev Agent Record

### Context Reference
*   [Source: docs/sprint-artifacts/2-1-summarization-backend-logic.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- Implemented Pydantic schemas (`SummarizeRequest`, `Summary`).
- Created `LLMSummarizer` for prompt construction and mocked LLM interaction.
- Developed `SummarizationService` to fetch content and utilize the summarizer.
- Implemented FastAPI endpoint `POST /api/v1/summarize` with dependency injection.
- Added robust error handling for content not found (404) and simulated LLM API failures (502).
- Wrote comprehensive integration tests using `pytest` and `httpx.ASGITransport` with dependency overrides for Prisma client and LLM summarizer. All tests passed.

### File List
- Added:
    - `fastapi-backend/app/llm_integrations/summarizer.py`
    - `fastapi-backend/app/services/summarization_service.py`
    - `fastapi-backend/app/api/v1/summarize.py`
    - `fastapi-backend/tests/api/v1/test_summarize.py`
- Modified:
    - `fastapi-backend/app/db/schemas.py`
    - `fastapi-backend/app/main.py`

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
| 2025-12-12 | 1.1 | Implemented backend summarization logic, including Pydantic schemas, LLM integration, service layer, FastAPI endpoint, robust error handling, and comprehensive integration tests. Status updated to 'review'.
