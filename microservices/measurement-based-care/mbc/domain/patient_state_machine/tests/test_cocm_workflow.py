from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService
from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.patient_state_machine import CoCMPatientStateMachine
from mbc.domain.patient_state_machine.utils import build_state

config = {
    'states': {
        'referred': {
            'prerequisites': ['has_consent_condition'],
            'event_functions': ['flag_event']
        },
        'treatment': {
            'prerequisites': ['has_consent_condition', 'has_moderate_depression'],
            'event_functions': ['flag_event'],
            'callbacks': [{
                'event': 'enter',
                'fn': 'on_enter_treatment'
            }]
        },
        'relapse_prevention': {
            'prerequisites': [],
            'event_functions': []
        },
        'discharged': {
            'prerequisites': [],
            'event_functions': []
        }
    },
    'transitions': [
        {
            'trigger': 'accept',
            'source': 'referred',
            'target': 'treatment',
            'conditions': ['check_transition']
        },
        {
            'trigger': 'flag',
            'source': 'treatment',
            'target': 'treatment',
        },
        {
            'trigger': 'billable',
            'source': 'treatment',
            'target': 'treatment',
        },
        {
            'trigger': 'graduate',
            'source': 'treatment',
            'target': 'relapse_prevention',
            'conditions': ['check_transition']
        },
        {
            'trigger': 'discharge',
            'source': '*',
            'target': 'discharged',
        }
    ]
}

states = [
    build_state(
        state,
        prerequisites=config['states'][state]['prerequisites'],
        event_functions=config['states'][state]['event_functions'],
        callbacks=config['states'][state].get('callbacks', [])
    ) for state in config['states']]
machine = CoCMPatientStateMachine(
    Patient(registry_id='123', user_id='456', created_at=3),
    DynamoDBPatientQueryService(),
    states=states
)

for transition in config['transitions']:
    if transition['source'] == '*':
        machine.machine.add_transition(transition['trigger'], '*', transition['target'],
                                       conditions=transition.get('conditions', []))
    else:
        machine.machine.add_transition(transition['trigger'], transition['source'], transition['target'],
                                       conditions=transition.get('conditions', []))

machine.accept()
machine.flag(type='safety-risk', value=True)
machine.billable(type='caseload-review', minutes=3)
machine.billable(type='patient-session', minutes=3)
machine.graduate()
machine.discharge()
