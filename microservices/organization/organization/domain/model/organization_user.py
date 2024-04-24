from pydantic import BaseModel, Field
from pydantic.types import Literal

ORGANIZATION_USER_STATUS = Literal["active", "inactive", "pending"]

class OrganizationUser(BaseModel):
    id: str
    user_id: str
    organization_id: str
    status: ORGANIZATION_USER_STATUS = Field("active", description="Status of the user in the organization")