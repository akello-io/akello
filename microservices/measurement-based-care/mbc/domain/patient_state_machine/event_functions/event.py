class EventFn:

    def __init__(self, trigger, fn, params=None):
        self.trigger = trigger
        self.fn = fn
        self.params = params

    def run(self):
        if self.params:
            return self.fn(**self.params)
        return self.fn()
