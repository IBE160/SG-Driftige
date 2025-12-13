import pytest
from fastapi.testclient import TestClient
from unittest.mock import patch

from app.main import app
from app.schemas.quiz import QuizData

client = TestClient(app)

@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_success(mock_create_quiz):
    # Mock the service response
    mock_quiz_data = QuizData(
        quiz_id="a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6",
        questions=[
            {
                "question_text": "What is the capital of France?",
                "options": ["London", "Paris", "Berlin", "Madrid"],
                "correct_answer_index": 1,
            }
        ],
    )
    mock_create_quiz.return_value = mock_quiz_data

    # Make the API call
    response = client.post("/api/quiz", json={"content_id": "sample", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 200
    data = response.json()
    assert data["quiz_id"] == str(mock_quiz_data.quiz_id)
    assert len(data["questions"]) == 1
    assert data["questions"][0]["question_text"] == "What is the capital of France?"

@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_content_not_found(mock_create_quiz):
    # Mock the service to raise a ValueError for content not found
    mock_create_quiz.side_effect = ValueError("Content not found")

    # Make the API call
    response = client.post("/api/quiz", json={"content_id": "invalid", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 404
    assert response.json() == {"detail": "Content not found"}

@patch('app.api.quiz_router.create_quiz')
def test_generate_quiz_llm_failure(mock_create_quiz):
    # Mock the service to raise a general ValueError
    mock_create_quiz.side_effect = ValueError("LLM is down")

    # Make the API call
    response = client.post("/api/quiz", json={"content_id": "sample", "difficulty": "easy"})

    # Assertions
    assert response.status_code == 502
    assert response.json() == {"detail": "LLM is down"}
