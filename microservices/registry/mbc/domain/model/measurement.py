from pydantic import BaseModel


class Measurement(BaseModel):
    user_id: str
    registry_id: str
    measurement_id: str
    value: float
    measured_at: float
    created_at: float
