# Epic Technical Specification: {{epic_title}}

Date: {{date}}
Author: {{user_name}}
Epic ID: {{epic_id}}
Status: Draft

---

## Overview

Epic 3, "Adaptive Quizzing," is the cornerstone of QuizZum's active learning philosophy. This epic introduces the functionality for users to generate dynamic quizzes from their study materials, test their knowledge across multiple difficulty levels (easy, medium, hard), and receive immediate, actionable feedback. The core innovation of this epic is the "adaptive follow-up quiz," a feature designed to intelligently target a user's identified weak spots to reinforce learning and guide them toward mastery. This epic directly delivers on the project's vision of transforming passive content consumption into an engaging and "playable" experience.

## Objectives and Scope

**In Scope:**

*   A backend service to generate multi-level (easy, medium, hard) quizzes from user-provided content using an LLM.
*   A frontend user interface for taking quizzes one question at a time.
*   A backend service to assess user answers and provide immediate feedback (correct/incorrect) and a final summary score.
*   The generation of a new "adaptive follow-up quiz" that specifically targets the topics and concepts the user struggled with in their previous attempt.
*   API endpoints to support quiz generation, submission, and follow-up.

**Out of Scope:**

*   Saving or tracking quiz history per user (this is a post-MVP growth feature).
*   Advanced gamification elements such as leaderboards, points, or streaks.
*   Question formats other than multiple-choice.
*   User authentication and profiles.

## System Architecture Alignment

This epic aligns perfectly with the established architecture, extending it with new, dedicated components while leveraging the existing foundation.

*   **Backend:** New services and API endpoints will be created within the FastAPI application.
    *   A new `quiz_service.py` in `app/services/` will contain the business logic.
    *   A new router in `app/api/` will expose endpoints like `POST /api/quiz`, `POST /api/quiz/{quiz_id}/submit`, etc.
    *   A new `llm_integrations/quizzing.py` will handle the specific prompt engineering and interaction with the LLM for quiz generation.
*   **Frontend:** A new route and corresponding components will be created in the Next.js application, likely under `src/app/quiz/`.
*   **Data:** This epic will read from the `Content` model created in Epic 1 to get the source material for quizzes but will introduce new, temporary data structures (Pydantic schemas) for handling quiz questions and answers in memory. No new persistent database models are required for the MVP.
*   **Novel Architecture:** This epic is the primary implementation of the "Adaptive Learning for Lasting Mastery" pattern defined in the architecture document.

## Detailed Design

### Services and Modules

| Layer | Component/Module | Responsibility | Owner |
| :--- | :--- | :--- | :--- |
| **Backend** | `app.api.quiz_router` | Exposes all quiz-related endpoints (`/api/quiz`, `/api/quiz/{id}/submit`, etc.). | `dev` |
| **Backend** | `app.services.quiz_service` | Orchestrates the entire quiz lifecycle: fetching content, calling the generator, assessing answers, and handling adaptive follow-up logic. | `dev` |
| **Backend** | `app.llm_integrations.quiz_generator` | Constructs detailed prompts for the LLM, sends requests, and parses the structured JSON response into Pydantic models. Manages different prompts for initial vs. adaptive quizzes. | `dev` |
| **Backend** | `app.services.quiz_validator` | Validates the structure and integrity of the JSON received from the LLM to ensure it conforms to the required `QuizData` contract before it is sent to the frontend. | `dev` |
| **Frontend**| `src.app.quiz.[quizId].page` | The main page component responsible for fetching quiz data, managing quiz state (current question, answers), and displaying the `QuizView`. | `dev` |
| **Frontend**| `src.components.QuizView` | A presentational component that displays a single question, its options, and handles user answer selection. | `dev` |
| **Frontend**| `src.components.QuizResults` | A component that displays the final score, feedback, and the option for an adaptive follow-up quiz. | `dev`|
| **Frontend**| `src.lib.api` | Updated to include client-side functions for calling the new quiz endpoints (`generateQuiz`, `submitQuiz`, `generateFollowUpQuiz`). | `dev` |

