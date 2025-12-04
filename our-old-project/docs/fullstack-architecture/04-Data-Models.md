## Data Models
### SummarizeRequest
**Purpose:** Represents the input payload for the summarization API, containing the raw text to be summarized.

**Key Attributes:**
- `text`: string - The full text of the lecture notes.

### SummarizeResponse
**Purpose:** Represents the output payload from the summarization API, containing the generated summaries for each difficulty level.

**Key Attributes:**
- `summaries`: object - An object containing the easy, medium, and hard summaries.
    - `easy`: string - The generated easy-to-understand summary.
    - `medium`: string - The generated detailed summary for undergraduates.
    - `hard`: string - The generated comprehensive, expert-level summary.