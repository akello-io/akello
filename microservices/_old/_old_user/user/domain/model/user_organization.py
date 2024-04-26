from pydantic import BaseModel


class UserOrganization(BaseModel):
    id: str
    user_id: str
    organization_id: str