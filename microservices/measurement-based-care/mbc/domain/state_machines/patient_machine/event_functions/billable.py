from transitions import EventData

from mbc.domain.model.patient import Patient
from . import EventFn


def action(patient: Patient, event: EventData):
    print(f'fire billable event action {event} {event.kwargs}')
    patient.billable(event.kwargs['type'], event.kwargs['minutes'])

billable_event = EventFn('billable', action)
