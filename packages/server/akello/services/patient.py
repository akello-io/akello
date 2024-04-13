from akello.db.models_v2.patient import Patient
from akello.services import BaseService


class PatientService(BaseService):
    patient: Patient = None

    def __init__(self, patient_id: str):
        self.patient = Patient(patient_id)

    def get(self) -> Patient:
        return self.patient.get()

    def put(self) -> Patient:
        return self.patient.put()

    def create(self, patient: Patient) -> Patient:
        return self.patient.create(patient)
