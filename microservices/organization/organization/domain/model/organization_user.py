from pydantic import BaseModel, Field
from pydantic.types import Literal

type OrganizationUserStatus = Literal["active", "inactive", "pending"]

class OrganizationUser(BaseModel):
    id: str
    user_id: str
    organization_id: str
    status: OrganizationUserStatus = Field("active", description="Status of the user in the organization")