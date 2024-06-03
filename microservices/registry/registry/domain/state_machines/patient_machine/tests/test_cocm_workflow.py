import unittest
from unittest.mock import patch

import yaml
from transitions.core import MachineError

from registry.domain.state_machines.patient_machine.setup import setup_machine

"""
class TestStringMethods(unittest.TestCase):

    def setUp(self) -> None:
        with open('../workflow.yml') as f:
            config = yaml.safe_load(f)
            config = config['workflow']
        self.machine = setup_machine(config)

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

    @patch('registry.domain.model.patient.Patient.billable')
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

"""