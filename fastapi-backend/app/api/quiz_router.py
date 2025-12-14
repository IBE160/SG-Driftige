from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from uuid import UUID

from app.services.quiz_service import create_quiz, assess_quiz_submission, create_adaptive_quiz
from app.schemas.quiz import QuizData, QuizSubmission, QuizResult, AdaptiveQuizRequest

router = APIRouter()


class QuizRequest(BaseModel):
    content_id: str
    difficulty: str


@router.post("/quiz")
async def generate_quiz_endpoint(request: QuizRequest):
    """
    Endpoint to generate a quiz.
    """
    try:
        quiz_data = await create_quiz(request.content_id, request.difficulty)
        return {"status": "success", "data": quiz_data}
    except ValueError as e:
        # Specific error for content not found
        if "Content not found" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        # Generic error for other ValueErrors (e.g., LLM failures)
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        # Catch-all for any other unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@router.post("/quiz/{quiz_id}/submit", response_model=QuizResult)
async def submit_quiz_endpoint(quiz_id: UUID, submission: QuizSubmission):
    """
    Endpoint to submit quiz answers for assessment.
    """
    try:
        quiz_result = await assess_quiz_submission(quiz_id, submission)
        return quiz_result
    except ValueError as e:
        if f"Quiz with ID {quiz_id} not found" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=500, detail=str(e))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")


@router.post("/quiz/{original_quiz_id}/follow-up")
async def generate_adaptive_quiz_endpoint(original_quiz_id: UUID, request: AdaptiveQuizRequest):
    """
    Endpoint to generate an adaptive follow-up quiz based on weak spots.
    """
    try:
        new_quiz_data = await create_adaptive_quiz(
            content_id=request.content_id,
            previous_result=request.previous_result,
            original_quiz_id=original_quiz_id
        )
        return {"status": "success", "data": new_quiz_data}
    except ValueError as e:
        if "not found" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e)) # For other value errors like "no weak spots"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
