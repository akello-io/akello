from typing import Optional

from pydantic import BaseModel, Field
from pydantic.types import Literal


type OrganizationStatus = Literal["active", "inactive", "pending"]

class Organization(BaseModel):
    id: str
    name: Optional[str] = None
    status: OrganizationStatus = Field("active", description="Status of the organization")