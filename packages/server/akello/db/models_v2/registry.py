from uuid import uuid4
from akello.db.models_v2 import AkelloBaseModel
from akello.db.models_v2.user import User, UserRegistry, UserOrganizationRole, UserRegistryRole, UserOrganization
from akello.db.models_v2.user import UserInvite
from typing import Optional, List
from boto3.dynamodb.conditions import Key
from pydantic import TypeAdapter
from akello.db.connector.dynamodb import registry_db




class Registry(AkelloBaseModel):
    id: str
    organization_id: Optional[str] = None
    name: Optional[str] = None
    logo: Optional[str] = None

    def __init__(self, **data):
        super().__init__(**data)

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def create(self, requesting_user: User):
        self._AkelloBaseModel__put()
        UserRegistry(
            user_id=requesting_user.id,
            registry_id=self.id,
            role=UserRegistryRole.admin)._AkelloBaseModel__put()

    def put(self, is_system: bool = False, requesting_user: User = None):
        """
        Protected method to put the item in the database
        """
        if not is_system:
            if not requesting_user:
                raise Exception("Requesting user is required")

            user_registry = UserRegistry(user_id=requesting_user.id, registry_id=self.id,
                                         role=UserRegistryRole.care_manager)._AkelloBaseModel__get()
            if not user_registry:
                raise Exception("User not registered to this registry")

        self._AkelloBaseModel__put()

    def add_user(self, user: User, role: UserRegistryRole, requesting_user: User):
        if not UserOrganization(
                user_id=requesting_user.id,
                organization_id=registry_organization.organization_id,
                role=UserOrganizationRole.admin)._AkelloBaseModel__get():
            raise Exception("Only organization admin can add users to registry")

        if not UserRegistry(user_id=requesting_user.id, registry_id=self.id,
                            role=UserRegistryRole.admin)._AkelloBaseModel__get():
            raise Exception("Only registry admin can add users to registry")

        UserRegistry(user_id=user.id, registry_id=self.id, role=role)._AkelloBaseModel__put()
        RegistryUser(user_id=user.id, registry_id=self.id)._AkelloBaseModel__put()

    def invite_patient(self, email: str, invited_by_user: User):
        UserInvite(
            object_type='registry',
            object_id=self.id,
            user_email=email,
            invited_by_user_id=invited_by_user.id,
            role=UserRegistryRole.patient
        )._AkelloBaseModel__put()

    def fetch_patients(self, requesting_user: User):
        user_registry = UserRegistry(
            user_id=requesting_user.id,
            registry_id=self.id,
            role=UserRegistryRole.admin
        )._AkelloBaseModel__get()
        if not user_registry:
            raise Exception('User is not part of this registry')

        # Define the partition key value
        partition_key_value = f"registry-id:{self.id}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'treatment-user-id:'),
        )

        # Extract sessions from the response
        sessions = response.get('Items', [])
        ta = TypeAdapter(List[RegistryUser])
        return ta.validate_python(sessions)


class RegistryUser(AkelloBaseModel):
    registry_id: str
    user_id: str

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.registry_id

    @property
    def sort_key(self) -> str:
        return 'user-id:%s' % self.user_id
