from transitions import EventData

from mbc.domain.model.patient import Patient
from mbc.domain.ports.patient_query_service import PatientQueryService

from . import EventFn


def action(patient: Patient, patient_query_service: PatientQueryService,  event: EventData):
    print(f'fire flag event action {event}')
    patient.flags[event.kwargs['type']] = event.kwargs['value']

flag_event = EventFn('flag', action)