### Data Models and Contracts

For the MVP, quiz data will be handled in-memory and via API contracts, without requiring new persistent database tables. The following Pydantic schemas will be used for data validation and serialization.

```python
# In fastapi-backend/app/schemas/quiz.py

from pydantic import BaseModel, Field
from typing import List, Dict
from uuid import UUID

class QuizQuestion(BaseModel):
    """A single question in a quiz."""
    question_text: str
    options: List[str]
    correct_answer_index: int = Field(..., ge=0)

class QuizData(BaseModel):
    """The full data for a generated quiz."""
    quiz_id: UUID
    questions: List[QuizQuestion]

class QuizSubmission(BaseModel):
    """A user's submitted answers for a quiz."""
    # Dict mapping question_index to selected_option_index
    answers: Dict[int, int]

class QuizResult(BaseModel):
    """The assessment result of a quiz submission."""
    score: float = Field(..., ge=0.0, le=100.0)
    correct_answers: int
    total_questions: int
    # Dict mapping question_index to its correctness (True/False)
    results: Dict[int, bool]
```

### APIs and Interfaces

All endpoints will be exposed under the `/api` prefix.

**1. Generate a Quiz**
*   **Endpoint:** `POST /api/quiz`
*   **Request Body:**
    ```json
    {
      "content_id": "string",
      "difficulty": "easy" | "medium" | "hard"
    }
    ```
*   **Response Body (200 OK):** `QuizData`
*   **Error Responses:**
    *   `404 Not Found`: If `content_id` does not exist.
    *   `502 Bad Gateway`: If the LLM service fails to generate a valid quiz.

**2. Submit Quiz for Assessment**
*   **Endpoint:** `POST /api/quiz/{quiz_id}/submit`
*   **Request Body:** `QuizSubmission`
*   **Response Body (200 OK):** `QuizResult`
*   **Error Responses:**
    *   `422 Unprocessable Entity`: If the submission format is invalid.

**3. Generate Adaptive Follow-up Quiz**
*   **Endpoint:** `POST /api/quiz/follow-up`
*   **Request Body:**
    ```json
    {
      "content_id": "string",
      "previous_results": QuizResult // from the previous submission
    }
    ```
*   **Response Body (200 OK):** `QuizData` (A new quiz with new questions)
*   **Error Responses:**
    *   `404 Not Found`: If `content_id` does not exist.
    *   `502 Bad Gateway`: If the LLM service fails to generate a valid follow-up quiz.

### Workflows and Sequencing

**1. Initial Quiz Generation**
1.  **Frontend:** User clicks "Generate Quiz" on the summary page. The frontend calls `POST /api/quiz` with the `content_id` and selected `difficulty`.
2.  **Backend (`quiz_api`):** The endpoint receives the request.
3.  **Backend (`quiz_service`):** Retrieves the raw text of the content from the database using the `content_id`.
4.  **Backend (`quiz_generator`):** The service passes the text and difficulty to the generator, which constructs a detailed prompt asking the LLM for a specific number of multiple-choice questions in a structured JSON format.
5.  **LLM:** The LLM processes the request and returns a JSON string.
6.  **Backend (`quiz_validator`):** The raw JSON from the LLM is validated against the `QuizData` Pydantic model. If it fails validation, the service can either attempt a retry or return a `502 Bad Gateway` error.
7.  **Backend (`quiz_api`):** The validated `QuizData` is returned to the frontend.
8.  **Frontend:** The `QuizView` component renders, displaying the first question.

**2. Quiz Assessment**
1.  **Frontend:** The user answers all questions. The `QuizView` component compiles the answers into a `QuizSubmission` object and calls `POST /api/quiz/{quiz_id}/submit`.
2.  **Backend (`quiz_api`):** The endpoint receives the submission.
3.  **Backend (`quiz_service`):** The service retrieves the correct answers for the given `quiz_id` (which must be temporarily cached or stored). It compares the user's submission to the correct answers, calculates the score, and constructs a `QuizResult` object.
4.  **Backend (`quiz_api`):** The `QuizResult` is returned to the frontend.
5.  **Frontend:** The `QuizResults` component is displayed, showing the score and highlighting correct/incorrect answers.

