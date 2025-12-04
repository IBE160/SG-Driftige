# MVP Wireframe: Multi-level Summary Tool

This document outlines the wireframe and user flow for the main screen of the Multi-level Summary MVP. The design prioritizes simplicity and a frictionless user experience.

## 1. Main Screen - Initial State

This is the view a user sees when they first open the application.

### Layout:
*   **Header:** A simple, clean header containing the application title, "QuizZum".
*   **Main Content Area:** On desktop, this will be a two-column layout. On mobile, the columns will stack vertically (Input on top, Output below).
    *   **Left Column (Input):** Contains all user input controls.
    *   **Right Column (Output):** Initially displays a welcome or placeholder message.

### Components (Input Column):
*   **Input Text Area:**
    *   **Description:** A large, multi-line text area for users to paste their lecture notes.
    *   **Placeholder Text:** "Paste your lecture notes here..."
    *   **Sizing:** Should be vertically resizable and have a default height of approximately 25-30 lines to accommodate substantial text.
*   **Summary Level Selector:**
    *   **Description:** A visually clear set of radio buttons or styled toggles.
    *   **Label:** "Select Summary Level:"
    *   **Options:**
        *   Easy
        *   Medium (Selected by default)
        *   Hard
*   **Generate Button:**
    *   **Description:** A prominent, primary action button.
    *   **Label:** "Generate Summary"
    *   **State:** The button is **disabled** by default and becomes **enabled** only when there is text present in the Input Text Area.

### Components (Output Column):
*   **Placeholder View:**
    *   **Description:** A simple, centered message in the area where the summary will appear.
    *   **Text:** "Your generated summary will appear here."

---

## 2. Main Screen - Loading State

This view is shown immediately after the user clicks the "Generate Summary" button.

### Changes from Initial State:
*   **Input Column:** All input controls (text area, level selector, and generate button) are **disabled** to prevent modification during processing. The Generate button can show a subtle loading state (e.g., a spinner inside the button).
*   **Output Column:**
    *   **Loading Indicator:** The placeholder text is replaced with a loading animation (e.g., a spinner, a pulsing logo, or a skeleton screen layout) to provide clear feedback that the summary is being generated.
    *   **Loading Message:** An optional text message such as "Generating your summary..." can accompany the indicator.

---

## 3. Main Screen - Summary Display State

This is the view after the summary has been successfully generated and returned from the AI.

### Changes from Loading State:
*   **Input Column:** Controls are re-enabled, allowing the user to modify the text or generate a new summary.
*   **Output Column:**
    *   **Summary Tabs:**
        *   **Description:** A set of tabs appears at the top of the output area, enabling easy navigation between the different summary levels.
        *   **Labels:** "Easy", "Medium", "Hard".
        *   **Behavior:** The tab corresponding to the summary level the user initially selected is active by default. For example, if the user chose "Medium", the "Medium" tab is shown first.
    *   **Summary Content Area:**
        *   **Description:** Displays the text of the generated summary for the currently active tab.
        *   **Formatting:** The text must be well-formatted and highly readable, with appropriate paragraph spacing, line height, and font size. It should be scrollable if the content is long.

---

## User Flow Summary

1.  **Open App:** User sees the **Initial State**.
2.  **Paste Text:** User pastes their notes into the text area. The "Generate Summary" button becomes enabled.
3.  **Select Level:** User chooses a summary level (e.g., "Hard").
4.  **Generate:** User clicks the "Generate Summary" button.
5.  **Loading:** The application transitions to the **Loading State**. All inputs are disabled, and a loading indicator is shown.
6.  **Processing:** The application sends the request to the backend and waits for the LLM to generate all three summary levels.
7.  **Display:** The app transitions to the **Summary Display State**.
8.  **View Summary:** The "Hard" summary is displayed by default in the active tab.
9.  **Switch Levels:** User can now click the "Easy" or "Medium" tabs to instantly view the other pre-generated summary levels.
