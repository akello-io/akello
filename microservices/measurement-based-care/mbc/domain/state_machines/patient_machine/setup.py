from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService
from mbc.domain.model.patient import Patient
from mbc.domain.state_machines.patient_machine.machine import PatientStateMachine
from mbc.domain.state_machines.patient_machine.utils import build_state

def setup_machine(config: dict):
    states = []
    for state in config['states']:
        states.append(build_state(
            state,
            prerequisites=config['states'][state]['prerequisites'],
            event_functions=config['states'][state]['event_functions'],
            callbacks=config['states'][state].get('callbacks', [])
        ))

    machine = PatientStateMachine(
        Patient(registry_id='123', user_id='456', created_at=3),
        DynamoDBPatientQueryService(),
        states=states
    )

    for transition in config['transitions']:
        if transition['source'] == '*':
            machine.machine.add_transition(transition['trigger'], '*', transition['target'],
                                           conditions=transition.get('conditions', []),
                                           before=transition.get('before', []))
        else:
            machine.machine.add_transition(transition['trigger'], transition['source'], transition['target'],
                                           conditions=transition.get('conditions', []),
                                           before=transition.get('before', []))
    return machine
