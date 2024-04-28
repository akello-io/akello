class EventFn:

    def __init__(self, trigger, fn):
        self.trigger = trigger
        self.fn = fn

    def run(self, **kwargs):
        return self.fn(**kwargs)
