from pydantic import BaseModel

class User(BaseModel):
    registry_id: str
    user_id: str
    role: str
    created_at: float
    is_enabled: bool

