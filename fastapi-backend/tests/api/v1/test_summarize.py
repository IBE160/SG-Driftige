import pytest
from httpx import AsyncClient, ASGITransport
from unittest.mock import AsyncMock, patch
from fastapi import HTTPException, status
from contextlib import asynccontextmanager

# Assuming the main application instance is named 'app'
# and the dependency functions are in 'app.api.v1.summarize'
from app.main import app 

# Import the actual dependency functions to be overridden
# NOTE: Replace 'app.api.v1.summarize' with the correct module path
from app.api.v1.summarize import get_db, get_summarizer 


# -------------------------
# FIXTURE: FASTAPI APPLICATION INSTANCE
# -------------------------
# Provides the FastAPI app instance for dependency overriding.
@pytest.fixture
def app_instance():
    """Provides the FastAPI application instance."""
    return app


# -------------------------
# FIXTURE: ASYNC TEST CLIENT
# -------------------------
# The client uses the app_instance fixture to ensure dependencies are overridden before requests.
@pytest.fixture
async def client(app_instance):
    """Async client for testing the ASGI application."""
    async with AsyncClient(transport=ASGITransport(app=app_instance), base_url="http://test") as ac:
        yield ac


# -------------------------
# FIXTURE: MOCK PRISMA (DB DEPENDENCY OVERRIDE)
# -------------------------
# This fixture overrides the 'get_db' dependency used by the API route.
# It ensures Prisma's connection logic is completely bypassed during tests.
@pytest.fixture
async def mock_prisma(app_instance): # This fixture needs to be async
    """Overrides the get_db dependency and returns a mock database client."""
    mock_db = AsyncMock()
    
    # Define the async generator override function
    async def override_get_db_dependency():
        yield mock_db

    # Apply the dependency override to the application
    app_instance.dependency_overrides[get_db] = override_get_db_dependency
    
    # Yield the mock object so the tests can configure its return values
    yield mock_db
    
    # Clean up the override after the test is complete
    app_instance.dependency_overrides.pop(get_db)


# -------------------------
# FIXTURE: MOCK SUMMARIZER (LLM DEPENDENCY OVERRIDE)
# -------------------------
# This fixture overrides the 'get_summarizer' dependency.
@pytest.fixture
def mock_summarizer(app_instance):
    """Overrides the get_summarizer dependency and returns a mock LLM service."""
    mock_llm = AsyncMock()

    # 1. Define the override function (assuming get_summarizer is a regular async function)
    async def override_get_summarizer_dependency(): # Changed function name to avoid conflict
        return mock_llm

    # 2. Apply the dependency override
    app_instance.dependency_overrides[get_summarizer] = override_get_summarizer_dependency
    
    # 3. Yield the mock object for test configuration
    yield mock_llm
    
    # 4. Clean up the override
    app_instance.dependency_overrides.pop(get_summarizer)


# -------------------------
# TEST: SUCCESSFUL SUMMARY
# -------------------------
@pytest.mark.asyncio
async def test_summarize_success(client, mock_prisma, mock_summarizer):
    # Configure mock database return value
    # We mock the result of find_unique to be an object with a 'rawText' attribute
    mock_prisma.content.find_unique.return_value = AsyncMock(
        rawText="This is a test content that needs to be summarized."
    )

    # Configure mock summarizer return value
    mock_summarizer.summarize_content.return_value = "This is a mocked summary."

    response = await client.post(
        "/api/v1/summarize",
        json={"content_id": "some_content_id", "difficulty": "easy"},
    )

    assert response.status_code == 200
    assert response.json() == {"status": "success", "data": {"summary_text": "This is a mocked summary."}}

    # Verify calls to mocks
    mock_prisma.content.find_unique.assert_called_once_with(
        where={"id": "some_content_id"}
    )
    mock_summarizer.summarize_content.assert_called_once_with(
        "This is a test content that needs to be summarized.",
        "easy",
    )


# -------------------------
# TEST: CONTENT NOT FOUND
# -------------------------
@pytest.mark.asyncio
async def test_summarize_content_not_found(client, mock_prisma, mock_summarizer):
    # Configure mock database to return None (Content not found)
    mock_prisma.content.find_unique.return_value = None

    response = await client.post(
        "/api/v1/summarize",
        json={"content_id": "non_existing", "difficulty": "medium"},
    )

    assert response.status_code == 404
    assert response.json() == {"detail": "Content not found"}

    # Verify calls to mocks
    mock_prisma.content.find_unique.assert_called_once_with(
        where={"id": "non_existing"}
    )
    mock_summarizer.summarize_content.assert_not_called()


# -------------------------
# TEST: LLM FAILS
# -------------------------
@pytest.mark.asyncio
async def test_summarize_llm_failure(client, mock_prisma, mock_summarizer):
    # Configure mock database to return content
    mock_prisma.content.find_unique.return_value = AsyncMock(rawText="This is content.")

    # Configure mock summarizer to raise an HTTP exception (e.g., service failure)
    mock_summarizer.summarize_content.side_effect = HTTPException(
        status_code=status.HTTP_502_BAD_GATEWAY,
        detail="LLM service temporarily unavailable or failed to process request",
    )

    response = await client.post(
        "/api/v1/summarize",
        json={"content_id": "some_content_id", "difficulty": "hard"},
    )

    assert response.status_code == 502
    assert "LLM service temporarily unavailable" in response.json()["detail"]

    # Verify calls to mocks
    mock_prisma.content.find_unique.assert_called_once_with(
        where={"id": "some_content_id"}
    )


# -------------------------
# TEST: INVALID DIFFICULTY ENUM
# -------------------------
@pytest.mark.asyncio
async def test_summarize_invalid_difficulty(client, mock_prisma, mock_summarizer):
    # This test bypasses the database and summarizer logic because FastAPI/Pydantic
    # handles the validation error before dependencies are executed.
    
    response = await client.post(
        "/api/v1/summarize",
        json={"content_id": "some_content_id", "difficulty": "invalid"},
    )

    assert response.status_code == 422
    # Check the Pydantic validation error message structure
    assert "Input should be 'easy', 'medium' or 'hard'" in response.json()["detail"][0]["msg"]

    # Verify that the dependencies (DB and LLM) were not called
    mock_prisma.content.find_unique.assert_not_called()
    mock_summarizer.summarize_content.assert_not_called()