from fastapi import APIRouter, UploadFile, File
import shutil

router = APIRouter()

@router.post("/upload_pdf")
async def upload_pdf(file: UploadFile = File(...)):
    # In a future step, this will save the file to a more permanent storage
    # and return a content_id.
    temp_file_path = f"/tmp/{file.filename}"
    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    print(f"Received and saved file: {file.filename}")
    
    # Placeholder for PDF parsing
    # text = await parse_pdf(temp_file_path)
    
    return {"message": f"PDF '{file.filename}' received successfully"}
