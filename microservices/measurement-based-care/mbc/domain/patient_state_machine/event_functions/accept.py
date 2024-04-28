from .event import EventFn

def action(*args, **kwargs):
    print('fire accept event action')

event = EventFn('accept', action)