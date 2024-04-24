from pydantic import BaseModel


class CreateUserOrganizationCommand(BaseModel):
    id: str
    user_id: str
    organization_id: str
