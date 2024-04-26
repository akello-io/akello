from typing import Optional

from pydantic import BaseModel, Field
from pydantic.types import Literal


ORGANIZATION_STATUS = Literal["active", "inactive", "pending"]

class Organization(BaseModel):
    id: str
    name: Optional[str] = None
    status: ORGANIZATION_STATUS = Field("active", description="Status of the organization")