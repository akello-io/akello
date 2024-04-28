from transitions import State as BaseState

from mbc.domain.patient_state_machine.event_functions.event import EventFn
from mbc.domain.patient_state_machine.models.condition import Condition


class State(BaseState):
    name: str
    prerequisites: list[Condition] = []
    event_functions: list[EventFn] = []

    def __init__(self, name, prerequisites=[], event_functions=[]):
        super(State, self).__init__(name)
        self.prerequisites = prerequisites
        self.event_functions = event_functions
