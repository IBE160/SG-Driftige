# Story 3.1: Quiz Generation Backend

Status: review

## Story

As a developer,
I want to create a backend service that generates a quiz based on the original content,
so that users can test their knowledge.

## Acceptance Criteria

1.  Given content is available on the backend, when the quiz generation service is called with a specific difficulty, then a set of questions and answers is returned in a structured JSON format. (Corresponds to AC #1 in Tech Spec)
2.  The service seamlessly integrates with the chosen LLM provider for quiz generation. (Corresponds to AC #1 in Tech Spec)
3.  Given the LLM API call fails or returns invalid data, the service handles the error gracefully and returns a `502` or `503` status code. (Corresponds to PRD NFR2)

## Tasks / Subtasks

- [x] **Task 1: Implement Pydantic Schemas (AC: #1)**
    - [x] In `fastapi-backend/app/schemas/quiz.py`, create the `QuizQuestion`, `QuizData`, `QuizSubmission`, and `QuizResult` models as defined in the Epic 3 Tech Spec.
- [x] **Task 2: Create Quiz Generator Service (AC: #1, #2)**
    - [x] Create `fastapi-backend/app/llm_integrations/quiz_generator.py`.
    - [x] Implement a function to construct a detailed prompt for the LLM, requesting a structured JSON output of multiple-choice questions based on input text and difficulty.
    - [x] Implement a function to make the API call to the LLM and handle the response.
- [x] **Task 3: Implement Quiz Validator Service (AC: #3)**
    - [x] Create `fastapi-backend/app/services/quiz_validator.py`.
    - [x] Implement a service that takes the raw LLM response and validates its structure against the `QuizData` Pydantic model.
- [x] **Task 4: Create Main Quiz Service (AC: #1, #3)**
    - [x] Create `fastapi-backend/app/services/quiz_service.py`.
    - [x] Implement the main service that retrieves content, calls the `quiz_generator`, validates the response with the `quiz_validator`, and implements the retry logic defined in the NFRs.
- [x] **Task 5: Implement API Endpoint (AC: #1, #3)**
    - [x] Create a new router in `fastapi-backend/app/api/quiz_router.py`.
    - [x] Implement the `POST /api/quiz` endpoint that uses the `quiz_service`.
    - [x] Ensure the endpoint is added to the main FastAPI app.
- [x] **Task 6: Write Tests (AC: #1, #3)**
    - [x] Create `fastapi-backend/tests/services/test_quiz_service.py` to unit test the service logic.
    - [x] Create `fastapi-backend/tests/api/test_quiz_api.py` to write integration tests for the new endpoint, mocking the LLM calls and testing for success and failure scenarios.

## Dev Notes

This story implements the core backend logic for quiz generation, which is the first step in building the "Adaptive Quizzing" feature of Epic 3. The primary focus is on successfully interacting with an LLM to get structured, usable data.

### Project Structure Notes

-   **New Files:**
    -   `fastapi-backend/app/api/quiz_router.py`
    -   `fastapi-backend/app/services/quiz_service.py`
    -   `fastapi-backend/app/services/quiz_validator.py`
    -   `fastapi-backend/app/llm_integrations/quiz_generator.py`
    -   `fastapi-backend/app/schemas/quiz.py` (if not already created)
-   **Modified Files:**
    -   `fastapi-backend/app/main.py` (to include the new router)

### Learnings from Previous Story (2.4: Seamless Difficulty Switching)

*   **From Story 2.4 (Status: done)**
    - **UI State Management**: The previous story highlighted the importance of robust state management on the frontend to handle dynamic updates. While this story is backend-focused, it's a reminder that the API we build must provide clear success and error states for the UI to consume.
    - **E2E Testing**: The value of E2E tests in verifying dynamic user flows was proven. For this story, our backend integration tests must be equally robust to ensure the API contract is solid before the frontend is built.
    - **No Blockers**: The previous epic was completed without major technical debt, providing a clean slate for this new feature.

### References

-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]
-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Acceptance Criteria (Authoritative)]
-   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 3: Adaptive Quizzing]
-   [Source: docs/sprint-artifacts/2-4-seamless-difficulty-switching.md]

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-1-quiz-generation-backend.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

### File List
- `fastapi-backend/app/schemas/quiz.py`
- `fastapi-backend/app/llm_integrations/quiz_generator.py`
- `fastapi-backend/app/services/quiz_validator.py`
- `fastapi-backend/app/services/quiz_service.py`
- `fastapi-backend/app/api/quiz_router.py`
- `fastapi-backend/app/main.py` (modified)
- `fastapi-backend/tests/services/test_quiz_service.py`
- `fastapi-backend/tests/api/test_quiz_api.py`
