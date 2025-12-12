import uuid
from datetime import datetime

# In-memory storage for content
in_memory_content_store = {}

class ContentService:
    def __init__(self):
        pass

    async def save_text_content(self, text_content: str):
        content_id = str(uuid.uuid4())
        in_memory_content_store[content_id] = {
            "id": content_id,
            "rawText": text_content,
            "uploadedAt": datetime.now(),
        }
        print(f"ContentService: Saved text content to in-memory store with ID: {content_id}")
        return content_id

    async def save_pdf_content(self, extracted_text: str, filename: str):
        content_id = str(uuid.uuid4())
        in_memory_content_store[content_id] = {
            "id": content_id,
            "rawText": extracted_text,
            "uploadedAt": datetime.now(),
            "fileName": filename,
        }
        print(f"ContentService: Saved PDF content to in-memory store with ID: {content_id}")
        return content_id
