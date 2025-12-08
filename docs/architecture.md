# Architecture

## Executive Summary

My initial analysis confirms QuizZum's objective: an AI-powered learning tool mitigating student overwhelm via multi-level summaries and adaptive quizzes from text/PDF inputs. It is a web-based Single Page Application (SPA) requiring robust performance, scalability, and adherence to WCAG 2.1 Level AA accessibility standards. The project's medium complexity is driven by novel adaptive learning patterns and dynamic content generation. Key challenges involve LLM performance, PDF parsing, and managing API costs. This forms the bedrock for our architectural strategy.

## Project Initialization

Our project will be initialized using **Next.js**, leveraging its App Router for a modern, scalable React application. This framework provides a strong, production-ready foundation that will support QuizZum's complex AI integrations and future growth.

The first implementation story will involve executing the following command to set up the project:

```bash
npx create-next-app@latest quizum-app --typescript --eslint --app
```

**Architectural Decisions Provided by Next.js (via this starter):**

*   **Framework:** React
*   **Meta-framework:** Next.js (with App Router)
*   **Language:** JavaScript (User choice override, previous decision was TypeScript)
*   **Linting:** ESLint
*   **Build Tooling:** Next.js's integrated Webpack/Babel configuration
*   **Project Structure:** Follows Next.js conventions for the App Router

This decision provides a significant head start on our core technology stack and establishes clear patterns for our frontend application.

## Decision Summary

| Category | Decision | Version | Affects Epics | Rationale |
| -------- | -------- | ------- | ------------- | --------- |
| Data Persistence | PostgreSQL (Managed) | Latest stable via managed service | Epic 1, 2, 3 | Robust, good for relationships, scalable, managed services simplify ops. |
| API Pattern & Backend Tech | REST API with FastAPI (Python) | Latest stable version (FastAPI/Python) | Epic 1, 2, 3 | Leverages Python's AI strengths, clear separation of concerns, scalable. |
| File Storage | Transient PDF Processing (In-Memory/Temporary Local) | N/A | Epic 1, 2, 3 | Aligns with transient nature of PDFs, enhances security and efficiency. |
| Background Jobs | Celery with Redis | Latest stable version (Celery/Redis) | Epic 1, 2, 3 | De-facto Python standard, robust, scalable, ensures UI responsiveness for LLM tasks. |
| Deployment Target | Local Development Environment | N/A | Epic 1, 2, 3 | Deferring cloud hosting for MVP; focus on local development for now. |
| Authentication | NextAuth.js (future) | Latest stable version | Future User Epics | Integrates well with Next.js, extensible, future-proofs user management. |
| Testing Strategy | Layered (Unit, Integration, E2E, LLM Output) | Latest stable version | All Epics | Comprehensive coverage, ensures reliability and LLM output quality for adaptive learning. |

## Project Structure

Our project will follow a split-repository structure for now, with dedicated directories for the frontend and backend. This provides a clear separation of concerns for development.

```
/QuizZum/                     # Your project root (conceptual)
├── frontend/                 # Next.js (React/JavaScript) application
│   ├── public/               # Static assets
│   ├── src/                  # Frontend source code
│   │   ├── app/              # Next.js App Router (pages, layouts, components)
│   │   ├── components/       # Reusable React components (Chakra UI-based)
│   │   ├── lib/              # Utility functions, API clients
│   │   └── styles/           # Global styles, Chakra UI theme configuration
│   ├── .env                  # Environment variables
│   ├── package.json          # Node.js dependencies
│   ├── next.config.js        # Next.js configuration
│   └── README.md
├── backend/                  # FastAPI (Python) application
│   ├── app/                  # FastAPI application modules
│   │   ├── api/              # API endpoints (LLM, PDF, Summaries, Quizzes)
│   │   ├── core/             # Core services (LLM client, PDF parser)
│   │   ├── db/               # Database interaction (PostgreSQL, ORM config)
│   │   ├── tasks/            # Celery tasks definitions
│   │   ├── main.py           # FastAPI app entry point
│   │   └── models.py         # Pydantic models for API, ORM models
│   ├── workers/              # Celery worker configuration/scripts
│   ├── .env                  # Environment variables (LLM API keys, DB connection)
│   ├── requirements.txt      # Python dependencies
│   ├── Dockerfile            # Docker setup for backend/Celery/Redis/PostgreSQL
│   └── README.md
├── docs/                     # Project documentation (PRD, UX Spec, Architecture Spec)
│   ├── prd-QuizZum-2025-12-05.md
│   ├── ux-design-specification.md
│   └── architecture.md       # This document
├── .gitignore
├── README.md
└── docker-compose.yml        # For local development with Docker
```

