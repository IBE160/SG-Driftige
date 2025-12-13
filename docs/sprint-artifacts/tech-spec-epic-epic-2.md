# Epic Technical Specification: Multi-level Summarization

Date: 2025-12-12
Author: Eline&Sindre
Epic ID: epic-2
Status: Draft

---

## Overview

This epic focuses on delivering the core value proposition of QuizZum: transforming user-provided content into intelligent, multi-level summaries. It builds directly on the foundational infrastructure established in Epic 1, which provided the content ingestion mechanism. This epic will introduce the first AI-powered feature, enabling users to generate and consume summaries at "easy," "medium," and "hard" difficulty levels. The primary goal is to provide a radically simple and intuitive interface for this process, ensuring a frictionless user experience.

## Objectives and Scope

**In Scope:**
*   Backend service to connect to an LLM provider and generate summaries.
*   Support for generating summaries at three distinct difficulty levels.
*   Frontend UI to display the generated summaries.
*   Frontend UI for users to select the desired summary difficulty, both before generation and to switch between levels after generation.
*   Graceful handling of loading states and potential LLM API errors.

**Out of Scope:**
*   Quiz generation (covered in Epic 3).
*   User accounts and progress tracking.
*   Advanced gamification or social features.
*   Persistent storage of the generated summaries (they will be generated on-demand).

## System Architecture Alignment

This epic aligns perfectly with the established system architecture. It will leverage the FastAPI backend to create a new service for LLM integration, as outlined in the `architecture.md`. The Next.js frontend will be expanded with new UI components for displaying summaries and selecting difficulty, communicating with the backend via the established RESTful API pattern. The non-functional requirements for performance and reliability (responsive feedback, async processing) will be critical and are supported by the choice of FastAPI and WebSockets.

## Detailed Design

### Services and Modules

*   **Frontend (Next.js - `nextjs-frontend/src`):**
    *   **`app/(summaries)/[contentId]/page.jsx`**: A new dynamic route to display the generated summaries for a given `contentId`.
    *   **`components/SummaryDisplay.jsx`**: A client component to display the summary text, handle loading/error states, and contain the difficulty-switching UI.
    *   **`components/DifficultyToggle.jsx`**: A UI component (likely tabs or segmented buttons) to allow users to switch between "Easy," "Medium," and "Hard" summaries.
    *   **`lib/api.js`**: This existing file will be updated to include a function for calling the new `/api/summarize` endpoint.

*   **Backend (FastAPI - `fastapi-backend/app`):**
    *   **`api/v1/summarize.py`**: A new FastAPI router to handle the `/api/summarize` endpoint.
    *   **`services/summarization_service.py`**: A new service containing the business logic for fetching content from the database, interacting with the LLM to generate summaries, and handling different difficulty levels.
    *   **`llm_integrations/summarizer.py`**: A new module dedicated to constructing prompts for the summarization task and handling the direct interaction with the chosen LLM provider's API.
    *   **`db/schemas.py`**: Will be updated with Pydantic schemas for the summarization request and response bodies.

### Data Models and Contracts

No new database models are required for this epic, as the generated summaries will be created on-demand and not stored persistently. The existing `Content` model will be read to retrieve the `rawText` for summarization.

*   **Pydantic Schemas (`schemas.py`):**
    *   `SummarizeRequest(BaseModel)`:
        *   `content_id: str`
        *   `difficulty: Literal["easy", "medium", "hard"]`
    *   `Summary(BaseModel)`:
        *   `summary_text: str`
    *   `SummarizeResponse(BaseModel)`:
        *   `status: str`
        *   `data: Summary`

### APIs and Interfaces

*   `POST /api/summarize`
    *   **Description:** Accepts a `content_id` and a `difficulty` level, retrieves the content, generates a summary using the LLM, and returns it.
    *   **Request Body (JSON):** `{"content_id": "string", "difficulty": "easy" | "medium" | "hard"}`
    *   **Response (Success 200 OK - JSON):** `{"status": "success", "data": {"summary_text": "string"}}`
    *   **Error (404 Not Found - JSON):** If `content_id` does not exist.
    *   **Error (500 Internal Server Error - JSON):** If the LLM API call fails or another backend error occurs.

### Workflows and Sequencing

1.  **User Triggers Summarization (Frontend):**
    *   After content is uploaded in Epic 1, the user is redirected to the summary page (e.g., `/(summaries)/<contentId>`).
    *   Alternatively, a "Summarize" button is presented on the input page after upload.
2.  **Initial Summary Generation:**
    *   The `SummaryDisplay.jsx` component on the summary page makes an initial API call to `/api/summarize` with the `contentId` from the URL and a default difficulty (e.g., "medium").
    *   The frontend displays a loading indicator.
3.  **Backend Processing:**
    *   The `/api/summarize` endpoint in `summarize.py` receives the request.
    *   The `summarization_service` is called, which retrieves the `rawText` for the given `content_id` from the PostgreSQL database via Prisma.
    *   The service passes the text and difficulty to the `llm_integrations/summarizer.py` module.
    *   The `summarizer` module constructs a specific prompt and makes a direct API call to the configured LLM.
    *   The LLM response (the summary text) is returned to the service.
4.  **Frontend Renders Summary:**
    *   The FastAPI endpoint returns the generated summary to the frontend.
    *   The `SummaryDisplay.jsx` component receives the data, hides the loading indicator, and displays the `summary_text`.
5.  **User Switches Difficulty:**
    *   The user clicks a different difficulty level in the `DifficultyToggle.jsx` component.
    *   A new API call is made to `/api/summarize` with the same `contentId` but the new `difficulty`.
    *   The process repeats from step 2, updating the `SummaryDisplay` with the new summary.

