from typing import Optional

from pydantic import BaseModel, Field

class OrganizationUser(BaseModel):
    id: str
    user_id: str
    organization_id: str
    status: Optional[str] = Field(None, description="Status of the user in the organization")