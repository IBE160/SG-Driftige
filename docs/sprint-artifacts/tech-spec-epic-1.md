# Epic Technical Specification: Foundation & Core Content Input

Date: 2025-12-09
Author: Eline&Sindre
Epic ID: 1
Status: Draft

---

## Overview

This Epic focuses on establishing the foundational infrastructure for QuizZum, an AI-powered learning tool. Its primary goal is to enable users to provide content (text or PDF) for processing, setting up the basic web application structure and backend services necessary for all subsequent functionalities like multi-level summarization and adaptive quizzing.

## Objectives and Scope

**Objectives:**
- Establish a functional Single Page Application (SPA) as the base.
- Implement interfaces for user text input and PDF document uploads.
- Set up core backend endpoints to receive and process these inputs.
- Ensure basic browser compatibility and responsiveness.

**In Scope (based on Epic 1 FRs):**
- FR1: Users can input text notes.
- FR2: Users can upload PDF documents.
- FR18: Application runs as a Single Page Application (SPA).
- FR19: Application functions on specified browsers.
- FR20: Application is fully responsive.
- Basic project setup and repository configuration.
- Initial frontend (SPA) scaffolding (e.g., using React/Next.js).
- Basic server setup for hosting the frontend and receiving content.

**Out of Scope (for this Epic):**
- AI processing of content (summarization, quizzing).
- User authentication and authorization.
- Persistent storage of raw user content beyond temporary processing.
- Advanced UI/UX features beyond basic input/display.

## System Architecture Alignment

This Epic directly aligns with the foundational architectural decisions for QuizZum. It establishes the **Next.js (React/JavaScript) frontend** with its App Router, and the **FastAPI (Python) backend** responsible for API endpoints (`/api/upload/*`) and PDF processing (`backend/app/core/pdf_parser.py`). It also leverages the shared `docker-compose.yml` for local development setup as per architectural guidelines. The focus is on setting up the core web application structure and content reception mechanisms before deeper AI integrations.

## Detailed Design

### Services and Modules

-   **Frontend:**
    -   `frontend/src/app/input-screen/`: Contains UI components for text input and PDF upload.
    -   `frontend/src/components/`: Reusable UI components (e.g., input fields, buttons).
    -   `frontend/src/lib/`: Utility functions and API clients for interacting with the backend.
-   **Backend:**
    -   `backend/app/api/upload/`: FastAPI endpoints for handling text and PDF uploads.
    -   `backend/app/core/pdf_parser.py`: Module responsible for extracting text from PDF files.
    -   `backend/app/main.py`: Main FastAPI application entry point.

### Data Models and Contracts

-   **Backend Data Model (PostgreSQL):**
    -   **Content:**
        -   `id` (UUID): Primary key.
        -   `raw_text` (TEXT): Raw text extracted from user input.
        -   `timestamp` (TIMESTAMP): Creation timestamp.
-   **API Contracts:**
    -   Standard JSON response format for success (`{ "data": { ... } }`) and errors (`{ "error": { "message": "...", "code": "...", "details": "..." } }`).
    -   ISO 8601 format for all date/time values.

### APIs and Interfaces

-   `POST /api/upload/text`:
    -   **Request:** `application/json` with `{"text": "Your notes here"}`.
    -   **Response:** `200 OK` on success, with `{"data": {"message": "Text uploaded successfully"}}`. Error responses follow standard format.
-   `POST /api/upload/pdf`:
    -   **Request:** `multipart/form-data` with the PDF file.
    -   **Response:** `200 OK` on success, with `{"data": {"message": "PDF uploaded successfully"}}`. Error responses follow standard format.

### Workflows and Sequencing

1.  **User Action (Frontend):** User types/pastes text or uploads a PDF via the UI.
2.  **Frontend Processing:**
    -   Text input: Captured directly.
    -   PDF upload: File selected by user.
3.  **Frontend to Backend Communication:**
    -   Text input: Frontend sends `POST` request to `/api/upload/text` with text content.
    -   PDF upload: Frontend sends `POST` request to `/api/upload/pdf` with the PDF file.
4.  **Backend Reception (FastAPI):**
    -   Receives `POST` request.
    -   For PDF upload, `pdf_parser.py` extracts text from the PDF.
    -   Temporarily stores or processes the extracted text.
