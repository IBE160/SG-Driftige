import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch
from uuid import UUID

from app.main import app
from app.schemas.quiz import QuizData, QuizResult, QuizSubmission
from app.services.quiz_service import QUIZ_CACHE # Import QUIZ_CACHE
from tests.services.test_quiz_service import SAMPLE_QUIZ_DATA # Import SAMPLE_QUIZ_DATA

client = TestClient(app)

# Fixture to clear the QUIZ_CACHE before each test that uses the client
@pytest.fixture(autouse=True)
def clear_quiz_cache_for_api_tests():
    QUIZ_CACHE.clear()
    yield
    QUIZ_CACHE.clear()


@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_success(mock_create_quiz):
    # Mock the service response
    mock_create_quiz.return_value = SAMPLE_QUIZ_DATA

    # Make the API call
    response = client.post("/api/v1/quiz", json={"content_id": "sample", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 200
    data = response.json()
    assert data["quiz_id"] == str(SAMPLE_QUIZ_DATA.quiz_id)
    assert len(data["questions"]) == 3
    assert data["questions"][0]["question_text"] == "What is the capital of France?"

@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_content_not_found(mock_create_quiz):
    # Mock the service to raise a ValueError for content not found
    mock_create_quiz.side_effect = ValueError("Content not found")

    # Make the API call
    response = client.post("/api/v1/quiz", json={"content_id": "invalid", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 404
    assert response.json() == {"detail": "Content not found"}

@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_llm_failure(mock_create_quiz):
    # Mock the service to raise a general ValueError
    mock_create_quiz.side_effect = ValueError("LLM is down")

    # Make the API call
    response = client.post("/api/v1/quiz", json={"content_id": "sample", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 502 # Corrected from 500 to 502
    assert response.json() == {"detail": "LLM is down"}


@patch('app.api.quiz_router.assess_quiz_submission')
def test_submit_quiz_success(mock_assess_quiz_submission):
    # Pre-populate the cache as the endpoint expects quiz_id to exist
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA

    # Mock the service response
    mock_quiz_result = QuizResult(
        score=100.0,
        correct_answers=3,
        total_questions=3,
        results={0: True, 1: True, 2: True}
    )
    mock_assess_quiz_submission.return_value = mock_quiz_result

    # Make the API call
    submission_payload = QuizSubmission(answers={0: 1, 1: 1, 2: 1})
    response = client.post(
        f"/api/v1/quiz/{SAMPLE_QUIZ_DATA.quiz_id}/submit",
        json=submission_payload.model_dump()
    )

    # Assertions
    assert response.status_code == 200
    data = response.json()
    assert data["score"] == 100.0
    assert data["correct_answers"] == 3
    assert data["total_questions"] == 3
    assert data["results"] == {"0": True, "1": True, "2": True} # JSON keys are strings

@patch('app.api.quiz_router.assess_quiz_submission')
def test_submit_quiz_not_found(mock_assess_quiz_submission):
    # Mock the service to raise a ValueError for quiz not found
    non_existent_quiz_id = UUID("b1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6")
    mock_assess_quiz_submission.side_effect = ValueError(f"Quiz with ID {non_existent_quiz_id} not found in cache.")

    # Make the API call
    submission_payload = QuizSubmission(answers={0: 0})
    response = client.post(
        f"/api/v1/quiz/{non_existent_quiz_id}/submit",
        json=submission_payload.model_dump()
    )

    # Assertions
    assert response.status_code == 404
    assert response.json() == {"detail": f"Quiz with ID {non_existent_quiz_id} not found in cache."}