## Epic to Architecture Mapping

*   **Epic 1: Foundation & Core Content Input:**
    *   **Frontend:** `frontend/src/app/input-screen/*` (Input UI components)
    *   **Backend:** `backend/app/api/upload/*` (API endpoints for text/PDF), `backend/app/core/pdf_parser.py` (PDF processing logic)
    *   **Shared:** `docker-compose.yml` (local dev setup)
*   **Epic 2: Multi-level Summarization:**
    *   **Frontend:** `frontend/src/app/summaries/*` (Summary display, toggle UI)
    *   **Backend:** `backend/app/api/summarize/*` (Summary generation endpoint), `backend/app/core/llm_client.py` (LLM interaction), `backend/app/tasks/summarization_tasks.py` (Celery task)
    *   **Database:** `backend/app/db/models.py` (Summary data model)
*   **Epic 3: Adaptive Quizzing:**
    *   **Frontend:** `frontend/src/app/quiz/*` (Quiz UI, question components, results display)
    *   **Backend:** `backend/app/api/quiz/*` (Quiz generation/assessment endpoint), `backend/app/core/llm_client.py` (LLM interaction), `backend/app/tasks/quiz_tasks.py` (Celery task)
    *   **Database:** `backend/app/db/models.py` (Quiz/Question data models)

## Technology Stack Details

### Core Technologies

*   **Frontend:**
    *   **Framework:** React
    *   **Meta-framework:** Next.js (App Router)
    *   **Language:** JavaScript
    *   **UI Library:** Chakra UI
*   **Backend:**
    *   **Framework:** FastAPI
    *   **Language:** Python
    *   **Asynchronous Tasks:** Celery with Redis
*   **Database:**
    *   **Type:** PostgreSQL
    *   **ORM:** To be selected (e.g., SQLAlchemy/Alembic, Prisma for Python)

### Integration Points

*   **Frontend ↔ Backend (API Boundaries):** Frontend makes HTTP requests to FastAPI backend endpoints (e.g., `/api/upload`, `/api/summarize`, `/api/quiz`). Backend responds with structured JSON.
*   **Backend ↔ LLM Providers:** FastAPI backend (via `backend/app/core/llm_client.py`) makes API calls to external Large Language Models.
*   **Backend ↔ Database (PostgreSQL):** FastAPI backend interacts with PostgreSQL using an ORM.
*   **Backend ↔ Message Broker (Redis):** FastAPI dispatches long-running tasks to Celery via Redis. Celery workers retrieve and process tasks.

## Novel Pattern Designs

### Adaptive Learning for Lasting Mastery

**Core Challenge:** How to architect the backend and integrate with LLMs to dynamically refine summaries and generate adaptive quizzes based on user performance, ensuring data consistency and responsiveness.

**Architectural Components & Interactions:**

1.  **Next.js Frontend (React/JavaScript):** Manages user interaction, displays adaptive content, submits quiz answers, and presents results.
2.  **FastAPI Backend (Python):** Orchestrates LLM calls, manages data, dispatches Celery tasks, and implements the core adaptive learning logic to analyze quiz results and determine subsequent actions.
3.  **PostgreSQL Database:** Stores all persistent adaptive learning state: user content, generated summaries, quizzes, detailed quiz performance (question-level correctness), calculated "weak spots," and mastery levels.
4.  **Celery Workers & Redis:** Executes long-running, LLM-intensive operations (summary/quiz generation, adaptive summary refinement) in the background, keeping the FastAPI responsive.

**Data Flow:** User input/quiz answers flow from Frontend → FastAPI. FastAPI dispatches LLM tasks to Celery/Redis. Celery workers interact with external LLMs and PostgreSQL. Results stored in PostgreSQL, retrieved by FastAPI, sent to Frontend. Quiz results drive FastAPI learning engine logic for subsequent adaptive tasks.

**State Management:** PostgreSQL is the primary source of truth for all persistent adaptive learning state.

**API Contracts:** Dedicated endpoints for `/api/summarize` (with refinement context), `/api/quiz` (with adaptation context), and `/api/quiz/submit` (for processing answers and triggering adaptation).

**Edge Cases:** Mitigation includes robust LLM output validation, adaptive summary refinement (suggesting rephrasing, analogies), and intelligent handling of consistent user struggle to avoid endless loops (e.g., suggesting easier content, breaks, or human intervention).

## Implementation Patterns

