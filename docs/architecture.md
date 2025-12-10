# Architecture

## Executive Summary

I'm reviewing your project documentation for QuizZum.
I see 3 epics with 12 total stories.
I also found your UX specification which defines the user experience requirements.

Key aspects I notice:
- **Core Functionality:** The main goal is to transform text or PDF notes into multi-level summaries (easy, medium, hard) and provide adaptive quizzes to help with learning.
- **Critical NFRs:** Key non-functional requirements are ensuring the application feels responsive even during AI processing, making the LLM integration reliable, and designing the backend for future scalability.
- **UX Complexity:** The UX is of medium complexity, aiming for "radically simple" and an "effortless" guided experience, using the Chakra UI design system as a foundation.
- **Unique Challenges:** The primary challenges will be ensuring the quality of the AI-generated summaries and quizzes, accurately parsing PDF documents, and managing the potential costs of LLM API calls.

This will help me guide you through the architectural decisions needed to ensure AI agents implement this consistently.

## Project Initialization

The project will be initialized using Next.js (JavaScript), Tailwind CSS, and Headless UI.

The initial setup command will be:

```bash
npx create-next-app@latest <project-name> --js --tailwind
```

During this interactive setup, the **App Router** is recommended when prompted.

**Architectural Decisions Provided by this Starter Setup:**

*	**Framework:** Next.js (JavaScript)
*	**UI Library:** React
*	**Build Tooling:** Next.js (built-in, abstracts Webpack)
*	**Styling Framework:** Tailwind CSS
*	**Routing:** Next.js built-in routing (App Router recommended)
*	**Accessibility Foundation:** Headless UI (to be integrated separately)
*	**Project Structure:** Standard Next.js layout.

This project initialization should be the very first implementation story.

## Decision Summary

| Category               | Decision                                        | Version | Affects Epics                   | Rationale                                                                                                                              |
| :--------------------- | :---------------------------------------------- | :------ | :------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- |
| Data Persistence       | PostgreSQL with Prisma ORM                      | TBD     | All Epics                       | PostgreSQL provides a robust relational database for structured data. Prisma simplifies data access and management.                    |
| API Communication      | RESTful API (Next.js Frontend ↔ FastAPI Backend)| TBD     | All Epics                       | Standard, well-understood communication pattern. Leverages FastAPI's strengths for backend logic and Python's AI ecosystem.      |
| AI Integration         | Direct API Calls (Python Requests/LLM SDKs)     | TBD     | Summarization, Quizzing         | Provides maximum control and reduces an extra layer of abstraction for beginner developers.                                             |
| Deployment Target      | Local Development / Docker Containerization     | TBD     | All Epics                       | Focus on local testing and containerization first; web hosting decisions deferred until later.                                         |
| File Storage           | Temporary/Ephemeral Storage for PDFs            | TBD     | Content Input                   | PDFs are processed upon upload and not stored persistently, simplifying storage needs.                                                  |
| Background Processing  | FastAPI Async + WebSockets for UI Updates       | TBD     | Summarization, Quizzing         | Leverages FastAPI's native async capabilities for non-blocking operations and WebSockets for responsive user feedback.             |
| Authentication         | FastAPI-Users (for growth feature)              | TBD     | User-related Epics              | Provides Python-native scaffolding for secure user management, allowing for future implementation.                                     |

## Project Structure

