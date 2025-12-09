# Story 3.1: Quiz Generation Backend

Status: ready-for-dev

## Story

As a developer,
I want to create a backend service that generates a quiz based on the original content,
so that users can test their knowledge.

## Acceptance Criteria

1.  Given content is available on the backend, when the quiz generation service is called, then a set of questions and answers is returned in a structured format (e.g., JSON).
2.  Given a difficulty level is provided, when the service is called, then the quiz questions match the requested difficulty.
3.  (NFR2) Given the LLM API call fails, when I call the service, then a proper error is returned and the system handles it gracefully.
4.  (NFR6) The service seamlessly integrates with the chosen LLM provider.

## Tasks / Subtasks

- [ ] **Task 1: Implement Quiz Generation Service (AC: 1, 2, 3, 4)**
  - [ ] Subtask 1.1: Create a `QuizService` in `backend/app/core/`.
  - [ ] Subtask 1.2: Implement a method that takes content and difficulty level as input and returns quiz questions.
  - [ ] Subtask 1.3: Integrate the `LLMClient` to communicate with the LLM provider for question generation.
  - [ ] Subtask 1.4: Implement error handling for LLM API calls.
- [ ] **Task 2: Create API Endpoint (AC: 1, 2, 3, 4)**
  - [ ] Subtask 2.1: Create a `POST /api/quiz` endpoint in `backend/app/api/`.
  - [ ] Subtask 2.2: The endpoint should accept `content_id` and `difficulty` in the request body.
  - [ ] Subtask 2.3: The endpoint should call the `QuizService` and return the quiz questions.
- [ ] **Task 3: Asynchronous Task (AC: 1, 2, 3, 4)**
  - [ ] Subtask 3.1: Create a Celery task for the quiz generation process.
  - [ ] Subtask 3.2: The API endpoint should initiate the Celery task and return a `202 Accepted` response.
- [ ] **Task 4: Write Backend Tests (AC: 1, 2, 3, 4)**
  - [ ] Subtask 4.1: Write unit tests for the `QuizService`.
  - [ ] Subtask 4.2: Write integration tests for the `POST /api/quiz` endpoint.

## Dev Notes

- Relevant architecture patterns and constraints
  - The backend is a FastAPI application.
  - Long-running tasks like quiz generation must be handled asynchronously using Celery.
  - The `LLMClient` will be used for all communication with the LLM provider.
- Source tree components to touch
  - `backend/app/core/quiz_service.py` (new)
  - `backend/app/api/quiz.py` (new)
  - `backend/app/tasks/quiz_tasks.py` (new)
- Testing standards summary
  - Unit tests for the quiz generation logic.
  - Integration tests for the API endpoint.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the backend quiz generation logic.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Detailed Design]
- [Source: docs/epics-QuizZum-2025-12-05.md#Story 3.1: (MVP) Quiz Generation Backend]
- [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/3-1-quiz-generation-backend.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
