from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.quiz_service import create_quiz
from app.schemas.quiz import QuizData

router = APIRouter()


class QuizRequest(BaseModel):
    content_id: str
    difficulty: str


@router.post("/quiz", response_model=QuizData)
async def generate_quiz_endpoint(request: QuizRequest):
    """
    Endpoint to generate a quiz.
    """
    try:
        quiz_data = await create_quiz(request.content_id, request.difficulty)
        return quiz_data
    except ValueError as e:
        # Specific error for content not found
        if "Content not found" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        # Generic error for other ValueErrors (e.g., LLM failures)
        raise HTTPException(status_code=502, detail=str(e))
    except Exception as e:
        # Catch-all for any other unexpected errors
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
