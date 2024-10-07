from models.patient import Patient

def get_patient(user_id: str) -> Patient:
    return Patient(id=user_id, email='v@v.com')