*   **Strict Adherence to API Contracts:** All communication between Frontend and Backend MUST strictly adhere to the defined JSON API Response Format and use standard HTTP Status Codes.
*   **Backend as the Source of Truth for Business Logic:** All core business logic, LLM interactions, data persistence logic, and adaptive learning algorithms MUST reside within the FastAPI backend.
*   **Asynchronous Processing for Long-Running Tasks:** All LLM calls and PDF processing tasks MUST be initiated as background jobs via Celery/Redis. FastAPI endpoints should immediately return a `202 Accepted` status.
*   **Database Interaction via ORM:** All database interactions from the FastAPI backend MUST be performed via an Object-Relational Mapper (ORM) and adhere to defined schema models.
*   **Co-located Testing Responsibility:** Each feature team or developer is responsible for writing comprehensive tests (unit, integration, E2E where applicable) for the code they produce, co-locating tests with the relevant source code.
*   **Version Control Best Practices:** Strict adherence to Git flow (or a similar branching strategy like GitHub Flow) for feature development, code reviews (pull requests), and merging.

## Consistency Rules

### Naming Conventions

*   **REST Endpoint Naming:** Use plural, lowercase nouns (e.g., `/summaries`, `/quizzes`). Use kebab-case for multi-word resources (e.g., `/quiz-results`).
*   **Database Table Naming:** Use plural, lowercase nouns, snake_case (e.g., `contents`, `summaries`, `quiz_questions`).
*   **Database Column Naming:** Use snake_case (e.g., `user_id`, `created_at`).
*   **Frontend Component Naming:** PascalCase for React components (e.g., `SummaryCard`, `QuizQuestion`).
*   **Frontend File Naming:** PascalCase for components (e.g., `SummaryCard.jsx`).

### Code Organization

*   **Backend:** Organize by feature domain (e.g., `app/api/summaries/`, `app/api/quizzes/`). Shared utilities in `app/core/`, database models in `app/db/`.
*   **Frontend:** Organize by feature (e.g., `src/app/summaries/`, `src/app/quiz/`). Reusable UI components in `src/components/`, utility functions in `src/lib/`.
*   **Tests:** Co-locate tests with the code they test (e.g., `summary.test.js` next to `summary.jsx`, `test_summarize.py` next to `summarize.py`).

### Error Handling

*   **Backend (FastAPI):** Implement a centralized exception handling mechanism using FastAPI's `ExceptionHandler` to catch common errors (e.g., validation errors, LLM API errors). Return consistent JSON error responses to the frontend, including an error code and a user-friendly message.
*   **Frontend (Next.js/JavaScript):** Utilize Next.js's error boundaries for React components to catch UI errors gracefully. Display user-friendly error messages, perhaps with a "retry" option where appropriate (e.g., if LLM call fails). Show a generic error page for unrecoverable errors.
*   **User Feedback:** Always provide clear, empathetic error messages, aligned with our UX "Engaging & Actionable Feedback" principle, guiding the user on how to resolve the issue or what to do next.

### Logging Strategy

*   **Structured Logging:** Both frontend and backend will implement structured logging (e.g., JSON format) for easy analysis and monitoring.
*   **Standard Levels:** Use standard log levels (DEBUG, INFO, WARNING, ERROR, CRITICAL) consistently.
*   **Contextual Information:** Include useful details like when an event happened, what user was involved (if authenticated), and any relevant data to quickly pinpoint issues.
*   **Backend (FastAPI):** Use Python's `logging` module.
*   **Frontend (Next.js/JavaScript):** Use a lightweight logging mechanism for client-side events.

## Data Architecture

QuizZum's data model will be designed to support the relationships between user-provided content, generated summaries, and adaptive quizzes. Using PostgreSQL, we will ensure data integrity and the flexibility to evolve the schema as the project grows.

*   **Content Model:** Stores the raw text extracted from user inputs (text or PDF).
    *   `id`: Unique identifier (UUID).
    *   `raw_text`: The extracted content text.
    *   `timestamp`: When the content was created/uploaded.
*   **Summary Model:** Stores the generated multi-level summaries.
    *   `id`: Unique identifier (UUID).
    *   `content_id`: Foreign key linking to the `Content` model.
    *   `difficulty`: Enum/string ('easy', 'medium', 'hard').
    *   `summary_text`: The generated summary text for a specific difficulty.
    *   `version`: Tracks if a summary has been adaptively refined.
    *   `timestamp`: When the summary was generated.
*   **Quiz Model:** Stores the generated quiz questions.
    *   `id`: Unique identifier (UUID).
    *   `content_id`: Foreign key linking to the `Content` model.
    *   `difficulty`: Enum/string ('easy', 'medium', 'hard').
    *   `questions`: JSONB field storing an array of `Question` objects.
    *   `timestamp`: When the quiz was generated.
