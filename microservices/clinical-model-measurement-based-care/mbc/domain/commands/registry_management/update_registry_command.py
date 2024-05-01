from pydantic import BaseModel


class UpdateRegistryCommand(BaseModel):
    name: str
    description: str