```
/
├───nextjs-frontend/            # The Next.js application (what the user sees)
│   ├───public/                 # Static assets like images
│   ├───src/                    # All your React components, pages, logic
│   │   ├───app/                # Next.js App Router (pages/components)
│   │   ├───components/         # Reusable UI components (styled with Tailwind, built with Headless UI)
│   │   ├───hooks/              # Custom React hooks for logic
│   │   ├───lib/                # Utility functions, API client for backend
│   │   └───styles/             # Global styles (Tailwind base styles)
│   ├───tailwind.config.js      # Tailwind CSS configuration
│   ├───next.config.js          # Next.js configuration
│   └───package.json            # Frontend dependencies
├───fastapi-backend/            # The FastAPI application (where the core logic and AI integration lives)
│   ├───app/                    # Main FastAPI application code
│   │   ├───api/                # API endpoints (e.g., /summarize, /quiz, /upload)
│   │   ├───core/               # Application-wide settings and configurations
│   │   ├───db/                 # Database models, Prisma client setup
│   │   ├───llm_integrations/   # Logic for calling LLM APIs and prompt management
│   │   ├───schemas/            # Data validation models (Pydantic)
│   │   ├───services/           # Business logic (e.g., summarization, quizzing)
│   │   └───main.py             # FastAPI app entry point
│   ├───alembic/                # Database migration scripts (if needed with Prisma)
│   ├───tests/                  # Backend unit and integration tests
│   ├───.env                    # Environment variables
│   ├───pyproject.toml          # Python project configuration
│   └───requirements.txt        # Backend dependencies
├───docs/                       # Project documentation
│   ├───architecture.md         # This document
│   ├───prd-QuizZum-2025-12-05.md # Product Requirements Document
│   └───...
├───.env.example                # Template for environment variables
├───docker-compose.yml          # For local development setup with Docker
└───README.md                   # Project overview
```

## Epic to Architecture Mapping

*   **Epic 1: Foundation & Core Content Input:**
    *   **Frontend:** The input UI (`nextjs-frontend/src/app/(input)`), and reusable UI components.
    *   **Backend:** API endpoints for upload (`fastapi-backend/app/api/(upload)`), and services for processing the input.
*   **Epic 2: Multi-level Summarization:**
    *   **Frontend:** The display for summaries (`nextjs-frontend/src/app/(summaries)`), and UI for difficulty toggles.
    *   **Backend:** API endpoints for summarization (`fastapi-backend/app/api/(summarize)`), LLM integration logic, and summarization services.
*   **Epic 3: Adaptive Quizzing:**
    *   **Frontend:** The quiz UI (`nextjs-frontend/src/app/(quiz)`), and UI for questions/answers.
    *   **Backend:** API endpoints for quizzing (`fastapi-backend/app/api/(quiz)`), LLM integration logic, and quizzing services.

## Technology Stack Details

### Core Technologies

*   **Frontend:** Next.js (JavaScript), React, Tailwind CSS, Headless UI.
*   **Backend:** FastAPI (Python), PostgreSQL, Prisma ORM.

### Integration Points

*   **Next.js Frontend ↔ FastAPI Backend:** All communication via HTTP requests (RESTful API).
*   **FastAPI Backend ↔ PostgreSQL Database:** Managed through Prisma ORM.
*   **FastAPI Backend ↔ External LLM APIs:** Direct HTTP calls (e.g., using `httpx` or `requests` library).
*   **FastAPI Backend ↔ Frontend:** Real-time updates via WebSockets for progress and completion notifications.

## Novel Architectural Patterns

### Adaptive Learning for Lasting Mastery

*   **Pattern Name:** Adaptive Learning for Lasting Mastery
*   **Purpose:** To guide users to a state of confident, long-term knowledge retention for complex academic material by dynamically adjusting content presentation and assessment, all while reducing cognitive load and fostering a sense of accomplishment.

*   **Components Involved:**
    *   **Frontend (Next.js Application):** Displays quizzes/summaries, captures user input, provides feedback, manages user settings (e.g., quote preference).
    *   **FastAPI Backend:** Orchestrates adaptive learning. Includes Quiz Scoring & Analysis, Prompt Engineering, LLM Integration, Data Orchestration.
    *   **PostgreSQL Database (via Prisma ORM):** Stores original content, generated summaries/quizzes, user quiz results, and identified weak spots.
    *   **External LLM API:** Generates new quiz questions and refines summary sections.

