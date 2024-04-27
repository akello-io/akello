from enum import Enum

from transitions import Machine, EventData, State as BaseState

from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.conditions.has_completed_assessment import \
    has_completed_assessment_condition_handler, HasCompletedAssessmentCondition
from mbc.domain.ports.patient_query_service import PatientQueryService


class Trigger(Enum):
    accept = 'accept'
    flag = 'flag'
    billable = 'billable'
    graduate = 'graduate'
    discharge = 'discharge'


class TransitionCondition:
    name: str
    command: any
    handler: any

    def __init__(self, name, command, handler):
        self.name = name
        self.command = command
        self.handler = handler


class MeasurementCondition:
    measurement: str
    date_completed_by: int = None
    value_lte: int = None
    value_gte: int = None


class State(BaseState):
    name: str
    assessment_conditions: list[TransitionCondition] = []
    measurement_conditions: list[MeasurementCondition] = []

    def __init__(self, name, assessment_conditions=[], measurement_conditions=[]):
        super(State, self).__init__(name)
        self.assessment_conditions = assessment_conditions
        self.measurement_conditions = measurement_conditions


has_consent_condition = TransitionCondition(
    name='has_consent',
    command=HasCompletedAssessmentCondition(
        patient_id='patient_id',
        patient_query_service=PatientQueryService,
        assessment_name='consent'
    ),
    handler=has_completed_assessment_condition_handler
)

referred_state = State(name='referred', assessment_conditions=[has_consent_condition])
treatment_state = State(name='treatment', assessment_conditions=[has_consent_condition])

relapse_prevention_state = State(name='relapse_prevention')
discharged_state = State(name='discharged')

registered_states = {
    referred_state.name: referred_state,
    treatment_state.name: treatment_state,
    relapse_prevention_state.name: relapse_prevention_state,
    discharged_state.name: discharged_state
}


class CoCMPatientStateMachine:
    patient: Patient
    patient_query_service: PatientQueryService

    def __init__(self, patient: Patient, patient_query_service: PatientQueryService) -> None:
        self.patient_query_service = patient_query_service
        # self.patient = self.patient_query_service.get_patient(patient.user_id)
        self.patient = patient
        states = [referred_state, treatment_state, relapse_prevention_state, discharged_state]
        self.machine = Machine(model=self, states=states, initial=patient.state, send_event=True)

    def check_transition(self, event: EventData):
        destination_state = registered_states[event.transition.dest]
        for condition in destination_state.assessment_conditions:
            if not condition.handler(condition.command):
                return False
        return True

    def on_enter(self, event: EventData):
        print(f"Triggered event '{event.event.name}'")
        print(event.kwargs)
        # self.patient_query_service.put_patient(self.patient)

    def on_enter_treatment(self, event: EventData):
        print("Entering treatment")
        self.on_enter(event)
        self.patient.state = 'treatment'
        match event.event.name:
            case 'accept':
                pass
            case 'flag':
                flag_type = event.kwargs['type']
                value = event.kwargs['value']
                self.patient.flags[flag_type] = value
            case 'billable':
                billable_type = event.kwargs['type']
                minutes = event.kwargs['minutes']
                print(f"Billable event: {billable_type} for {minutes} minutes")
            case 'session':
                pass
            case _:
                raise Exception(f"Unexpected event '{event.event.name}'")

    def on_enter_relapse_prevntion(self, event: EventData):
        print("Entering relapse_prevntion")
        self.on_enter(event)
        self.patient.state = 'relapse_prevention'

    def on_enter_discharged(self, event: EventData):
        print("Entering discharged")
        self.on_enter(event)
        self.patient.state = 'discharged'


from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService

model_patient = Patient(registry_id='123', user_id='456', created_at=3)
machine = CoCMPatientStateMachine(model_patient, DynamoDBPatientQueryService())

machine.machine.add_transition(Trigger.accept.value, referred_state, treatment_state, conditions=['check_transition'])
machine.machine.add_transition(Trigger.flag.value, treatment_state, treatment_state)
machine.machine.add_transition(Trigger.billable.value, treatment_state, treatment_state)
machine.machine.add_transition(Trigger.graduate.value, treatment_state, relapse_prevention_state)
machine.machine.add_transition(Trigger.discharge.value, '*', discharged_state)

print('=========> accept')
machine.accept()
machine.flag(type='safety-risk', value=True)
machine.billable(type='caseload-review', minutes=3)
machine.billable(type='patient-session', minutes=3)
print('=========> graduate')
machine.graduate()
print('=========> discharge')
machine.discharge()
print(machine.patient)
