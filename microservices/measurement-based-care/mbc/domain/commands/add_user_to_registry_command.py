from pydantic import BaseModel


class AddUserToRegistryCommand(BaseModel):
    registry_id: str
    user_id: str
    role: str