*   **High-Level Data Flow:**
    1.  User uploads content (PDF/Text) to FastAPI Backend. Backend extracts text, stores content/metadata in PostgreSQL.
    2.  Backend prompts LLM for multi-level summaries, stores in PostgreSQL. Frontend displays summaries.
    3.  User requests quiz. Backend prompts LLM for initial quiz questions, stores in PostgreSQL. Frontend displays quiz.
    4.  User answers quiz. Frontend sends answers to Backend.
    5.  Backend scores quiz, identifies weak spots, stores results/weak spots in PostgreSQL.
    6.  Backend sends score and chosen feedback (motivational/demotivational) to Frontend.
    7.  If user re-quizzes weak spots: Frontend requests new quiz (with weak spots). Backend retrieves original content/weak spots, prompts LLM for targeted quiz.
    8.  If user requests refined summary: Frontend requests refined summary (with weak spots). Backend retrieves original content/weak spots, prompts LLM for targeted summary refinement.

*   **Implementation Guide (High-Level):**
    *   Frontend will implement reactive UI for quiz taking, summary display, and feedback.
    *   Backend will contain services for content processing, quiz/summary generation (via LLM), result analysis, and data persistence.
    *   Database schema will support tracking user progress, quiz results, and content relationships.
    *   Careful prompt engineering will be crucial for effective LLM output for both quizzes and summary refinement.


## Implementation Patterns

These patterns ensure consistent implementation across all AI agents:

### Naming Conventions

*   **Frontend (Next.js/React - JavaScript):**
    *   **React Components:** `PascalCase` (e.g., `UserProfileCard`). File names should match (e.g., `UserProfileCard.jsx`).
    *   **Custom React Hooks:** `use` prefix then `PascalCase` (e.g., `useAuth`).
    *   **JavaScript Functions/Variables:** `camelCase` (e.g., `formatDate`).
*   **Backend (FastAPI/Python):**
    *   **Python Modules/Files:** `snake_case` (e.g., `user_api.py`).
    *   **Python Functions/Methods:** `snake_case` (e.g., `get_user_summary`).
    *   **Python Classes:** `PascalCase` (e.g., `UserSummary`).
    *   **API Endpoints (URLs):** `kebab-case`, plural for collections (e.g., `/api/user-summaries`).
*   **Database (PostgreSQL/Prisma):**
    *   **Table Names:** `snake_case`, plural (e.g., `users`).
    *   **Column Names:** `snake_case` (e.g., `user_id`).

### Code Organization

*   **Frontend (`nextjs-frontend/src`):**
    *   **`app/`**: Standard Next.js App Router structure for pages and co-located components.
    *   **`components/`**: Reusable UI components.
    *   **`lib/`**: Utility functions, API clients.
    *   **`hooks/`**: Custom React hooks.
    *   **`styles/`**: Global styles.
*   **Backend (`fastapi-backend/app`):**
    *   **`api/`**: API routers, grouped by domain.
    *   **`services/`**: Business logic.
    *   **`db/`**: Database models, Prisma client setup.
    *   **`llm_integrations/`**: LLM interaction logic, prompt templates.
    *   **`schemas/`**: Pydantic models.
    *   **`core/`**: Settings, config, dependencies.


## Consistency Rules

### Error Handling Strategy

*   **Backend (FastAPI):** Use `HTTPException` for standardized JSON error responses (status codes, clear messages, optional custom error codes). Log detailed technical errors server-side.
*   **Frontend (Next.js):** Implement React Error Boundaries for graceful UI error handling. Display user-friendly messages, translating API errors. Log frontend errors.

### Logging Approach

*   **Backend (FastAPI):** Utilize Python's standard `logging` module configured for **structured (JSON-formatted) logs**. This facilitates easy analysis and integration with external log management systems.
*   **Frontend (Next.js):** `console.log` for development. For production, plan to integrate a lightweight, structured logging solution to an external service for errors and key events.

### API Response Format

*   **Standardized JSON Envelope:** All API responses will follow a consistent JSON structure.
    *   **Success:** `{"status": "success", "data": { ... }}`
    *   **Error:** `{"status": "error", "message": "...", "code": "..."}` (aligns with Error Handling Strategy).

