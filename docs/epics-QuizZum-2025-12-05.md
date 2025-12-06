# QuizZum - Epic Breakdown

**Author:** Eline&Sindre
**Date:** 2025-12-05
# QuizZum - Epic Breakdown

**Author:** Eline&Sindre
**Date:** 2025-12-05
# QuizZum - Epic Breakdown

**Author:** Eline&Sindre
**Date:** 2025-12-05
**Project Level:** 1 (Greenfield)
**Target Scale:** Small to Medium (Personal/Hobby Project)

---

## Overview

This document provides the complete epic and story breakdown for QuizZum, decomposing the requirements from the [PRD](./prd-QuizZum-2025-12-05.md) into implementable stories.

**Living Document Notice:** This is the initial version. It will be updated after UX Design and Architecture workflows add interaction and technical details to stories.

## Epics Summary

**Epic 1: Foundation & Core Content Input**
*   **Goal**: Establish the basic application infrastructure and allow users to provide content for processing.
*   **Covers FRs**: FR1, FR2, FR18, FR19, FR20
*   **Rationale**: Before any summarization or quizzing can happen, the application needs to exist, be accessible, and accept input. This also covers the core infrastructure needed for any web app.

**Epic 2: Multi-level Summarization**
*   **Goal**: Enable users to generate and consume multi-level summaries of their content.
*   **Covers FRs**: FR3, FR4, FR5, FR6, FR7, FR8, FR21
*   **Rationale**: This delivers the core value proposition of intelligent summarization. The UX (FR21) is critical for this.

**Epic 3: Adaptive Quizzing**
*   **Goal**: Allow users to test their understanding and reinforce learning through adaptive quizzes.
*   **Covers FRs**: FR9, FR10, FR11, FR12, FR13, FR14, FR15, FR16, FR17, FR22
*   **Rationale**: This builds on summarization to provide active learning and adaptive feedback. The "playable learning experience" (FR22) is integral here.

---

## Functional Requirements Inventory

**Content Input & Management:**
*   FR1: Users can input text notes into the application.
*   FR2: Users can upload PDF documents containing notes.

**Summarization & Content Presentation:**
*   FR3: The system can generate "easy" level summaries from provided content.
*   FR4: The system can generate "medium" level summaries from provided content.
*   FR5: The system can generate "hard" level summaries from provided content.
*   FR6: Users can select the desired difficulty level for summaries.
*   FR7: Users can switch between different difficulty levels of generated summaries seamlessly.
*   FR8: Content (summaries) is structured for maximum readability (bullet points, headings, sections).

**Quizzing & Assessment:**
*   FR9: The system can generate quizzes based on provided content.
*   FR10: The system can generate "easy" level quizzes.
*   FR11: The system can generate "medium" level quizzes.
*   FR12: The system can generate "hard" level quizzes.
*   FR13: Users can answer quiz questions.
*   FR14: The system can assess user quiz answers.
*   FR15: The system can provide immediate feedback on quiz answers (correct/incorrect).
*   FR16: The system can provide a summary score for completed quizzes.
*   FR17: The system can generate adaptive follow-up quizzes to target user weak spots.

**User Experience & Platform:**
*   FR18: The application runs as a Single Page Application (SPA).
*   FR19: The application functions on the latest stable versions of Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, and Opera on desktop.
*   FR20: The application is fully responsive across various screen sizes (desktop, tablet, mobile).
*   FR21: The system provides a radically simple and intuitive user interface.
*   FR22: The system supports an active and "playable" learning experience.

---

## FR Coverage Map

*   **Epic 1: Foundation & Core Content Input**:
    *   FR1: Users can input text notes into the application.
    *   FR2: Users can upload PDF documents containing notes.
    *   FR18: The application runs as a Single Page Application (SPA).
    *   FR19: The application functions on the latest stable versions of Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, and Opera on desktop.
    *   FR20: The application is fully responsive across various screen sizes (desktop, tablet, mobile).
*   **Epic 2: Multi-level Summarization**:
    *   FR3: The system can generate "easy" level summaries from provided content.
    *   FR4: The system can generate "medium" level summaries from provided content.
    *   FR5: The system can generate "hard" level summaries from provided content.
    *   FR6: Users can select the desired difficulty level for summaries.
    *   FR7: Users can switch between different difficulty levels of generated summaries seamlessly.
    *   FR8: Content (summaries) is structured for maximum readability (bullet points, headings, sections).
    *   FR21: The system provides a radically simple and intuitive user interface.
