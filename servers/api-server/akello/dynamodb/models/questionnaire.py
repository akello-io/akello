from pydantic import BaseModel
from typing import List, Optional


class Response(BaseModel):
    response: str
    score: int


class Question(BaseModel):
    question: str
    responses: List[Response]


class Questionnaire(BaseModel):
    name: str
    questions: List[Question]
