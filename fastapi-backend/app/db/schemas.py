from pydantic import BaseModel, Field

class ContentCreate(BaseModel):
    text_content: str = Field(min_length=10, max_length=5000)

class ContentResponse(BaseModel):
    status: str
    data: dict
