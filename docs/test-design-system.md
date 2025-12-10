# System-Level Test Design

## Testability Assessment

- Controllability: PASS - Data factories, mockable external dependencies (LLMs), Docker for environment reset.
- Observability: PASS - Structured logging enables system state inspection; deterministic tests emphasize clear outcomes.
- Reliability: PASS - Tests designed for isolation and proper cleanup, failures are reproducible, components are loosely coupled.

## Architecturally Significant Requirements (ASRs)

*   **ASR: Responsive feedback during AI processing**
    *   **Category:** PERF
    *   **Probability:** 3 (Likely)
    *   **Impact:** 3 (Critical)
    *   **Score:** 9 (BLOCK)
    *   **Mitigation:** Robust async/WebSockets, frontend loading states.

*   **ASR: LLM API reliability (retries, graceful handling)**
    *   **Category:** OPS (Operations)
    *   **Probability:** 3 (Likely)
    *   **Impact:** 3 (Critical)
    *   **Score:** 9 (BLOCK)
    *   **Mitigation:** Implement retry mechanisms, circuit breakers, clear error reporting.

*   **ASR: General security best practices (input validation, secret handling)**
    *   **Category:** SEC
    *   **Probability:** 2 (Possible)
    *   **Impact:** 3 (Critical)
    *   **Score:** 6 (MITIGATE)
    *   **Mitigation:** Strict input validation on backend, secure API key storage.

*   **ASR: Scalability (handling increasing users)**
    *   **Category:** PERF
    *   **Probability:** 1 (Unlikely for MVP)
    *   **Impact:** 2 (Degraded if popular)
    *   **Score:** 2 (DOCUMENT)
    *   **Mitigation:** Architecture designed for horizontal scaling.

## Test Levels Strategy

*   **Unit Tests (60-70%):** Focus on core business logic in FastAPI services, LLM prompt construction, data transformations. React component pure functions/hooks.
*   **Integration Tests (20-30%):** Cover FastAPI API endpoints, database interactions (Prisma), LLM integrations (mocking external LLM), WebSockets. Frontend API client interactions.
*   **End-to-End (E2E) Tests (5-10%):** Critical user journeys (e.g., upload PDF -> get summary; take quiz -> get adaptive quiz). Simulate full stack.

## NFR Testing Approach

*   **Security**: `pytest` for backend API authentication/authorization. E2E tests (`Playwright`/`Cypress`) for frontend auth flows.
*   **Performance**: `k6` for backend load testing. `Playwright`/`Cypress` for perceived frontend performance (Core Web Vitals).
*   **Reliability**: `pytest` (backend) and `Playwright`/`Cypress` (frontend) for error handling/retry mechanisms. Mock external LLM failures.
*   **Maintainability**: CI checks (code coverage, linting, formatting).

## Test Environment Requirements

*   **Local Development:** Docker Compose for containerized Next.js, FastAPI, PostgreSQL setup.
*   **CI/CD:** Isolated and ephemeral environments for running automated tests.

## Testability Concerns (if any)

No fundamental architectural decisions identified that harm testability. The modular design, async nature, and containerization actively promote testability. The inherent variability and latency of external LLM APIs are managed by the chosen AI Integration strategy.

## Recommendations for Sprint 0

*   Set up core testing frameworks: `pytest` (Python), `Jest` + `React Testing Library` (JavaScript), and `Playwright` or `Cypress` (E2E).
*   Integrate initial CI checks for code quality (linting, formatting) and basic test execution.

---

### Risk Assessment Matrix (System-Level ASRs)

| Risk ID | Category | Description                               | Probability | Impact | Score | Mitigation                                                     |
| :------ | :------- | :---------------------------------------- | :---------- | :----- | :---- | :------------------------------------------------------------- |
| R-001   | PERF     | Responsive feedback during AI processing  | 3           | 3      | 9     | Robust async/WebSockets, frontend loading states.              |
| R-002   | OPS      | LLM API reliability (retries, graceful handling) | 3        | 3      | 9     | Implement retry mechanisms, circuit breakers, error reporting. |
| R-003   | SEC      | General security (input validation, secrets) | 2        | 3      | 6     | Strict input validation, secure API key storage.               |
| R-004   | PERF     | Scalability (handling increasing users)   | 1           | 2      | 2     | Architecture designed for horizontal scaling.                  |

### High-Level Test Coverage Plan

Test coverage will be structured as follows:

*   **Unit Tests:** Will cover core logic in FastAPI services (LLM prompt construction, data transformations) and isolated React components/hooks.
*   **Integration Tests:** Will focus on FastAPI API endpoints, database interactions via Prisma, and LLM integrations (mocking external LLM).
*   **End-to-End (E2E) Tests:** Will validate critical user journeys such as content upload, summary generation, quiz generation, and adaptive quizzing flows.

### Test Execution Order (System-Level)

At this system-level review, the focus is on establishing the test framework and validating NFRs. Specific execution order for feature tests will be defined per epic.

**High-Level Phases:**
1.  **Unit Tests:** Run continuously during development.
2.  **Integration Tests:** Run on feature branches, pre-merge.
3.  **E2E Tests:** Run on pre-release branches and before deployments.
4.  **NFR Tests (Performance, Security, Reliability):** Run periodically and before major releases on dedicated environments.

### Preliminary Test Effort Estimates (Sprint 0/Setup)

*   **Test Framework Setup (Frontend & Backend):** ~40-60 hours (setting up Pytest, Jest, Playwright/Cypress, CI integration).
*   **Initial NFR Test Setup (Performance/Security/Reliability baselines):** ~20-30 hours.
*   **Total Initial Setup Effort:** ~60-90 hours.

### Quality Gate Criteria (System-Level)

*   All P0 tests (critical paths) must pass (100%).
*   No high-risk (score ≥6) ASRs unmitigated at release time.
*   Test coverage targets for unit/integration tests (e.g., ≥80% for critical services) will be defined.
*   NFR tests (Performance, Security, Reliability) must meet defined thresholds.

---

## Validation Summary

*   **Architecture Completeness:** Mostly Complete
*   **Version Specificity:** Some Missing (All versions are TBD)
*   **Pattern Clarity:** Clear
*   **AI Agent Readiness:** Mostly Ready

**Critical Issues Found:**
*   **No specific critical issues found for the system-level test design document itself.** The design provides clear guidance.

**Recommended Actions Before Implementation:**

1.  **Pin Down Specific Versions:** Before initiating implementation, research and document specific, stable (preferably LTS for key components like Node.js and Python) version numbers for all technologies in the stack. This ensures consistency and avoids unexpected compatibility issues.
2.  **Team Review of ASRs:** Review the identified Architecturally Significant Requirements (ASRs) and their risk scores (R-001 and R-002 are critical blockades) with the development team to prioritize and plan detailed mitigation strategies.
3.  **Run `atdd` Workflow:** The next logical step is to run the `atdd` workflow to translate these high-level ASRs and architectural decisions into concrete, failing P0 (critical) End-to-End test scenarios. This will ensure critical paths are covered early.
4.  **Set up Test Data Factories and Fixtures:** As part of the next phase, planning for robust test data management will be crucial to ensure deterministic and isolated tests.
5.  **Define Detailed Execution Order & P0/P1 Lists:** This will be done during epic-level test design, building upon the high-level phases defined here.
