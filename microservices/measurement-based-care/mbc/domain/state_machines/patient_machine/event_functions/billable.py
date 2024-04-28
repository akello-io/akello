from . import EventFn

def action(*args, **kwargs):
    print('fire billable event action')

billable_event = EventFn('billable', action)