*   **Epic 3: Adaptive Quizzing**:
    *   FR9: The system can generate quizzes based on provided content.
    *   FR10: The system can generate "easy" level quizzes.
    *   FR11: The system can generate "medium" level quizzes.
    *   FR12: The system can generate "hard" level quizzes.
    *   FR13: Users can answer quiz questions.
    *   FR14: The system can assess user quiz answers.
    *   FR15: The system can provide immediate feedback on quiz answers (correct/incorrect).
    *   FR16: The system can provide a summary score for completed quizzes.
    *   FR17: The system can generate adaptive follow-up quizzes to target user weak spots.
    *   FR22: The system supports an active and "playable" learning experience.

---

## Epic 1: Foundation & Core Content Input
*   **Goal**: Establish the basic application infrastructure and allow users to provide content for processing.

### Story 1.1: Project Setup & Initial Web App Structure
*   **User Story**: As a developer, I want to set up the project repository and initial web application structure, so that I can begin implementing core features.
*   **Acceptance Criteria**:
    *   Given a new project, when I initialize the project, then a git repository is created and configured.
    *   Given a new project, when I set up the basic web application, then a Single Page Application (SPA) structure is in place (e.g., using React or a similar framework).
    *   Given the initial setup, when I run the application, then a basic empty web page is displayed in the browser.
*   **Prerequisites**: None
*   **Technical Notes**: This story covers repository creation, initial frontend (SPA) scaffolding, and basic server setup for hosting the frontend.

### Story 1.2: Text Input Interface
*   **User Story**: As a user, I want to paste or type my notes into a dedicated text area, so that I can easily provide content for summarization.
*   **Acceptance Criteria**:
    *   Given the application is loaded, when I navigate to the input screen, then a prominent and usable text area is displayed.
    *   Given the text area is displayed, when I type or paste text into it, then the text is visible and editable.
    *   Given text is entered, when I click "Generate", then the text content is prepared for processing.
*   **Covers FRs**: FR1, FR21 (partially - contributes to simple UI)
*   **Prerequisites**: Story 1.1
*   **Technical Notes**: Implement a `<textarea>` HTML element, with basic styling and JavaScript handling.

### Story 1.3: PDF Upload Interface
*   **User Story**: As a user, I want to upload a PDF file containing my notes, so that I can provide content for summarization without manual copying.
*   **Acceptance Criteria**:
    *   Given the application is loaded, when I navigate to the input screen, then a clearly labeled "Upload PDF" button or drag-and-drop zone is visible.
    *   Given the upload component is visible, when I select a PDF file, then the file name is displayed.
    *   Given a PDF file is uploaded, when I click "Generate", then the PDF content is prepared for processing.
*   **Covers FRs**: FR2, FR21 (partially - contributes to simple UI)
*   **Prerequisites**: Story 1.1
*   **Technical Notes**: Implement `<input type="file">` with JavaScript for handling file selection. Backend integration for receiving the file.

### Story 1.4: Core Backend Setup for Content Reception
*   **User Story**: As a developer, I want a functional backend endpoint to receive text and PDF inputs, so that the frontend can send user content for processing.
*   **Acceptance Criteria**:
    *   Given the backend server is running, when a `POST` request with text content is sent to `/api/upload_text`, then the backend successfully receives and acknowledges the text.
    *   Given the backend server is running, when a `POST` request with a PDF file is sent to `/api/upload_pdf`, then the backend successfully receives and stores the PDF file (e.g., temporarily).
    *   Given the backend is set up, when the frontend sends content, then appropriate HTTP responses (e.g., 200 OK) are returned.
*   **Covers FRs**: FR1, FR2
*   **Prerequisites**: Story 1.1 (backend part)
*   **Technical Notes**: Implement FastAPI endpoints (`/api/upload_text`, `/api/upload_pdf`) for text and PDF reception.

