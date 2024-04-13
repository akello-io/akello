import uuid
from enum import Enum

from akello.db.models_v2 import AkelloBaseModel


class User(AkelloBaseModel):
    id: str = str(uuid.uuid4())

    @property
    def object_type(self) -> str:
        return 'user'

    @property
    def sort_key(self) -> str:
        return 'meta'


class UserRegistryRole(str, Enum):
    care_manager = 'Care Manager'
    psychiatrist = 'Psychiatrist'
    physician = 'Physician'
    patient = 'Patient'


class UserRegistry(AkelloBaseModel):
    id: str
    registry_id: str
    role: UserRegistryRole

    @property
    def object_type(self) -> str:
        return 'user-registry'

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserRegistryInvite(AkelloBaseModel):
    id: str
    registry_id: str
    email: str
    role: str
    accepted: bool = False

    @property
    def object_type(self) -> str:
        return 'user-registry-invite'

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserOrganizationRole(str, Enum):
    admin = 'Admin'
    member = 'Member'


class UserOrganization(AkelloBaseModel):
    id: str
    organization_id: str
    role: UserOrganizationRole

    @property
    def object_type(self) -> str:
        return 'user-organization'

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id


class UserOrganizationInvite(AkelloBaseModel):
    id: str
    organization_id: str
    email: str
    role: str
    accepted: bool = False

    @property
    def object_type(self) -> str:
        return 'user-organization-invite'

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id
