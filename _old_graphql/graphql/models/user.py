import strawberry
from typing import List, Optional
from models.organization import Organization
from models.base import BaseUser



@strawberry.type
class User(BaseUser):
    organizations: Optional[List[Organization]] = None

