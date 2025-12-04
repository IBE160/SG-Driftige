from fastapi import FastAPI, APIRouter, HTTPException, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import asyncio # Import asyncio for running async functions
import pdfplumber
import io

# Import Pydantic models from schemas.py
from schemas import (
    SummarizeRequest, 
    SummarizeResponse, 
    GenerateQuizRequest, 
    GenerateQuizResponse,
    GenerateFollowUpQuizRequest
)

# Import the services
from services.summarization_service import generate_real_summaries
from services.quiz_service import generate_quiz_from_text, generate_follow_up_quiz_from_text

app = FastAPI()

# Allow CORS for frontend development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

router = APIRouter()

@router.post("/api/summarize", response_model=SummarizeResponse)
async def summarize_endpoint(request: SummarizeRequest):
    """
    Accepts text input and returns real summaries for three difficulty levels using the LLM.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")
    try:
        summaries = await generate_real_summaries(request.text) # Await the async function
        return {"summaries": summaries}
    except Exception as e:
        # Log the exception for debugging purposes
        print(f"An error occurred during real summarization: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate summaries: {str(e)}")

@router.post("/api/summarize-pdf", response_model=SummarizeResponse)
async def summarize_pdf_endpoint(file: UploadFile = File(...)):
    """
    Accepts a PDF file, extracts the text, and returns summaries.
    """
    if not file.filename.lower().endswith('.pdf'):
        raise HTTPException(status_code=400, detail="Invalid file type. Only PDF files are accepted.")

    try:
        pdf_content = await file.read()
        
        text = ""
        with pdfplumber.open(io.BytesIO(pdf_content)) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        
        if not text.strip():
            raise HTTPException(status_code=400, detail="Could not extract text from the PDF.")

        summaries = await generate_real_summaries(text)
        return {"summaries": summaries}
    except Exception as e:
        print(f"An error occurred during PDF summarization: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to process PDF and generate summaries: {str(e)}")

@router.post("/api/generate-quiz", response_model=GenerateQuizResponse)
async def generate_quiz_endpoint(request: GenerateQuizRequest):
    """
    Accepts text and generates a quiz.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")
    try:
        quiz = await generate_quiz_from_text(request.text)
        return quiz
    except Exception as e:
        print(f"An error occurred during quiz generation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate quiz: {str(e)}")

@router.post("/api/generate-follow-up-quiz", response_model=GenerateQuizResponse)
async def generate_follow_up_quiz_endpoint(request: GenerateFollowUpQuizRequest):
    """
    Accepts text and a list of wrong questions to generate a follow-up quiz.
    """
    if not request.text or not request.text.strip():
        raise HTTPException(status_code=400, detail="Text input cannot be empty.")
    if not request.wrong_questions:
        raise HTTPException(status_code=400, detail="List of wrong questions cannot be empty.")
        
    try:
        quiz = await generate_follow_up_quiz_from_text(request.text, request.wrong_questions)
        return quiz
    except Exception as e:
        print(f"An error occurred during follow-up quiz generation: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate follow-up quiz: {str(e)}")

app.include_router(router)

@app.get("/")
def read_root():
    return {"message": "QuizZum Backend is running."}
