from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class TextUploadRequest(BaseModel):
    text: str

@router.post("/upload_text")
async def upload_text(request: TextUploadRequest):
    # In a future step, this will save the text to a database
    # and return a content_id.
    print(f"Received text: {request.text[:100]}...")
    return {"message": "Text received successfully"}
