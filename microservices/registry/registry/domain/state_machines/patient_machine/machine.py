from transitions import Machine, EventData

from registry.domain.model.registry import RegistryUser
from registry.domain.state_machines.patient_machine.models.state import State
from registry.domain.ports.registry_query_service import RegistryQueryService


class RegistryPatientStateMachine:
    registry_user: RegistryUser
    registry_query_service: RegistryQueryService

    def __init__(self, registry_user: RegistryUser, patient_query_service: RegistryQueryService, states: list[State]) -> None:
        self.patient_query_service = patient_query_service
        self.registry_user = registry_user
        self.machine = Machine(model=self, states=states, initial=registry_user.state, send_event=True)
        self.registered_states = {state.name: state for state in states}

    def check_transition(self, event: EventData):
        destination_state = self.registered_states[event.transition.dest]

        print(f"Checking transition to '{destination_state.name}' triggered by event '{event.event.name}'")

        for prerequisite in destination_state.prerequisites:
            if not prerequisite.handler(**prerequisite.params):
                return False
        return True

    def before_transition(self, event: EventData):
        print(f"Before transition to '{event.transition.dest}' triggered by event '{event.event.name}'")
        self.registry_user.state = event.transition.dest

        for event_fn in event.state.event_functions:
            if event_fn.trigger == event.event.name:
                event_fn.run(self.registry_user, self.patient_query_service, event)

        return True

