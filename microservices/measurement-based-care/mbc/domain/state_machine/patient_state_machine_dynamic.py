from transitions import Machine
from mbc.domain.model.patient import Patient

patient_conf = {
    'name': 'patient',
    'states': [
        'referred',
        'treatment',
        'relapse_prevention',
        'discharged'
    ],
    'transitions': [
        {
            'trigger': 'accept_to_program',
            'source': 'referred',
            'dest': 'treatment',
            'conditions': 'has_consented'

        },
        {
            'trigger': 'graduate',
            'source': 'treatment',
            'dest': 'relapse_prevention',
        },
        {
            'trigger': 'discharge',
            'source': '*',
            'dest': 'discharged',
        },

    ],
    'initial': 'referred'
}


class PatientStateMachineDynamic:
    name: str
    patient: Patient
    states: list[str]
    transitions: list[dict]

    def __init__(self, name, patient, initial_state, states, transitions):
        self.name = name
        self.patient = patient
        self.states = states
        self.transitions = transitions
        self.machine = Machine(model=self, states=self.states, initial=initial_state)
        for transition in self.transitions:
            self.machine.add_transition(**transition)

    def has_consented(self):
        print("has not consented")
        return False

    def get_next_states(self):
        return [state for state in self.machine.get_triggers(self.state) if not state.startswith('to_')]


