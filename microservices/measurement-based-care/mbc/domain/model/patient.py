from pydantic import BaseModel

from mbc.domain.model.measurement import Measurement


class Patient(BaseModel):
    registry_id: str
    user_id: str
    created_at: float
    is_enabled: bool = True

    flags: dict[str, bool] = {}

    state: str = "referred"

    baseline_measurements: dict[str, Measurement] = {}
    latest_measurements: dict[str, Measurement] = {}
    dates_of_interaction: dict[str, float] = {}

    def billable(self, type: str, minutes: int):
        print("save billable event")
