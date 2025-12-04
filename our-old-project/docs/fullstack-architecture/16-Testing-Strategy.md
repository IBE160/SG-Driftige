## Testing Strategy
### Testing Pyramid
```text
E2E Tests       (Post-MVP)
/        \
Integration Tests (Post-MVP)
/            \
Frontend Unit  Backend Unit (MVP Focus)
```

### Test Organization
**Frontend Tests:**
```
frontend/src/
├── components/
│   ├── __tests__/
│   │   ├── InputForm.test.js
│   │   └── SummaryDisplay.test.js
├── services/
│   └── __tests__/
│       └── summarizationService.test.js
# ... other test files
```

**Backend Tests:**
```
backend/
├── tests/
│   ├── test_main.py             # API endpoint tests
│   └── test_summarization_service.py # Unit tests for service logic
```

### Coding Standards

### Critical Fullstack Rules
-   **Environment Variables:** Backend should access sensitive configurations via environment variables (`LLM_API_KEY`), never hardcoded. Frontend consumes non-sensitive environment variables (e.g., `REACT_APP_API_BASE_URL`) via build process.
-   **API Communication:** All frontend-to-backend communication must go through the dedicated API service layer (`summarizationService.js`).
-   **CORS:** Backend CORS policy must be configured for security, initially permissive for development, strictly limited for production.
-   **Input Validation:** All API endpoints must validate incoming request payloads (Pydantic models in FastAPI).

### Naming Conventions
| Element         | Frontend        | Backend           | Example                     |
| :-------------- | :-------------- | :---------------- | :-------------------------- |
| Components      | PascalCase      | -                 | `InputForm.js`              |
| Functions/Methods| camelCase       | snake_case        | `generateSummaries` / `generate_summaries` |
| API Routes      | -               | kebab-case        | `/api/summarize`            |
| Variables       | camelCase       | snake_case        | `summaryText` / `summary_text` |
| Files           | PascalCase      | snake_case        | `InputForm.js` / `main.py`  |