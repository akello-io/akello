from transitions import EventData

from mbc.domain.model.user import Patient
from mbc.domain.ports.user_query_service import UserQueryService

from . import EventFn


def action(patient: Patient, patient_query_service: UserQueryService, event: EventData):
    print(f'fire flag event action {event}')
    patient.flags[event.kwargs['type']] = event.kwargs['value']

flag_event = EventFn('flag', action)