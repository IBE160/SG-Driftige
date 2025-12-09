# Epic Technical Specification: Multi-level Summarization

Date: 2025-12-09
Author: Eline&Sindre
Epic ID: 2
Status: Draft

---

## Overview

This document provides the technical specification for Epic 2: Multi-level Summarization. The goal of this epic is to enable users to generate and consume multi-level summaries of their content. This is a core feature of QuizZum, delivering on the value proposition of intelligent summarization.

## Objectives and Scope

**In Scope:**
- Generating "easy", "medium", and "hard" level summaries from provided content.
- Allowing users to select the desired difficulty level for summaries.
- Allowing users to switch between different difficulty levels of generated summaries seamlessly.
- Structuring content for maximum readability (bullet points, headings, sections).
- Providing a radically simple and intuitive user interface for the summarization feature.

**Out of Scope:**
- User authentication and authorization.
- Gamification features.
- Progress tracking.

## System Architecture Alignment

The implementation of this epic will align with the established architecture:
- The frontend will be a Single Page Application (SPA) built with Next.js and Chakra UI.
- The backend will be a FastAPI application responsible for the summarization logic.
- Communication between frontend and backend will be via a RESTful API.
- Long-running summarization tasks will be handled asynchronously using Celery and Redis.

## Detailed Design

### Services and Modules

| Service/Module | Responsibility | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| `SummarizationService` | Orchestrates the summarization process. | Raw text, difficulty level | Summary text | Backend Team |
| `LLMClient` | Communicates with the external LLM provider. | Prompt, content | LLM response | Backend Team |
| `SummarizationTask` | Celery task for asynchronous summarization. | Raw text, difficulty level | Summary text | Backend Team |
| `SummarizationUI` | React component for displaying summaries and handling user interaction. | Summaries, difficulty levels | User selections | Frontend Team |

### Data Models and Contracts

**Summary Model:**
- `id`: Unique identifier (UUID).
- `content_id`: Foreign key to the `Content` model.
- `difficulty`: Enum/string ('easy', 'medium', 'hard').
- `summary_text`: The generated summary text for a specific difficulty.
- `version`: Tracks if a summary has been adaptively refined.
- `timestamp`: When the summary was generated.

### APIs and Interfaces

**`POST /api/summarize`**
- **Request:**
  ```json
  {
    "content_id": "uuid",
    "difficulty": "easy" | "medium" | "hard"
  }
  ```
- **Response (Success):**
  ```json
  {
    "summary_id": "uuid",
    "summary_text": "..."
  }
  ```
- **Response (Error):**
  ```json
  {
    "error": {
      "message": "...",
      "code": "..."
    }
  }
  ```

### Workflows and Sequencing

1.  User uploads content (text or PDF) via the frontend.
2.  Frontend sends content to the backend (`/api/upload/text` or `/api/upload/pdf`).
3.  Backend stores the content and returns a `content_id`.
4.  User selects a difficulty level and requests a summary.
5.  Frontend sends a `POST` request to `/api/summarize` with the `content_id` and `difficulty`.
6.  Backend initiates a Celery task for summarization and returns a `202 Accepted` response.
7.  The Celery worker communicates with the LLM to generate the summary.
8.  The summary is stored in the database.
9.  Frontend polls for the summary or receives it via a websocket connection.
10. The summary is displayed to the user.

## Non-Functional Requirements

### Performance

- The summarization process should not block the UI. The user should be able to continue using the application while summaries are being generated.
- API response times for initiating summarization should be under 200ms.
- The time to display a summary after it has been generated should be under 500ms.

### Security

- All communication between the frontend and backend will be over HTTPS.
- LLM API keys will be stored securely on the backend and not exposed to the frontend.
- Input data will be validated to prevent injection attacks.

### Reliability/Availability

- The summarization service should be designed to handle intermittent LLM API failures gracefully, with a retry mechanism.
- The system should be able to handle a moderate number of concurrent users without significant degradation in performance.

### Observability

- All summarization requests and responses will be logged with structured data.
- Metrics will be collected on the number of summarization requests, the time taken to generate summaries, and the error rate.
- Tracing will be used to monitor the flow of requests through the system.

## Dependencies and Integrations

- **External:**
  - LLM Provider (e.g., Gemini)
- **Internal:**
  - `Content` service (for retrieving content to be summarized)
  - `Database` service (for storing summaries)
  - `Message Broker` (Redis for Celery)

## Acceptance Criteria (Authoritative)

1.  The system can generate "easy" level summaries from provided content.
2.  The system can generate "medium" level summaries from provided content.
3.  The system can generate "hard" level summaries from provided content.
4.  Users can select the desired difficulty level for summaries.
5.  Users can switch between different difficulty levels of generated summaries seamlessly.
6.  Content (summaries) is structured for maximum readability (bullet points, headings, sections).
7.  The system provides a radically simple and intuitive user interface for the summarization feature.

## Traceability Mapping

| AC ID | Spec Section(s) | Component(s)/API(s) | Test Idea |
| --- | --- | --- | --- |
| AC 2.1 | Detailed Design | `SummarizationService`, `LLMClient`, `/api/summarize` | Unit test for easy summary generation. |
| AC 2.2 | Detailed Design | `SummarizationService`, `LLMClient`, `/api/summarize` | Unit test for medium summary generation. |
| AC 2.3 | Detailed Design | `SummarizationService`, `LLMClient`, `/api/summarize` | Unit test for hard summary generation. |
| AC 2.4 | Detailed Design | `SummarizationUI` | UI test for difficulty selection. |
| AC 2.5 | Detailed Design | `SummarizationUI` | UI test for switching between difficulties. |
| AC 2.6 | Detailed Design | `SummarizationUI` | UI test to verify summary formatting. |
| AC 2.7 | Detailed Design | `SummarizationUI` | E2E test of the entire summarization flow. |

## Risks, Assumptions, Open Questions

- **Risk:** The quality of the summaries generated by the LLM may not be sufficient. Mitigation: Experiment with different prompts and LLM models.
- **Assumption:** The LLM provider's API will be reliable and performant.
- **Question:** What is the best way to handle very long documents that may exceed the LLM's token limit?

## Test Strategy Summary

- **Unit Tests:** Test individual functions and modules in isolation, such as the `SummarizationService` and `LLMClient`.
- **Integration Tests:** Test the interaction between different components, such as the API endpoints and the database.
- **E2E Tests:** Test the entire summarization flow from the user's perspective, using a framework like Cypress or Playwright.
- **Manual Testing:** Manually test the summarization feature to ensure the quality of the generated summaries and the overall user experience.