*   **Question Model (embedded in Quiz):**
    *   `id`: Unique identifier (UUID).
    *   `text`: The question text.
    *   `options`: Array of multiple-choice options.
    *   `correct_answer`: The correct answer text.
    *   `related_summary_segment`: Optional, links to a specific part of the summary.
*   **User Progress Model (future):** To track quiz scores, weak spots, and mastery levels for individual users. (Planned for future when authentication is integrated).

## API Contracts

*   **API Response Format:**
    *   **Standard JSON:** All API responses will be in JSON format.
    *   **Consistent Structure:**
        *   **Success:** `{ "data": { ... } }` for single resources or lists.
        *   **Errors:** `{ "error": { "message": "...", "code": "...", "details": "..." } }`
    *   **HTTP Status Codes:** Use standard HTTP status codes (e.g., 200 OK, 201 Created, 400 Bad Request, 500 Internal Server Error).
*   **Date/Time Handling in API:**
    *   **Transmission Format:** Use ISO 8601 format (e.g., "YYYY-MM-DDTHH:MM:SSZ") for all date/time values transmitted between frontend and backend.

## Security Architecture

QuizZum will prioritize security throughout its development lifecycle, adhering to best practices to protect user data and maintain application integrity.

*   **API Security:**
    *   **Input Validation:** All API endpoints will rigorously validate incoming data to prevent common vulnerabilities like injection attacks and buffer overflows.
    *   **HTTPS/SSL:** All communication between frontend and backend will be encrypted using HTTPS/SSL.
    *   **CORS (Cross-Origin Resource Sharing):** Properly configured to restrict access to our API from unauthorized domains.
*   **Data Security:**
    *   **Database Security:** PostgreSQL (managed service) will be configured with strong access controls and encryption where available (eg., encryption at rest).
    *   **Sensitive Data:** Minimize storage of sensitive user data. If stored, ensure it is encrypted (e.g., LLM API keys should be stored securely on the backend, not exposed to the frontend).
*   **Authentication & Authorization (Future):** When authentication is implemented with NextAuth.js, it will handle secure user session management, password hashing, and token-based authorization. Authorization checks will be performed on the backend for all protected resources.
*   **Dependency Management:** Regularly update third-party libraries and frameworks to patch known vulnerabilities.
*   **LLM API Keys:** Stored as environment variables on the backend, never hardcoded or exposed to the frontend.

## Performance Considerations

QuizZum's performance will be optimized to ensure a responsive and fluid user experience, particularly given the AI processing involved.

*   **Frontend Performance (Next.js/JavaScript):**
    *   **Code Splitting & Lazy Loading:** Load only the necessary JavaScript for each page or component to improve initial load times.
    *   **Image Optimization:** Optimize images (compression, modern formats like WebP) for faster loading.
    *   **Client-side Caching:** Utilize browser caching for static assets.
    *   **Responsive UI:** Implement animations and progress indicators (as per UX design) to manage perceived performance during AI calls.
*   **Backend Performance (FastAPI/Python):**
    *   **Asynchronous Operations:** Leverage FastAPI's asynchronous capabilities for I/O-bound tasks (e.g., calling external LLMs, database queries) to maximize concurrency.
    *   **Background Tasks (Celery):** Offload long-running LLM processing and PDF text extraction to Celery workers to keep API endpoints responsive.
    *   **Caching:** Implement caching layers (e.g., Redis) for frequently accessed data or LLM responses to reduce redundant computation.
    *   **Efficient LLM Calls:** Optimize LLM prompts and model choices to minimize token usage and latency.
*   **Database Performance (PostgreSQL):**
    *   **Indexing:** Create appropriate database indexes to speed up common queries.
    *   **Query Optimization:** Write efficient SQL queries (or ORM queries).
    *   **Connection Pooling:** Manage database connections efficiently.

## Deployment Architecture

For the initial MVP phase, QuizZum's deployment target will be a **Local Development Environment**. This decision defers the complexities of cloud hosting to a later stage, allowing us to focus on core functionality development.

*   **Frontend (Next.js/JavaScript):** Will be run locally using the Next.js development server.
*   **Backend (FastAPI/Python):** Will be run locally, likely using `uvicorn`.
*   **Database (PostgreSQL):** A local PostgreSQL instance will be used (e.g., via Docker or installed directly).
*   **Message Broker (Redis for Celery):** A local Redis instance will be required for Celery workers.

This approach prioritizes rapid local development and iteration. Cloud deployment strategies will be revisited as the project matures.

