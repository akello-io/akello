from typing import Optional

from pydantic import BaseModel, Field

class Organization(BaseModel):
    id: str
    name: Optional[str] = None
    stripe_customer_id: Optional[str] = None
    created_by_user_id: str