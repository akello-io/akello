from pydantic import BaseModel
from mbc.domain.model.user import User
from mbc.domain.model.patient import Patient


class FlagPatientCommand(BaseModel):
    provider: User
    patient: Patient
    flag: str
    is_enabled: bool
