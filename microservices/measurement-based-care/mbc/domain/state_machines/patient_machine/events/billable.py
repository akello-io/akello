from transitions import EventData

from mbc.domain.model.user import Patient
from mbc.domain.ports.user_query_service import UserQueryService

from . import EventFn


def action(patient: Patient, patient_query_service: UserQueryService, event: EventData):
    print(f'fire billable event action {event} {event.kwargs}')

    """
    Generate a context for this event
    
    
    author
    patient
    
    message: <author> has run a billable event. The event is a patient session. The duration was for 3 mins.
    
    
    """
    patient.billable(event.kwargs['type'], event.kwargs['minutes'])

billable_event = EventFn('billable', action)
