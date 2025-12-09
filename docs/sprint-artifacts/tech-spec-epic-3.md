# Epic Technical Specification: Adaptive Quizzing

Date: 2025-12-09
Author: Eline&Sindre
Epic ID: 3
Status: Draft

---

## Overview

This document provides the technical specification for Epic 3: Adaptive Quizzing. The goal of this epic is to allow users to test their understanding and reinforce learning through adaptive quizzes. This builds on summarization to provide active learning and adaptive feedback, with an integral focus on a "playable learning experience."

## Objectives and Scope

**In Scope:**
- Generating quizzes based on provided content at "easy", "medium", and "hard" levels.
- Allowing users to answer quiz questions.
- Assessing user quiz answers and providing immediate feedback (correct/incorrect).
- Providing a summary score for completed quizzes.
- Generating adaptive follow-up quizzes to target user weak spots.
- Supporting an active and "playable" learning experience.

**Out of Scope:**
- User authentication and authorization.
- Gamification features beyond adaptive feedback.
- Detailed user progress tracking history (beyond current session).

## System Architecture Alignment

The implementation of this epic will align with the established architecture:
- The frontend will be a Single Page Application (SPA) built with Next.js and Chakra UI.
- The backend will be a FastAPI application responsible for quiz generation, assessment, and adaptive logic.
- Communication between frontend and backend will be via a RESTful API.
- Long-running quiz generation tasks will be handled asynchronously using Celery and Redis.

## Detailed Design

### Services and Modules

| Service/Module | Responsibility | Inputs | Outputs | Owner |
| --- | --- | --- | --- | --- |
| `QuizService` | Orchestrates quiz generation, assessment, and adaptation logic. | Content, difficulty, user answers | Quiz questions, feedback, adaptive quiz parameters | Backend Team |
| `LLMClient` | Communicates with the external LLM provider. | Prompt, content | LLM response | Backend Team |
| `QuizTask` | Celery task for asynchronous quiz generation/assessment. | Content, difficulty, user answers | Quiz data, assessment results | Backend Team |
| `QuizUI` | React component for displaying quizzes, handling user interaction, and showing results. | Quiz questions, user input, feedback | User answers, quiz requests | Frontend Team |

### Data Models and Contracts

**Quiz Model:**
- `id`: Unique identifier (UUID).
- `content_id`: Foreign key to Content.
- `difficulty`: Easy, Medium, or Hard.
- `questions`: A list of Question objects.
- `timestamp`: When the quiz was generated.

**Question Model (embedded in Quiz):**
- `id`: Unique identifier (UUID).
- `text`: The question text.
- `options`: A list of possible answers.
- `correct_answer`: The correct answer.
- `related_summary_segment`: Optional, links to a specific part of the summary.

### APIs and Interfaces

