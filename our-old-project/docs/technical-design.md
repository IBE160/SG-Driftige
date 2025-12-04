# Technical Design: Multi-level Summary Tool MVP

This document outlines the technical design for the MVP, focusing on the backend architecture, API specifications, and integration with the Large Language Model (LLM).

## 1. API Endpoint Specification

A single RESTful API endpoint will be created to handle the summarization request. This approach is simple and sufficient for the MVP's requirements.

### `POST /api/summarize`

This endpoint receives the raw text from the user and returns all three generated summary levels.

**Request Body:**
```json
{
  "text": "The full text of the lecture notes to be summarized..."
}
```
*(Note: The `level` is not needed in the request, as the backend will generate all three levels simultaneously for a better user experience, allowing instant switching in the UI).*

**Success Response (`200 OK`):**
```json
{
  "summaries": {
    "easy": "The generated easy-to-understand summary...",
    "medium": "The generated detailed summary for undergraduates...",
    "hard": "The generated comprehensive, expert-level summary..."
  }
}
```

**Error Response (e.g., `400 Bad Request`, `500 Internal Server Error`):**
```json
{
  "error": "A descriptive error message explaining what went wrong."
}
```

---

## 2. Database Schema (Post-MVP Consideration)

For the MVP, no database is required as user data is not being stored. However, for future features like user accounts and saved history, the following PostgreSQL schema is proposed for consideration.

### `users` table
*   `id` (SERIAL PRIMARY KEY)
*   `email` (VARCHAR(255), UNIQUE, NOT NULL)
*   `password_hash` (VARCHAR(255), NOT NULL)
*   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

### `summaries` table
*   `id` (SERIAL PRIMARY KEY)
*   `user_id` (INTEGER, FOREIGN KEY to `users.id` ON DELETE CASCADE)
*   `source_text` (TEXT)
*   `easy_summary` (TEXT)
*   `medium_summary` (TEXT)
*   `hard_summary` (TEXT)
*   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW())

---

## 3. LLM Integration Strategy

The backend service will be the sole point of communication with the external LLM provider (e.g., Google Gemini API).

1.  **Provider Selection:** A specific LLM will be chosen after the benchmarking process outlined in the Project Brief. The integration will be designed to be modular (e.g., placed in its own service/module) to allow for easier swapping of providers in the future.
2.  **API Key Management:** The LLM API key will be stored securely as an environment variable on the backend server and will **never** be exposed to the frontend client.
3.  **Prompt Engineering & Execution:** For each request to `/api/summarize`, the backend will make **three separate, parallel calls** to the LLM API—one for each difficulty level. This ensures all summaries are available when the response is sent to the client, enabling instant switching. The prompts will be carefully engineered:
    *   **Prompt for "Easy" Summary:** `Summarize the following text for a high school student. Focus on the main ideas and use simple, clear language: [text]`
    *   **Prompt for "Medium" Summary:** `Provide a detailed summary of the following text suitable for a college undergraduate. Cover the key arguments, evidence, and structure: [text]`
    *   **Prompt for "Hard" Summary:** `Create a comprehensive, expert-level summary of the following text. Include nuances, key terminology, and any implicit arguments or connections: [text]`
4.  **Error Handling:** The backend will implement robust error handling for LLM API calls, including retries for transient network issues and clear error messages for failures (e.g., API errors, content moderation blocks).

---

## 4. Backend Logic / Workflow

The backend will follow this sequence upon receiving a request to `/api/summarize`:

1.  **Request Validation:** Validate the incoming request body to ensure it contains a non-empty `text` field. If not, return a `400 Bad Request` error.
2.  **Parallel LLM Calls:** Asynchronously initiate three calls to the chosen LLM API service (one for each difficulty level) using the engineered prompts.
3.  **Await Responses:** Wait for all three API calls to complete.
4.  **Aggregate Summaries:** Combine the three generated summaries into a single `summaries` object.
5.  **Send Response:** Return the `summaries` object to the frontend client with a `200 OK` status.
6.  **Handle Failures:** If any of the LLM calls fail, the entire request will fail, and a `500 Internal Server Error` will be returned with a generic error message to the user (e.g., "Failed to generate summary."). Detailed error information will be logged on the backend for debugging purposes. For the MVP, failing the entire request is the simplest and most predictable behavior.
