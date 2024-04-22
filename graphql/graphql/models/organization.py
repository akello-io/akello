import strawberry
from models.registry import Registry
from typing import List, Union, Optional

@strawberry.type
class Organization:
    id: str
    name: str
    registries: Optional[Registry]