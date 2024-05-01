from transitions import EventData

from mbc.domain.model.registry import RegistryUser
from mbc.domain.ports.registry_query_service import RegistryQueryService

from . import EventFn


def action(patient: RegistryUser, patient_query_service: RegistryQueryService, event: EventData):
    print(f'fire flag event action {event}')
    patient.flags[event.kwargs['type']] = event.kwargs['value']

flag_event = EventFn('flag', action)