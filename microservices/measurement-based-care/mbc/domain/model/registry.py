from pydantic import BaseModel
from typing import List
from mbc.domain.model.measurement import Measurement

class Registry(BaseModel):
    id: str
    name: str
    description: str
    workflow: dict[str, dict] # registry_state & substates
    created_at: float


class User(BaseModel):
    registry_id: str
    user_id: str
    role: str
    created_at: float
    is_enabled: bool


class Patient(BaseModel):
    registry_id: str
    user_id: str
    created_at: float
    is_enabled: bool

    state: str

    baseline_measurements: dict[str, Measurement]
    latest_measurements: dict[str, Measurement]
    dates_of_interaction: dict[str, float]
