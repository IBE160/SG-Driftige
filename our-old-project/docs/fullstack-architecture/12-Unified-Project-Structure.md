## Unified Project Structure
```
QuizZum/
├── .bmad-core/
├── backend/                  # FastAPI application
│   ├── main.py               # Main application and routes
│   ├── schemas.py            # Pydantic models
│   ├── services/             # Business logic (e.g., summarization_service.py)
│   ├── core/                 # Core configs, LLM client
│   ├── requirements.txt
│   └── venv/                 # Python virtual environment
├── docs/                     # Project documentation
│   ├── brief.md
│   ├── prd.md
│   ├── front-end-spec.md
│   ├── fullstack-architecture.md
│   └── wireframe.md
├── frontend/                 # React application
│   ├── public/               # Static assets
│   ├── src/                  # React source code
│   │   ├── App.js
│   │   ├── components/
│   │   ├── services/
│   │   └── index.js
│   ├── package.json
│   └── node_modules/
├── .gitignore
├── package.json              # Root package.json (if using npm workspaces)
└── README.md
```