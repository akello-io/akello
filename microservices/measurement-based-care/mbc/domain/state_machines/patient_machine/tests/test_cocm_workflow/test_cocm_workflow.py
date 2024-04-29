import unittest

import transitions.core
import yaml

from transitions.core import MachineError
from unittest.mock import patch
from mbc.adapters.dynamodb_query_service import DynamoDBPatientQueryService
from mbc.domain.model.patient import Patient
from mbc.domain.state_machines.patient_machine.machine import PatientStateMachine
from mbc.domain.state_machines.patient_machine.utils import build_state


class TestStringMethods(unittest.TestCase):

    def setUp(self) -> None:
        with open('test_cocm_workflow_config.yml') as f:
            config = yaml.safe_load(f)
            config = config['workflow']

        states = []
        for state in config['states']:
            states.append(build_state(
                state,
                prerequisites=config['states'][state]['prerequisites'],
                event_functions=config['states'][state]['event_functions'],
                callbacks=config['states'][state].get('callbacks', [])
            ))

        self.machine = PatientStateMachine(
            Patient(registry_id='123', user_id='456', created_at=3),
            DynamoDBPatientQueryService(),
            states=states
        )

        for transition in config['transitions']:
            if transition['source'] == '*':
                self.machine.machine.add_transition(transition['trigger'], '*', transition['target'],
                                                    conditions=transition.get('conditions', []),
                                                    before=transition.get('before', []))
            else:
                self.machine.machine.add_transition(transition['trigger'], transition['source'], transition['target'],
                                                    conditions=transition.get('conditions', []),
                                                    before=transition.get('before', []))

    def test_reject_referral(self):
        self.machine.discharge()

        with self.assertRaises(MachineError):
            self.machine.accept()

    def test_accept_into_program(self):
        self.machine.accept()

    def test_flag(self):
        self.machine.accept()

        self.machine.flag(type='safety-risk', value=True)
        assert self.machine.patient.flags['safety-risk']

        self.machine.flag(type='safety-risk', value=False)
        assert self.machine.patient.flags['safety-risk'] is False

    @patch('mbc.domain.model.patient.Patient.billable')
    def test_billable(self, mock_billable):
        self.machine.accept()
        self.machine.billable(type='caseload-review', minutes=3)
        assert self.machine.patient.state == 'treatment'
        assert mock_billable.called_once_with(type='caseload-review', minutes=3)

    def test_graduate(self):
        self.machine.accept()
        self.machine.graduate()
        assert self.machine.patient.state == 'relapse_prevention'

    def test_discharge(self):
        self.machine.accept()
        self.machine.discharge()
        assert self.machine.patient.state == 'discharged'
