import uuid

from akello.db.connector.dynamodb import RegistryDBBaseModel


class Registry(RegistryDBBaseModel):
    id: str = str(uuid.uuid4())
    name: str = None
    logo: str = None

    @property
    def object_type(self) -> str:
        return 'registry'

    @property
    def sort_key(self) -> str:
        return 'meta'


class RegistryOrganization(RegistryDBBaseModel):
    id: str
    organization_id: str

    @property
    def object_type(self) -> str:
        return 'registry-organization'

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id