## Non-Functional Requirements

### Performance

*   **Latency:** The `/api/summarize` endpoint should respond as quickly as the underlying LLM allows. The frontend must display a loading indicator immediately and remain responsive during the entire process (NFR1).
*   **Responsiveness:** WebSockets will be used to provide real-time progress updates to the frontend, preventing the UI from freezing during long-running LLM calls.

### Security

*   **Data Handling:** The `content_id` will be used to retrieve data, preventing the direct exposure of raw text in API calls between the client and server after the initial upload.
*   **LLM API Keys:** All LLM API keys must be stored securely as environment variables on the backend and never exposed to the frontend (as per `architecture.md`).

### Reliability/Availability

*   **Error Handling:** The backend must handle potential failures from the LLM API (e.g., service unavailable, rate limiting, invalid response) gracefully, returning a meaningful 5xx error to the frontend. The frontend must, in turn, display a user-friendly error message with a "Retry" option (NFR2).
*   **LLM Integration:** The integration with the LLM provider must include a retry mechanism for transient network errors.

### Observability

*   **Logging:** The backend will implement structured (JSON-formatted) logging for all summarization requests. This includes logging the `content_id`, requested `difficulty`, and the latency of the LLM API call. Any errors from the LLM will be logged with high severity.
*   **Monitoring:** Basic monitoring will be set up for the `/api/summarize` endpoint to track response times and error rates.

## Dependencies and Integrations

*   **Frontend (Next.js):**
    *   This epic will build upon the existing Next.js, React, and Tailwind CSS foundation.
    *   No new major libraries are anticipated, but `axios` or `fetch` will be used for API calls.

*   **Backend (FastAPI):**
    *   This epic will introduce a dependency on a library for making HTTP requests to the LLM provider (e.g., `httpx` or `requests`).
    *   It will continue to use the existing `fastapi`, `uvicorn`, and `prisma` packages.

*   **External Services:**
    *   **LLM Provider:** A dependency on an external Large Language Model provider (e.g., Google Gemini, OpenAI GPT series) is introduced. The specific SDK or API endpoint will be defined in the implementation.
    *   **PostgreSQL Database:** Continues to use the existing database for retrieving content.

## Acceptance Criteria (Authoritative)

1.  Given the backend receives content and a difficulty level ('easy', 'medium', 'hard'), when I call the summarization service, then it returns a summary corresponding to that difficulty.
2.  Given the LLM API call fails, when I call the service, then a proper error is returned and the system handles it gracefully.
3.  The service seamlessly integrates with the chosen LLM provider.
4.  Given a summary is generated, when it is returned to the frontend, then the summary text is displayed in a designated output area.
5.  While the summary is being generated, a progress indicator (e.g., a spinner) is displayed to the user.
6.  Given the summary is displayed, when the content is long, then a scrollbar is available.
7.  Given the input screen, when I am about to generate a summary, then I can select 'easy', 'medium', or 'hard' difficulty.
8.  Given a difficulty is selected, when I click "Generate", then the selected difficulty is sent to the backend.
9.  Given a summary is displayed, when I select a different difficulty level, then a new summary for that level is generated and displayed without leaving the page.

## Traceability Mapping

This Epic-Tech-Spec directly covers Functional Requirements FR3, FR4, FR5, FR6, FR7, FR8, and FR21 from the PRD.

## Risks, Assumptions, Open Questions

*   **Risk (LLM Performance):** The quality and latency of the LLM's summarization capabilities are the biggest risks. Mitigation: Implement robust prompt engineering and a client-side loading/error handling strategy. A timeout and retry mechanism for LLM calls is essential.
*   **Risk (Cost):** LLM API calls can be expensive. Mitigation: For the MVP, usage will be limited. A caching strategy, as noted in the `architecture.md` review, should be considered to avoid re-generating summaries for the same content.
*   **Assumption:** The `rawText` stored in the database is of reasonable length and will not exceed the LLM's token limits for a single prompt.
*   **Question:** What is the desired behavior for extremely long documents that might exceed token limits? Should they be truncated, or should the user be notified? (Decision: For MVP, we will assume content fits. This will be addressed in a future epic if it becomes a problem).

## Test Strategy Summary

*   **Unit Tests:**
    *   **Backend:** Unit tests for `summarization_service.py` to ensure it correctly calls the LLM integration module. Mock the LLM calls to test the service logic in isolation.
    *   **Frontend:** Unit tests for the `SummaryDisplay.jsx` and `DifficultyToggle.jsx` components using `Jest` and `React Testing Library` to verify they render correctly and handle user interactions.
*   **Integration Tests:**
    *   **Backend:** An integration test for the `/api/summarize` endpoint using `pytest` and `httpx`. This test will use a valid `content_id` from a pre-populated test database and mock the external LLM API call to ensure the entire backend workflow functions correctly.
*   **End-to-End (E2E) Tests:**
    *   A `Playwright` test for the critical user journey: after uploading content, the user is redirected to the summary page, a summary is displayed, and the user can successfully switch between difficulty levels. This test will mock the backend's `/api/summarize` endpoint to provide predictable summary text and avoid actual LLM calls during E2E runs.

## Post-Review Follow-ups

*   [ ] [Low] Update `POST /api/summarize` endpoint to return responses conforming to the `{"status": "success", "data": { ... }}` envelope. (from Story 2.1)
*   [ ] [Low] Implement Python's `logging` module for error handling in `fastapi-backend/app/llm_integrations/summarizer.py` instead of `print()` statements. (from Story 2.1)
