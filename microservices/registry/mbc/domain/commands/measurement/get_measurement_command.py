from pydantic import BaseModel


class GetMeasurementCommand(BaseModel):
    user_id: str
    registry_id: str
    measurement_id: str
    start_date: float
    end_date: float