5.  **Backend Acknowledgment:** Backend sends `200 OK` response to frontend.
6.  **User Feedback (Frontend):** Frontend displays success message or error to the user.

# Epic Technical Specification: Foundation & Core Content Input

Date: 2025-12-09
Author: Eline&Sindre
Epic ID: 1
Status: Draft

---

## Overview

This Epic focuses on establishing the foundational infrastructure for QuizZum, an AI-powered learning tool. Its primary goal is to enable users to provide content (text or PDF) for processing, setting up the basic web application structure and backend services necessary for all subsequent functionalities like multi-level summarization and adaptive quizzing.

## Objectives and Scope

**Objectives:**
- Establish a functional Single Page Application (SPA) as the base.
- Implement interfaces for user text input and PDF document uploads.
- Set up core backend endpoints to receive and process these inputs.
- Ensure basic browser compatibility and responsiveness.

**In Scope (based on Epic 1 FRs):**
- FR1: Users can input text notes.
- FR2: Users can upload PDF documents.
- FR18: Application runs as a Single Page Application (SPA).
- FR19: Application functions on specified browsers.
- FR20: Application is fully responsive.
- Basic project setup and repository configuration.
- Initial frontend (SPA) scaffolding (e.g., using React/Next.js).
- Basic server setup for hosting the frontend and receiving content.

**Out of Scope (for this Epic):**
- AI processing of content (summarization, quizzing).
- User authentication and authorization.
- Persistent storage of raw user content beyond temporary processing.
- Advanced UI/UX features beyond basic input/display.

## System Architecture Alignment

This Epic directly aligns with the foundational architectural decisions for QuizZum. It establishes the **Next.js (React/JavaScript) frontend** with its App Router, and the **FastAPI (Python) backend** responsible for API endpoints (`/api/upload/*`) and PDF processing (`backend/app/core/pdf_parser.py`). It also leverages the shared `docker-compose.yml` for local development setup as per architectural guidelines. The focus is on setting up the core web application structure and content reception mechanisms before deeper AI integrations.

## Detailed Design

### Services and Modules

-   **Frontend:**
    -   `frontend/src/app/input-screen/`: Contains UI components for text input and PDF upload.
    -   `frontend/src/components/`: Reusable UI components (e.g., input fields, buttons).
    -   `frontend/src/lib/`: Utility functions and API clients for interacting with the backend.
-   **Backend:**
    -   `backend/app/api/upload/`: FastAPI endpoints for handling text and PDF uploads.
    -   `backend/app/core/pdf_parser.py`: Module responsible for extracting text from PDF files.
    -   `backend/app/main.py`: Main FastAPI application entry point.

### Data Models and Contracts

-   **Backend Data Model (PostgreSQL):**
    -   **Content:**
        -   `id` (UUID): Primary key.
        -   `raw_text` (TEXT): Raw text extracted from user input.
        -   `timestamp` (TIMESTAMP): Creation timestamp.
-   **API Contracts:**
    -   Standard JSON response format for success (`{ "data": { ... } }`) and errors (`{ "error": { "message": "...", "code": "...", "details": "..." } }`).
    -   ISO 8601 format for all date/time values.

### APIs and Interfaces

-   `POST /api/upload/text`:
    -   **Request:** `application/json` with `{"text": "Your notes here"}`.
    -   **Response:** `200 OK` on success, with `{"data": {"message": "Text uploaded successfully"}}`. Error responses follow standard format.
-   `POST /api/upload/pdf`:
    -   **Request:** `multipart/form-data` with the PDF file.
    -   **Response:** `200 OK` on success, with `{"data": {"message": "PDF uploaded successfully"}}`. Error responses follow standard format.

### Workflows and Sequencing

1.  **User Action (Frontend):** User types/pastes text or uploads a PDF via the UI.
2.  **Frontend Processing:**
    -   Text input: Captured directly.
    -   PDF upload: File selected by user.
3.  **Frontend to Backend Communication:**
    -   Text input: Frontend sends `POST` request to `/api/upload/text` with text content.
    -   PDF upload: Frontend sends `POST` request to `/api/upload/pdf` with the PDF file.
