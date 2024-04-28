class Condition:
    name: str
    command: any
    handler: any

    def __init__(self, name, command, handler):
        self.name = name
        self.command = command
        self.handler = handler
