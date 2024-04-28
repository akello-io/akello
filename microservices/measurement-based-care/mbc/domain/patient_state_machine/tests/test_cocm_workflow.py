from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService
from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.conditions.has_completed_assessment import \
    has_completed_assessment_condition_handler, HasCompletedAssessmentCondition
from mbc.domain.patient_state_machine.event_functions.event import EventFn
from mbc.domain.patient_state_machine.models.condition import Condition
from mbc.domain.patient_state_machine.patient_state_machine import CoCMPatientStateMachine
from mbc.domain.patient_state_machine.state import State
from mbc.domain.ports.patient_query_service import PatientQueryService

has_consent_condition = Condition(
    name='has_consent',
    command=HasCompletedAssessmentCondition(
        patient_id='patient_id',
        patient_query_service=PatientQueryService,
        assessment_name='consent'
    ),
    handler=has_completed_assessment_condition_handler
)


def event_action(*args, **kwargs):
    print('custom flag event')


accept_event = EventFn('accept', event_action)
flag_event = EventFn('flag', event_action, params={'flag': 'flag'})
billable_event = EventFn('billable', event_action)

referred_state = State(name='referred', conditions=[has_consent_condition])
treatment_state = State(name='treatment', conditions=[has_consent_condition], event_functions=[flag_event])
relapse_prevention_state = State(name='relapse_prevention')
discharged_state = State(name='discharged')

registered_states = {
    referred_state.name: referred_state,
    treatment_state.name: treatment_state,
    relapse_prevention_state.name: relapse_prevention_state,
    discharged_state.name: discharged_state
}

model_patient = Patient(registry_id='123', user_id='456', created_at=3)
machine = CoCMPatientStateMachine(model_patient, DynamoDBPatientQueryService(),
                                  states=[referred_state, treatment_state, relapse_prevention_state, discharged_state])

machine.machine.add_transition('accept', referred_state, treatment_state, conditions=['check_transition'])
machine.machine.add_transition('flag', treatment_state, treatment_state)
machine.machine.add_transition('billable', treatment_state, treatment_state)
machine.machine.add_transition('graduate', treatment_state, relapse_prevention_state)
machine.machine.add_transition('discharge', '*', discharged_state)

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
