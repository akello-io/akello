import uuid

from akello.db.connector.dynamodb import RegistryDBBaseModel


class Patient(RegistryDBBaseModel):
    id: str = str(uuid.uuid4())

    @property
    def object_type(self) -> str:
        return 'patient'

    @property
    def sort_key(self) -> str:
        return 'meta'


class PatientRegistry(RegistryDBBaseModel):
    id: str
    registry_id: str

    @property
    def object_type(self) -> str:
        return 'patient-registry'

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id