**3. Adaptive Follow-up Quiz**
1.  **Frontend:** If the user's score is below the mastery threshold, they are presented with a "Practice weak spots" button. Clicking this calls `POST /api/quiz/follow-up` with the original `content_id` and the `QuizResult` object.
2.  **Backend (`quiz_api`):** The endpoint receives the request.
3.  **Backend (`quiz_service`):** The service inspects the `previous_results` to identify the topics of the questions that were answered incorrectly.
4.  **Backend (`quiz_generator`):** The service calls the generator with a new, more targeted prompt, requesting *new* questions specifically related to the identified weak-spot topics.
5.  **LLM & Validator:** The process repeats as in the initial generation.
6.  **Backend (`quiz_api`):** A *new* `QuizData` object for the follow-up quiz is returned to the frontend.
7.  **Frontend:** The `QuizView` renders again with the new set of targeted questions.

## Non-Functional Requirements

### Performance

*   **P95 Latency for Quiz Generation:** The time from a user clicking "Generate Quiz" to the first question appearing should be under 8 seconds. This ensures the user receives timely feedback and engagement is maintained. (Source: PRD NFR1)
*   **P95 Latency for Quiz Submission:** The time from a user clicking "Submit Quiz" to the results appearing should be under 500ms (excluding network latency).
*   **LLM API Timeout:** All calls to the external LLM API for quiz generation must have a strict timeout of 15 seconds.
*   **UI Responsiveness:** The frontend UI must remain fully responsive during all backend AI operations. Clear loading indicators (e.g., spinners or skeleton loaders) must be displayed to the user to manage expectations. (Source: PRD NFR1)

### Security

*   **LLM API Key Management:** The LLM API key must be stored securely as an environment variable on the backend server. It must never be exposed to the frontend client or committed to version control. (Source: Architecture Document)
*   **Input Validation:** All user-provided input, especially content used for quiz generation, must be properly sanitized on the backend to prevent potential injection attacks before being processed or sent to the LLM.
*   **Principle of Least Privilege:** The backend services for this epic should operate with the minimum required permissions (e.g., read-only access to the `Content` table when generating quizzes).

### Reliability/Availability

*   **LLM API Retry Mechanism:** The `quiz_generator` service must implement a retry mechanism (e.g., exponential backoff, 3 retries max) for transient LLM API failures (e.g., 5xx errors, timeouts). (Source: PRD NFR2)
*   **Graceful Degradation:** If the LLM service is completely unavailable after retries, the API must return a `503 Service Unavailable` status code. The frontend must handle this error gracefully by displaying a user-friendly message (e.g., "Sorry, we're having trouble generating your quiz right now. Please try again later.").
*   **Response Validation Failures:** If the LLM response fails validation (e.g., malformed JSON), the system must log the complete invalid response for debugging and return a `502 Bad Gateway` error to the client, indicating an issue with the upstream service.

### Observability

*   **Structured Logging:** All backend services for this epic must use structured (JSON-formatted) logging to facilitate easier parsing and analysis.
*   **Key Events to Log:** The following events must be logged with a minimum level of `INFO`:
    *   Quiz generation started (with `content_id`, `difficulty`).
    *   Quiz generation succeeded (with `quiz_id` and total duration).
    *   Quiz generation failed (with error details).
    *   Quiz submitted (with `quiz_id`).
    *   Adaptive follow-up quiz generated (with original `quiz_id`).
*   **Key Metrics to Track:** The following metrics should be exposed for monitoring:
    *   `quiz_generation_latency_seconds` (Histogram).
    *   `llm_api_requests_total` (Counter, with labels for `success` or `failure`).
    *   `llm_response_validation_failures_total` (Counter).

## Dependencies and Integrations

### Frontend (Next.js)

