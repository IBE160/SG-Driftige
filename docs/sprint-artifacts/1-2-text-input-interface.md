# Story 1.2: Text Input Interface

Status: ready-for-dev

## Story

As a user,
I want to paste or type my notes into a dedicated text area,
so that I can easily provide content for summarization.

## Acceptance Criteria

1.  Given the application is loaded, when I navigate to the input screen, then a prominent and usable text area is displayed.
2.  Given the text area is displayed, when I type or paste text into it, then the text is visible and editable.
3.  Given text is entered, when I click "Generate", then the text content is prepared for processing.

## Tasks / Subtasks

- [ ] **Task 1: Implement Text Area UI (AC: 1)**
  - [ ] Subtask 1.1: Create a React component for the text input area within `frontend/src/app/input-screen/`.
  - [ ] Subtask 1.2: Ensure the text area is prominent and usable, leveraging Chakra UI for styling.
- [ ] **Task 2: Enable Text Input and Editing (AC: 2)**
  - [ ] Subtask 2.1: Implement state management for the text area content.
  - [ ] Subtask 2.2: Verify text can be typed and pasted into the area.
- [ ] **Task 3: Implement "Generate" Button and Text Preparation (AC: 3)**
  - [ ] Subtask 3.1: Add a "Generate" button to the input screen.
  - [ ] Subtask 3.2: On button click, capture the text area content.
  - [ ] Subtask 3.3: Implement client-side logic to prepare the text for `POST /api/upload/text` (e.g., format as JSON).
- [ ] **Task 4: Write UI and Unit Tests (AC: 1, 2, 3)**
  - [ ] Subtask 4.1: Write UI tests to verify the text area's visibility and focus.
  - [ ] Subtask 4.2: Write UI tests to confirm text input and editing functionality.
  - [ ] Subtask 4.3: Write unit tests for the client-side text preparation logic and API call mock.

## Dev Notes

- Relevant architecture patterns and constraints
  - The project follows a split-repository structure with `frontend` (Next.js) and `backend` (FastAPI).
  - Use Next.js App Router for frontend development.
  - UI components should be built using Chakra UI.
  - Frontend to Backend communication for text upload will use `POST /api/upload/text` endpoint.
- Source tree components to touch
  - `frontend/src/app/input-screen/` for the main text input component.
  - `frontend/src/components/` for any reusable UI elements (e.g., button).
  - `frontend/src/lib/` for client-side API interaction logic.
- Testing standards summary
  - Layered testing approach will be adopted: Unit, Integration, E2E.
  - UI tests for component functionality.
  - Unit tests for logic related to text preparation and API calls.

### Project Structure Notes

- Alignment with unified project structure (paths, modules, naming)
  - This story focuses on the UI component for text input.
  - Frontend: `frontend/src/app/input-screen/` will contain the text input UI.
  - Overall structure adheres to the split-repository approach defined in `architecture.md`.
- Detected conflicts or variances (with rationale)
  - No conflicts or variances detected at this stage.

### References

- [Source: docs/architecture.md#Project Structure]
- [Source: docs/architecture.md#Consistency Rules]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Traceability Mapping]
- [Source: docs/sprint-artifacts/tech-spec-epic-1.md#Dependencies and Integrations]
- [Source: docs/epics-QuizZum-2025-12-05.md#Epic 1: Foundation & Core Content Input]


## Dev Agent Record

### Context Reference

- docs/sprint-artifacts/1-2-text-input-interface.context.xml

### Agent Model Used

gemini-1.5-flash-latest

### Debug Log References

### Completion Notes List

### File List

### Learnings from Previous Story

**From Story 1.1: Project Setup & Initial Web App Structure (Status: drafted)**

- **New Capabilities**: Initial project setup (git, Next.js frontend, FastAPI backend) and basic local dev environment (`docker-compose.yml`) are in place.
- **Architectural Context**: The split-repository structure (`frontend/`, `backend/`) and core technologies (React/Next.js, FastAPI/Python) are established.
- **Testing Setup**: Basic unit/integration tests for project setup are defined.

[Source: docs/sprint-artifacts/1-1-project-setup-initial-web-app-structure.md]

## Change Log

- **2025-12-09**: Initial draft created.
- **2025-12-09**: Status changed to ready-for-dev. Context file created.
