from pydantic import BaseModel


class OrganizationUser(BaseModel):
    user_id: str
    role: str
