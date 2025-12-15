# In fastapi-backend/app/schemas/quiz.py

from pydantic import BaseModel, Field
from typing import List, Dict
from uuid import UUID, uuid4

class QuizQuestion(BaseModel):
    """A single question in a quiz."""
    question_text: str
    options: List[str]
    correct_answer_index: int = Field(..., ge=0)

class QuizData(BaseModel):
    """The full data for a generated quiz."""
    quiz_id: UUID = Field(default_factory=uuid4)
    questions: List[QuizQuestion]

class QuizSubmission(BaseModel):
    """A user's submitted answers for a quiz."""
    # Dict mapping question_index to selected_option_index
    answers: Dict[int, int]

class QuizResult(BaseModel):
    """The assessment result of a quiz submission."""
    score: float = Field(..., ge=0.0, le=100.0)
    correct_answers: int
    total_questions: int
    # Dict mapping question_index to its correctness (True/False)
    results: Dict[int, bool]

from typing import Optional

class AdaptiveQuizRequest(BaseModel):
    """The request body for generating an adaptive quiz."""
    content_id: Optional[str] = None # Make content_id optional
    previous_result: QuizResult
