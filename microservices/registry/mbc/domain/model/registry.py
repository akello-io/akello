from pydantic import BaseModel
from decimal import Decimal

class Registry(BaseModel):
    id: str
    name: str
    description: str
    created_at: Decimal


class RegistryUser(BaseModel):
    """
    Stores the relationship between a User from the User Account Microservice and a Registry
    Providers and Patients will be mapped in this object and classified by the role field
    """
    registry_id: str
    user_id: str
    role: str
    state: str
    flags: dict[str, bool] = {}
    created_at: Decimal
    is_enabled: bool
