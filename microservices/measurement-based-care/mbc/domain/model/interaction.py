from pydantic import BaseModel


class Interaction(BaseModel):
    patient_id: str
    provider_id: str
    category: str # type defined by the account
    type: str # type defined by the account
    minutes: int
    date_of_interaction: str
    created_at: str
