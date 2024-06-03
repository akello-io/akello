from pydantic import BaseModel


class GetUserFromRegistryCommand(BaseModel):
    registry_id: str
    user_id: str