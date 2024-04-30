from mbc.domain.model.patient import Patient
from mbc.domain.model.user import User
from mbc.domain.model.registry import Registry


class ReferPatientCommand:
    def __init__(self, patient: Patient, referred_by: User, registry: Registry):
        self.patient = patient
        self.referred_by = referred_by
        self.registry = registry