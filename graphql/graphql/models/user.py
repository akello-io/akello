import strawberry
from typing import Optional
from models.organization import Organization
from models.common import BaseUser

@strawberry.type
class User(BaseUser):
    organizations: Optional[Organization] = None

