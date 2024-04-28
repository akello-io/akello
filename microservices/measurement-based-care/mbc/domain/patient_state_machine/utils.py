from transitions import EventData

from mbc.domain.patient_state_machine.event_functions.flag import flag_event
from mbc.domain.patient_state_machine.patient_state_machine import has_consent_condition, has_moderate_depression
from mbc.domain.patient_state_machine.state import State


class CallbackObject:
    name: str
    fn: callable

    def __init__(self, name: str, fn: callable):
        self.name = name
        self.fn = fn


def on_enter_treatment(event: EventData):
    for event_fn in event.state.event_functions:
        if event_fn.trigger == event.event.name:
            event_fn.run()


fn_map = {
    'flag_event': flag_event,
    'has_consent_condition': has_consent_condition(),
    'has_moderate_depression': has_moderate_depression()
}

callback_map = {
    'on_enter_treatment': on_enter_treatment
}


def build_state(name: str, prerequisites: list = [], event_functions: list = [], callbacks: list[CallbackObject] = []):
    prerequisite_fn = [fn_map[prerequisite] for prerequisite in prerequisites]
    event_fn = [fn_map[event_function] for event_function in event_functions]
    state = State(name=name, prerequisites=prerequisite_fn, event_functions=event_fn)
    for callback in callbacks:
        state.add_callback(callback['event'], callback_map[callback['fn']])
    return state
