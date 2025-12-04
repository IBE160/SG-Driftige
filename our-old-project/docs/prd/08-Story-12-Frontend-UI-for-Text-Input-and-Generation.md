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