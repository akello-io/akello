from pydantic import BaseModel
from .state import State
from .state_transition import StateTransition

class StateMachine(BaseModel):
    name: str
    states: list[State]
    transitions: list[StateTransition]