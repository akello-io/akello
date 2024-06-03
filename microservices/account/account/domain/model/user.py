from pydantic import BaseModel
from decimal import Decimal


class User(BaseModel):
    id: str
    name: str
    email: str
    enabled: bool
    created_at: str
    updated_at: str

    class Config:
        orm_mode = True