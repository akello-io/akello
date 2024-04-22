import strawberry

@strawberry.type
class Registry:
    id: str
    name: str