import uuid
from datetime import datetime
from app.db.prisma_client import db

class ContentService:
    def __init__(self):
        pass

    async def save_text_content(self, text_content: str):
        # Using Prisma to save content
        new_content = await db.content.create(
            data={
                "rawText": text_content,
                "uploadedAt": datetime.now(),
            }
        )
        print(f"ContentService: Saved text content to DB with ID: {new_content.id}")
        return new_content.id

    async def save_pdf_content(self, extracted_text: str, filename: str):
        # Using Prisma to save content
        new_content = await db.content.create(
            data={
                "rawText": extracted_text,
                "uploadedAt": datetime.now(),
                "fileName": filename,
            }
        )
        print(f"ContentService: Saved PDF content to DB with ID: {new_content.id}")
        return new_content.id
