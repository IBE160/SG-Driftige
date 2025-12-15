from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from uuid import UUID

from app.services.quiz_service import create_quiz, assess_quiz_submission, create_adaptive_quiz, get_quiz_from_cache, redis_client # Import redis_client
from app.schemas.quiz import QuizData, QuizSubmission, QuizResult, AdaptiveQuizRequest
from app.api.v1.upload import get_content_service # Import the get_content_service dependency
from app.services.content_service import ContentService # Import ContentService for type hinting

router = APIRouter()


class QuizRequest(BaseModel):
    content_id: str
    difficulty: str


@router.post("/quiz")
async def generate_quiz_endpoint(
    request: QuizRequest,
    content_service: ContentService = Depends(get_content_service)
):
    """
    Endpoint to generate a quiz.
    """
    try:
        quiz_data = await create_quiz(request.content_id, request.difficulty, content_service)
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

@router.get("/quiz/{quiz_id}", response_model=QuizData)
async def get_quiz_by_id_endpoint(quiz_id: UUID):
    """
    Endpoint to retrieve a quiz by its ID.
    """
    try:
        quiz_data = await get_quiz_from_cache(quiz_id)
        if not quiz_data:
            raise HTTPException(status_code=404, detail=f"Quiz with ID {quiz_id} not found.")
        return quiz_data
    except Exception as e:
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
async def generate_adaptive_quiz_endpoint(
    original_quiz_id: UUID, 
    request: AdaptiveQuizRequest,
    content_service: ContentService = Depends(get_content_service)
):
    """
    Endpoint to generate an adaptive follow-up quiz based on weak spots.
    """
    try:
        # Fetch content_id from Redis using the original_quiz_id
        content_id = await redis_client.get(f"{original_quiz_id}_content_id")
        if not content_id:
            raise ValueError(f"Could not find original content for quiz ID {original_quiz_id}")

        new_quiz_data = await create_adaptive_quiz(
            content_id=content_id, # Use the retrieved content_id
            previous_result=request.previous_result,
            original_quiz_id=original_quiz_id,
            content_service=content_service
        )
        return {"status": "success", "data": new_quiz_data}
    except ValueError as e:
        if "not found" in str(e) or "Could not find" in str(e):
            raise HTTPException(status_code=404, detail=str(e))
        raise HTTPException(status_code=400, detail=str(e)) # For other value errors like "no weak spots"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An unexpected error occurred: {e}")
