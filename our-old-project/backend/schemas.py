from pydantic import BaseModel
from typing import List

class SummarizeRequest(BaseModel):
    text: str

class SummarizeResponse(BaseModel):
    summaries: dict # This will contain 'easy', 'medium', 'hard' summaries

class QuizQuestion(BaseModel):
    question: str
    options: List[str]
    answer: int # index of the correct option

class GenerateQuizRequest(BaseModel):
    text: str

class GenerateQuizResponse(BaseModel):
    questions: List[QuizQuestion]

class GenerateFollowUpQuizRequest(BaseModel):
    text: str
    wrong_questions: List[QuizQuestion]
