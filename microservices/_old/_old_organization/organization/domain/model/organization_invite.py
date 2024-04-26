from typing import Optional
from typing import Literal

from pydantic import BaseModel, Field

ORGANIZATION_INVITE_STATUS = Literal["pending", "accepted", "declined"]

class OrganizationInvite(BaseModel):
    id: str
    organization_id: str
    email: str
    status: ORGANIZATION_INVITE_STATUS = Field("pending", description="Status of the invite")