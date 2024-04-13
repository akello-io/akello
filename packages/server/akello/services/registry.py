from akello.db.models_v2.registry import Registry
from akello.db.models_v2.measurement import Measurement
from akello.services import BaseService


class RegistryService(BaseService):
    registry: Registry = None

    def __init__(self, registry_id: str):
        self.registry = Registry(registry_id)

    def get(self) -> Registry:
        return self.registry.get()

    def put(self) -> Registry:
        return self.registry.put()

    def create(self, patient: Registry) -> Registry:
        return self.registry.create(patient)

    def list_patients_with_consent(self, registry_id: str):
        pass

    # TREATMENT RELATED METHODS
    def add_patient_measurement(self, patient_id: str, measurement: Measurement, registry: Registry):
        pass

    def add_self_measurement(self, measurement: Measurement, registry: Registry):
        # self reported measurement
        pass
