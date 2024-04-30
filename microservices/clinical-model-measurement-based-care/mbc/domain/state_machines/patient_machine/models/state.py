from transitions import State as BaseState

from mbc.domain.state_machines.patient_machine.events import EventFn
from mbc.domain.state_machines.patient_machine.models.condition import Condition


class State(BaseState):
    name: str
    prerequisites: list[Condition] = []
    event_functions: list[EventFn] = []

    def __init__(self, name, prerequisites=None, event_functions=None):
        super(State, self).__init__(name)
        self.prerequisites = prerequisites or []
        self.event_functions = event_functions or []
