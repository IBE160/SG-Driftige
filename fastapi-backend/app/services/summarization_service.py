from fastapi import HTTPException
from prisma import Prisma
from app.db.schemas import Summary
from app.llm_integrations.summarizer import LLMSummarizer
from typing import Literal

class SummarizationService:
    def __init__(self, db: Prisma, summarizer: LLMSummarizer):
        self.db = db
        self.summarizer = summarizer

    async def get_summary(self, content_id: str, difficulty: Literal["easy", "medium", "hard"]) -> Summary:
        # Fetch content from the database
        content = await self.db.content.find_unique(where={"id": content_id})

        if not content:
            raise HTTPException(status_code=404, detail="Content not found")

        # Call the LLM summarizer
        summary_text = await self.summarizer.summarize_content(content.rawText, difficulty)

        return Summary(summary_text=summary_text)
