from fastapi import APIRouter, UploadFile, File, HTTPException
from app.llm_integrations.pdf_parser import extract_text_from_pdf
from app.services.content_service import ContentService
from app.db.schemas import ContentCreate # Import ContentCreate

router = APIRouter()
content_service = ContentService()

MAX_PDF_SIZE = 10 * 1024 * 1024 # 10 MB

@router.post("/upload/text", status_code=201) # Set status_code to 201
async def upload_text(content: ContentCreate): # Use ContentCreate
    content_id = await content_service.save_text_content(content.text_content)
    return {"status": "success", "data": {"content_id": content_id, "message": "Content processed"}}

@router.post("/upload/pdf", status_code=201) # Set status_code to 201
async def upload_pdf(file: UploadFile = File(...)):
    if file.content_type != "application/pdf":
        raise HTTPException(status_code=400, detail="Only PDF files are allowed.")
    
    # Check file size
    file_content = await file.read()
    if len(file_content) > MAX_PDF_SIZE:
        raise HTTPException(status_code=413, detail=f"File size exceeds the limit of {MAX_PDF_SIZE / (1024 * 1024)} MB")

    extracted_text = await extract_text_from_pdf(file_content)
    
    content_id = await content_service.save_pdf_content(extracted_text, file.filename)
    return {"status": "success", "data": {"content_id": content_id, "message": "PDF processed"}}
