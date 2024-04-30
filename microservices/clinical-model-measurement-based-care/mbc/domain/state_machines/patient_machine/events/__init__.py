from transitions import EventData
from mbc.domain.model.user import Patient
from mbc.domain.ports.user_query_service import UserQueryService

class EventFn:

    def __init__(self, trigger, fn):
        self.trigger = trigger
        self.fn = fn

    def run(self, patient: Patient, patient_query_service: UserQueryService, event: EventData):
        return self.fn(patient, patient_query_service, event)
