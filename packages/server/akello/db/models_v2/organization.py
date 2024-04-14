import uuid

from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.registry import Registry, RegistryOrganization, RegistryUser
from akello.db.models_v2.user import User, UserOrganization, UserOrganizationRole, UserRegistry, UserRegistryRole


class Organization(AkelloBaseModel):
    id: str
    name: str = None
    stripe_customer_id: str = None
    created_by: User

    def __init__(self, **data):
        super().__init__(
            id=str(uuid.uuid4()),
            **data
        )

    @property
    def partition_key(self) -> str:
        return 'organization-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def create(self, requesting_user: User):
        self._AkelloBaseModel__put()
        assert self.created_by == requesting_user
        UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        )._AkelloBaseModel__put()

    def put(self, requesting_user: User):
        user_org = UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        )._AkelloBaseModel__get()

        if not user_org:
            raise Exception('User is not part of this organization')

        self._AkelloBaseModel__put()

    def create_registry(self, name: str, logo: str, requesting_user: User):
        """
        Create a registry for this organization
        """
        user_org = UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        )._AkelloBaseModel__get()

        if not user_org:
            raise Exception('User is not part of this organization')

        registry = Registry(
            id=str(uuid.uuid4()),
            name=name,
            logo=logo
        )
        registry.create(requesting_user=requesting_user)

        # link the registry to the organization
        RegistryOrganization(
            registry_id=registry.id,
            organization_id=self.id
        )._AkelloBaseModel__put()

        UserRegistry(
            user_id=requesting_user.id,
            registry_id=registry.id,
            role=UserRegistryRole.admin
        )._AkelloBaseModel__put()
        RegistryUser(
            user_id=requesting_user.id,
            registry_id=registry.id
        )._AkelloBaseModel__put()

        return registry
