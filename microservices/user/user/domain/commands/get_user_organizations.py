from pydantic import BaseModel


class GetUserOrganizationCommand(BaseModel):
    id: str
