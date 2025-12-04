## External APIs
### LLM Provider API
-   **Purpose:** To generate multi-level summaries (easy, medium, hard) from input text.
-   **Documentation:** To be determined based on chosen provider (e.g., Google Gemini API documentation).
-   **Base URL(s):** To be determined based on chosen provider.
-   **Authentication:** API Key (managed securely on backend).
-   **Rate Limits:** To be considered and managed based on chosen provider's policies.

**Key Endpoints Used:**
-   `POST /generate` (example) - Send text and prompt to generate a summary.

**Integration Notes:** The integration will be modular to allow for easy swapping of LLM providers. Prompts will be carefully engineered to achieve desired summary difficulty levels. Error handling for API calls will be implemented.