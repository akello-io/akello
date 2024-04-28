from . import EventFn

def action(*args, **kwargs):
    print(f'fire flag event action {args} {kwargs}')

flag_event = EventFn('flag', action)