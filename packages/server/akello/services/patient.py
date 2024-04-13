from akello.db.models import PatientRegistry


class Patient:
    patient_registry: PatientRegistry = None

    def __init__(self, patient_id: str):
        self.patient_id = patient_id

    def get_patient(self):
        self.patient_registry = PatientRegistry.get(partition_key=self.patient_id, sort_key='patient')
        return self.patient_registry