| Category | Dependency | Version |
| :--- | :--- | :--- |
| **Core** | `next` | `16.0.8` |
| | `react` | `19.2.1` |
| | `react-dom` | `19.2.1` |
| **Styling** | `tailwindcss` | `^3.3.3` |
| | `autoprefixer` | `^10.4.22` |
| | `postcss` | `^8.5.6` |
| **Testing** | `@playwright/test`| `^1.57.0` |
| | `@testing-library/react` | `^16.3.0`|
| | `jest` | `^30.2.0` |
| **Linting** | `eslint` | `^9` |

### Backend (FastAPI)

| Category | Dependency | Version |
| :--- | :--- | :--- |
| **Framework** | `fastapi` | `0.124.2` |
| | `uvicorn` | `0.38.0` |
| **Database** | `prisma` | `0.15.0` |
| | `psycopg2-binary` | `2.9.11` |
| **Data Validation**| `pydantic` | `2.12.5` |
| **PDF Parsing** | `pdfminer.six` | `20231228`|
| **HTTP Client** | `httpx` | `0.28.1` |
| **Testing** | `pytest` | `8.0.0` |
| | `pytest-asyncio` | `0.23.5` |

### Integration Points

*   **Internal:** The `nextjs-frontend` application integrates with the `fastapi-backend` application via a RESTful API.
*   **External:** The `fastapi-backend` integrates with an external Large Language Model (LLM) API (e.g., Google Gemini, OpenAI) for all AI-powered features, including quiz generation. This integration will be done via direct HTTP calls using the `httpx` library.

## Acceptance Criteria (Authoritative)

1.  Given valid content and a difficulty level ('easy', 'medium', 'hard'), when a quiz is requested, the system generates and returns a structured quiz with multiple-choice questions. (Covers FR9, FR10, FR11, FR12)
2.  Given a generated quiz, when it is displayed to the user, questions are presented one at a time. (Covers FR22)
3.  Given a question is displayed, when the user selects an option, their answer is recorded. (Covers FR13)
4.  Given a user has answered all questions and submits the quiz, the system assesses the answers and provides immediate feedback on which answers were correct and incorrect. (Covers FR14, FR15)
5.  Given a quiz has been assessed, a final summary score (e.g., "8/10") is displayed to the user. (Covers FR16)
6.  Given a user has completed a quiz with one or more incorrect answers, an option to "Practice weak spots" is presented.
7.  Given the user chooses to practice weak spots, a new quiz is generated containing new questions that target the topics of the previously incorrect answers. (Covers FR17)

## Traceability Mapping

| AC # | Spec Section(s) | Component(s) / API(s) | Test Idea |
| :--- | :--- | :--- | :--- |
| 1 | APIs: Generate a Quiz<br>Workflows: Initial Quiz Generation | `quiz_service`<br>`quiz_generator`<br>`POST /api/quiz` | **Integration Test:** Call `/api/quiz` with a valid `content_id` and each difficulty level. Assert that the response is a 200 OK and matches the `QuizData` schema. Mock the LLM call. |
| 2 | Detailed Design: `QuizView` | `QuizView` component | **Component Test:** Render the `QuizView` with mock quiz data. Assert that only one question is visible at a time. |
| 3 | Workflows: Quiz Assessment | `QuizView` component | **Component Test:** Simulate a user clicking an answer option and assert that the component's internal state is updated correctly. |
| 4 | APIs: Submit Quiz<br>Workflows: Quiz Assessment | `quiz_service`<br>`POST /api/quiz/{id}/submit` | **Integration Test:** Call `/api/quiz/{id}/submit` with a valid submission. Assert that the response is a 200 OK and the `QuizResult` shows correct/incorrect answers. |
| 5 | Workflows: Quiz Assessment | `QuizResults` component | **Component Test:** Render the `QuizResults` component with a mock `QuizResult` object and assert that the score is displayed correctly. |
| 6 | Detailed Design: `QuizResults` | `QuizResults` component | **Component Test:** Render `QuizResults` with a score < 100%. Assert that the "Practice weak spots" button is visible. |
| 7 | APIs: Generate Follow-up<br>Workflows: Adaptive Follow-up | `quiz_service`<br>`POST /api/quiz/follow-up` | **Integration Test:** Call `/api/quiz/follow-up` with a `QuizResult` showing incorrect answers. Assert that the `quiz_generator` is called with a prompt that targets the weak spots. Mock the LLM call. |

