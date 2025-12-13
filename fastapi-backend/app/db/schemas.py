from pydantic import BaseModel, Field
from typing import Literal

class ContentCreate(BaseModel):
    text_content: str = Field(min_length=10, max_length=5000)

class ContentResponse(BaseModel):
    status: str
    data: dict

class SummarizeRequest(BaseModel):
    content_id: str
    difficulty: Literal["easy", "medium", "hard"]

class Summary(BaseModel):
    summary_text: str

class SummarizeResponse(BaseModel):
    status: str = "success"
    data: Summary
