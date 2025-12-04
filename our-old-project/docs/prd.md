# QuizZum Product Requirements Document (PRD)

## Goals and Background Context

### Goals
*   Attain 1,000 monthly active users within 3 months of initial launch for the Multi-level Summary MVP.
*   Achieve a weekly active user (WAU) to monthly active user (MAU) ratio of 20% within 3 months of launch to validate market demand.
*   Achieve a summary generation flow completion rate exceeding 90%.
*   Receive an average in-app feedback/survey rating of summary usefulness at 4 out of 5 stars or higher.
*   Exhibit an average of at least 2 summary level switches per session for generated content.
*   Improve understanding and retention of course material for students.
*   Enable more efficient and effective studying.
*   Reduce stress and anxiety associated with academic workload.
*   Make learning an enjoyable and structured process.
*   Achieve better academic performance for students.

### Background Context
Students frequently face significant challenges managing and comprehending large volumes of lecture notes, leading to cognitive overload, inefficient study habits, and reduced engagement. This project aims to address this problem by developing an AI-powered learning tool, "QuizZum," which transforms raw lecture notes into structured, digestible, and interactive learning experiences. The primary value proposition is a radically simple, intuitive, and engaging platform offering multi-level summaries, making studying more effective and enjoyable for students who struggle with unstructured learning or procrastination.

### Change Log
| Date       | Version | Description         | Author |
| :--------- | :------ | :------------------ | :----- |
| 2025-12-02 | 1.0     | Initial PRD draft   | Gemini |

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

## User Interface Design Goals

### Overall UX Vision
To provide a radically simple, intuitive, and engaging platform that minimizes "noise" and complex choices, making studying a "fun to play with" experience. The user experience should feel frictionless and adaptive to individual learning paces, fostering structured and effective learning.

### Key Interaction Paradigms
The core interaction will be a clear, two-column layout (stacking on mobile) for text input and summary output. Users will paste text, select a summary level via toggles/radio buttons, click "Generate," and then navigate between pre-generated summaries using tabs. Loading states will provide clear feedback.

### Core Screens and Views
*   **Main Screen - Initial State:** Contains text input area, summary level selector, and a "Generate Summary" button. Output area shows a placeholder.
*   **Main Screen - Loading State:** Input controls disabled, output area shows a loading indicator.
*   **Main Screen - Summary Display State:** Input controls re-enabled, output area displays summaries with tabs for easy switching between Easy, Medium, and Hard.

### Accessibility: None
*(Assumption: For the MVP, explicit WCAG compliance is not a primary focus, but basic usability should still be considered. User can specify if a higher level of accessibility is required.)*

### Branding
Application Title: QuizZum

### Target Device and Platforms: Web Responsive
The primary focus is a web application accessible via modern desktop and mobile browsers, with basic mobile responsiveness.

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

## Epic List

*   **Epic 1: Foundation & Core Summarization MVP:** Establish the basic project infrastructure, deploy a functional backend API, and implement the frontend UI for text input, summary generation, and multi-level display.
*   **Epic 2: Adaptive Quizzes:** Implement a full quiz system based on summarized content, adapting to user performance. (Post-MVP)
*   **Epic 3: PDF Upload & User Accounts:** Enable PDF upload functionality and introduce user accounts for saving summaries and tracking progress. (Post-MVP)

## Epic 1 Foundation & Core Summarization MVP

## Story 1.1 Project Setup & Backend API with Mock Summaries
As a developer,
I want to set up the basic project structure and a functional backend API,
so that the frontend development can proceed with a stable API to consume.

### Acceptance Criteria
1.  The backend FastAPI application is running.
2.  The `/api/summarize` endpoint is implemented and accessible.
3.  The `/api/summarize` endpoint accepts a JSON payload with a `text` field (string).
4.  The `/api/summarize` endpoint returns a JSON response containing mock `easy`, `medium`, and `hard` summaries after a simulated delay.
5.  CORS headers are configured to allow requests from the frontend.

## Story 1.2 Frontend UI for Text Input and Generation
As a student,
I want to paste my lecture notes and initiate summary generation,
so that I can quickly get started with the learning tool.

