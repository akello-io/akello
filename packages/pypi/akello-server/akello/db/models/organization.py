import uuid

from typing import Optional, List
from akello.db.models import AkelloBaseModel
from akello.db.models.registry import Registry, RegistryUser
from akello.db.models.user import User, UserOrganization, UserOrganizationRole, UserRegistry, UserRegistryRole
from akello.db.connector.dynamodb import registry_db

from boto3.dynamodb.conditions import Key
from pydantic import TypeAdapter


class Organization(AkelloBaseModel):
    id: str
    name: Optional[str] = None
    stripe_customer_id: Optional[str] = None
    created_by: User

    def __init__(self, **data):
        super().__init__(
            **data
        )

    @property
    def partition_key(self) -> str:
        return 'organization-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def create(self, requesting_user: User):
        self.id = str(uuid.uuid4())
        self.put(requesting_user=requesting_user)
        assert self.created_by == requesting_user
        UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        ).put()

    def put(self, requesting_user: User):
        user_org = UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        ).get()

        if not user_org:
            raise Exception('User is not part of this organization')

        self.put(requesting_user=requesting_user)

    def create_registry(self, requesting_user: User, name: str = None, logo: str = None):
        """
        Create a registry for this organization
        """

        user_org = UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        ).get()

        if not user_org:
            raise Exception('User is not part of this organization')

        registry = Registry(
            id=str(uuid.uuid4()),
            name=name,
            logo=logo
        )
        registry.create(requesting_user=requesting_user)

        # link the registry to the organization
        OrganizationRegistry(
            registry_id=registry.id,
            organization_id=self.id
        ).put()

        UserRegistry(
            user_id=requesting_user.id,
            registry_id=registry.id,
            role=UserRegistryRole.admin
        ).put()
        RegistryUser(
            user_id=requesting_user.id,
            registry_id=registry.id
        ).put()

        return registry

    def fetch_organization_registries(self, requesting_user: User):
        user_org = UserOrganization(
            user_id=requesting_user.id,
            organization_id=self.id,
            role=UserOrganizationRole.admin
        ).get()

        if not user_org:
            raise Exception('User is not part of this organization')


        partition_key_value = 'organization-id:%s' % self.id

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'registry-id:'),
        )

        # Extract invites from the response
        organization_registeries = response.get('Items', [])
        ta = TypeAdapter(List[OrganizationRegistry])
        return ta.validate_python(organization_registeries)


class OrganizationRegistry(AkelloBaseModel):
    registry_id: str
    organization_id: str = None

    @property
    def partition_key(self) -> str:
        return 'organization-id:%s' % self.organization_id

    @property
    def sort_key(self) -> str:
        return 'registry-id:%s' % self.registry_id