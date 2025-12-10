# Story 1.1: Project Setup & Initial Web App Structure

Status: ready-for-dev

## Story

As a developer,
I want to set up the project repository and initial web application structure,
so that I can begin implementing core features.

## Acceptance Criteria

1.  Given a new project, when I initialize the project, then a git repository is created and configured.
2.  Given a new project, when I set up the basic web application, then a Single Page Application (SPA) structure is in place (e.g., using React or a similar framework).
3.  Given the initial setup, when I run the application, then a basic empty web page is displayed in the browser.

## Tasks / Subtasks

- [ ] **Task 1: Initialize Git Repository (AC: 1)**
  - [ ] Subtask 1.1: Run `git init` in the project root.
  - [ ] Subtask 1.2: Create a `.gitignore` file based on standard Next.js and Python projects.
  - [ ] Subtask 1.3: Make initial commit with project structure.
- [ ] **Task 2: Scaffold Next.js Frontend Application (AC: 2)**
  - [ ] Subtask 2.1: Execute `npx create-next-app@latest frontend --typescript --eslint --app` (or similar command given project context).
  - [ ] Subtask 2.2: Verify Next.js App Router structure is in place (`frontend/src/app/`).
  - [ ] Subtask 2.3: Integrate Chakra UI into the Next.js project.
- [ ] **Task 3: Scaffold FastAPI Backend Application (AC: 2)**
  - [ ] Subtask 3.1: Create `backend/` directory with basic FastAPI application structure (`backend/app/main.py`).
  - [ ] Subtask 3.2: Configure `requirements.txt` for FastAPI and necessary dependencies.
- [ ] **Task 4: Implement Basic Frontend Display (AC: 3)**
  - [ ] Subtask 4.1: Modify `frontend/src/app/page.tsx` to display a simple "Hello QuizZum!" message.
- [ ] **Task 5: Verify Application Startup (AC: 3)**
  - [ ] Subtask 5.1: Run `npm run dev` in `frontend/`.
  - [ ] Subtask 5.2: Access `localhost:3000` (or similar) in browser and confirm basic page display.
- [ ] **Task 6: Setup Local Development Environment (AC: 1, 2, 3)**
  - [ ] Subtask 6.1: Create `docker-compose.yml` for local development setup as per architectural guidelines (including placeholder services for PostgreSQL, Redis for future epics).
  - [ ] Subtask 6.2: Ensure `docker-compose.yml` allows the frontend and backend to run concurrently for development.
- [ ] **Task 7: Write Basic Unit/Integration Tests (AC: 1, 2, 3)**
  - [ ] Subtask 7.1: Add a simple test to verify `.git` folder exists after initialization.
  - [ ] Subtask 7.2: Add a simple test to verify `package.json` contains Next.js and React dependencies.
  - [ ] Subtask 7.3: Add a simple test to confirm a basic empty web page is displayed when running the application.

## Dev Notes

- Relevant architecture patterns and constraints
  - The project follows a split-repository structure with `frontend` (Next.js) and `backend` (FastAPI).
  - Use Next.js App Router for frontend development.
  - Core technologies: React, Next.js, Chakra UI for frontend; FastAPI, Python for backend.
  - Local development environment is prioritized for MVP.
  - Adhere to consistency rules for naming conventions and code organization as defined in `architecture.md`.
- Source tree components to touch
  - Project root for `.git` and `.gitignore`.
  - `frontend/` directory for Next.js application.
  - `backend/` directory for FastAPI application.
  - `docker-compose.yml` for local environment setup.
- Testing standards summary
  - Layered testing approach will be adopted: Unit, Integration, E2E.
  - Tests should be co-located with the code they cover.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the initial scaffolding.
  - Frontend: `frontend/src/app/input-screen/` for UI components, `frontend/src/components/` for reusable components.
  - Backend: `backend/app/api/upload/` for API endpoints, `backend/app/core/pdf_parser.py` for PDF processing.
  - Overall structure adheres to the split-repository approach defined in `architecture.md`.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this foundational stage.

### References

- [Source: docs/architecture.md#Project Structure]
- [Source: docs/architecture.md#Consistency Rules]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Traceability Mapping]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Dependencies and Integrations]
- [Source: docs/epics-QuizZum-2025-12-05.md#Epic 1: Foundation & Core Content Input]

## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-1-project-setup-initial-web-app-structure.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

## Change Log

- **2025-12-09**: Initial draft created.
