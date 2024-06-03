from transitions import EventData
from registry.domain.model.registry import RegistryUser
from registry.domain.ports.registry_query_service import RegistryQueryService

class EventFn:

    def __init__(self, trigger, fn):
        self.trigger = trigger
        self.fn = fn

    def run(self, patient: RegistryUser, patient_query_service: RegistryQueryService, event: EventData):
        return self.fn(patient, patient_query_service, event)
