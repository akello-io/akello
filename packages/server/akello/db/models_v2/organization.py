import uuid

from akello.db.models_v2 import AkelloBaseModel


class Organization(AkelloBaseModel):
    id: str = str(uuid.uuid4())
    name: str

    @property
    def object_type(self) -> str:
        return 'organization'

    @property
    def sort_key(self) -> str:
        return 'meta'