## Risks, Assumptions, Open Questions

*   **Risk (High):** The quality and consistency of LLM-generated quizzes may be low, leading to irrelevant questions or incorrect answers, which would create a poor user experience.
    *   **Mitigation:**
        1.  Develop a robust prompt engineering strategy during the prep sprint.
        2.  Implement a `quiz_validator` service to check the structural integrity of the LLM's response.
        3.  Create a "golden set" of test documents to benchmark the quality of LLM output.
*   **Risk (Medium):** The LLM may fail to return valid, parsable JSON, which would break the quiz generation flow.
    *   **Mitigation:**
        1.  Implement a retry mechanism for transient LLM API failures.
        2.  The `quiz_validator` service will catch malformed responses.
        3.  Log all invalid or malformed responses for debugging and prompt refinement.
*   **Assumption:** The LLM is capable of generating relevant questions at different difficulty levels based on the provided text.
    *   **Validation:** This will be the primary focus of the "Technical Spike: LLM Quiz Generation" prep sprint task.
*   **Assumption:** For the MVP, temporarily caching the correct answers on the backend between quiz generation and submission is a sufficient strategy to avoid database complexity.
    *   **Validation:** This is an accepted design choice for the MVP. If quizzes need to be persisted for longer (e.g., for user history), this will need to be revisited in a future epic.
*   **Question:** What is the optimal number of questions to generate for a quiz to be engaging but not overwhelming?
    *   **Next Step:** Start with a fixed number (e.g., 10 questions) for the MVP. This can be made configurable later based on user feedback.
*   **Question:** How do we define the "topics" of weak spots to send back to the LLM for the adaptive follow-up quiz?
    *   **Next Step:** For the MVP, the "topic" can be the text of the question that was answered incorrectly. The follow-up prompt will ask the LLM to generate a *new* question related to the same concept as the original incorrect question.

## Test Strategy Summary

*   **Unit Tests:**
    *   **Backend:** Use `pytest` to test individual functions in `quiz_service` (e.g., score calculation) and `quiz_generator` (e.g., prompt construction) in isolation.
    *   **Frontend:** Use `Jest` and `React Testing Library` to test the `QuizView` and `QuizResults` components, covering different states (loading, error, success) and user interactions.
*   **Integration Tests:**
    *   **Backend:** Use `pytest` and FastAPI's `TestClient` to test the full API flow for all quiz endpoints (`/api/quiz`, `/api/quiz/{id}/submit`, `/api/quiz/follow-up`). All external calls, especially to the LLM, will be mocked to ensure tests are fast and deterministic. These tests will cover edge cases like invalid content IDs, malformed submissions, and mocked LLM failures.
*   **End-to-End (E2E) Tests:**
    *   Use `Playwright` to create a test that simulates the full user journey:
        1.  Starts on the summary page and clicks "Generate Quiz".
        2.  Answers all questions (a mix of correct and incorrect).
        3.  Submits the quiz and verifies the results page is displayed correctly.
        4.  Clicks "Practice weak spots" and verifies a new, targeted quiz is loaded.
    *   All backend API responses will be mocked at the network level to ensure the frontend E2E tests are independent of the backend.

## Post-Review Follow-ups

-   [ ] [Low] From Story 3.1: Replace `print` statements with structured logging in `fastapi-backend/app/llm_integrations/quiz_generator.py:72` and `fastapi-backend/app/services/quiz_validator.py:22`.
-   Note: [Low] From Story 3.1: Confirm or implement explicit sanitization of user-provided content before it is passed to LLM prompts, as per `architecture.md`'s security approach. This ensures protection against potential prompt injection or unintended behavior from raw user input.
