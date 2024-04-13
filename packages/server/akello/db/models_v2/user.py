from uuid import uuid4
from enum import Enum

from akello.db.models_v2 import AkelloBaseModel


class User(AkelloBaseModel):
    id: str

    def __init__(self, **data):
        super().__init__(
            id=str(uuid4()),
            **data
        )

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'


class UserRegistryRole(str, Enum):
    admin = 'Admin'
    care_manager = 'Care Manager'
    psychiatrist = 'Psychiatrist'
    physician = 'Physician'
    patient = 'Patient'


class UserRegistry(AkelloBaseModel):
    user_id: str
    registry_id: str
    role: UserRegistryRole

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserRegistryInvite(AkelloBaseModel):
    user_id: str
    registry_id: str
    email: str
    role: str
    accepted: bool = False

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id


class UserOrganizationRole(str, Enum):
    admin = 'Admin'
    member = 'Member'


class UserOrganization(AkelloBaseModel):
    user_id: str
    organization_id: str
    role: UserOrganizationRole

    @property
    def partition_key(self) -> str:
        return 'user-id:%s' % self.user_id

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id


class UserOrganizationInvite(AkelloBaseModel):
    user_email: str
    organization_id: str
    invited_by_user_id: str
    role: str
    accepted: bool = False

    @property
    def partition_key(self) -> str:
        return 'user-email:%s' % self.user_email

    @property
    def sort_key(self) -> str:
        return 'invited-organization-id:%s' % self.organization_id