4.  **Backend Reception (FastAPI):**
    -   Receives `POST` request.
    -   For PDF upload, `pdf_parser.py` extracts text from the PDF.
    -   Temporarily stores or processes the extracted text.
5.  **Backend Acknowledgment:** Backend sends `200 OK` response to frontend.
6.  **User Feedback (Frontend):** Frontend displays success message or error to the user.

## Non-Functional Requirements

### Performance

-   **Responsive Feedback:** Implement animations and progress indicators (e.g., spinners) in the UI to manage user expectations during backend processing (e.g., file uploads, initial setup).
-   **Fast Load Times & Smooth Interactions:** Ensure the SPA loads quickly and user interactions are fluid, aligning with general good web performance.
-   **Reliable API Integrations:** Frontend to Backend API calls for content upload should be reliable, with appropriate error handling and retries where applicable.

### Security

-   **Input Validation:** All backend API endpoints for content upload (`/api/upload/text`, `/api/upload/pdf`) must rigorously validate incoming data to prevent common vulnerabilities.
-   **HTTPS/SSL:** All communication between the frontend and backend must be encrypted using HTTPS/SSL.
-   **CORS Configuration:** Properly configure Cross-Origin Resource Sharing (CORS) to restrict access from unauthorized domains.
-   **Security Best Practices:** Backend modules will incorporate general security best practices.

### Reliability/Availability

-   **System Stability:** The core application components (frontend, backend, database connectivity for content) should be stable and not prone to frequent crashes during normal operation.
-   **Error Handling:** Implement robust error handling in both frontend and backend to gracefully manage unexpected issues during content input and API communication.

### Observability

-   **Structured Logging:** Implement structured logging (e.g., JSON format) in both frontend and backend for content input and upload operations.
-   **Standard Log Levels:** Use standard log levels (INFO, WARNING, ERROR) consistently.
-   **Contextual Information:** Log relevant details (e.g., timestamp, API endpoint accessed, success/failure of upload) to facilitate debugging and monitoring.

## Dependencies and Integrations

-   **Frontend:**
    -   React (UI library)
    -   Next.js (React framework)
    -   Chakra UI (Component library)
-   **Backend:**
    -   FastAPI (Web framework)
    -   Python (Programming language)
    -   PostgreSQL client/ORM (Database interaction)
    -   `python-multipart` (for PDF uploads)
-   **Infrastructure (Local Development):**
    -   PostgreSQL (Database server)
    -   Redis (Message broker for Celery - will be needed for background PDF parsing in future epics)

## Acceptance Criteria (Authoritative)

*   **Story 1.1: (MVP) Project Setup & Initial Web App Structure**
    1.  Given a new project, when I initialize the project, then a git repository is created and configured.
    2.  Given a new project, when I set up the basic web application, then a Single Page Application (SPA) structure is in place (e.g., using React or a similar framework).
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
    1.  Given the backend server is running, when a `POST` request with text content is sent to `/api/upload_text`, then the backend successfully receives and acknowledges the text.
    2.  Given the backend server is running, when a `POST` request with a PDF file is sent to `/api/upload_pdf`, then the backend successfully receives and stores the PDF file (e.g., temporarily).
    3.  Given the backend is set up, when the frontend sends content, then appropriate HTTP responses (e.g., 200 OK) are returned.

*   **Story 1.5: (MVP) Basic Browser Compatibility & Responsiveness**
    1.  Given QuizZum is accessed via the latest stable versions of Chrome, Edge, Firefox, Brave, and Opera on desktop, when I interact with the application, then all UI elements function as expected.
    2.  Given QuizZum is accessed on a mobile device, when I interact with the application, then the UI layout adjusts appropriately and remains usable.

## Traceability Mapping

