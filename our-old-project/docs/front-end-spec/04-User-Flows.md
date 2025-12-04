## User Flows
### Main Flow: Summarization

**User Goal:** To obtain multi-level summaries of lecture notes.

**Entry Points:** Directly accessing the QuizZum web application.

**Success Criteria:** User successfully views all three summary levels (Easy, Medium, Hard) for their input text.

#### Flow Diagram
```mermaid
graph TD
    A[Start: Open QuizZum] --> B{Input Text Area Empty?}
    B -- Yes --> C[Generate Button Disabled]
    B -- No --> D[Generate Button Enabled]
    C --> E[Paste Notes into Text Area]
    E --> D
    D --> F[Select Summary Level (Easy/Medium/Hard)]
    F --> G[Click "Generate Summary" Button]
    G --> H[Loading State: Inputs Disabled, Loading Indicator Displayed]
    H --> I{Backend API Call Completes?}
    I -- Yes --> J[Summaries Displayed: Tabs for Easy/Medium/Hard]
    J --> K[User Switches Between Summary Tabs]
    I -- No (Error) --> L[Display Error Message]
```

#### Edge Cases & Error Handling:
*   User clicks "Generate" with empty text area: Button remains disabled (handled by UI).
*   Backend API call fails: Display a generic "Failed to generate summary. Please try again." message to the user. Log detailed error on backend.
*   Network disconnection during generation: Display a "Network error. Please check your connection." message.

#### Notes:
This flow is designed to be as simple and direct as possible for the MVP, focusing on the core value proposition of multi-level summarization.