### Story 1.5: Basic Browser Compatibility & Responsiveness
*   **User Story**: As a user, I want to access QuizZum from common web browsers and devices, so that I can use the tool without compatibility issues.
*   **Acceptance Criteria**:
    *   Given QuizZum is accessed via the latest stable versions of Chrome, Edge, Firefox, Brave, and Opera on desktop, when I interact with the application, then all UI elements function as expected.
    *   Given QuizZum is accessed on a mobile device, when I interact with the application, then the UI layout adjusts appropriately and remains usable.
*   **Covers FRs**: FR19, FR20
*   **Prerequisites**: Story 1.1, Story 1.2, Story 1.3
*   **Technical Notes**: Implement responsive CSS. Test across specified browsers.

---

<!-- Repeat for each epic (N = 1, 2, 3...) -->

## Epic {{N}}: {{epic_title_N}}

{{epic_goal_N}}

<!-- Repeat for each story (M = 1, 2, 3...) within epic N -->

### Story {{N}}.{{M}}: {{story_title_N_M}}

As a {{user_type}},
I want {{capability}},
So that {{value_benefit}}.

**Acceptance Criteria:**

**Given** {{precondition}}
**When** {{action}}
**Then** {{expected_outcome}}

**And** {{additional_criteria}}

**Prerequisites:** {{dependencies_on_previous_stories}}

**Technical Notes:** {{implementation_guidance}}

<!-- End story repeat -->

---

<!-- End epic repeat -->

---

## FR Coverage Matrix

*   **Epic 1: Foundation & Core Content Input**:
    *   FR1: Users can input text notes into the application.
    *   FR2: Users can upload PDF documents containing notes.
    *   FR18: The application runs as a Single Page Application (SPA).
    *   FR19: The application functions on the latest stable versions of Google Chrome, Microsoft Edge, Mozilla Firefox, Brave, and Opera on desktop.
    *   FR20: The application is fully responsive across various screen sizes (desktop, tablet, mobile).
*   **Epic 2: Multi-level Summarization**:
    *   FR3: The system can generate "easy" level summaries from provided content.
    *   FR4: The system can generate "medium" level summaries from provided content.
    *   FR5: The system can generate "hard" level summaries from provided content.
    *   FR6: Users can select the desired difficulty level for summaries.
    *   FR7: Users can switch between different difficulty levels of generated summaries seamlessly.
    *   FR8: Content (summaries) is structured for maximum readability (bullet points, headings, sections).
    *   FR21: The system provides a radically simple and intuitive user interface.
*   **Epic 3: Adaptive Quizzing**:
    *   FR9: The system can generate quizzes based on provided content.
    *   FR10: The system can generate "easy" level quizzes.
    *   FR11: The system can generate "medium" level quizzes.
    *   FR12: The system can generate "hard" level quizzes.
    *   FR13: Users can answer quiz questions.
    *   FR14: The system can assess user quiz answers.
    *   FR15: The system can provide immediate feedback on quiz answers (correct/incorrect).
    *   FR16: The system can provide a summary score for completed quizzes.
    *   FR17: The system can generate adaptive follow-up quizzes to target user weak spots.
    *   FR22: The system supports an active and "playable" learning experience.

---

## Summary

The epic breakdown for QuizZum successfully decomposes the Product Requirements Document into three user-value-driven epics:

*   **Epic 1: Foundation & Core Content Input**: Establishes the necessary infrastructure and enables basic content ingestion (text and PDF), ensuring the application is functional and accessible across common browsers.
*   **Epic 2: Multi-level Summarization**: Delivers the core adaptive summarization functionality, allowing users to generate and switch between easy, medium, and hard summaries with a focus on an intuitive user interface.
*   **Epic 3: Adaptive Quizzing**: Provides the essential active learning component, enabling users to generate, take, and receive immediate feedback on quizzes, including adaptive follow-up quizzes targeting weak spots.

All 22 Functional Requirements from the PRD have been mapped to specific stories within these epics, ensuring comprehensive coverage. The stories are designed to be bite-sized, vertically sliced, and implementable, with detailed acceptance criteria and technical notes. This breakdown provides a clear, actionable plan for the initial development phases of QuizZum.

---

_For implementation: Use the `create-story` workflow to generate individual story implementation plans from this epic breakdown._

_This document will be updated after UX Design and Architecture workflows to incorporate interaction details and technical decisions._
