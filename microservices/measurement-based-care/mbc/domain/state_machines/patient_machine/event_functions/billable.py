from transitions import EventData

from mbc.domain.model.patient import Patient
from mbc.domain.ports.patient_query_service import PatientQueryService

from . import EventFn


def action(patient: Patient, patient_query_service: PatientQueryService,  event: EventData):
    print(f'fire billable event action {event} {event.kwargs}')
    patient.billable(event.kwargs['type'], event.kwargs['minutes'])

billable_event = EventFn('billable', action)
