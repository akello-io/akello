from pydantic import BaseModel
from typing import Optional

class StateTransition(BaseModel):
    trigger: str
    source: str
    dest: str
    before: Optional[str]
    after: Optional[str]
    conditions: Optional[str]