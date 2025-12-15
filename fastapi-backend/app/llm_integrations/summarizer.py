import os
import httpx
import logging
import json
import bleach
from typing import Literal
from fastapi import HTTPException, status

logger = logging.getLogger(__name__)

# LLM API Configuration
LLM_API_ENDPOINT = os.getenv("LLM_API_ENDPOINT", "http://localhost:8080/v1/generate")
LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL", "gemini-pro")

class LLMIntegrationError(Exception):
    """Custom exception for LLM integration failures."""
    pass

def sanitize_content(content: str) -> str:
    """Strips all HTML tags from the content to prevent prompt injection."""
    return bleach.clean(content, strip=True)

class Summarizer: # Renamed LLMSummarizer to Summarizer
    def __init__(self):
        self.logger = logging.getLogger(__name__)


    async def summarize_content(self, text_content: str, difficulty: Literal["easy", "medium", "hard"]) -> str:
        """
        Constructs a prompt and interacts with the LLM to generate a summary.
        """
        if not LLM_API_KEY:
            raise LLMIntegrationError("LLM_API_KEY environment variable is not set.")

        prompt = self._construct_prompt(text_content, difficulty)

        headers = {"Content-Type": "application/json"} # Remove Authorization header
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "model": LLM_MODEL
        }

        async with httpx.AsyncClient() as client:
            try:
                # Append API key as query parameter
                response = await client.post(f"{LLM_API_ENDPOINT}?key={LLM_API_KEY}", json=payload, headers=headers, timeout=60.0)
                response.raise_for_status()
                llm_response_content = response.json()
                llm_response_text = llm_response_content["candidates"][0]["content"]["parts"][0]["text"]
                return llm_response_text
            except httpx.HTTPStatusError as e:
                self.logger.error(f"HTTP error generating summary from LLM: {e.response.status_code} - {e.response.text}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"LLM API returned an error: {e.response.status_code}"
                ) from e
            except httpx.RequestError as e:
                self.logger.error(f"Network error generating summary from LLM: {e}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=f"Network error communicating with LLM API: {e}"
                ) from e
            except (KeyError, IndexError) as e:
                self.logger.error(f"Failed to parse LLM response for summary generation: {e}")
                self.logger.debug(f"Raw LLM response: {response.text if 'response' in locals() else 'No response'}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="Failed to parse LLM response into expected format."
                ) from e
            except Exception as e:
                self.logger.error(f"Unexpected error during summary generation from LLM: {e}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail="An unexpected error occurred during LLM summary generation."
                ) from e


    def _construct_prompt(self, text_content: str, difficulty: Literal["easy", "medium", "hard"]) -> str:
        """
        Constructs the prompt for the LLM based on content and desired difficulty.
        """
        # This is a basic example. Real prompt engineering would be more sophisticated.
        return (
            f"Summarize the following text to an {difficulty} difficulty level. "
            f"Ensure the summary is concise and captures the main points.\n\n"
            f"Text: {text_content}"
        )
