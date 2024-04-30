from transitions import EventData
from mbc.domain.model.patient import Patient
from mbc.domain.ports.patient_query_service import PatientQueryService

class EventFn:

    def __init__(self, trigger, fn):
        self.trigger = trigger
        self.fn = fn

    def run(self, patient: Patient, patient_query_service: PatientQueryService,  event: EventData):
        return self.fn(patient, patient_query_service, event)
