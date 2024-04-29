from transitions import EventData
from mbc.domain.model.patient import Patient

class EventFn:

    def __init__(self, trigger, fn):
        self.trigger = trigger
        self.fn = fn

    def run(self, patient: Patient, event: EventData):
        return self.fn(patient, event)
