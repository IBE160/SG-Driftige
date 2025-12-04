## High Level Architecture
### Technical Summary
QuizZum will be built as a web application utilizing a monorepo structure. The frontend will be developed with React, providing a dynamic and intuitive user interface as specified in the Frontend Specification. The backend will leverage Python with FastAPI, serving a RESTful API to handle summarization requests. A crucial aspect of the architecture is the integration with an external Large Language Model (LLM) for generating multi-level summaries. The system is designed to provide a frictionless user experience, prioritizing fast initial loads and responsive interactions, while supporting future scalability and feature expansion on a major cloud provider.

### Platform and Infrastructure Choice
**Platform:** Cloud-agnostic for MVP, primarily targeting a robust local development environment.
**Key Services:**
*   Frontend: Static file hosting (e.g., Nginx, S3 bucket, Vercel/Netlify for static assets).
*   Backend: Containerized application service (e.g., Docker, Kubernetes, AWS ECS, Azure App Service).
*   External: LLM API provider.
**Deployment Host and Regions:** Initial focus on local development. Cloud provider (AWS, Google Cloud, Azure) and specific regions will be determined post-MVP.

### Repository Structure
**Structure:** Monorepo
**Monorepo Tool:** npm workspaces (for lightweight management of frontend and shared packages, Python backend will reside in a separate directory within the monorepo root).
**Package Organization:**
*   `frontend/`: React application (UI, client-side logic).
*   `backend/`: FastAPI application (API, business logic, LLM integration).
*   `packages/shared/`: (Future consideration for shared types, utilities, e.g., API request/response types).

### High Level Architecture Diagram
```mermaid
graph TD
    User -->|Accesses| Frontend[React App: Web Browser]
    Frontend -->|API Calls (HTTP/S)| Backend[FastAPI App: Python Server]
    Backend -->|LLM API Request| ExternalLLM[External LLM Provider: e.g., Gemini API]
    ExternalLLM -->|LLM API Response| Backend
    Backend -->|API Response| Frontend
```

### Architectural Patterns
-   **Component-Based UI:** React will facilitate a modular and reusable component structure for the frontend, as detailed in the Frontend Specification.
    -   _Rationale:_ Improves maintainability, scalability, and developer collaboration by breaking down complex UIs into manageable, self-contained units.
-   **RESTful API:** The backend will expose a RESTful API for communication with the frontend.
    -   _Rationale:_ Provides a standardized, stateless, and scalable way for different services to communicate, aligning with modern web development practices.
-   **Repository Pattern (for LLM Integration):** The backend's LLM interaction logic will be encapsulated within a dedicated service/repository.
    -   _Rationale:_ Decouples the core business logic from the specific LLM implementation, making it easier to swap LLM providers or update integration details in the future without affecting the rest of the application.