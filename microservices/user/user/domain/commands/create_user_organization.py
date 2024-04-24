from pydantic import BaseModel


class CreateUserOrganizationCommand(BaseModel):
    user_id: str
    organization_id: str
