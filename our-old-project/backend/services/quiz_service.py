import asyncio
import json
from typing import List
from core.llm_client import llm_client
from schemas import GenerateQuizResponse, QuizQuestion

async def generate_quiz_from_text(text: str) -> dict:
    """
    Generates a quiz from text using the LLM.
    """
    if not text:
        raise ValueError("Input text cannot be empty for quiz generation.")

    prompt = f"""
Generate a multiple-choice quiz with 5 questions based on the following text.
For each question, provide 4 options and indicate the correct answer.
Respond with a JSON object containing a single key "questions".
The value of "questions" should be an array of objects.
Each object should have the following keys:
- "question": The question text (string)
- "options": An array of 4 strings representing the choices.
- "answer": The 0-based index of the correct answer in the "options" array (integer).

Do not include any other text or explanation in your response outside of the JSON object.

Text:
---
{text}
---
"""
    try:
        # Using the existing generate_summary method, but the prompt is for a quiz
        response_text = await llm_client.generate_summary(text, prompt)
        
        # The response from the LLM might be wrapped in ```json ... ```, so we need to extract it.
        if response_text.strip().startswith("```json"):
            json_str = response_text.strip().replace("```json", "").replace("```", "").strip()
        else:
            json_str = response_text

        quiz_data = json.loads(json_str)
        
        # Basic validation
        if "questions" not in quiz_data or not isinstance(quiz_data["questions"], list):
            raise ValueError("Invalid JSON structure from LLM: 'questions' key is missing or not a list.")

        # Here you could add more detailed validation of each question object if needed.
        
        return quiz_data

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from LLM response: {e}")
        print(f"LLM Response was: {response_text}")
        raise ValueError("Failed to generate a valid quiz from the text. The AI's response was not in the expected format.")
    except Exception as e:
        print(f"Error during LLM quiz generation: {e}")
        raise

async def generate_follow_up_quiz_from_text(text: str, wrong_questions: List[QuizQuestion]) -> dict:
    """
    Generates a follow-up quiz from text and a list of wrong questions.
    """
    if not text:
        raise ValueError("Input text cannot be empty for quiz generation.")
    
    wrong_questions_text = "\n".join([f"- {q.question}" for q in wrong_questions])

    prompt = f"""
A user has taken a quiz on the following text and answered some questions incorrectly.
Generate a new multiple-choice quiz with 5 questions that focuses on the topics covered in the questions the user got wrong.
The new questions should be different from the original ones but cover the same or related concepts to help the user improve.

Original Text:
---
{text}
---

Questions answered incorrectly:
---
{wrong_questions_text}
---

For each new question, provide 4 options and indicate the correct answer.
Respond with a JSON object containing a single key "questions".
The value of "questions" should be an array of objects.
Each object should have the following keys:
- "question": The question text (string)
- "options": An array of 4 strings representing the choices.
- "answer": The 0-based index of the correct answer in the "options" array (integer).

Do not include any other text or explanation in your response outside of the JSON object.
"""
    try:
        response_text = await llm_client.generate_summary(text, prompt)
        
        if response_text.strip().startswith("```json"):
            json_str = response_text.strip().replace("```json", "").replace("```", "").strip()
        else:
            json_str = response_text

        quiz_data = json.loads(json_str)
        
        if "questions" not in quiz_data or not isinstance(quiz_data["questions"], list):
            raise ValueError("Invalid JSON structure from LLM: 'questions' key is missing or not a list.")

        return quiz_data

    except json.JSONDecodeError as e:
        print(f"Error decoding JSON from LLM response: {e}")
        print(f"LLM Response was: {response_text}")
        raise ValueError("Failed to generate a valid follow-up quiz from the text. The AI's response was not in the expected format.")
    except Exception as e:
        print(f"Error during LLM follow-up quiz generation: {e}")
        raise
