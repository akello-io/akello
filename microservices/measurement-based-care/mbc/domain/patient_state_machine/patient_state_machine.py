from transitions import Machine, EventData

from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.conditions.has_concented import has_concented_condition_handler
from mbc.domain.patient_state_machine.conditions.has_measurement_value import has_measurement_value
from mbc.domain.patient_state_machine.models.condition import Condition
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

        for prerequisite in destination_state.prerequisites:
            if not prerequisite.handler(**prerequisite.params):
                return False
        return True


def has_consent_condition(*args, **kwargs) -> Condition:
    return Condition(
        params=kwargs,
        handler=has_concented_condition_handler
    )


def has_moderate_depression(*args, **kwargs) -> Condition:
    return Condition(
        params={'assessment_name': 'phq-9', 'assessment_value_gte': 15},
        handler=has_measurement_value
    )


def is_below_depression_threshold(*args, **kwargs) -> Condition:
    return Condition(
        params={'assessment_name': 'phq-9', 'assessment_value_lte': 4},
        handler=has_measurement_value
    )
