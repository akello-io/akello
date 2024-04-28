from . import EventFn

def action(*args, **kwargs):
    print('fire flag event action')

flag_event = EventFn('flag', action)