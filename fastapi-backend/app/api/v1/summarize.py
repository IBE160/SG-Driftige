from fastapi import APIRouter, Depends, HTTPException, status
from prisma import Prisma
from app.db.schemas import SummarizeRequest, Summary
from app.services.summarization_service import SummarizationService
from app.llm_integrations.summarizer import LLMSummarizer

summarize_router = APIRouter()

# Dependency for Prisma client
async def get_db():
    db = Prisma()
    await db.connect()
    try:
        yield db
    finally:
        await db.disconnect()

# Dependency for LLM Summarizer
def get_summarizer():
    return LLMSummarizer()

# Dependency for Summarization Service
def get_summarization_service(
    db: Prisma = Depends(get_db),
    summarizer: LLMSummarizer = Depends(get_summarizer)
):
    return SummarizationService(db, summarizer)

@summarize_router.post("/summarize", response_model=Summary)
async def summarize_content_endpoint(
    request: SummarizeRequest,
    summarization_service: SummarizationService = Depends(get_summarization_service)
):
    try:
        summary = await summarization_service.get_summary(request.content_id, request.difficulty)
        return summary
    except HTTPException as e:
        raise e
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"An unexpected error occurred: {str(e)}"
        )
