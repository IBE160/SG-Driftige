# Sprint Change Proposal - 2025-12-14

**Issue Summary:**
"Despite stories covering LLM-based summary and quiz generation features being marked as complete, core AI functionalities are non-operational in the deployed environment. This is due to a combination of factors: pervasive mock implementations or commented-out LLM API call logic across major functions (summary generation, quiz generation, adaptive quiz regeneration); critical configuration omissions (missing `LLM_API_KEY` and `LLM_API_ENDPOINT` definitions in `docker-compose.yml`); a fundamental communication barrier (missing CORS setup in FastAPI); a frontend-backend contract mismatch for text input submission; and an incomplete frontend implementation for PDF upload. These combined issues prevent the end-to-end functionality of key product features, causing the application to rely on non-functional stubs or fail entirely where LLM interaction is expected. The impact is that the core value proposition of QuizZum (AI-powered summarization and quizzing) is unfulfilled, leading to 'Failed to fetch' errors in the frontend and a broken user experience."

**Impact Analysis:**
Epic 1 (Foundation & Core Content Input), Epic 2 (Multi-level Summarization), Epic 3 (Adaptive Quizzing) are all directly impacted. Their core functionalities are currently non-operational due to the issues. No changes to epic scope, acceptance criteria, order, or priority are required. The changes are focused on bringing the implementation of existing stories to fully meet the already defined epic goals.

**Recommended Approach:** Direct Adjustment.
**Justification:** This approach directly aligns with the user's explicit objective: to update existing code within the framework of existing stories to achieve fully functional LLM integration and resolve communication/configuration issues, without introducing new epics, stories, or UX changes. It focuses on completing already defined work that was left in an incomplete state (mocks, missing configuration, bugs). This strategy minimizes disruption to existing planning while delivering the core value proposition of the application by bringing the current implementation up to the expected standard. It avoids the overhead of replanning entire epics or redefining scope, which is not required as the issues are implementation-specific rather than requirement-specific.

**PRD MVP Impact:** The original PRD MVP is directly affected as its core AI-powered features (Multi-level Summaries, Quiz Module, Adaptive Follow-up Quizzes) are not functionally delivered due to the identified issues. Rectifying these issues will bring the application into alignment with the stated MVP goals.

**High-Level Action Plan (Prioritized):**

1.  **Fix Core Communication & Configuration:**
    *   Implement CORS middleware in `fastapi-backend/app/main.py`.
    *   Update `docker-compose.yml` to uncomment and provide placeholders for `LLM_API_KEY` and `LLM_API_ENDPOINT`.
    *   Fix frontend `submitText` payload mismatch in `nextjs-frontend/src/lib/api.js`.
2.  **Enable LLM Functionality:**
    *   Identify all LLM integration files (e.g., `quiz_generator.py`, and summarization equivalents) and replace mock functions/uncomment actual LLM API calls.
3.  **Complete Frontend Features:**
    *   Implement frontend PDF upload in `nextjs-frontend/src/components/InputForm.jsx` and `nextjs-frontend/src/lib/api.js`.
4.  **Verification:**
    *   Review and update existing tests (unit, integration, E2E) to validate real LLM integration and end-to-end functionality.

**Dependencies and Sequencing:** Fixing CORS and LLM configuration (Step 1) are critical prerequisites for fully testing and deploying any LLM-dependent feature. The payload mismatch fix is also a high-priority unblocker. LLM functionality (Step 2) depends on configuration. Frontend PDF upload (Step 3) can be done somewhat in parallel but relies on backend stability. Testing (Step 4) should follow all implementation.

**Agent Handoff Plan:**
*   **Change Scope Classification:** Minor to Moderate.
*   **Recipient:** Development team (specifically, the `dev-agent`).
*   **Responsibilities:** The `dev-agent` will be responsible for executing all identified code and configuration changes, performing necessary testing, and ensuring end-to-end functionality as outlined in the action plan.
*   **Expected Outcome:** Fully functional LLM-driven summarization and quizzing features, working frontend-backend communication, and complete text/PDF input, all within the existing story and epic definitions.