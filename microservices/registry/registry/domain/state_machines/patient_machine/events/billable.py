from transitions import EventData

from registry.domain.model.registry import RegistryUser
from registry.domain.ports.registry_query_service import RegistryQueryService

from . import EventFn


def action(patient: RegistryUser, patient_query_service: RegistryQueryService, event: EventData):
    print(f'fire billable event action {event} {event.kwargs}')

    """
    Generate a context for this event


    author
    patient

    message: <author> has run a billable event. The event is a patient session. The duration was for 3 mins.


    """
    patient.billable(event.kwargs['type'], event.kwargs['minutes'])

billable_event = EventFn('billable', action)
