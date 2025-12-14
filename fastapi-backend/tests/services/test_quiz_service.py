import pytest
from unittest.mock import patch, MagicMock
from uuid import UUID
from app.services.quiz_service import create_quiz, assess_quiz_submission, create_adaptive_quiz, QUIZ_CACHE
from app.schemas.quiz import QuizData, QuizQuestion, QuizSubmission, QuizResult

# Define a sample quiz data for testing
SAMPLE_QUIZ_DATA = QuizData(
    quiz_id=UUID("a1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6"),
    questions=[
        QuizQuestion(
            question_text="What is the capital of France?",
            options=["London", "Paris", "Berlin", "Madrid"],
            correct_answer_index=1,
        ),
        QuizQuestion(
            question_text="Which planet is known as the Red Planet?",
            options=["Earth", "Mars", "Jupiter", "Venus"],
            correct_answer_index=1,
        ),
        QuizQuestion(
            question_text="What is 2 + 2?",
            options=["3", "4", "5", "6"],
            correct_answer_index=1,
        ),
    ],
)

# Define a sample adaptive quiz for testing
SAMPLE_ADAPTIVE_QUIZ_DATA = QuizData(
    quiz_id=UUID("b2c3d4e5-f6a7-b8c9-d0e1-f2a3b4c5d6e7"),
    questions=[
        QuizQuestion(
            question_text="Which famous landmark is in Paris?",
            options=["Eiffel Tower", "Big Ben", "Colosseum", "Statue of Liberty"],
            correct_answer_index=0,
        ),
    ],
)


@pytest.mark.asyncio
@patch('app.services.quiz_service.generate_quiz_from_llm')
@patch('app.services.quiz_service.MOCK_CONTENT_STORE', {"sample_content_id": "Sample content"})
async def test_create_quiz_success(mock_generate_quiz):
    # Mock the LLM response
    mock_generate_quiz.return_value = SAMPLE_QUIZ_DATA

    # Call the service
    quiz = await create_quiz("sample_content_id", "easy")

    # Assertions
    assert quiz is not None
    assert quiz.quiz_id == SAMPLE_QUIZ_DATA.quiz_id
    assert len(quiz.questions) == 3
    assert quiz.questions[0].question_text == "What is the capital of France?"
    # Verify it's in the cache
    assert QUIZ_CACHE.get(str(SAMPLE_QUIZ_DATA.quiz_id)) == SAMPLE_QUIZ_DATA

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

@pytest.fixture(autouse=True)
def clear_quiz_cache():
    """Fixture to clear the QUIZ_CACHE before each test."""
    QUIZ_CACHE.clear()
    yield

@pytest.mark.asyncio
async def test_assess_quiz_submission_all_correct():
    # Populate the cache with sample quiz data
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA

    submission = QuizSubmission(answers={0: 1, 1: 1, 2: 1}) # All correct answers
    result = await assess_quiz_submission(SAMPLE_QUIZ_DATA.quiz_id, submission)

    assert result.score == 100.0
    assert result.correct_answers == 3
    assert result.total_questions == 3
    assert result.results == {0: True, 1: True, 2: True}

@pytest.mark.asyncio
async def test_assess_quiz_submission_partial_correct():
    # Populate the cache with sample quiz data
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA

    submission = QuizSubmission(answers={0: 1, 1: 0, 2: 1}) # Q0, Q2 correct; Q1 incorrect
    result = await assess_quiz_submission(SAMPLE_QUIZ_DATA.quiz_id, submission)

    assert result.score == pytest.approx(66.66, abs=0.01)
    assert result.correct_answers == 2
    assert result.total_questions == 3
    assert result.results == {0: True, 1: False, 2: True}

@pytest.mark.asyncio
async def test_assess_quiz_submission_all_incorrect():
    # Populate the cache with sample quiz data
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA

    submission = QuizSubmission(answers={0: 0, 1: 0, 2: 0}) # All incorrect answers
    result = await assess_quiz_submission(SAMPLE_QUIZ_DATA.quiz_id, submission)

    assert result.score == 0.0
    assert result.correct_answers == 0
    assert result.total_questions == 3
    assert result.results == {0: False, 1: False, 2: False}

@pytest.mark.asyncio
async def test_assess_quiz_submission_quiz_not_found():
    # Cache is empty due to fixture
    non_existent_quiz_id = UUID("b1b2c3d4-e5f6-a7b8-c9d0-e1f2a3b4c5d6")
    submission = QuizSubmission(answers={0: 0})

    with pytest.raises(ValueError, match=f"Quiz with ID {non_existent_quiz_id} not found in cache."):
        await assess_quiz_submission(non_existent_quiz_id, submission)

@pytest.mark.asyncio
async def test_assess_quiz_submission_empty_answers():
    # Populate the cache with sample quiz data
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA

    submission = QuizSubmission(answers={}) # No answers provided
    result = await assess_quiz_submission(SAMPLE_QUIZ_DATA.quiz_id, submission)

    assert result.score == 0.0
    assert result.correct_answers == 0
    assert result.total_questions == 3
    assert result.results == {0: False, 1: False, 2: False} # All considered incorrect since no answers given

@pytest.mark.asyncio
@patch('app.services.quiz_service.generate_adaptive_quiz_from_llm')
@patch('app.services.quiz_service.MOCK_CONTENT_STORE', {"sample_content_id": "Sample content"})
async def test_create_adaptive_quiz_success(mock_adaptive_llm):
    # 1. Setup initial state
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA
    mock_adaptive_llm.return_value = SAMPLE_ADAPTIVE_QUIZ_DATA
    
    # This result indicates Q1 and Q2 were incorrect
    previous_result = QuizResult(score=33.3, correct_answers=1, total_questions=3, results={0: True, 1: False, 2: False})

    # 2. Call the service
    new_quiz = await create_adaptive_quiz("sample_content_id", previous_result, SAMPLE_QUIZ_DATA.quiz_id)

    # 3. Assertions
    # Assert weak spots were correctly identified and passed to the generator
    mock_adaptive_llm.assert_called_once_with(
        "Sample content",
        ["Which planet is known as the Red Planet?", "What is 2 + 2?"]
    )

    # Assert the new quiz is returned and cached
    assert new_quiz.quiz_id == SAMPLE_ADAPTIVE_QUIZ_DATA.quiz_id
    assert QUIZ_CACHE.get(str(SAMPLE_ADAPTIVE_QUIZ_DATA.quiz_id)) == SAMPLE_ADAPTIVE_QUIZ_DATA

@pytest.mark.asyncio
async def test_create_adaptive_quiz_no_weak_spots():
    # This result indicates all answers were correct
    previous_result = QuizResult(score=100.0, correct_answers=3, total_questions=3, results={0: True, 1: True, 2: True})
    QUIZ_CACHE[str(SAMPLE_QUIZ_DATA.quiz_id)] = SAMPLE_QUIZ_DATA
    
    with pytest.raises(ValueError, match="No weak spots identified or all answers were correct."):
        await create_adaptive_quiz("sample_content_id", previous_result, SAMPLE_QUIZ_DATA.quiz_id)

@pytest.mark.asyncio
async def test_create_adaptive_quiz_original_quiz_not_found():
    previous_result = QuizResult(score=0, correct_answers=0, total_questions=3, results={0: False, 1: False, 2: False})
    
    with pytest.raises(ValueError, match=f"Original quiz with ID {SAMPLE_QUIZ_DATA.quiz_id} not found in cache."):
        await create_adaptive_quiz("sample_content_id", previous_result, SAMPLE_QUIZ_DATA.quiz_id)
