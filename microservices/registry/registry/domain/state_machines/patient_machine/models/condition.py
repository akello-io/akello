class Condition:
    params: dict
    handler: any

    def __init__(self, params, handler):
        self.params = params
        self.handler = handler
