from pydantic import BaseModel


class CreateRegistryCommand(BaseModel):
    name: str
    description: str
