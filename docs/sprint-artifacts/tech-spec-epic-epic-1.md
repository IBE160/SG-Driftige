# Epic Technical Specification: Foundation & Core Content Input

Date: 2025-12-10
Author: Eline&Sindre
Epic ID: epic-1
Status: Draft

---

## Overview

This epic focuses on building the foundational infrastructure and core content input mechanisms for QuizZum. It establishes the basic web application structure, enables users to provide lecture notes via text input or PDF upload, and sets up the backend endpoints to receive and process this content. It covers the initial setup for a Next.js frontend and a FastAPI backend, ensuring the application is accessible and responsive across various browsers.

## Objectives and Scope

**In Scope:**
*   Project repository and initial web application structure setup (Next.js, FastAPI, PostgreSQL via Docker).
*   User interface for text input.
*   User interface for PDF upload.
*   Backend API endpoints for receiving text and PDF content.
*   Basic browser compatibility and responsive design for input screens.
**Out of Scope:**
*   Persistent storage of raw PDF files after text extraction.
*   User authentication/authorization.
*   Summarization or quizzing logic (covered in other epics).
*   Advanced analytics or user tracking.

## System Architecture Alignment

This epic directly aligns with the established architecture by initiating the Next.js frontend and FastAPI backend, using PostgreSQL with Prisma for data storage (for content metadata), and leveraging Docker for a consistent local development environment. It implements the initial RESTful API endpoints for content input and lays the groundwork for the defined project structure and module separation. The ephemeral PDF storage decision is also directly implemented here.

## Detailed Design

### Services and Modules

*   **Frontend (Next.js - `nextjs-frontend/src`):**
    *   **`app/(input)/page.jsx`**: Main page component for text/PDF input UI.
    *   **`components/InputForm.jsx`**: Reusable React component for text area and PDF upload button.
    *   **`lib/api.js`**: API client for calling the FastAPI backend.
*   **Backend (FastAPI - `fastapi-backend/app`):**
    *   **`api/v1/upload.py`**: FastAPI router handling `/api/upload/text` and `/api/upload/pdf` endpoints.
    *   **`services/content_service.py`**: Business logic for extracting text from PDF, storing content metadata in the database.
    *   **`llm_integrations/pdf_parser.py`**: Utility module for PDF text extraction.

### Data Models and Contracts

*   **Content Model (PostgreSQL via Prisma):**
    *   `id`: String (UUID), Primary Key, auto-generated.
    *   `rawText`: String (stores the extracted text from notes/PDFs).
    *   `uploadedAt`: DateTime, auto-generated timestamp.
    *   `fileName`: String (optional, stores original PDF filename if applicable).

### APIs and Interfaces

*   `POST /api/upload/text`
    *   **Description:** Accepts plain text notes for processing.
    *   **Request Body (JSON):** `{"text_content": "string"}`
    *   **Response (Success 201 Created - JSON):** `{"status": "success", "data": {"content_id": "string", "message": "Content processed"}}`
    *   **Error (400 Bad Request - JSON):** `{"status": "error", "message": "Invalid input", "code": "INVALID_INPUT"}`
*   `POST /api/upload/pdf`
    *   **Description:** Accepts a PDF file for text extraction and processing.
    *   **Request Body (Multipart Form Data):** `File` (containing the PDF).
    *   **Response (Success 201 Created - JSON):** `{"status": "success", "data": {"content_id": "string", "message": "PDF processed"}}`
    *   **Error (400 Bad Request - JSON):** `{"status": "error", "message": "Invalid file type/content", "code": "INVALID_FILE"}`
    *   **Error (413 Payload Too Large - JSON):** `{"status": "error", "message": "File too large", "code": "FILE_TOO_LARGE"}`

### Workflows and Sequencing

1.  **User Interaction (Frontend):**
    *   User navigates to the input page (`/app/(input)`).
    *   User either types/pastes text into the `InputForm` text area OR clicks "Upload PDF" and selects a file.
    *   User clicks "Generate" (or similar) button on `InputForm`.
2.  **Frontend to Backend Communication:**
    *   Frontend (`nextjs-frontend/src/lib/api.js`) sends an asynchronous `POST` request to the FastAPI Backend:
        *   For text: `POST /api/upload/text` with JSON body.
        *   For PDF: `POST /api/upload/pdf` with Multipart Form Data.
    *   Frontend displays a loading indicator to manage user expectations.
3.  **Backend Processing (FastAPI):**
    *   The respective FastAPI endpoint (`fastapi-backend/app/api/v1/upload.py`) receives the request.
    *   If a PDF file is uploaded, the `content_service.py` utilizes `pdf_parser.py` to extract the raw text content.
    *   `content_service.py` then stores the extracted `rawText` and other content metadata (e.g., `uploadedAt`, `fileName`) into the PostgreSQL database via Prisma ORM.
    *   The backend responds to the frontend with a `content_id` (UUID) in a standardized success envelope.
