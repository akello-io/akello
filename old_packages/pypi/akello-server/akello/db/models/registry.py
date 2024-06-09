from akello.db.models import AkelloBaseModel
from akello.db.models.user import User, UserRegistry, UserOrganizationRole, UserRegistryRole, UserOrganization
from akello.db.models.user import UserInvite
from akello.db.models.registry_treatment import RegistryTreatment
from typing import Optional, List
from boto3.dynamodb.conditions import Key
from pydantic import TypeAdapter
from akello.db.connector.dynamodb import registry_db, measurements_db
from akello.db.types import Measurement
from akello.db.models.measurementvalue import MeasurementValue



class Registry(AkelloBaseModel):
    id: str
    organization_id: Optional[str] = None
    name: Optional[str] = None
    logo: Optional[str] = None
    measurements: List[Measurement] = []

    def __init__(self, **data):
        super().__init__(**data)

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.id

    @property
    def sort_key(self) -> str:
        return 'meta'

    def create(self, requesting_user: User):
        self.put()
        UserRegistry(
            user_id=requesting_user.id,
            registry_id=self.id,
            role=UserRegistryRole.admin).put()

    """
    def put(self, is_system: bool = False, requesting_user: User = None):        
        if not is_system:
            if not requesting_user:
                raise Exception("Requesting user is required")

            user_registry = UserRegistry(user_id=requesting_user.id, registry_id=self.id,
                                         role=UserRegistryRole.care_manager).get()
            if not user_registry:
                raise Exception("User not registered to this registry")

        self.put()
    """

    def add_user(self, user: User, role: UserRegistryRole, requesting_user: User):
        if not UserOrganization(
                user_id=requesting_user.id,
                organization_id=registry_organization.organization_id,
                role=UserOrganizationRole.admin).get():
            raise Exception("Only organization admin can add users to registry")

        if not UserRegistry(user_id=requesting_user.id, registry_id=self.id,
                            role=UserRegistryRole.admin).get():
            raise Exception("Only registry admin can add users to registry")

        UserRegistry(user_id=user.id, registry_id=self.id, role=role).put()
        RegistryUser(user_id=user.id, registry_id=self.id).put()

    def invite_patient(self, email: str, invited_by_user: User, payload: Optional[dict] = None):
        UserInvite(
            object_type='registry',
            object_id=self.id,
            user_email=email,
            invited_by_user_id=invited_by_user.id,
            role=UserRegistryRole.patient,
            payload=payload
        ).put()

    def fetch_users(self, requesting_user_id: str):
        user_registry = UserRegistry(
            user_id=requesting_user_id,
            registry_id=self.id,
            role=UserRegistryRole.admin
        ).get()
        if not user_registry:
            raise Exception('User is not part of this registry')

        # Define the partition key value
        partition_key_value = f"registry-id:{self.id}"

        # Perform the query
        response = registry_db.query(
            KeyConditionExpression=Key('partition_key').eq(partition_key_value) & Key('sort_key').begins_with(
                'user-id:'),
        )

        # Extract sessions from the response
        items = response.get('Items', [])
        ta = TypeAdapter(List[RegistryUser])
        registry_users = ta.validate_python(items)


        users = []
        for registry_user in registry_users:
            user = User.get_by_key(User, 'user-id:%s' % registry_user.user_id, 'meta')
            users.append(user)

        return users



    def fetch_patients(self, requesting_user: User):
        user_registry = UserRegistry(
            user_id=requesting_user.id,
            registry_id=self.id,
            role=UserRegistryRole.admin
        ).get()
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
        items = response.get('Items', [])
        ta = TypeAdapter(List[RegistryTreatment])
        return ta.validate_python(items)

    def fetch_patient_measurement(self, measure: str,  requesting_user_id: str):
        user_registry = UserRegistry(
            user_id=requesting_user_id,
            registry_id=self.id,
            role=UserRegistryRole.admin
        ).get()
        if not user_registry:
            raise Exception('User is not part of this registry')

        partition_key_value = f'user_id:{user_registry.user_id}::registry-id:{user_registry.registry_id}::measure:{measure}'

        response = measurements_db.query(KeyConditionExpression=Key('partition_key').eq(partition_key_value))
        items = response.get('Items', [])
        ta = TypeAdapter(List[MeasurementValue])
        return ta.validate_python(items)


class RegistryUser(AkelloBaseModel):
    registry_id: str
    user_id: str

    @property
    def partition_key(self) -> str:
        return 'registry-id:%s' % self.registry_id

    @property
    def sort_key(self) -> str:
        return 'user-id:%s' % self.user_id

