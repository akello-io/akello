from pydantic import BaseModel

class Patient(BaseModel):
    patient_id: str
    mrn: str
    first_name: str
    last_name: str
    date_of_birth: str
    referral_date: str
    state: str
    baseline_measurements: list
    latest_measurements: list
    dates_of_interaction: list