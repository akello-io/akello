from mbc.domain.model.patient import Patient
from transitions import Machine
from .actions import action
from .models.registry import Registry


class PatientStateMachineBuilder(Patient):

    def __init__(self, name, states, transitions):
        self.name = name
        self.states = states
        self.transitions = transitions
        self.machine = Machine(model=self, states=self.states, initial='referral')
        for transition in self.transitions:
            self.machine.add_transition(**transition)

    def get_next_states(self):
        return [state for state in self.machine.get_triggers(self.state) if not state.startswith('to_')]


class PatientStateMachineBuilderRegistry(PatientStateMachineBuilder):

    def __init__(self, registry: Registry):
        super().__init__(registry.state_machine.name, registry.state_machine.states, registry.state_machine.transitions)
