# Story 1.1: Project Setup & Initial Web App Structure

Status: in-progress

## Story

As a developer,
I want to set up the project repository and initial web application structure,
so that I can begin implementing core features.

## Acceptance Criteria

1.  Given a new project, when I initialize the project, then a git repository is created and configured.
2.  Given a new project, when I set up the basic web application, then a Single Page Application (SPA) structure is in place (Next.js, React).
3.  Given the initial setup, when I run the application, then a basic empty web page is displayed in the browser.

## Tasks / Subtasks

- [x] Task: Initialize Git repository. (AC: 1)
- [ ] Task: Scaffold Next.js project (`nextjs-frontend`) with JavaScript and Tailwind CSS using `npx create-next-app@latest --js --tailwind`. (AC: 2)
- [x] Task: Set up basic FastAPI backend structure (`fastapi-backend`). (AC: 2)
- [x] Task: Configure PostgreSQL and Prisma ORM for initial Content data model. (AC: 2)
- [x] Task: Configure `docker-compose.yml` for local development environment with frontend, backend, and database services. (AC: 2)
- [ ] Task: Verify successful launch of frontend, backend, and database via Docker Compose. (AC: 3)
- [ ] Task: Write P0 E2E test (`Playwright` or `Cypress`) to verify basic empty web page display. (AC: 3)

## Dev Notes

### Project Context Summary

This story establishes the fundamental project environment for QuizZum. It lays the groundwork for all subsequent development by setting up the multi-repository structure, core frontend and backend frameworks, and the local development environment using Docker. It directly supports Epic 1: "Foundation & Core Content Input".

### Project Structure Alignment

This story directly implements the foundational elements of the defined project structure:
*   Creation of `nextjs-frontend/` and `fastapi-backend/` directories.
*   Initial setup of `docker-compose.yml`.
*   Ensures alignment with the overall architecture's multi-repo approach.

### Technical Mandates and Constraints

*   **Frontend Framework:** Next.js (JavaScript).
*   **Styling:** Tailwind CSS.
*   **Accessible Components:** Headless UI (to be integrated post-setup).
*   **Backend Framework:** FastAPI (Python).
*   **Database:** PostgreSQL with Prisma ORM.
*   **Local Development:** Docker Compose.
*   **Testing:** P0 E2E test for basic page display (`Playwright` or `Cypress`).

### Learnings from Previous Story (1.1: Project Setup & Initial Web App Structure)

*   **Project Setup:** The previous story established the Docker Compose setup for Next.js, FastAPI, and PostgreSQL. Developers should leverage this existing environment.
*   **Frontend Scaffolding:** The `nextjs-frontend` project has been initialized. Developers should start building the input UI within this structure.
*   **P0 E2E Test:** Story 1.1 included a P0 E2E test for basic page display. Subsequent stories can integrate similar E2E tests for critical user flows as needed, but this story focuses on component-level UI.

### References

*   [Source: docs/architecture.md#Project-Initialization]
*   [Source: docs/architecture.md#Project-Structure]
*   [Source: docs/architecture.md#Identified-Architectural-Decisions]
*   [Source: docs/sprint-artifacts/tech-spec-epic-epic-1.md]
*   [Source: docs/epics-QuizZum-2025-12-05.md#Epic-1-Foundation--Core-Content-Input]

## Dev Agent Record

### Context Reference

*   [Source: docs/sprint-artifacts/1-1-project-setup-initial-web-app-structure.context.xml]

### Agent Model Used

{{agent_model_name_version}}

### Debug Log References

### Completion Notes List

*   Verified successful Docker Compose launch, with FastAPI backend responding at `http://localhost:8000` and Next.js frontend displaying the basic starter page at `http://localhost:3000`.
*   Implemented P0 E2E test (`nextjs-frontend/tests/home.spec.js`) using Playwright, which successfully passed.

### File List

*   NEW: `nextjs-frontend/tests/home.spec.js`
*   NEW: `docker-compose.yml`
*   MODIFIED: `fastapi-backend/app.py`
*   MODIFIED: `fastapi-backend/requirements.txt`
*   MODIFIED: `fastapi-backend/Dockerfile`
*   MODIFIED: `nextjs-frontend/Dockerfile`
*   MODIFIED: `nextjs-frontend/package.json`
*   MODIFIED: `nextjs-frontend/src/app/layout.js`
*   NEW: `nextjs-frontend/postcss.config.js`
*   NEW: `nextjs-frontend/playwright.config.js`
*   NEW: `.github/workflows/playwright.yml`

## Story Quality Validation Report

Story: `1-1-project-setup-initial-web-app-structure` - Project Setup & Initial Web App Structure
Outcome: PASS (Critical: 0, Major: 0, Minor: 0)

## Critical Issues (Blockers)

N/A

## Major Issues (Should Fix)

N/A

## Minor Issues (Nice to Have)

N/A

## Successes

*   Story content is well-aligned with PRD, Epics, Architecture, and Epic Tech Spec.
*   Acceptance Criteria are atomic, testable, and directly traceable to sources.
*   Tasks are clearly mapped to acceptance criteria, including specific testing subtasks.
*   Dev Notes provide specific architectural and technical guidance with relevant citations.
*   The story structure adheres to the defined format.