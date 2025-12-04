## Wireframes & Mockups
**Primary Design Files:** For conceptual layouts, please refer to `docs/wireframe.md`. Detailed visual designs (high-fidelity mockups, prototypes) would typically be in an external tool like Figma or Sketch.

### Key Screen Layouts
*   **Main Summarization Screen - Initial State**
    *   **Purpose:** Allow user to input text and configure summary generation.
    *   **Key Elements:**
        - Application Header ("QuizZum")
        - Large, resizable text input area with placeholder.
        - "Easy," "Medium," "Hard" radio buttons/toggles.
        - "Generate Summary" button (initially disabled).
        - Placeholder text for summary output area.
    *   **Interaction Notes:** "Generate Summary" button activates upon text input. Default summary level selected.
    *   **Design File Reference:** `docs/wireframe.md` - "1. Main Screen - Initial State"

*   **Main Summarization Screen - Loading State**
    *   **Purpose:** Provide feedback during summary generation.
    *   **Key Elements:**
        - Application Header ("QuizZum")
        - Disabled text input area.
        - Disabled summary level selector.
        - "Generate Summary" button in loading state (e.g., spinner).
        - Loading indicator (spinner/animation) in output area with optional message.
    *   **Interaction Notes:** No user interaction possible during this state for the input section.
    *   **Design File Reference:** `docs/wireframe.md` - "2. Main Screen - Loading State"

*   **Main Summarization Screen - Summary Display State**
    *   **Purpose:** Present generated summaries and allow dynamic switching.
    *   **Key Elements:**
        - Application Header ("QuizZum")
        - Re-enabled text input area.
        - Re-enabled summary level selector.
        - Re-enabled "Generate Summary" button.
        - Summary content displayed in output area.
        - Tabs ("Easy," "Medium," "Hard") above summary content.
    *   **Interaction Notes:** Clicking tabs instantly changes the displayed summary. User can initiate a new summary.
    *   **Design File Reference:** `docs/wireframe.md` - "3. Main Screen - Summary Display State"