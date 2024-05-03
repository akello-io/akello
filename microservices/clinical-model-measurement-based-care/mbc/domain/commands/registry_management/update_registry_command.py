from pydantic import BaseModel


class UpdateRegistryCommand(BaseModel):
    registry_id: str
    name: str
    description: str
