from enum import Enum

from pydantic import BaseModel


class Category(str, Enum):
    caseload_review = "Caseload Review"
    registry_review = "Registry Review"
    brief_intervention = "Brief Intervention"


class Type(str, Enum):
    initial_assessment = "Initial Assessment"
    follow_up = "Follow Up"
    psychiatric_consultation = "Psychiatric Consultation"


class Interaction(BaseModel):
    patient_id: str
    provider_id: str
    category: Category
    type: str
    minutes: int
    date_of_interaction: str
    created_at: str
