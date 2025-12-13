import pytest
from unittest.mock import patch, MagicMock
from app.services.quiz_service import create_quiz
from app.schemas.quiz import QuizData

@pytest.mark.asyncio
@patch('app.services.quiz_service.generate_quiz_from_llm')
@patch('app.services.quiz_service.MOCK_CONTENT_STORE', {"sample_content_id": "Sample content"})
async def test_create_quiz_success(mock_generate_quiz):
    # Mock the LLM response
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
    mock_generate_quiz.return_value = mock_quiz_data

    # Call the service
    quiz = await create_quiz("sample_content_id", "easy")

    # Assertions
    assert quiz is not None
    assert quiz.quiz_id == mock_quiz_data.quiz_id
    assert len(quiz.questions) == 1
    assert quiz.questions[0].question_text == "What is the capital of France?"

@pytest.mark.asyncio
@patch('app.services.quiz_service.MOCK_CONTENT_STORE', {"sample_content_id": "Sample content"})
async def test_create_quiz_content_not_found():
    with pytest.raises(ValueError, match="Content not found"):
        await create_quiz("invalid_content_id", "easy")

@pytest.mark.asyncio
@patch('app.services.quiz_service.generate_quiz_from_llm')
@patch('app.services.quiz_service.MOCK_CONTENT_STORE', {"sample_content_id": "Sample content"})
async def test_create_quiz_llm_failure(mock_generate_quiz):
    # Mock the LLM to raise an exception
    mock_generate_quiz.side_effect = ValueError("LLM is down")

    with pytest.raises(ValueError, match="Failed to generate a valid quiz after multiple attempts."):
        await create_quiz("sample_content_id", "easy")
