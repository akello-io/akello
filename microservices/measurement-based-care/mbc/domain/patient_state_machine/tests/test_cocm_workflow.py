from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService
from mbc.domain.model.patient import Patient
from mbc.domain.patient_state_machine.patient_state_machine import CoCMPatientStateMachine
from mbc.domain.patient_state_machine.utils import build_state

import yaml

with open('./mbc/domain/patient_state_machine/tests/data/cocm_config.yml') as f:
    config = yaml.safe_load(f)
    config = config['workflow']


# Setup states
states = []
for state in config['states']:
    states.append(build_state(
        state,
        prerequisites=config['states'][state]['prerequisites'],
        event_functions=config['states'][state]['event_functions'],
        callbacks=config['states'][state].get('callbacks', [])
    ))

# Init machine
machine = CoCMPatientStateMachine(
    Patient(registry_id='123', user_id='456', created_at=3),
    DynamoDBPatientQueryService(),
    states=states
)

# Setup transitions
for transition in config['transitions']:
    if transition['source'] == '*':
        machine.machine.add_transition(transition['trigger'], '*', transition['target'],
                                       conditions=transition.get('conditions', []))
    else:
        machine.machine.add_transition(transition['trigger'], transition['source'], transition['target'],
                                       conditions=transition.get('conditions', []))


# Run tests
machine.accept()
machine.flag(type='safety-risk', value=True)
machine.billable(type='caseload-review', minutes=3)
machine.billable(type='patient-session', minutes=3)
machine.graduate()
machine.discharge()
