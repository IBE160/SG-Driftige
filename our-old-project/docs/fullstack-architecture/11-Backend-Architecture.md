## Backend Architecture
### Service Architecture
**Traditional Server Architecture chosen** (FastAPI running as a traditional web server for the MVP).

**Controller/Route Organization:**
```
backend/
├── main.py           # FastAPI application entry point, defines routes
├── schemas.py        # Pydantic models for request/response validation
├── services/         # Business logic for summarization, LLM interaction
│   └── summarization_service.py
├── core/             # Core utilities, configuration, LLM client setup
│   ├── config.py
│   └── llm_client.py
└── venv/             # Python virtual environment
```

**Controller Template (Example - part of main.py):**
```python
# backend/main.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from services.summarization_service import get_mock_summaries # or actual LLM service

router = APIRouter()

class SummarizeRequest(BaseModel):
    text: str

@router.post("/api/summarize")
async def summarize_endpoint(request: SummarizeRequest):
    if not request.text:
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")
    try:
        # For MVP, this would call a mock service.
        # Later, it calls summarization_service.generate_summaries_from_llm(request.text)
        summaries = get_mock_summaries(request.text) # Placeholder
        return {"summaries": summaries}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate summaries: {str(e)}")

# app.include_router(router) in main app setup
```

### Database Architecture
**Schema Design:** Not applicable for MVP.
**Data Access Layer:** Not applicable for MVP.

### Authentication and Authorization
Not applicable for MVP as user accounts are out of scope.