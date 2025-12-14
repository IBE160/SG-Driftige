# Story 3.4: Adaptive Follow-up Quiz

Status: review

## Story

As a user,
after a quiz, I want to take a follow-up quiz on the questions I got wrong,
so that I can reinforce my weak spots.

## Acceptance Criteria

1.  Given I have completed a quiz with incorrect answers, when the score is displayed, then an option to "Practice weak spots" is available. (Covers FR17)
2.  Given I choose to practice weak spots, when the new quiz starts, then it contains new questions that target the topics I answered incorrectly. (Covers FR17)
3.  The backend can identify the topics of incorrectly answered questions and request a new, targeted quiz from the LLM.

## Tasks / Subtasks

- [x] **Task 1: Create Backend Adaptive Logic (AC: #3)**
    - [x] In `fastapi-backend/app/services/quiz_service.py`, implement a method that takes a `QuizResult` and identifies the topics of the incorrectly answered questions.
    - [x] In `fastapi-backend/app/llm_integrations/quiz_generator.py`, create a new prompt template for generating a follow-up quiz that focuses on a given list of topics (the "weak spots").
- [x] **Task 2: Create Adaptive Follow-up API Endpoint (AC: #3)**
    - [x] In `fastapi-backend/app/api/quiz_router.py`, implement the `POST /api/quiz/follow-up` endpoint.
    - [x] This endpoint will take a `content_id` and `QuizResult`, and return a new `QuizData` object.
- [x] **Task 3: Implement Frontend "Practice Weak Spots" Feature (AC: #1, #2)**
    - [x] In the `nextjs-frontend/src/components/QuizResults.jsx` component, add a "Practice weak spots" button that is only visible if the user scored less than 100%.
    - [x] In the `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (or the parent component managing state), implement the logic for this button to call the `POST /api/quiz/follow-up` endpoint.
    - [x] Upon receiving the new `QuizData`, the `QuizView` component should be re-rendered with the new set of questions.
- [x] **Task 4: Write Tests (AC: #1, #2, #3)**
    - [x] Write unit tests for the backend logic that identifies weak spots and constructs the new prompts.
    - [x] Write integration tests for the `POST /api/quiz/follow-up` endpoint.
    - [x] Update the component tests for `QuizResults.jsx` to assert that the "Practice weak spots" button appears correctly.
    - [x] Update the E2E test to cover the full adaptive loop: take a quiz, get a non-perfect score, click the button, and verify a new quiz loads.

## Dev Notes

This story completes the core "adaptive learning" loop for Epic 3. The main technical challenge is on the backend: how to effectively communicate the user's "weak spots" to the LLM to get a relevant and useful follow-up quiz. For the MVP, we will pass the text of the incorrectly answered questions as the "topics" for the new prompt.

### Project Structure Notes

-   **Modified Files:**
    -   `fastapi-backend/app/services/quiz_service.py`
    -   `fastapi-backend/app/llm_integrations/quiz_generator.py`
    -   `fastapi-backend/app/api/quiz_router.py`
    -   `nextjs-frontend/src/components/QuizResults.jsx`
    -   `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (or the parent component managing state)
    -   `nextjs-frontend/src/lib/api.js`

### Learnings from Previous Story (3.3: Quiz Assessment and Feedback)

*   **From Story 3.3 (Status: ready-for-dev)**
    - **API Contract**: The `QuizResult` object, which is the output of the previous story, is the primary *input* for this story's backend logic. Adherence to this data contract is critical.
    - **Component Structure**: This story will modify the `QuizResults.jsx` component created in the previous story to add the adaptive follow-up functionality.

### References

-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Detailed Design]
-   [Source: docs/sprint-artifacts/tech-spec-epic-3.md#Acceptance Criteria (Authoritative)]
-   [Source: docs/epics-QuizZum-2025-12-05.md#Epic 3: Adaptive Quizzing]
-   [Source: docs/sprint-artifacts/3-3-quiz-assessment-feedback.md]

## Dev Agent Record

### Context Reference
- [docs/sprint-artifacts/3-4-adaptive-follow-up-quiz.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List
- Implemented the backend logic for adaptive quizzes in `quiz_service.py` and `quiz_generator.py`.
- Added the `POST /api/v1/quiz/{original_quiz_id}/follow-up` endpoint to `quiz_router.py`.
- Updated the frontend `QuizResults.jsx` component with a conditional "Practice Weak Spots" button.
- Implemented the full adaptive loop on the quiz page.
- Added comprehensive unit, integration, and E2E tests.
- **Resolved E2E test failure:** Fixed a data shape mismatch between the frontend API client and the backend API. The backend quiz endpoints now correctly wrap their responses in a `{ "status": "success", "data": ... }` envelope, and the frontend client and E2E test mocks have been updated to match.
- Fixed multiple Docker environment issues to enable backend test runs.
- Fixed a linting error in the frontend code.
- ✅ Resolved review finding [Low]: Replace in-memory `QUIZ_CACHE` with a persistent, distributed cache solution.
- ✅ Resolved review finding [Low]: Completed LLM integration by removing mock responses.
- ✅ Resolved review finding [Low]: Replaced print statements with structured logging in `quiz_generator.py` and `quiz_validator.py`.
- ✅ Resolved review finding [Low]: Verified and implemented explicit sanitization of user-provided content.
- ✅ Resolved review finding [Low]: Aligned `/api/quiz` endpoint prefix to `/api/v1/quiz`.
- ✅ Resolved review finding [Low]: Replaced deprecated Pydantic `dict()` with `model_dump()`.

### File List
- `fastapi-backend/app/api/quiz_router.py` (Modified)
- `fastapi-backend/app/llm_integrations/quiz_generator.py` (Modified)
- `fastapi-backend/app/schemas/quiz.py` (Modified)
- `fastapi-backend/app/services/quiz_service.py` (Modified)
- `fastapi-backend/tests/api/test_quiz_api.py` (Modified)
- `fastapi-backend/tests/services/test_quiz_service.py` (Modified)
- `nextjs-frontend/src/app/(input)/page.jsx` (Modified)
- `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (Modified)
- `nextjs-frontend/src/components/QuizResults.jsx` (Modified)
- `nextjs-frontend/src/components/__tests__/QuizResults.test.jsx` (Modified)
- `nextjs-frontend/src/lib/api.js` (Modified)
- `nextjs-frontend/tests/quiz.spec.js` (Modified)
- `docker-compose.yml` (Modified)
- `fastapi-backend/requirements.txt` (Modified)
- `fastapi-backend/app/llm_integrations/quiz_generator.py` (Modified)
- `fastapi-backend/app/services/quiz_validator.py` (Modified)

## Change Log
- 2025-12-14: Senior Developer Review notes appended.
- 2025-12-14: Addressed code review findings - 6 items resolved.

## Senior Developer Review (AI)
### Reviewer: Eline&Sindre
### Date: Sunday, December 14, 2025
### Outcome: Changes Requested
### Summary: The feature to generate adaptive follow-up quizzes is well-implemented across both frontend and backend. All acceptance criteria are met, and all tasks marked complete have been verified. The test coverage is comprehensive. The implementation aligns well with the provided Epic Technical Specification. The main areas for improvement are related to production-readiness (caching and LLM integration completion) and addressing several specific low-severity follow-up items outlined in the tech spec.

### Key Findings (by severity - HIGH/MEDIUM/LOW):
*   **LOW severity:**
    *   **LLM Mocking in `quiz_generator.py`:** The `quiz_generator.py` currently uses mock responses (`MOCK_LLM_RESPONSE`, `MOCK_ADAPTIVE_LLM_RESPONSE`). The actual integration with an external LLM is commented out. For full functionality, this integration needs to be completed.
        *   **Reference:** `fastapi-backend/app/llm_integrations/quiz_generator.py` lines 43, 85.

### Acceptance Criteria Coverage:

| AC# | Description                                                                                                                                                             | Status       | Evidence                                                                                                                                           |
| :-- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Given I have completed a quiz with incorrect answers, when the score is displayed, then an option to "Practice weak spots" is available. (Covers FR17)                     | IMPLEMENTED  | `nextjs-frontend/src/components/QuizResults.jsx` (lines 49-56) - conditional button rendering.                                                     |
| 2   | Given I choose to practice weak spots, when the new quiz starts, then it contains new questions that target the topics I answered incorrectly. (Covers FR17)             | IMPLEMENTED  | `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (lines 73-81) - calls backend, re-renders with new quiz.<br/>`fastapi-backend/app/services/quiz_service.py` (lines 94-100, 107-111) - backend logic for targeting weak spots. |
| 3   | The backend can identify the topics of incorrectly answered questions and request a new, targeted quiz from the LLM.                                                  | IMPLEMENTED  | `fastapi-backend/app/services/quiz_service.py` (lines 94-100) - identifies weak spots.<br/>`fastapi-backend/app/llm_integrations/quiz_generator.py` (lines 62-74) - constructs prompt for targeted quiz. |

### Task Completion Validation:

| Task                                                                                                                                                                                                       | Marked As | Verified As       | Evidence                                                                                                                                           |
| :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------- | :---------------- | :------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Task 1: Create Backend Adaptive Logic (AC: #3)**                                                                                                                                                         |           |                   |                                                                                                                                                    |
| - In `fastapi-backend/app/services/quiz_service.py`, implement a method that takes a `QuizResult` and identifies the topics of the incorrectly answered questions.                                         | [x]       | VERIFIED COMPLETE | `fastapi-backend/app/services/quiz_service.py` (lines 94-100)                                                                                      |
| - In `fastapi-backend/app/llm_integrations/quiz_generator.py`, create a new prompt template for generating a follow-up quiz that focuses on a given list of topics (the "weak spots").                        | [x]       | VERIFIED COMPLETE | `fastapi-backend/app/llm_integrations/quiz_generator.py` (lines 62-74)                                                                           |
| **Task 2: Create Adaptive Follow-up API Endpoint (AC: #3)**                                                                                                                                                |           |                   |                                                                                                                                                    |
| - In `fastapi-backend/app/api/quiz_router.py`, implement the `POST /api/quiz/follow-up` endpoint.                                                                                                           | [x]       | VERIFIED COMPLETE | `fastapi-backend/app/api/quiz_router.py` (lines 58-75)                                                                                             |
| - This endpoint will take a `content_id` and `QuizResult`, and return a new `QuizData` object.                                                                                                             | [x]       | VERIFIED COMPLETE | `fastapi-backend/app/api/quiz_router.py` (lines 62-63, 73)                                                                                         |
| **Task 3: Implement Frontend "Practice Weak Spots" Feature (AC: #1, #2)**                                                                                                                                  |           |                   |                                                                                                                                                    |
| - In the `nextjs-frontend/src/components/QuizResults.jsx` component, add a "Practice weak spots" button that is only visible if the user scored less than 100%.                                            | [x]       | VERIFIED COMPLETE | `nextjs-frontend/src/components/QuizResults.jsx` (lines 49-56)                                                                                     |
| - Implement the logic for this button to call the `POST /api/quiz/follow-up` endpoint.                                                                                                                   | [x]       | VERIFIED COMPLETE | `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (lines 68-84)                                                                                     |
| - Upon receiving the new `QuizData`, the `QuizView` component should be re-rendered with the new set of questions.                                                                                     | [x]       | VERIFIED COMPLETE | `nextjs-frontend/src/app/quiz/[quizId]/page.jsx` (lines 78-81)                                                                                     |
| **Task 4: Write Tests (AC: #1, #2, #3)**                                                                                                                                                                   |           |                   |                                                                                                                                                    |
| - Write unit tests for the backend logic that identifies weak spots and constructs the new prompts.                                                                                                        | [x]       | VERIFIED COMPLETE | `fastapi-backend/tests/services/test_quiz_service.py` (`test_create_adaptive_quiz_success` - asserts `generate_adaptive_quiz_from_llm` arguments) |
| - Write integration tests for the `POST /api/quiz/follow-up` endpoint.                                                                                                                                   | [x]       | VERIFIED COMPLETE | `fastapi-backend/tests/api/test_quiz_api.py` (`test_generate_adaptive_quiz_success`)                                                               |
| - Update the component tests for `QuizResults.jsx` to assert that the "Practice weak spots" button appears correctly.                                                                                    | [x]       | VERIFIED COMPLETE | `nextjs-frontend/src/components/__tests__/QuizResults.test.jsx` (tests for conditional rendering of "Practice Weak Spots" button)                  |
| - Update the E2E test to cover the full adaptive loop: take a quiz, get a non-perfect score, click the button, and verify a new quiz loads.                                                               | [x]       | VERIFIED COMPLETE | `nextjs-frontend/tests/quiz.spec.js` (`should run the full adaptive quiz loop`)                                                                   |

### Test Coverage and Gaps:
*   Unit, integration, and E2E tests are in place and cover the adaptive quiz functionality effectively.
*   No significant test gaps identified for the implemented features.

### Architectural Alignment:
*   The implementation aligns well with the "Adaptive Learning for Lasting Mastery" novel architectural pattern described in `docs/architecture.md`.
*   The implementation also aligns closely with `docs/sprint-artifacts/tech-spec-epic-3.md`, confirming detailed design, API contracts, workflows, and NFRs.

### Security Notes:
*   API keys are handled via environment variables (as per commented code in `quiz_generator.py`).
*   Pydantic models provide input validation.
*   FastAPI's error handling mechanism is used.
*   No obvious security vulnerabilities for the implemented scope.

### Best-Practices and References:
*   Frontend (Next.js/React): Uses Chakra UI, Tailwind CSS, follows standard naming and file organization, implements useCallback for performance, and has good test coverage.
*   Backend (FastAPI/Python): Uses FastAPI, Pydantic, follows standard naming and file organization, implements retry logic for LLM calls, and has good test coverage.
*   General: Docker containerization for local development, consistent API response format.

### Action Items:

**Code Changes Required:**
- [x] [Low] Replace in-memory `QUIZ_CACHE` with a persistent, distributed cache solution for production deployments. (AC #3) [file: `fastapi-backend/app/services/quiz_service.py` lines 14, 15, 60, 90] (Resolved 2025-12-14)
- [x] [Low] Complete the actual integration with an external LLM in `quiz_generator.py` by uncommenting and configuring the API call, replacing the mock responses. (AC #3) [file: `fastapi-backend/app/llm_integrations/quiz_generator.py` lines 43, 85 (and surrounding commented code)] (Resolved 2025-12-14)
- [x] [Low] From Story 3.1: Replace `print` statements with structured logging in `fastapi-backend/app/llm_integrations/quiz_generator.py:72` and `fastapi-backend/app/services/quiz_validator.py:22`. (Resolved 2025-12-14)
- [x] [Low] From Story 1.4 in Epic 3 Tech Spec: Verify or implement explicit sanitization of user-provided content before it is passed to LLM prompts in `fastapi-backend/app/llm_integrations/quiz_generator.py`. (Resolved 2025-12-14)
- [x] [Low] From Story 3.1: Align the `/api/quiz` endpoint prefix in `fastapi-backend/app/main.py` to `/api/v1/quiz` for consistency. (Resolved 2025-12-14)
- [x] [Low] From Story 3.1: The Pydantic `dict()` method is deprecated and should be replaced with `model_dump()` in `fastapi-backend/app/services/quiz_service.py:39`. (Resolved 2025-12-14)

**Advisory Notes:**
- Note: Consider enhancing prompt engineering for `construct_adaptive_quiz_prompt` to handle more complex "weak spot" identification, potentially using topic extraction or semantic analysis rather than just question text.