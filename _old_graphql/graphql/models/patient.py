import strawberry
from typing import Optional
from models.registry import Registry

from models.base import BaseUser

@strawberry.type
class Patient(BaseUser):
    registry: Optional[Registry]


