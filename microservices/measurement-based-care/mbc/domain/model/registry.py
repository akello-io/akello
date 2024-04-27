from pydantic import BaseModel

class Registry(BaseModel):
    id: str
    name: str
    description: str
    workflow: dict[str, dict] # registry_state & substates
    created_at: float

