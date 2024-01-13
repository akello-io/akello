from pydantic import BaseModel
from typing import List, Optional


class Response(BaseModel):
    id: str
    response: str
    score: int
    selected: Optional[bool] = False


class Question(BaseModel):
    question: str
    responses: List[Response]


class Questionnaire(BaseModel):
    name: str
    uid: str
    questions: List[Question]