**`POST /api/quiz`**
- **Request:**
  ```json
  {
    "content_id": "uuid",
    "difficulty": "easy" | "medium" | "hard",
    "adaptive_context": { // Optional, for follow-up quizzes
      "previous_incorrect_questions": ["id1", "id2"]
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "quiz_id": "uuid",
    "questions": [
      {
        "id": "uuid",
        "text": "...",
        "options": ["A", "B", "C"],
        "correct_answer": "A"
      }
    ]
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

**`POST /api/quiz/submit`**
- **Request:**
  ```json
  {
    "quiz_id": "uuid",
    "answers": {
      "question_id_1": "user_answer_1",
      "question_id_2": "user_answer_2"
    }
  }
  ```
- **Response (Success):**
  ```json
  {
    "score": "X/Y",
    "results": {
      "question_id_1": {"correct": true, "feedback": "..."},
      "question_id_2": {"correct": false, "feedback": "..."}
    },
    "adaptive_suggestions": { // Optional, for next adaptive quiz
      "focus_areas": ["topic1", "topic2"],
      "next_difficulty": "medium"
    }
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

1.  User generates summaries (from Epic 2).
2.  User initiates a quiz from a summary, selecting an initial difficulty.
3.  Frontend sends a `POST` request to `/api/quiz` with `content_id` and `difficulty`.
4.  Backend initiates a Celery task for quiz generation and returns a `202 Accepted`.
5.  Celery worker communicates with the LLM to generate quiz questions and answers.
6.  Quiz is stored in the database.
7.  Frontend polls for the quiz or receives it via websocket.
8.  Quiz questions are displayed to the user one at a time.
9.  User answers questions and clicks "Submit Quiz".
10. Frontend sends `POST /api/quiz/submit` with `quiz_id` and user answers.
11. Backend assesses answers, provides feedback, calculates score, and identifies weak spots.
12. Results and adaptive suggestions are returned to the frontend.
13. Frontend displays results. If score is low, suggests a follow-up quiz targeting weak spots.

## Non-Functional Requirements

### Performance

- Quiz generation should not block the UI. The user should be able to navigate while quizzes are being generated.
- API response times for initiating quiz generation/submission should be under 200ms.
- Time to display quiz results and adaptive suggestions should be under 500ms.

### Security

- All communication between frontend and backend will be over HTTPS.
- LLM API keys will be stored securely on the backend.
- Input data (user answers) will be validated.

### Reliability/Availability

- Quiz generation service should handle LLM API failures gracefully with retries.
- Quiz assessment logic must be robust to avoid incorrect scoring.

### Observability

- All quiz requests, user answers, and assessment results will be logged with structured data.
- Metrics will be collected on quiz generation time, submission time, and scoring accuracy.

## Dependencies and Integrations

- **External:**
  - LLM Provider (e.g., Gemini)
- **Internal:**
  - `Content` service (for retrieving content to generate quizzes)
  - `SummarizationService` (potential integration for context)
  - `Database` service (for storing quizzes and user answers)
  - `Message Broker` (Redis for Celery)

## Acceptance Criteria (Authoritative)

1.  The system can generate quizzes based on provided content.
2.  The system can generate "easy" level quizzes.
3.  The system can generate "medium" level quizzes.
4.  The system can generate "hard" level quizzes.
5.  Users can answer quiz questions.
6.  The system can assess user quiz answers.
7.  The system can provide immediate feedback on quiz answers (correct/incorrect).
8.  The system can provide a summary score for completed quizzes.
9.  The system can generate adaptive follow-up quizzes to target user weak spots.
10. The system supports an active and "playable" learning experience.

## Traceability Mapping

| AC ID | Spec Section(s) | Component(s)/API(s) | Test Idea |
| --- | --- | --- | --- |
| AC 3.1 | Detailed Design | `QuizService`, `LLMClient`, `/api/quiz` | Unit test for quiz generation. |
| AC 3.5 | Detailed Design | `QuizUI`, `/api/quiz/submit` | UI test for answering questions. |
| AC 3.6 | Detailed Design | `QuizService`, `/api/quiz/submit` | Unit test for quiz assessment. |
| AC 3.9 | Detailed Design | `QuizService`, `/api/quiz` (with adaptive context) | Integration test for adaptive quiz generation. |

## Risks, Assumptions, Open Questions

- **Risk:** LLM may generate inaccurate or irrelevant quiz questions. Mitigation: Implement validation layer for LLM output.
- **Assumption:** The LLM can effectively identify "weak spots" for adaptive quizzing.
- **Question:** How to prevent "gaming" the adaptive quiz system (e.g., users intentionally answering incorrectly to get easier questions)?

## Test Strategy Summary

- **Unit Tests:** Test individual components like `QuizService` methods, ensuring correct question generation and assessment logic.
- **Integration Tests:** Verify the interaction between the frontend, API endpoints (`/api/quiz`, `/api/quiz/submit`), and the database.
- **E2E Tests:** Simulate full user journeys for quiz taking and adaptive follow-ups to ensure seamless experience.
- **LLM Output Validation Tests:** Specifically test the quality and relevance of AI-generated questions and adaptive logic.