4.  **Frontend Update:**
    *   Frontend receives the success response, hides the loading indicator, and proceeds to the next step in the user's journey (e.g., redirect to the summary generation screen, passing the `content_id`).
    *   If an error is returned (e.g., 400, 413), the frontend displays a user-friendly error message based on the API's error format.

## Non-Functional Requirements

### Performance

*   **Latency:** API responses for `/api/upload/text` and `/api/upload/pdf` should return within 500ms under normal load (excluding PDF parsing time, which will be handled asynchronously with loading indicators on frontend).
*   **Throughput:** Backend should handle at least 10 concurrent content upload requests.
*   **Responsiveness:** Frontend UI should remain responsive with loading indicators during backend processing (NFR1 from PRD, implemented via FastAPI async/WebSockets).

### Security

*   **Input Validation:** Strict validation of all incoming text and PDF content on the FastAPI backend to prevent injection attacks and malformed data (NFR3 from PRD, "General security best practices").
*   **Data Handling:** User-uploaded content (raw text) will be stored in PostgreSQL. LLM API keys will be securely stored as environment variables on the backend, never exposed to the frontend (Security Architecture in `architecture.md`).
*   **Access Control:** No authentication/authorization is in scope for MVP of this epic.

### Reliability/Availability

*   **Error Handling:** Backend will return standardized JSON error responses with appropriate HTTP status codes (4xx for client errors, 5xx for server errors). Frontend will use React Error Boundaries and display user-friendly messages.
*   **PDF Parsing Robustness:** The PDF parser should gracefully handle various PDF structures and potential corruption, providing clear error messages for failures.
*   **System Stability:** The Dockerized environment ensures consistent setup and reduces configuration drift.

### Observability

*   **Logging:** Structured (JSON-formatted) logs on the FastAPI backend for all content upload and processing events, including successful operations and errors.
*   **Monitoring:** Basic monitoring of API endpoint response times and error rates on the backend.
*   **Frontend Errors:** Frontend console logs errors during development. Placeholder for external logging service in production.

## Dependencies and Integrations

*   **Frontend (Next.js):**
    *   Next.js (framework)
    *   React (UI library)
    *   Tailwind CSS (styling)
    *   Headless UI (accessible components)
    *   `axios` or `fetch` API (for backend communication)
*   **Backend (FastAPI):**
    *   FastAPI (web framework)
    *   Uvicorn (ASGI server)
    *   Prisma (ORM for PostgreSQL)
    *   `python-dotenv` (for environment variables)
    *   `python-multipart` (for file uploads)
    *   `pdfminer.six` (for PDF text extraction)
    *   `httpx` or `requests` (for external LLM API calls)
*   **Database:**
    *   PostgreSQL (data persistence)
*   **Development/Other:**
    *   Node.js (for Next.js tooling)
    *   Python (for FastAPI development)
    *   Docker (for local development environment)
    *   Git (version control)

## Acceptance Criteria (Authoritative)

*   **Story 1.1: (MVP) Project Setup & Initial Web App Structure**
    1.  Given a new project, when I initialize the project, then a git repository is created and configured.
    2.  Given a new project, when I set up the basic web application, then a Single Page Application (SPA) structure is in place (Next.js, React).
    3.  Given the initial setup, when I run the application, then a basic empty web page is displayed in the browser.
*   **Story 1.2: (MVP) Text Input Interface**
    1.  Given the application is loaded, when I navigate to the input screen, then a prominent and usable text area is displayed.
    2.  Given the text area is displayed, when I type or paste text into it, then the text is visible and editable.
    3.  Given text is entered, when I click "Generate", then the text content is prepared for processing.
*   **Story 1.3: (MVP) PDF Upload Interface**
    1.  Given the application is loaded, when I navigate to the input screen, then a clearly labeled "Upload PDF" button or drag-and-drop zone is visible.
    2.  Given the upload component is visible, when I select a PDF file, then the file name is displayed.
    3.  Given a PDF file is uploaded, when I click "Generate", then the PDF content is prepared for processing.
*   **Story 1.4: (MVP) Core Backend Setup for Content Reception**
    1.  Given the backend server is running, when a `POST` request with text content is sent to `/api/upload/text`, then the backend successfully receives and acknowledges the text.
    2.  Given the backend server is running, when a `POST` request with a PDF file is sent to `/api/upload/pdf`, then the backend successfully receives and extracts text from the PDF.
    3.  Given the backend is set up, when the frontend sends content, then appropriate HTTP responses (e.g., 201 Created) are returned along with a `content_id`.
    4.  The backend endpoints incorporate general security best practices (e.g., input sanitization).
    5.  The backend architecture is designed with future scalability in mind.
