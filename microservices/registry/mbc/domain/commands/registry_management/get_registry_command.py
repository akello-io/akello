from pydantic import BaseModel


class GetRegistryCommand(BaseModel):
    registry_id: str