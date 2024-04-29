from transitions import EventData
from mbc.domain.model.patient import Patient

from . import EventFn

def action(patient: Patient, event: EventData):
    print(f'fire flag event action {event}')
    patient.flags[event.kwargs['type']] = event.kwargs['value']

flag_event = EventFn('flag', action)