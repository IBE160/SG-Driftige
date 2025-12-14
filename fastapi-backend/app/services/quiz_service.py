import logging
from typing import Dict
from uuid import UUID
from app.llm_integrations.quiz_generator import generate_quiz_from_llm
from app.services.quiz_validator import validate_llm_quiz_response
from app.schemas.quiz import QuizData, QuizSubmission, QuizResult

logger = logging.getLogger(__name__)

# In a real application, this would fetch content from a database
# For now, we'll use a simple mock
MOCK_CONTENT_STORE = {
    "sample_content_id": "This is a sample text about the history of the internet..."
}

# In-memory cache for quiz data (quiz_id -> QuizData)
QUIZ_CACHE: Dict[str, QuizData] = {}


async def create_quiz(content_id: str, difficulty: str) -> QuizData:
    """
    Orchestrates the quiz generation process.
    
    1. Retrieves content based on content_id.
    2. Calls the quiz_generator to get a quiz from the LLM.
    3. Validates the LLM's response.
    4. Implements retry logic if validation fails.
    """
    # 1. Retrieve content
    content = MOCK_CONTENT_STORE.get(content_id)
    if not content:
        raise ValueError("Content not found")

    max_retries = 3
    for attempt in range(max_retries):
        try:
            # 2. Call the quiz generator
            llm_response_dict = await generate_quiz_from_llm(content, difficulty)
            
            # 3. Validate the response
            quiz_data = validate_llm_quiz_response(llm_response_dict.model_dump())
            
            # Store quiz data in cache
            QUIZ_CACHE[str(quiz_data.quiz_id)] = quiz_data
            
            return quiz_data

        except ValueError as e:
            logger.error("Attempt %d failed: %s", attempt + 1, e)
            if attempt + 1 == max_retries:
                raise ValueError("Failed to generate a valid quiz after multiple attempts.")
    
    # This line should not be reachable
    raise ValueError("An unexpected error occurred in quiz creation.")


async def assess_quiz_submission(quiz_id: UUID, submission: QuizSubmission) -> QuizResult:
    """
    Assesses a user's quiz submission against the correct answers.
    """
    quiz_data = QUIZ_CACHE.get(str(quiz_id))
    if not quiz_data:
        raise ValueError(f"Quiz with ID {quiz_id} not found in cache.")

    correct_answers_count = 0
    results: Dict[int, bool] = {}
    total_questions = len(quiz_data.questions)

    for i, question in enumerate(quiz_data.questions):
        user_answer_index = submission.answers.get(i)
        is_correct = (user_answer_index is not None and 
                      user_answer_index == question.correct_answer_index)
        
        results[i] = is_correct
        if is_correct:
            correct_answers_count += 1
    
    score = (correct_answers_count / total_questions) * 100 if total_questions > 0 else 0

    return QuizResult(
        score=score,
        correct_answers=correct_answers_count,
        total_questions=total_questions,
        results=results
    )

