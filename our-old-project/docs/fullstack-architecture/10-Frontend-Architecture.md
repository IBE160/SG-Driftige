## Frontend Architecture
### Component Architecture
**Component Organization:**
```
frontend/src/
├── App.js            # Main application component
├── components/       # Reusable UI components
│   ├── InputForm.js
│   ├── SummaryDisplay.js
│   ├── LoadingIndicator.js
│   └── TabbedNavigation.js
├── views/            # Page-level components (for single page MVP, this is mostly App.js)
├── hooks/            # Custom React Hooks (if needed)
├── services/         # API client for backend communication
│   └── summarizationService.js
├── styles/           # Global styles or utility CSS
└── utils/            # Frontend utility functions
```

### State Management Architecture
**State Structure:** React's built-in `useState` and `useContext` will be used for state management. Global state (e.g., loading status, generated summaries) can be managed with `useContext`, while local component state will use `useState`.

**State Management Patterns:**
-   `useState` for component-local state.
-   `useContext` for sharing state between parent/child components without prop drilling (e.g., `SummaryContext` to hold generated summaries and current active tab).
-   Minimal use of external state libraries for MVP to keep the bundle size small.

### Routing Architecture
Not applicable for MVP as the application consists of a single primary view.

### Frontend Services Layer
**API Client Setup:** A dedicated service (`summarizationService.js`) will handle all interactions with the backend API. This service will encapsulate HTTP requests, error handling, and data parsing.

**Service Example:**
```javascript
// frontend/src/services/summarizationService.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:8000";

export const generateSummaries = async (text) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.summaries;
    } catch (error) {
        console.error("Error generating summaries:", error);
        throw error; // Re-throw for component to handle
    }
};
```