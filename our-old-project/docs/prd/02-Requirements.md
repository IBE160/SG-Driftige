## Requirements
### Functional
1.  **FR1:** The application shall allow users to paste lecture notes into a dedicated text area for summarization.
2.  **FR2:** The application shall enable users to select between "Easy," "Medium," and "Hard" difficulty levels for generated summaries.
3.  **FR3:** The application shall provide a "Generate" button to initiate the summarization process.
4.  **FR4:** The application shall display generated multi-level summaries in a clean, readable format.
5.  **FR5:** The application shall allow users to dynamically switch and view different summary levels (Easy, Medium, Hard) for the same content post-generation.
6.  **FR6:** The backend API endpoint `/api/summarize` shall accept a text input and return all three summary levels (easy, medium, hard) in a single response.
7.  **FR7:** The backend shall implement error handling for LLM API calls, including retries for transient issues and clear error messages for failures.

### Non Functional
1.  **NFR1:** The application shall be a web application accessible via modern desktop and mobile browsers.
2.  **NFR2:** The application shall support the latest two major versions of evergreen browsers (Chrome, Firefox, Safari, Edge).
3.  **NFR3:** The application shall aim for fast initial page loads (under 2 seconds).
4.  **NFR4:** The application shall ensure smooth UI interactions.
5.  **NFR5:** The backend shall efficiently process text for summarization.
6.  **NFR6:** The backend shall securely store and manage LLM API keys as environment variables, never exposing them to the frontend.
7.  **NFR7:** The application shall implement standard web security practices (e.g., HTTPS, input validation).
8.  **NFR8:** The functionality of multi-level summarization is directly dependent on the capabilities and accessibility of chosen Large Language Model (LLM) APIs (e.g., Google Gemini, OpenAI's ChatGPT, or other suitable LLMs) and associated costs or rate limits.