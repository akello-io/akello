from mbc.domain.model.patient import Patient
from abc import ABC, abstractmethod
from typing import Optional, List


class PatientQueryService(ABC):

    @abstractmethod
    def get_patient(self, patient_id: str) -> Optional[Patient]:
        ...

    @abstractmethod
    def create_patient(self, patient: Patient) -> Patient:
        ...

    @abstractmethod
    def put_patient(self, patient: Patient) -> Patient:
        ...
