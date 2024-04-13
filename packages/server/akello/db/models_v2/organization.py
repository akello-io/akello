import uuid

from akello.db.connector.dynamodb import RegistryDBBaseModel


class Organization(RegistryDBBaseModel):
    id: str = str(uuid.uuid4())
    name: str

    @property
    def object_type(self) -> str:
        return 'organization'

    @property
    def sort_key(self) -> str:
        return 'meta'
