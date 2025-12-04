## Components
### Frontend (React App)
**Responsibility:** Provides the user interface, handles user input, displays summaries, and communicates with the backend API.
**Key Interfaces:** `/api/summarize` (POST)
**Dependencies:** Backend (FastAPI API)
**Technology Stack:** React, JavaScript, chosen UI Component Library.

### Backend (FastAPI App)
**Responsibility:** Exposes the summarization API endpoint, orchestrates calls to the external LLM, processes LLM responses, and manages API keys securely.
**Key Interfaces:** `/api/summarize` (POST)
**Dependencies:** External LLM Provider API.
**Technology Stack:** Python, FastAPI.

### External LLM Provider
**Responsibility:** Receives text and specific prompts, generates summaries based on AI models, and returns them to the backend.
**Key Interfaces:** LLM Provider's proprietary API (e.g., Google Gemini API).
**Dependencies:** None (external service).
**Technology Stack:** Proprietary AI/ML models.