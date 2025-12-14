import logging
from typing import Dict, Any
from pydantic import ValidationError

from app.schemas.quiz import QuizData

logger = logging.getLogger(__name__)


def validate_llm_quiz_response(llm_response: Dict[str, Any]) -> QuizData:
    """
    Validates the raw LLM response against the QuizData Pydantic model.

    Args:
        llm_response: The raw response from the LLM, expected to be a dictionary.

    Returns:
        An instance of QuizData if validation is successful.

    Raises:
        ValueError: If the validation fails.
    """
    try:
        quiz_data = QuizData(**llm_response)
        return quiz_data
    except ValidationError as e:
        # In a real application, you might want to log the error
        # and the invalid response for debugging purposes.
        logger.error("Pydantic validation error: %s", e)
        raise ValueError("LLM response validation failed.") from e

