from transitions import EventData

from mbc.domain.state_machines.patient_machine.conditions.has_concented import has_consented_condition_handler
from mbc.domain.state_machines.patient_machine.conditions.has_measurement_value import has_measurement_value
from mbc.domain.state_machines.patient_machine.event_functions import billable_event
from mbc.domain.state_machines.patient_machine.event_functions.flag import flag_event
from mbc.domain.state_machines.patient_machine.models import Condition
from mbc.domain.state_machines.patient_machine.state import State


class CallbackObject:
    name: str
    fn: callable

    def __init__(self, name: str, fn: callable):
        self.name = name
        self.fn = fn


def has_consent_condition(*args, **kwargs) -> Condition:
    return Condition(
        params=kwargs,
        handler=has_consented_condition_handler
    )


def has_moderate_depression(*args, **kwargs) -> Condition:
    return Condition(
        params={'assessment_name': 'phq-9', 'assessment_value_gte': 15},
        handler=has_measurement_value
    )


def is_below_depression_threshold(*args, **kwargs) -> Condition:
    return Condition(
        params={'assessment_name': 'phq-9', 'assessment_value_lte': 4},
        handler=has_measurement_value
    )


def on_enter_treatment(event: EventData):
    for event_fn in event.state.event_functions:
        if event_fn.trigger == event.event.name:
            event_fn.run(**event.kwargs)


fn_map = {
    'flag_event': flag_event,
    'billable_event': billable_event,
    'has_consent_condition': has_consent_condition(),
    'has_moderate_depression': has_moderate_depression(),
    'on_enter_treatment': on_enter_treatment
}

def build_event_fn(name: str, fn: callable, params: dict = {}):
    return CallbackObject(name=name, fn=fn, params=params)


def build_state(name: str, prerequisites: list = [], event_functions: list = [], callbacks: list[CallbackObject] = []):
    prerequisite_fn = [fn_map[prerequisite] for prerequisite in prerequisites]
    event_fns = [fn_map[event_function] for event_function in event_functions]
    state = State(name=name, prerequisites=prerequisite_fn, event_functions=event_fns)
    for callback in callbacks:
        state.add_callback(callback['event'], fn_map[callback['fn']])
    return state
