from pydantic import BaseModel


class AddMeasurementCommand(BaseModel):
    user_id: str
    registry_id: str
    measurement_id: str
    value: float
    measured_at: float