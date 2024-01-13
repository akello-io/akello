from pydantic import BaseModel
from typing import List, Optional


class Response(BaseModel):
    id: str
    response: str
    score: int


class Question(BaseModel):
    id: str
    question: str
    responses: List[Response]
    score: int = 0


class Questionnaire(BaseModel):
    name: str
    uid: str
    questions: List[Question]