### Acceptance Criteria
1.  The main application screen displays a large text area for input.
2.  The text area has appropriate placeholder text.
3.  A "Generate Summary" button is present and is disabled when the text area is empty.
4.  The "Generate Summary" button becomes enabled when text is entered into the text area.
5.  A summary level selector (e.g., radio buttons or toggles for Easy, Medium, Hard) is present.
6.  Clicking the "Generate Summary" button triggers a call to the backend `/api/summarize` endpoint.
7.  During summary generation, a loading indicator is displayed, and input controls are disabled.

## Story 1.3 Display Multi-level Summaries with Dynamic Switching
As a student,
I want to view generated summaries and switch between difficulty levels effortlessly,
so that I can understand the content at my preferred depth.

### Acceptance Criteria
1.  After successful summarization, the generated summaries are displayed in the output area.
2.  Tabs labeled "Easy," "Medium," and "Hard" are present above the summary content.
3.  Clicking on each tab instantly displays the corresponding summary content.
4.  The summary initially displayed corresponds to the level selected before generation.
5.  The summary content is formatted for readability.

## Story 1.4 LLM Integration for Real Summaries
As a developer,
I want to integrate a real LLM into the backend,
so that the application can generate actual multi-level summaries.

### Acceptance Criteria
1.  The backend connects to a chosen LLM API (e.g., Google Gemini).
2.  The backend constructs appropriate prompts for "Easy," "Medium," and "Hard" summaries.
3.  The LLM generates summaries for all three levels based on the input text.
4.  The `/api/summarize` endpoint returns the actual generated summaries.
5.  Error handling for LLM API calls is implemented (e.g., handling API rate limits, connection errors).

## Epic 2 Adaptive Quizzes

## Story 2.1 Basic Quiz Generation
As a student,
I want to generate a quiz from my summarized notes,
so that I can test my understanding.

### Acceptance Criteria
1.  A button or option to "Generate Quiz" is available after summaries are displayed.
2.  Clicking "Generate Quiz" sends the summary content to a backend endpoint.
3.  The backend uses the LLM to generate multiple-choice questions or fill-in-the-blank questions based on the summary.
4.  The quiz questions are displayed to the user.

## Story 2.2 Adaptive Quiz Difficulty
As a student,
I want the quiz difficulty to adapt to my performance,
so that I can focus on areas where I need improvement.

### Acceptance Criteria
1.  The quiz system tracks correct and incorrect answers.
2.  After an answer, the system provides feedback on correctness.
3.  Based on performance, subsequent questions adjust in difficulty or focus on specific topics.

## Epic 3 PDF Upload & User Accounts

## Story 3.1 PDF Upload Functionality
As a student,
I want to upload PDF lecture notes,
so that I don't have to manually paste text.

### Acceptance Criteria
1.  The application provides an option to upload PDF files.
2.  Uploaded PDF content is extracted and processed for summarization.
3.  The summarization process works seamlessly with PDF input.

## Story 3.2 User Account Creation
As a student,
I want to create a user account,
so that I can personalize my learning experience.

### Acceptance Criteria
1.  A user registration process is available.
2.  Users can create an account with an email and password.
3.  User data is securely stored in a database.

## Story 3.3 Save Summaries and Quiz History
As a student with an account,
I want to save my generated summaries and quiz results,
so that I can review my progress over time.

### Acceptance Criteria
1.  Authenticated users can save summaries to their profile.
2.  Authenticated users can view a history of their past summaries and quiz results.
3.  Saved data is persistent across sessions.

## Checklist Results Report

## Next Steps

### UX Expert Prompt
@ux-expert Based on this Product Requirements Document, please create the `front-end-spec.md` with a strong focus on the user flows for text input, summary level selection, generation, and clear display of multi-level summaries, and save it to `docs/front-end-spec.md`.

### Architect Prompt
@architect Based on this Product Requirements Document and the forthcoming `front-end-spec.md`, please create the `fullstack-architecture.md` outlining the API specifications, data structures, and the concrete integration strategy with the selected LLM, and save it to `docs/fullstack-architecture.md`.