| Acceptance Criteria | Spec Section(s) | Component(s)/API(s) | Test Idea |
| :------------------ | :-------------- | :------------------ | :-------- |
| **Story 1.1: Project Setup & Initial Web App Structure** | | | |
| Git repo created and configured. | Detailed Design (Frontend, Backend) | `npx create-next-app`, `git init` | Verify `.git` folder exists. |
| SPA structure in place (React/Next.js). | Detailed Design (Frontend) | `frontend/src/app/`, `frontend/src/components/` | Verify `package.json` dependencies, Next.js app structure. |
| Basic empty web page displayed. | Detailed Design (Frontend) | `npm run dev` | Open browser, verify empty page renders. |
| **Story 1.2: Text Input Interface** | | | |
| Prominent and usable text area displayed. | Detailed Design (Frontend) | `frontend/src/app/input-screen/` | UI test: Verify textarea visibility and focus. |
| Text is visible and editable. | Detailed Design (Frontend) | `frontend/src/app/input-screen/` | UI test: Type/paste, verify content. |
| Text prepared for processing on "Generate". | Detailed Design (Frontend, Workflows) | `frontend/src/lib/api-client`, `POST /api/upload/text` | Frontend unit test: Verify API call with text payload. |
| **Story 1.3: PDF Upload Interface** | | | |
| Labeled "Upload PDF" button/drag-and-drop. | Detailed Design (Frontend) | `frontend/src/app/input-screen/` | UI test: Verify button/zone presence. |
| File name displayed on selection. | Detailed Design (Frontend) | `frontend/src/app/input-screen/` | UI test: Select file, verify display. |
| PDF content prepared for processing on "Generate". | Detailed Design (Frontend, Workflows) | `frontend/src/lib/api-client`, `POST /api/upload/pdf` | Frontend unit test: Verify API call with PDF payload. |
| **Story 1.4: Core Backend Setup for Content Reception** | | | |
| Backend receives text content for `/api/upload_text`. | Detailed Design (Backend, APIs) | `backend/app/api/upload/text_endpoint` | Backend integration test: `POST` text, verify 200 OK and content acknowledgement. |
| Backend receives PDF file for `/api/upload_pdf`. | Detailed Design (Backend, APIs) | `backend/app/api/upload/pdf_endpoint`, `backend/app/core/pdf_parser.py` | Backend integration test: `POST` PDF, verify 200 OK and temporary storage. |
| Appropriate HTTP responses returned. | Detailed Design (Backend, APIs) | FastAPI Handlers | Backend unit/integration test: Verify HTTP status codes (200 OK, 4xx, 5xx). |
| **Story 1.5: Basic Browser Compatibility & Responsiveness** | | | |
| All UI elements function as expected across browsers. | Objectives (Browsers), NFR Performance | All Frontend Components | Cross-browser E2E testing. |
| UI layout adjusts appropriately for mobile. | Objectives (Responsiveness), NFR Performance | Frontend CSS/Chakra UI | Responsive E2E testing. |

## Risks, Assumptions, Open Questions

**Risks:**
-   **PDF Parsing Accuracy:** The accuracy of text extraction from PDFs, especially those with complex layouts, images, or tables, is a technical challenge.
-   **LLM API Cost (Future):** While not directly in Epic 1, the backend infrastructure for content reception must be mindful that future processing by LLMs carries cost implications.

**Assumptions:**
-   Users will provide text or PDF content suitable for summarization and quizzing.
-   Frontend frameworks (React/Next.js) and backend (FastAPI/Python) provide stable APIs for core operations.
-   Standard PDF parsing libraries (e.g., `pypdf`, `pdfminer.six`) will be sufficient for text extraction from typical lecture notes.

**Open Questions:**
-   What is the maximum file size for PDF uploads? (Backend implementation decision needed).
-   What types of PDFs are considered "in scope" for reliable parsing (e.g., text-based vs. scanned image PDFs)?
-   How will invalid file types be handled on the frontend and backend (error messaging, rejection)?

## Test Strategy Summary

A layered testing approach will be adopted, with tests co-located with the code they cover.
-   **Unit Tests:** For individual frontend components (e.g., text input, PDF upload button) and backend functions (e.g., PDF text extraction, API endpoint handlers).
-   **Integration Tests:**
    -   Frontend: Testing the interaction between UI components and API client calls.
    -   Backend: Testing the FastAPI endpoints' interaction with `pdf_parser` and potential database (content model).
-   **End-to-End (E2E) Tests:** Simulating user flows for text input, PDF upload, and verifying successful backend acknowledgment across different browsers and responsiveness settings.
-   **Manual/Exploratory Testing:** To verify overall user experience, browser compatibility, and responsiveness.
