from uuid import UUID, uuid4
from pydantic import Field
from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.user import User, UserRegistry, UserOrganizationRole, UserRegistryRole


class Registry(AkelloBaseModel):
    id: str
    name: str = None
    logo: str = None

    def __init__(self, **data):
        super().__init__(
            id=str(uuid4()),
            **data
        )

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def create(self, requesting_user: User):
        self._AkelloBaseModel__put()
        UserRegistry(user_id=requesting_user.id, registry_id=self.id, role=UserRegistryRole.admin)._AkelloBaseModel__put()

    def put(self, is_system: bool = False, requesting_user: User = None):
        """
        Protected method to put the item in the database
        """
        if not is_system:
            if not requesting_user:
                raise Exception("Requesting user is required")

            user_registry = UserRegistry(user_id=requesting_user.id, registry_id=self.id, role=UserRegistryRole.care_manager)._AkelloBaseModel__get()
            if not user_registry:
                raise Exception("User not registered to this registry")

        self._AkelloBaseModel__put()


class RegistryOrganization(AkelloBaseModel):
    registry_id: str
    organization_id: str

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.registry_id

    @property
    def sort_key(self) -> str:
        return 'organization-id:%s' % self.organization_id
