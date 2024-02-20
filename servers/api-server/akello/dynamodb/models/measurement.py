from pydantic import BaseModel
from typing import List, Optional
from typing import Union


class Response(BaseModel):
    id: str
    response: str
    score: int


class Question(BaseModel):
    id: str
    question: str
    responses: List[Response]
    score: int = 0

class FHIRWeight(BaseModel):
    name: str
    jsonPath: str
    codes: List[str]
    weight: int


class Measurement(BaseModel):
    name: str
    uid: str
    type: str
    measurements: Union[List[Question], List[FHIRWeight]]