### Testing Strategy

*   **Backend (FastAPI):**
    *   **Unit Tests:** For individual functions/logic using `pytest`.
    *   **Integration Tests:** For API endpoints and service interactions using `pytest` with FastAPI's `TestClient`.
*   **Frontend (Next.js):**
    *   **Unit/Component Tests:** For React components using `Jest` and `React Testing Library`.
    *   **Simple End-to-End (E2E) Tests:** For critical user flows using `Playwright` or `Cypress`.

## Data Architecture

### Data Models and Relationships

Based on the PRD, the high-level data models and their relationships are:

*   **Content**: Represents a piece of user-provided content (from text or PDF).
    *   `id`: Unique identifier.
    *   `raw_text`: The raw text extracted from the input.
*   **Summary**: Represents a generated summary.
    *   `id`: Unique identifier.
    *   `content_id`: Foreign key to Content.
    *   `difficulty`: Easy, Medium, or Hard.
    *   `summary_text`: The generated summary.
*   **Quiz**: Represents a generated quiz.
    *   `id`: Unique identifier.
    *   `content_id`: Foreign key to Content.
    *   `difficulty`: Easy, Medium, or Hard.
    *   `questions`: A list of Question objects.
*   **Question**: Represents a single question in a quiz.
    *   `id`: Unique identifier.
    *   `text`: The question text.
    *   `options`: A list of possible answers.
    *   `correct_answer`: The correct answer.

**Relationships:**
*   One `Content` can have multiple `Summaries`.
*   One `Content` can have multiple `Quizzes`.
*   One `Quiz` has multiple `Questions`.
*   (Future) Users will own `Content`, `Summaries`, and `Quizzes`.

## API Contracts

### High-Level API Endpoints

The FastAPI backend will expose a RESTful API with the following envisioned endpoints for the MVP:

*   `POST /api/upload/text`: Accepts plain text for processing.
*   `POST /api/upload/pdf`: Accepts a PDF file for processing.
*   `POST /api/summarize`: Accepts content ID and a difficulty level, returns a summary.
*   `POST /api/quiz`: Accepts content ID and a difficulty level, returns a quiz.
*   `POST /api/quiz/{quiz_id}/submit`: Accepts user answers for a quiz, returns score and feedback.
*   `POST /api/quiz/{quiz_id}/followup`: Accepts quiz ID and weak spots, returns an adaptive follow-up quiz.
*   `POST /api/summarize/{summary_id}/refine`: Accepts summary ID and weak spots, returns a refined summary.

## Security Architecture

### Security Approach

*   **General Best Practices:** The backend will incorporate general security best practices, including input validation, output encoding, and dependency management.
*   **LLM API Keys:** LLM API keys will be stored securely (e.g., environment variables) and only used on the backend, never exposed to the frontend.
*   **Future Authentication:** When authentication is implemented with `FastAPI-Users`, it will manage user sessions and access control.
*   **PDF Handling:** Temporary processing of PDFs minimizes risk associated with long-term storage of potentially malicious files.

## Performance Considerations

### Performance Strategies

*   **LLM API Reliability:** Implement mechanisms for retries and graceful handling of rate limits or service interruptions when calling LLM APIs.
*   **Responsive Feedback:** Provide responsive feedback to the user during AI processing tasks (progress indicators, WebSockets for updates).
*   **FastAPI Asynchronous:** Leverage FastAPI's asynchronous nature to handle concurrent requests efficiently, preventing blocking while waiting for LLM responses.
*   **Database Optimization:** Use Prisma's query capabilities efficiently to minimize database load.
*   **Frontend Optimizations:** Utilize Next.js features for performance (e.g., image optimization, code splitting).

## Deployment Architecture

### Deployment Approach

*   **Local Development:** Primary focus on local testing and development using Docker for containerization of the Next.js frontend, FastAPI backend, and PostgreSQL database.
*   **Future Web Hosting:** Web hosting decisions (e.g., PaaS like Render) will be deferred until the project is ready for broader deployment.

