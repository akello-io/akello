from mbc.domain.ports.patient_query_service import PatientQueryService
from mbc.domain.model.patient import Patient
from typing import List
from datetime import datetime

class DynamoDBPatientQueryService(PatientQueryService):

    def get_patient(self, patient_id: str) -> Patient:
        pass

    def get_patients(self) -> List[Patient]:
        pass

    def get_patients_by_name(self, name: str) -> List[Patient]:
        pass

    def get_patients_by_dob(self, dob: datetime) -> List[Patient]:
        pass


