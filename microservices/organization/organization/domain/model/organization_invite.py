from typing import Optional
from typing import Literal

from pydantic import BaseModel, Field

type OrganizationInviteStatus = Literal["pending", "accepted", "declined"]

class OrganizationInvite(BaseModel):
    id: str
    organization_id: str
    email: str
    status: OrganizationInviteStatus = Field("pending", description="Status of the invite")