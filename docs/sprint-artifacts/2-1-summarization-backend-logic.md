# Story 2.1: Summarization Backend Logic

Status: ready-for-dev

## Story

As a developer,
I want to create a backend service that accepts content and generates summaries at different difficulty levels,
so that the core summarization feature is functional.

## Acceptance Criteria

1.  Given the backend receives content and a difficulty level ('easy', 'medium', 'hard'), when I call the summarization service, then it returns a summary corresponding to that difficulty.
2.  (NFR2) Given the LLM API call fails, when I call the service, then a proper error is returned and the system handles it gracefully.
3.  (NFR6) The service seamlessly integrates with the chosen LLM provider.

## Tasks / Subtasks

- [ ] **Task 1: Implement Summarization Service (AC: 1, 2, 3)**
  - [ ] Subtask 1.1: Create a `SummarizationService` in `backend/app/core/`.
  - [ ] Subtask 1.2: Implement a method that takes content and difficulty level as input and returns a summary.
  - [ ] Subtask 1.3: Integrate the `LLMClient` to communicate with the LLM provider.
  - [ ] Subtask 1.4: Implement error handling for LLM API calls.
- [ ] **Task 2: Create API Endpoint (AC: 1, 2, 3)**
  - [ ] Subtask 2.1: Create a `POST /api/summarize` endpoint in `backend/app/api/`.
  - [ ] Subtask 2.2: The endpoint should accept `content_id` and `difficulty` in the request body.
  - [ ] Subtask 2.3: The endpoint should call the `SummarizationService` and return the summary.
- [ ] **Task 3: Asynchronous Task (AC: 1, 2, 3)**
    - [ ] Subtask 3.1: Create a Celery task for the summarization process.
    - [ ] Subtask 3.2: The API endpoint should initiate the Celery task and return a `202 Accepted` response.
- [ ] **Task 4: Write Backend Tests (AC: 1, 2, 3)**
  - [ ] Subtask 4.1: Write unit tests for the `SummarizationService`.
  - [ ] Subtask 4.2: Write integration tests for the `POST /api/summarize` endpoint.

## Dev Notes

- Relevant architecture patterns and constraints
  - The backend is a FastAPI application.
  - Long-running tasks like summarization must be handled asynchronously using Celery.
  - The `LLMClient` will be used for all communication with the LLM provider.
- Source tree components to touch
  - `backend/app/core/summarization_service.py` (new)
  - `backend/app/api/summarize.py` (new)
  - `backend/app/tasks/summarization_tasks.py` (new)
- Testing standards summary
  - Unit tests for the summarization logic.
  - Integration tests for the API endpoint.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the backend summarization logic.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 2.1: (MVP) Summarization Backend Logic]
- [Source: docs/sprint-artifacts/tech-spec-epic-2.md#Detailed Design]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/2-1-summarization-backend-logic.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
