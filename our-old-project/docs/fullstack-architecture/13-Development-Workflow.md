## Development Workflow
### Local Development Setup

#### Prerequisites
```bash
# Python 3.9+
python3 --version
# Node.js 18+ & npm
node --version
npm --version
```

#### Initial Setup
```bash
# Install backend dependencies
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
deactivate

# Install frontend dependencies
cd ../frontend
npm install

# Return to root
cd ..
```

#### Development Commands
```bash
# Start all services (separate terminals recommended for now)
# (Future: a single command using concurrently or similar)

# Start frontend only
cd frontend
npm start

# Start backend only
cd backend
source venv/bin/activate
uvicorn main:app --reload --port 8000
deactivate

# Run tests
# (Frontend)
cd frontend
npm test
# (Backend)
cd backend
source venv/bin/activate
pytest
deactivate
```

### Environment Configuration

#### Required Environment Variables
```bash
# Frontend (.env.local in frontend/ directory)
# REACT_APP_API_BASE_URL=http://localhost:8000

# Backend (.env file in backend/ directory)
# LLM_API_KEY=YOUR_GEMINI_API_KEY_OR_OTHER
# (Note: This will be used in future LLM integration, not for current mock implementation)
```