## Development Environment

### Prerequisites

To set up the local development environment for QuizZum, the following prerequisites are required:

*   **Node.js:** Latest LTS version. This is required for Next.js development.
*   **Python:** Latest stable version (e.g., 3.10+). This is for the FastAPI backend and Celery workers.
*   **Docker:** Recommended for easily setting up local PostgreSQL and Redis instances.
*   **Git:** For version control.
*   **Code Editor:** Visual Studio Code (recommended) with relevant extensions (e.g., Prettier, ESLint, Python, React).

### Setup Commands

```bash
# 1. Clone the repository
git clone [YOUR_REPOSITORY_URL]
cd quizum-app # or your project directory

# 2. Frontend Setup (Next.js/JavaScript)
cd frontend # Assuming frontend is in a 'frontend' subdirectory
npm install # or yarn install
npm run dev

# 3. Backend Setup (FastAPI/Python)
cd backend # Assuming backend is in a 'backend' subdirectory
python -m venv venv
source venv/bin/activate # On Windows: venv\Scripts\activate
pip install -r requirements.txt # (or poetry install, if using Poetry)
uvicorn main:app --reload

# 4. Database Setup (PostgreSQL - using Docker for example)
# Start PostgreSQL via Docker:
docker run --name quizum-postgres -e POSTGRES_USER=user -e POSTGRES_PASSWORD=password -e POSTGRES_DB=quizum_db -p 5432:5432 -d postgres
# You might need to run database migrations here later (e.g., using Alembic/SQLAlchemy)

# 5. Message Broker Setup (Redis - using Docker for example)
docker run --name quizum-redis -p 6379:6379 -d redis

# 6. Celery Worker Setup
# From backend directory, with venv activated:
celery -A main.celery_app worker --loglevel=info
```

## Architecture Decision Records (ADRs)

*   **ADR 001: Next.js for Frontend (JavaScript)**
    *   **Decision:** Next.js with React (JavaScript) and App Router will be used for the frontend.
    *   **Rationale:** Provides a robust, scalable framework suitable for SPAs, server-rendering capabilities, and future growth. User preference to use JavaScript for beginner developers.
    *   **Status:** Accepted.
*   **ADR 002: FastAPI (Python) for Backend**
    *   **Decision:** A separate FastAPI (Python) backend will be used for API endpoints and LLM integrations.
    *   **Rationale:** Leverages Python's strengths in AI/ML ecosystem, clear separation of concerns, and high performance for complex AI logic.
    *   **Status:** Accepted.
*   **ADR 003: PostgreSQL for Data Persistence**
    *   **Decision:** PostgreSQL will be used as the relational database, ideally via a managed service for ease of operation.
    *   **Rationale:** Robust, excellent for structured data and complex relationships, scalable, and widely supported.
    *   **Status:** Accepted.
*   **ADR 004: Transient PDF Processing for File Storage**
    *   **Decision:** PDF files will be processed transiently (in-memory or temporary local storage) rather than stored persistently.
    *   **Rationale:** Aligns with the ephemeral nature of the files (only needed for text extraction), enhances security, efficiency, and reduces storage costs.
    *   **Status:** Accepted.
*   **ADR 005: Celery with Redis for Background Jobs**
    *   **Decision:** Celery (with Redis as a message broker) will be used to manage long-running background tasks like LLM calls and PDF processing.
    *   **Rationale:** Ensures UI responsiveness, provides a robust and scalable solution for offloading computationally intensive tasks.
    *   **Status:** Accepted.
*   **ADR 006: Local Development Environment for MVP Deployment**
    *   **Decision:** For the MVP, the deployment target is a local development environment.
    *   **Rationale:** Defers complexities and costs of cloud hosting to a later stage, focusing on rapid local development and iteration.
    *   **Status:** Accepted.
*   **ADR 007: NextAuth.js for Future Authentication**
    *   **Decision:** NextAuth.js will be adopted for future authentication and user management features.
    *   **Rationale:** Integrates seamlessly with Next.js, is highly extensible, and future-proofs the architecture for secure user management.
    *   **Status:** Accepted.
*   **ADR 008: Layered Testing Strategy**
    *   **Decision:** A layered testing approach (Unit, Integration, E2E, LLM Output Validation) will be implemented.
    *   **Rationale:** Provides comprehensive quality assurance, ensures reliability, and specifically validates the quality of AI-generated content critical to QuizZum's core value.
    *   **Status:** Accepted.

---

_Generated by BMAD Decision Architecture Workflow v1.0_
_Date: 2025-12-07_
_For: Eline&Sindre_