*   **Story 1.5: (MVP) Basic Browser Compatibility & Responsiveness**
    1.  Given QuizZum is accessed via the latest stable versions of Chrome, Edge, Firefox, Brave, and Opera on desktop, when I interact with the application, then all UI elements function as expected.
    2.  Given QuizZum is accessed on a mobile device, when I interact with the application, then the UI layout adjusts appropriately and remains usable.

## Traceability Mapping

This Epic-Tech-Spec directly covers Functional Requirements FR1, FR2, FR18, FR19, FR20 from the PRD.

## Risks, Assumptions, Open Questions

*   **Risks:**
    *   R-001 (PERF): Responsive feedback during AI processing (Score 9 - BLOCK) - Mitigation: Robust async/WebSockets, frontend loading states.
    *   R-002 (OPS): LLM API reliability (retries, graceful handling) (Score 9 - BLOCK) - Mitigation: Implement retry mechanisms, circuit breakers, clear error reporting.
    *   R-003 (SEC): General security (input validation, secrets) (Score 6 - MITIGATE) - Mitigation: Strict input validation on backend, secure API key storage.
    *   R-004 (PERF): Scalability (handling increasing users) (Score 2 - DOCUMENT) - Mitigation: Architecture designed for horizontal scaling.
    *   PDF Parsing Accuracy: Risk of inaccurate text extraction from complex PDF layouts. Mitigation: Utilize robust PDF parsing library (`pdfminer.six`), implement error handling for parsing failures, consider user feedback mechanism for corrections.
*   **Assumptions:**
    *   User provides clean, readable text/PDF content.
    *   LLM APIs will be accessible for future integration.
    *   Basic browser compatibility will be achieved with standard Next.js/Tailwind setup.
*   **Open Questions:**
    *   What is the maximum expected size for uploaded PDF files? (Impacts backend resource allocation, file upload limits).
    *   Are there any specific PDF encryption/security features to consider?

## Test Strategy Summary

*   **Unit Tests:** For core FastAPI service logic (e.g., `content_service.py`, `pdf_parser.py`) using `pytest`. For React components (`InputForm.jsx`) and hooks using `Jest` and `React Testing Library`.
*   **Integration Tests:** For FastAPI endpoints (`/api/upload/text`, `/api/upload/pdf`) using `pytest` with FastAPI's `TestClient`.
*   **End-to-End (E2E) Tests:** For the critical user journey of successfully uploading content (text or PDF) and receiving a `content_id` using `Playwright` or `Cypress`.

---

## Validation Report

**Document:** `docs/sprint-artifacts/tech-spec-epic-epic-1.md`
**Checklist:** `.bmad/bmm/workflows/4-implementation/epic-tech-context/checklist.md`
**Date:** Wednesday, December 10, 2025

### Overall Assessment

**✅ PASS: Epic Technical Specification for Epic 1 is complete and ready.**

### Critical Issues Found: N/A

### Recommended Actions Before Implementation: N/A

---

## Post-Review Follow-ups

**From Story 1.4: Core Backend Setup for Content Reception**

*   **Code Changes Required:**
    *   [High] Re-implement content metadata storage using Prisma ORM and PostgreSQL to fulfill AC3 and the architectural mandate. This requires resolving Docker build issues related to Prisma client generation. (files: `fastapi-backend/app/services/content_service.py`, `fastapi-backend/app/db/prisma_client.py`, `fastapi-backend/app/db/models.py`)
    *   [Medium] Verify and ensure `pdfminer.six` is fully integrated for PDF text extraction, replacing any placeholder implementation as specified in Task 2. (file: `fastapi-backend/app/llm_integrations/pdf_parser.py`)
    *   [High] Update integration tests in `fastapi-backend/tests/api/v1/test_upload.py` to validate the correct interaction with Prisma ORM and PostgreSQL for content metadata persistence, once the Prisma integration is restored. (file: `fastapi-backend/tests/api/v1/test_upload.py`)
    *   [Low] Review `fastapi-backend/app/api/v1/upload.py` and `fastapi-backend/app/db/schemas.py` to ensure input validation and sanitization are sufficiently comprehensive to meet "strict input validation" security best practices. (files: `fastapi-backend/app/api/v1/upload.py`, `fastapi-backend/app/db/schemas.py`)

*   **Advisory Notes:**
    *   Note: The `architecture.md` document should be updated to include specific version numbers for all technologies and a defined caching strategy to address existing critical findings. This is a cross-story architectural improvement.