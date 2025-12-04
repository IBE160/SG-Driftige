## Technical Assumptions
### Repository Structure: Monorepo
The project will start with a monorepo approach for streamlined development and deployment of frontend and backend components.

### Service Architecture: RESTful API
A RESTful API will serve as the primary communication layer between the frontend and backend.

### Testing Requirements: Unit Only
*(Assumption: For the MVP, the focus will be on unit tests to ensure core functionality. Integration and E2E tests can be introduced in later phases. User can specify if more comprehensive testing is required.)*

### Additional Technical Assumptions and Requests
*   **Frontend:** JavaScript and React for building a dynamic and interactive user interface.
*   **Backend:** Python with FastAPI, chosen for its high performance and strong support for AI/ML integrations.
*   **Database:** PostgreSQL for robust relational data management (Post-MVP consideration for user data, saved summaries, and quiz results).
*   **Hosting/Infrastructure:** A major cloud provider (e.g., AWS, Google Cloud, or Azure) utilizing managed services for scalability, reliability, and ease of operations (specific hosting decisions later).
*   **LLM Integration:** Crucial integration with a Large Language Model (LLM) provider (e.g., Google Gemini, OpenAI's ChatGPT, or other suitable LLMs) for summary generation. The integration will be modular to allow for swapping providers.
*   **Parallel LLM Calls:** For each summarization request, the backend will make three separate, parallel calls to the LLM API (one for each difficulty level) to enable instant switching in the UI.