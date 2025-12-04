import asyncio
from core.llm_client import llm_client

async def generate_real_summaries(text: str) -> dict:
    """
    Generates summaries for three difficulty levels using the LLM.
    """
    if not text:
        raise ValueError("Input text cannot be empty for summarization.")

    # Prompts based on the technical design, refined for conciseness and precision
    easy_prompt = "Extract the top 3-5 most important points from the following text and present them as a simple, easy-to-understand bulleted list. The summary should be very concise and suitable for someone new to the topic. Respond in the same language as the text provided."
    medium_prompt = "Provide a concise summary of the following text by identifying the main arguments and key takeaways. Present the summary as a short paragraph followed by a bulleted list of the most critical details and evidence. Aim for clarity and brevity. Respond in the same language as the text provided."
    hard_prompt = "Perform an expert-level analysis of the following text and distill it into a structured summary. Start with a one-sentence thesis statement. Then, provide a bulleted list of the core arguments, including any subtle nuances, key terminology, and implicit connections. The summary must be dense with information but still precise and to the point. Respond in the same language as the text provided."

    # Make parallel calls to the LLM
    try:
        easy_task = llm_client.generate_summary(text, easy_prompt)
        medium_task = llm_client.generate_summary(text, medium_prompt)
        hard_task = llm_client.generate_summary(text, hard_prompt)

        easy_summary, medium_summary, hard_summary = await asyncio.gather(
            easy_task, medium_task, hard_task
        )

        return {
            "easy": easy_summary,
            "medium": medium_summary,
            "hard": hard_summary,
        }
    except Exception as e:
        print(f"Error during parallel LLM summary generation: {e}")
        raise # Re-raise the exception to be handled by the FastAPI endpoint
