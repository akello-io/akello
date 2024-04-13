import uuid

from akello.db.connector.dynamodb import RegistryDBBaseModel


class User(RegistryDBBaseModel):
    id: str = str(uuid.uuid4())

    @property
    def object_type(self) -> str:
        return 'user'

    @property
    def sort_key(self) -> str:
        return 'meta'


class UserRegistry(RegistryDBBaseModel):
    id: str
    registry_id: str

    @property
    def object_type(self) -> str:
        return 'user-registry'

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserOrganization(RegistryDBBaseModel):
    id: str
    organization_id: str

    @property
    def object_type(self) -> str:
        return 'user-organization'

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id
