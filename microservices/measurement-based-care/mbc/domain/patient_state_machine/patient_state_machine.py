from transitions import Machine, EventData

from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.state import State
from mbc.domain.ports.patient_query_service import PatientQueryService


class CoCMPatientStateMachine:
    patient: Patient
    patient_query_service: PatientQueryService

    def __init__(self, patient: Patient, patient_query_service: PatientQueryService, states: list[State]) -> None:
        self.patient_query_service = patient_query_service
        self.patient = patient
        self.machine = Machine(model=self, states=states, initial=patient.state, send_event=True)
        self.registered_states = {state.name: state for state in states}

    def check_transition(self, event: EventData):
        destination_state = self.registered_states[event.transition.dest]
        for condition in destination_state.conditions:
            if not condition.handler(condition.command):
                return False
        return True

    def on_enter(self, event: EventData):
        print(f"Triggered event '{event.event.name}'")

    def on_enter_treatment(self, event: EventData):
        print("Entering treatment")
        self.on_enter(event)
        self.patient.state = 'treatment'
        for event_fn in event.state.event_functions:
            if event_fn.trigger == event.event.name:
                event_fn.run()

    def on_enter_relapse_prevntion(self, event: EventData):
        print("Entering relapse_prevntion")
        self.on_enter(event)
        self.patient.state = 'relapse_prevention'

    def on_enter_discharged(self, event: EventData):
        print("Entering discharged")
        self.on_enter(event)
        self.patient.state = 'discharged'
