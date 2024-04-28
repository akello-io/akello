from .event import EventFn

def action(*args, **kwargs):
    print('fire billable event action')

event = EventFn('billable', action)