## Development Environment

### Prerequisites

*   **Node.js:** Required for Next.js and frontend tooling (`npm`/`pnpm`).
*   **Python:** Required for FastAPI and backend tooling (`pip`/`poetry`).
*   **Docker:** For containerized local development environment.
*   **Git:** Version control.
*   **pnpm/npm:** Package managers for JavaScript.
*   **pip/Poetry:** Package managers for Python.

### Setup Commands

*   **Frontend (Next.js):**
    ```bash
    npx create-next-app@latest <project-name> --js --tailwind
    cd <project-name>
    npm install
    # Additional: Install Headless UI and configure
    ```
*   **Backend (FastAPI):**
    ```bash
    mkdir fastapi-backend
    cd fastapi-backend
    python -m venv .venv
    source .venv/bin/activate
    pip install fastapi uvicorn "postgresql_client" "prisma" "python-dotenv" # and other dependencies
    # Initialize Prisma: npx prisma init
    ```
*   **Docker Compose (for local setup):**
    ```yaml
    # docker-compose.yml example
    version: '3.8'
    services:
      db:
        image: postgres:15
        restart: always
        environment:
          POSTGRES_DB: quizum_db
          POSTGRES_USER: user
          POSTGRES_PASSWORD: password
        ports:
          - "5432:5432"
        volumes:
          - db-data:/var/lib/postgresql/data
      backend:
        build: ./fastapi-backend
        command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
        volumes:
          - ./fastapi-backend:/app
        ports:
          - "8000:8000"
        environment:
          DATABASE_URL: postgresql://user:password@db/quizum_db
          # LLM_API_KEY: your_llm_api_key
        depends_on:
          - db
      frontend:
        build: ./nextjs-frontend
        command: npm run dev
        volumes:
          - ./nextjs-frontend:/app
        ports:
          - "3000:3000"
        environment:
          NEXT_PUBLIC_BACKEND_URL: http://localhost:8000
        depends_on:
          - backend
    volumes:
      db-data:
    ```
    Then `docker-compose up --build`.

## Architecture Decision Records (ADRs)

### Identified Architectural Decisions

Here's a breakdown of the key architectural decisions we need to make for QuizZum:

**CRITICAL Decisions (Form the immediate backbone of the application):**

*	**Data Persistence Strategy:** How will we store all the project's information (content, summaries, quizzes, user data)?
*	**API Communication Pattern:** How will our frontend (React components) communicate with the backend services (e.g., Next.js API routes for LLM interaction)?
*	**AI Integration Strategy:** How will we connect to, manage, and optimize our interactions with Large Language Model (LLM) APIs (like Gemini)?
*	**Deployment Target:** Where will the QuizZum application be hosted and made accessible on the internet?

**IMPORTANT Decisions (Will significantly shape the architecture as the project grows):**

*	**File Storage Solution:** How will we handle storing and managing uploaded files, especially PDFs?
*	**Background Processing Strategy:** How will we manage potentially long-running AI tasks to keep the user interface responsive?
*	**Authentication Solution:** What system will we use for user sign-up, sign-in, and managing user sessions?

### Architectural Coherence Validation

The architecture exhibits strong coherence. All chosen technologies (Next.js, FastAPI, PostgreSQL/Prisma, Tailwind CSS, Headless UI) are compatible and complement each other effectively. The defined communication patterns (RESTful API, WebSockets, Direct LLM API calls) are appropriate for the application's needs. The strategies for error handling, logging, API response format, testing, naming, and code organization are consistent and designed to support maintainability and prevent conflicts. All three epics (Foundation & Core Content Input, Multi-level Summarization, Adaptive Quizzing) are fully supported by the architectural decisions, with the "Adaptive Learning for Lasting Mastery" novel pattern integrated seamlessly into the design. No significant conflicts or gaps were identified.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: Wednesday, December 10, 2025_
_For: Eline&Sindre_