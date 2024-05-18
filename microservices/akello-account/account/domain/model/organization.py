from pydantic import BaseModel
from decimal import Decimal


class Organization(BaseModel):
    id: str
    name: str
    created_at: str
    updated_at: str
